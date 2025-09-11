import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from '../app/page'

describe('HomePage', () => {
  it('renders navigation', () => {
    render(<HomePage />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})