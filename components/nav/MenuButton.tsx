"use client"

import { useId, useMemo } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { navConfig } from "./config"
import { useNav } from "../../app/(nav)/NavProvider"

function positionClass(position: string) {
  switch (position) {
    case "top-left":
      return "top-4 left-4"
    case "bottom-right":
      return "bottom-4 right-4"
    case "bottom-left":
      return "bottom-4 left-4"
    default:
      return "top-4 right-4"
  }
}

export function MenuButton() {
  const id = useId()
  const { open, setOpen } = useNav()
  const prefersReducedMotion = useReducedMotion()
  const size = navConfig.menuButton.size
  const pos = positionClass(navConfig.menuButton.position)

  const lineVariants = useMemo(
    () => ({
      top: {
        open: { y: 8, rotate: 45 },
        closed: { y: 0, rotate: 0 },
      },
      middle: {
        open: { opacity: 0 },
        closed: { opacity: 1 },
      },
      bottom: {
        open: { y: -8, rotate: -45 },
        closed: { y: 0, rotate: 0 },
      },
    }),
    [],
  )

  return (
    <button
      id={`menu-${id}`}
      aria-controls="iori-nav"
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen(!open)}
      className={[
        "fixed z-[100] select-none",
        pos,
        "rounded-full shadow-lg ring-1",
        "bg-[var(--color-card)] text-[var(--color-foreground)]",
        "ring-[color:var(--color-border)]",
        "backdrop-blur-md",
        "focus:outline-none focus-visible:ring-2",
        "hover:opacity-90 active:opacity-80",
      ].join(" ")}
      style={{ width: size, height: size }}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <div
        aria-hidden
        className="relative mx-auto"
        style={{ width: size * 0.5, height: size * 0.5 }}
      >
        {prefersReducedMotion ? (
          <div className={`transition-transform duration-150 ${open ? "rotate-90" : "rotate-0"}`}>
            <div className="h-[2px] w-full bg-current mb-1.5" />
            <div className="h-[2px] w-full bg-current mb-1.5" />
            <div className="h-[2px] w-full bg-current" />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="block h-[2px] w-6 bg-current rounded"
              animate={open ? "open" : "closed"}
              variants={lineVariants.top}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <motion.span
              className="block h-[2px] w-6 bg-current rounded my-1.5"
              animate={open ? "open" : "closed"}
              variants={lineVariants.middle}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block h-[2px] w-6 bg-current rounded"
              animate={open ? "open" : "closed"}
              variants={lineVariants.bottom}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
        )}
      </div>
    </button>
  )
}

export default MenuButton
