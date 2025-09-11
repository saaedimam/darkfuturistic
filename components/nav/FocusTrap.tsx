"use client"

import { useEffect, useRef } from "react"

export function useDisableBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [active])
}

export function FocusTrap({ active, children }: { active: boolean; children: React.ReactNode }) {
  const startRef = useRef<HTMLSpanElement>(null)
  const endRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!active) return
    const focusable = () =>
      Array.from<HTMLElement>(
        document.querySelectorAll(
          '#iori-nav a, #iori-nav button, #iori-nav input, #iori-nav textarea, #iori-nav select, #iori-nav [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"))

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const els = focusable()
      if (els.length === 0) return
      const first = els[0]
      const last = els[els.length - 1]
      const target = document.activeElement as HTMLElement
      if (e.shiftKey && target === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && target === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [active])

  return (
    <>
      <span tabIndex={0} ref={startRef} className="sr-only" aria-hidden />
      {children}
      <span tabIndex={0} ref={endRef} className="sr-only" aria-hidden />
    </>
  )
}

export default FocusTrap
