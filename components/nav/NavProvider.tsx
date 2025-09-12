'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MenuButton } from './MenuButton'
import { NavOverlay } from './NavOverlay'
import { initSmoothScroll } from '../../lib/scroll/smooth'
import { navConfig } from './config'

export function NavProvider() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const pathname = usePathname()

  // Initialize smooth scrolling on first interaction
  useEffect(() => {
    if (!isInitialized && navConfig.smoothScroll.enabled) {
      initSmoothScroll({
        offset: navConfig.smoothScroll.offset,
        duration: navConfig.smoothScroll.duration,
        easing: navConfig.smoothScroll.easing,
      })
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Close overlay on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleNavigate = (href: string) => {
    if (href.startsWith('#')) {
      // Handle anchor links with smooth scrolling
      const targetId = href.slice(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement && typeof window !== 'undefined' && (window as any).IORI_SCROLL) {
        ;(window as any).IORI_SCROLL.scrollTo(targetElement, {
          offset: navConfig.smoothScroll.offset,
          duration: navConfig.smoothScroll.duration,
          easing: navConfig.smoothScroll.easing,
        })
      }
    }
    // For non-anchor links, let Next.js handle navigation
  }

  return (
    <>
      <MenuButton 
        isOpen={isOpen} 
        onToggle={handleToggle}
      />
      <NavOverlay 
        isOpen={isOpen} 
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </>
  )
}