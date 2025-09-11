'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface MenuButtonProps {
  isOpen: boolean
  onToggle: () => void
  className?: string
}

export function MenuButton({ isOpen, onToggle, className = '' }: MenuButtonProps) {
  const id = useId()
  const buttonId = `menu-${id}`

  return (
    <motion.button
      id={buttonId}
      aria-controls="iori-nav"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
      className={`fixed top-4 right-4 z-[100] h-14 w-14 rounded-full backdrop-blur-md bg-background/80 shadow-lg ring-1 ring-border hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="relative w-6 h-6 mx-auto">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-6 h-0.5 bg-foreground rounded-full"
            animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isOpen ? { opacity: 0, y: 0 } : { opacity: 1, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div className="w-6 h-0.5 bg-foreground rounded-full" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isOpen ? { opacity: 0, y: 0 } : { opacity: 1, y: 6 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div className="w-6 h-0.5 bg-foreground rounded-full" />
        </motion.div>
      </div>
      
      <span className="sr-only">
        {isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      </span>
    </motion.button>
  )
}