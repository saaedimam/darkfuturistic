"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { navConfig } from "../../components/nav/config"
import { MenuButton } from "../../components/nav/MenuButton"

const NavOverlay = dynamic(() => import("../../components/nav/NavOverlay"), { ssr: false })

type NavContextType = { open: boolean; setOpen: (v: boolean) => void }
const NavContext = createContext<NavContextType | null>(null)

export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error("useNav must be used within NavProvider")
  return ctx
}

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!navConfig.smoothScroll.enabled) return
    let cleanup: void | (() => void)
    const run = async () => {
      const { initSmoothScroll } = await import("../../lib/scroll/smooth")
      cleanup = initSmoothScroll(navConfig.smoothScroll)
    }
    run()
    return () => {
      if (typeof cleanup === "function") cleanup()
    }
  }, [])

  // Close on route change using hashchange/popstate
  useEffect(() => {
    const onAny = () => setOpen(false)
    window.addEventListener("hashchange", onAny)
    window.addEventListener("popstate", onAny)
    return () => {
      window.removeEventListener("hashchange", onAny)
      window.removeEventListener("popstate", onAny)
    }
  }, [])

  const value = useMemo(() => ({ open, setOpen }), [open])

  return (
    <NavContext.Provider value={value}>
      {children}
      <MenuButton />
      <NavOverlay isOpen={open} onClose={() => setOpen(false)} links={navConfig.links} />
    </NavContext.Provider>
  )
}

export default NavProvider
