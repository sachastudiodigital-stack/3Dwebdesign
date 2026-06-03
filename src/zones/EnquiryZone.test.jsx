import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import EnquiryZone from './EnquiryZone'

describe('EnquiryZone', () => {
  it('renders all form fields', () => {
    render(<EnquiryZone />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Event Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Guests')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('submit button is disabled when required fields are empty', () => {
    render(<EnquiryZone />)
    expect(screen.getByRole('button', { name: /Submit Enquiry/i })).toBeDisabled()
  })

  it('submit button enabled when name and phone filled', () => {
    render(<EnquiryZone />)
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Priya' } })
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '9876543210' } })
    expect(screen.getByRole('button', { name: /Submit Enquiry/i })).not.toBeDisabled()
  })
})
