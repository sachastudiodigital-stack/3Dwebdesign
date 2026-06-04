import { render, screen, fireEvent } from '@testing-library/react'
import ContactSection from './ContactSection'

test('renders all 5 form fields', () => {
  render(<ContactSection />)
  expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/event date/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
})

test('submit button is disabled when name and phone are empty', () => {
  render(<ContactSection />)
  expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeDisabled()
})

test('submit button enables when name and phone are filled', () => {
  render(<ContactSection />)
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { name: 'name', value: 'Ravi' } })
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { name: 'phone', value: '9849555900' } })
  expect(screen.getByRole('button', { name: /submit enquiry/i })).not.toBeDisabled()
})

test('shows success message after submit', () => {
  render(<ContactSection />)
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { name: 'name', value: 'Ravi' } })
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { name: 'phone', value: '9849555900' } })
  fireEvent.click(screen.getByRole('button', { name: /submit enquiry/i }))
  expect(screen.getByText(/thank you/i)).toBeInTheDocument()
  expect(screen.getByText(/within 24 hours/i)).toBeInTheDocument()
})
