"use client"

import { useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { navConfig, type NavLink } from "./config"
import { FocusTrap, useDisableBodyScroll } from "./FocusTrap"

export function NavOverlay({ isOpen, onClose, links }: { isOpen: boolean; onClose: () => void; links: NavLink[] }) {
  const prefersReducedMotion = useReducedMotion()
  const backdropRef = useRef<HTMLDivElement>(null)
  useDisableBodyScroll(isOpen)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement as HTMLElement | null
    const first = document.querySelector('#iori-nav a, #iori-nav button') as HTMLElement | null
    first?.focus()
    return () => prev?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === backdropRef.current) onClose()
    },
    [onClose],
  )

  const content = (
    <div className="nav-panel" role="document">
      <nav aria-label="Primary">
        <ul className="nav-list">
          {links.map((l) => (
            <li key={l.href}>
              <a
                className="nav-link"
                href={l.href}
                data-smooth
                onClick={() => onClose()}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusTrap active={isOpen}>
          <div
            id="iori-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="nav-overlay"
            ref={backdropRef}
            onClick={handleBackdrop}
          >
            <div className="nav-backdrop" />
            {prefersReducedMotion ? (
              content
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                {content}
              </motion.div>
            )}
          </div>
        </FocusTrap>
      )}
    </AnimatePresence>
  )
}

export default NavOverlay
