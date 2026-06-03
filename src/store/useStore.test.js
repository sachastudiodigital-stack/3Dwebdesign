import { describe, it, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import useStore from './useStore'

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({
      currentZone: 0,
      previousZone: null,
      isTransitioning: false,
      isLoading: true,
      isMuted: true,
    })
  })

  it('initializes with zone 0', () => {
    expect(useStore.getState().currentZone).toBe(0)
  })

  it('setZone updates currentZone and previousZone', () => {
    act(() => useStore.getState().setZone(3))
    expect(useStore.getState().currentZone).toBe(3)
    expect(useStore.getState().previousZone).toBe(0)
  })

  it('setTransitioning toggles isTransitioning', () => {
    act(() => useStore.getState().setTransitioning(true))
    expect(useStore.getState().isTransitioning).toBe(true)
  })

  it('setLoading updates isLoading', () => {
    act(() => useStore.getState().setLoading(false))
    expect(useStore.getState().isLoading).toBe(false)
  })

  it('toggleMute flips isMuted', () => {
    act(() => useStore.getState().toggleMute())
    expect(useStore.getState().isMuted).toBe(false)
  })
})
