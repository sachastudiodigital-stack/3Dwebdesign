import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MiniMap from './MiniMap'

describe('MiniMap', () => {
  it('renders all 8 zone dots', () => {
    render(<MiniMap currentZone={1} onZoneClick={vi.fn()} />)
    const dots = screen.getAllByRole('button')
    expect(dots).toHaveLength(8)
  })

  it('calls onZoneClick with zone id when dot clicked', () => {
    const onClick = vi.fn()
    render(<MiniMap currentZone={1} onZoneClick={onClick} />)
    fireEvent.click(screen.getAllByRole('button')[2])
    expect(onClick).toHaveBeenCalledWith(3)
  })

  it('marks current zone as active', () => {
    render(<MiniMap currentZone={3} onZoneClick={vi.fn()} />)
    const active = screen.getByTitle('Gallery (current)')
    expect(active).toBeInTheDocument()
  })
})
