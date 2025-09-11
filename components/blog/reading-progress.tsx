'use client'

import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress() // Initial call

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-muted z-50"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full bg-primary origin-left",
          shouldReduceMotion ? "transition-none" : "transition-all duration-150 ease-out"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}