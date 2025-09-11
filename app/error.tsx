'use client'

import { useEffect } from 'react'
import { Button } from '../src/components/ui/button'
import { RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-destructive">Oops!</h1>
          <h2 className="text-2xl font-semibold text-foreground">Something went wrong</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left max-w-md mx-auto">
              <summary className="cursor-pointer text-sm text-muted-foreground">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}