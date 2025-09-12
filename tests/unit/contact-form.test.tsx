import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { ContactForm } from '@/components/contact-form'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument()
      expect(screen.getByText(/subject must be at least 5 characters/i)).toBeInTheDocument()
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument()
    })
  })

  it('accepts valid email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'valid@example.com')
    
    // Should not show validation error for valid email
    expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/company/i), 'Acme Corp')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    // Should show loading state
    expect(screen.getByText(/sending/i)).toBeInTheDocument()
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('has proper accessibility attributes', () => {
    render(<ContactForm />)
    
    // Check for proper labels
    expect(screen.getByLabelText(/name/i)).toHaveAttribute('aria-invalid', 'false')
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'false')
    
    // Check required fields are marked
    expect(screen.getByText('Name *')).toBeInTheDocument()
    expect(screen.getByText('Email *')).toBeInTheDocument()
    expect(screen.getByText('Subject *')).toBeInTheDocument()
    expect(screen.getByText('Message *')).toBeInTheDocument()
  })

  it('clears form after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill out the form
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'This is a test message')
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)
    
    // Wait for success and form reset
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
    }, { timeout: 3000 })
  })
})