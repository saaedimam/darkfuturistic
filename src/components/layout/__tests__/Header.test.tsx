import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { vi } from 'vitest'
import { Header } from '../Header'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {component}
    </ThemeProvider>
  )
}

describe('Header', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    })
  })

  it('renders logo and navigation items', () => {
    renderWithTheme(<Header />)
    
    expect(screen.getByText('Lumina')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('renders skip link for accessibility', () => {
    renderWithTheme(<Header />)
    
    const skipLink = screen.getByText('Skip to main content')
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('renders theme toggle button', () => {
    renderWithTheme(<Header />)
    
    const themeButton = screen.getByLabelText(/switch to/i)
    expect(themeButton).toBeInTheDocument()
  })

  it('renders get started button', () => {
    renderWithTheme(<Header />)
    
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })

  it('renders mobile menu button on small screens', () => {
    renderWithTheme(<Header />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    expect(menuButton).toBeInTheDocument()
  })

  it('applies scrolled styles when scrolled', async () => {
    renderWithTheme(<Header />)
    
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    fireEvent.scroll(window)
    
    await waitFor(() => {
      const header = screen.getByRole('banner')
      expect(header).toHaveClass('bg-background/80', 'backdrop-blur-md')
    })
  })

  it('handles mobile menu toggle', async () => {
    renderWithTheme(<Header />)
    
    const menuButton = screen.getByLabelText('Open navigation menu')
    fireEvent.click(menuButton)
    
    await waitFor(() => {
      expect(screen.getByText('Features')).toBeInTheDocument()
    })
  })

  it('has proper ARIA attributes', () => {
    renderWithTheme(<Header />)
    
    const nav = screen.getByLabelText('Main navigation')
    expect(nav).toBeInTheDocument()
    
    const mobileNav = screen.getByLabelText('Mobile navigation')
    expect(mobileNav).toBeInTheDocument()
  })
})