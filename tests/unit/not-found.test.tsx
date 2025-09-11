import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import NotFoundPage from '@/app/not-found'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('NotFoundPage', () => {
  it('renders 404 page with correct content', () => {
    render(<NotFoundPage />)
    
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Page not found')).toBeInTheDocument()
    expect(screen.getByText(/Sorry, we couldn't find the page/)).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<NotFoundPage />)
    
    expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })

  it('renders helpful links', () => {
    render(<NotFoundPage />)
    
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /pricing/i })).toBeInTheDocument()
  })

  it('has proper accessibility structure', () => {
    render(<NotFoundPage />)
    
    const heading = screen.getByRole('heading', { name: /page not found/i })
    expect(heading).toBeInTheDocument()
    
    // Check for proper link structure
    const homeLink = screen.getByRole('link', { name: /back to home/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})