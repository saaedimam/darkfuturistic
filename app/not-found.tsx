'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Illustration */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-8xl lg:text-9xl font-bold text-primary/20 select-none"
            >
              404
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Search className="h-16 w-16 text-muted-foreground" />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-heading-1 text-foreground">
              Page not found
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="focus-ring group">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg" className="focus-ring group">
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Go Back
              </button>
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific? Try these popular pages:
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link 
                href="/about" 
                className="text-primary hover:underline focus-ring rounded-sm"
              >
                About Us
              </Link>
              <Link 
                href="/blog" 
                className="text-primary hover:underline focus-ring rounded-sm"
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="text-primary hover:underline focus-ring rounded-sm"
              >
                Contact
              </Link>
              <Link 
                href="#pricing" 
                className="text-primary hover:underline focus-ring rounded-sm"
              >
                Pricing
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}