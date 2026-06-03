import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ZonePanel from './ZonePanel'

describe('ZonePanel', () => {
  it('renders children when zone > 1', () => {
    render(<ZonePanel zoneId={2} onClose={vi.fn()}>About content</ZonePanel>)
    expect(screen.getByText('About content')).toBeInTheDocument()
  })

  it('does not render when zone is 1 (entrance/hero)', () => {
    render(<ZonePanel zoneId={1} onClose={vi.fn()}>Hero content</ZonePanel>)
    expect(screen.queryByText('Hero content')).not.toBeInTheDocument()
  })

  it('calls onClose when × button clicked', () => {
    const onClose = vi.fn()
    render(<ZonePanel zoneId={3} onClose={onClose}>Gallery</ZonePanel>)
    fireEvent.click(screen.getByLabelText('Close panel'))
    expect(onClose).toHaveBeenCalled()
  })
})
