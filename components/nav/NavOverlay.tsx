'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon, ArrowRight } from 'lucide-react'
import { FocusTrap } from './FocusTrap'
import { navConfig } from './config'

interface NavOverlayProps {
  isOpen: boolean
  onClose: () => void
  onNavigate?: (href: string) => void
}

export function NavOverlay({ isOpen, onClose, onNavigate }: NavOverlayProps) {
  const { theme, setTheme } = useTheme()

  // Disable body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleLinkClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href)
    }
    onClose()
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99] bg-background/80 backdrop-blur-md"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={onClose}
        >
          <FocusTrap active={isOpen} onEscape={onClose}>
            <motion.div
              className="flex items-center justify-center min-h-screen p-8"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                    Navigation
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Explore our platform
                  </p>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4 mb-12" role="navigation" aria-label="Main navigation">
                  {navConfig.links.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        ease: 'easeOut'
                      }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="w-full text-left group p-6 rounded-2xl bg-card/50 hover:bg-card/80 border border-border/50 hover:border-border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {link.label}
                          </span>
                          <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </nav>

                {/* Theme Toggle */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: navConfig.links.length * 0.1 + 0.2,
                    ease: 'easeOut'
                  }}
                >
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card/50 hover:bg-card/80 border border-border/50 hover:border-border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="text-lg font-medium">
                      {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </FocusTrap>
        </motion.div>
      )}
    </AnimatePresence>
  )
}