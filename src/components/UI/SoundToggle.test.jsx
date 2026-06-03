import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SoundToggle from './SoundToggle'

describe('SoundToggle', () => {
  it('shows muted icon when isMuted is true', () => {
    render(<SoundToggle isMuted={true} onToggle={vi.fn()} />)
    expect(screen.getByLabelText('Unmute music')).toBeInTheDocument()
  })

  it('shows sound icon when isMuted is false', () => {
    render(<SoundToggle isMuted={false} onToggle={vi.fn()} />)
    expect(screen.getByLabelText('Mute music')).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn()
    render(<SoundToggle isMuted={true} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalled()
  })
})
