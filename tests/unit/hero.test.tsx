import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Hero } from '@/components/hero'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  useInView: () => true,
  useReducedMotion: () => false,
}))

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

describe('Hero Component', () => {
  it('renders with default props', () => {
    render(<Hero />)
    
    expect(screen.getByText('Build the Future with Modern SaaS')).toBeInTheDocument()
    expect(screen.getByText('Production-Ready Platform')).toBeInTheDocument()
    expect(screen.getByText(/Transform your business/)).toBeInTheDocument()
    expect(screen.getByText('Get Started')).toBeInTheDocument()
    expect(screen.getByText('Watch Demo')).toBeInTheDocument()
  })

  it('renders with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      subtitle: 'Custom Subtitle',
      description: 'Custom description text',
      primaryCta: {
        text: 'Custom CTA',
        href: '/custom'
      }
    }
    
    render(<Hero {...customProps} />)
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Custom description text')).toBeInTheDocument()
    expect(screen.getByText('Custom CTA')).toBeInTheDocument()
  })

  it('renders hero image with proper attributes', () => {
    const heroImage = {
      src: '/test-image.jpg',
      alt: 'Test image',
      width: 800,
      height: 600
    }
    
    render(<Hero heroImage={heroImage} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('has proper accessibility attributes', () => {
    render(<Hero />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveAttribute('aria-labelledby', 'hero-title')
    
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveAttribute('id', 'hero-title')
  })

  it('renders social proof indicators', () => {
    render(<Hero />)
    
    expect(screen.getByText('10k+ users')).toBeInTheDocument()
    expect(screen.getByText('4.9/5 rating')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Hero className="custom-class" />)
    
    const section = screen.getByRole('region')
    expect(section).toHaveClass('custom-class')
  })

  it('disables background gradient when specified', () => {
    render(<Hero backgroundGradient={false} />)
    
    const section = screen.getByRole('region')
    expect(section).not.toHaveClass('bg-gradient-to-br')
  })
})