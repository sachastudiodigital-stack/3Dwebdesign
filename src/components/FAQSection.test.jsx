import { render, screen, fireEvent } from '@testing-library/react'
import FAQSection from './FAQSection'

test('renders all 6 FAQ questions', () => {
  render(<FAQSection />)
  expect(screen.getByText(/maximum guest capacity/i)).toBeInTheDocument()
  expect(screen.getByText(/parking available/i)).toBeInTheDocument()
  expect(screen.getByText(/bring our own caterer/i)).toBeInTheDocument()
  expect(screen.getByText(/decoration restrictions/i)).toBeInTheDocument()
  expect(screen.getByText(/how far in advance/i)).toBeInTheDocument()
  expect(screen.getByText(/outside vendors/i)).toBeInTheDocument()
})

test('answers are hidden by default', () => {
  render(<FAQSection />)
  expect(screen.queryByText(/up to 500 guests/i)).not.toBeInTheDocument()
})

test('clicking a question reveals its answer', () => {
  render(<FAQSection />)
  fireEvent.click(screen.getByText(/maximum guest capacity/i))
  expect(screen.getByText(/up to 500 guests/i)).toBeInTheDocument()
})

test('clicking an open question closes it', () => {
  render(<FAQSection />)
  const btn = screen.getByText(/maximum guest capacity/i)
  fireEvent.click(btn)
  expect(screen.getByText(/up to 500 guests/i)).toBeInTheDocument()
  fireEvent.click(btn)
  expect(screen.queryByText(/up to 500 guests/i)).not.toBeInTheDocument()
})
