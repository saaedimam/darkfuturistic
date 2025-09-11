import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Typography
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          'text-heading-1 text-foreground mb-6 mt-8 first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          'text-heading-2 text-foreground mb-4 mt-8 first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          'text-heading-3 text-foreground mb-3 mt-6 first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          'text-lg font-semibold text-foreground mb-2 mt-4 first:mt-0',
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn(
          'text-body text-foreground mb-4 leading-relaxed',
          className
        )}
        {...props}
      />
    ),
    
    // Lists
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          'list-disc list-inside mb-4 space-y-2 text-body text-foreground',
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          'list-decimal list-inside mb-4 space-y-2 text-body text-foreground',
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li
        className={cn('text-body text-foreground', className)}
        {...props}
      />
    ),
    
    // Links
    a: ({ className, href, ...props }) => {
      const isExternal = href?.startsWith('http')
      
      if (isExternal) {
        return (
          <a
            className={cn(
              'text-primary hover:underline focus-ring rounded-sm',
              className
            )}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        )
      }
      
      return (
        <Link
          className={cn(
            'text-primary hover:underline focus-ring rounded-sm',
            className
          )}
          href={href || ''}
          {...props}
        />
      )
    },
    
    // Code blocks
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          'bg-muted rounded-lg p-4 mb-4 overflow-x-auto text-sm',
          'border border-border',
          className
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          'bg-muted px-1.5 py-0.5 rounded text-sm font-mono',
          'text-foreground border border-border',
          className
        )}
        {...props}
      />
    ),
    
    // Blockquotes
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          'border-l-4 border-primary pl-4 mb-4 italic text-muted-foreground',
          'bg-muted/50 py-2 rounded-r-lg',
          className
        )}
        {...props}
      />
    ),
    
    // Images
    img: ({ className, alt, ...props }) => (
      <Image
        className={cn('rounded-lg mb-4', className)}
        alt={alt || ''}
        width={800}
        height={400}
        {...props}
      />
    ),
    
    // Tables
    table: ({ className, ...props }) => (
      <div className="overflow-x-auto mb-4">
        <table
          className={cn(
            'w-full border-collapse border border-border rounded-lg',
            className
          )}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          'border border-border bg-muted px-4 py-2 text-left font-semibold',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          'border border-border px-4 py-2 text-body',
          className
        )}
        {...props}
      />
    ),
    
    // Horizontal rule
    hr: ({ className, ...props }) => (
      <hr
        className={cn(
          'border-t border-border my-8',
          className
        )}
        {...props}
      />
    ),
    
    ...components,
  }
}