import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { ContactSection } from '../ContactSection'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}))

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ContactSection', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders contact form with all fields', () => {
    render(<ContactSection />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      expect(screen.getByText(/subject must be at least 5 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)
    
    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/sending/i)).toBeInTheDocument()
    })
  })

  it('displays contact information', () => {
    render(<ContactSection />)
    
    expect(screen.getByText(/hello@ioriimasu.com/i)).toBeInTheDocument()
    expect(screen.getByText(/\+1 \(555\) 123-4567/i)).toBeInTheDocument()
    expect(screen.getByText(/san francisco, ca/i)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ContactSection />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const subjectInput = screen.getByLabelText(/subject/i)
    const messageInput = screen.getByLabelText(/message/i)
    
    expect(nameInput).toHaveAttribute('id', 'name')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(subjectInput).toHaveAttribute('id', 'subject')
    expect(messageInput).toHaveAttribute('id', 'message')
  })
})