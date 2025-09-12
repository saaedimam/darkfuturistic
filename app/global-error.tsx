'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Error Illustration */}
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 text-destructive"
                >
                  <AlertTriangle className="h-12 w-12" />
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold text-foreground">
                  Something went wrong
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  We're sorry, but something unexpected happened. 
                  This error has been logged and we'll look into it.
                </p>
                
                {process.env.NODE_ENV === 'development' && (
                  <details className="mt-6 p-4 bg-muted rounded-lg text-left max-w-lg mx-auto">
                    <summary className="cursor-pointer font-medium text-foreground mb-2">
                      Error Details (Development Only)
                    </summary>
                    <pre className="text-xs text-muted-foreground overflow-auto">
                      {error.message}
                      {error.digest && (
                        <>
                          {'\n'}Digest: {error.digest}
                        </>
                      )}
                    </pre>
                  </details>
                )}
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button onClick={reset} size="lg" className="focus-ring group">
                  <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                  Try Again
                </Button>
                
                <Button variant="outline" asChild size="lg" className="focus-ring">
                  <a href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </a>
                </Button>
              </motion.div>

              {/* Support Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-8 border-t border-border"
              >
                <p className="text-sm text-muted-foreground">
                  If this problem persists, please contact our support team at{' '}
                  <a 
                    href="mailto:support@example.com" 
                    className="text-primary hover:underline focus-ring rounded-sm"
                  >
                    support@example.com
                  </a>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  )
}