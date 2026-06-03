import { describe, it, expect, vi } from 'vitest'
import { buildTransitionTimeline } from './useCameraTransition'

describe('buildTransitionTimeline', () => {
  it('calls gsap.to with correct camera position', () => {
    const mockGsap = { to: vi.fn() }
    const camera = { position: { x: 0, y: 2, z: 18 } }
    const target = { x: 0, y: 2, z: 0 }

    buildTransitionTimeline(mockGsap, camera, target, [0, 2.5, 10], [0, 2, 0], vi.fn())

    expect(mockGsap.to).toHaveBeenCalledWith(
      camera.position,
      expect.objectContaining({ x: 0, y: 2.5, z: 10 })
    )
  })

  it('calls onComplete callback', () => {
    const mockGsap = { to: vi.fn((_, opts) => opts.onComplete?.()) }
    const onComplete = vi.fn()
    const camera = { position: { x: 0, y: 2, z: 18 } }
    const target = { x: 0, y: 2, z: 0 }

    buildTransitionTimeline(mockGsap, camera, target, [0, 2, 10], [0, 2, 0], onComplete)
    expect(onComplete).toHaveBeenCalled()
  })
})
