"use client"

import { useState, useEffect, useRef } from "react"

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", updateScrollProgress)
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return scrollProgress
}

export function useScrollTrigger(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return { ref, isVisible }
}

export function useParallax() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => setOffsetY(window.pageYOffset)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return offsetY
}

export function useHorizontalScroll() {
  const [scrollX, setScrollX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      if (containerRef.current && window.innerWidth) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
        setScrollX(scrollProgress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return { containerRef, scrollX }
}
