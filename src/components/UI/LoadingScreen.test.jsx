import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingScreen from './LoadingScreen'

describe('LoadingScreen', () => {
  it('renders hall name and tagline', () => {
    render(<LoadingScreen progress={0} />)
    expect(screen.getByText(/Royal Convention Hall/i)).toBeInTheDocument()
    expect(screen.getByText(/Preparing your royal experience/i)).toBeInTheDocument()
  })

  it('shows progress percentage', () => {
    render(<LoadingScreen progress={42} />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('does not render when progress is 100', () => {
    const { container } = render(<LoadingScreen progress={100} />)
    expect(container.firstChild).toBeNull()
  })
})
