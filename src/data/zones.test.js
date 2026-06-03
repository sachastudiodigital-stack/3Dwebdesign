import { describe, it, expect } from 'vitest'
import { ZONES, getZone } from './zones'

describe('zones data', () => {
  it('exports 8 zones', () => {
    expect(ZONES).toHaveLength(8)
  })

  it('each zone has required fields', () => {
    ZONES.forEach((zone) => {
      expect(zone).toHaveProperty('id')
      expect(zone).toHaveProperty('name')
      expect(zone).toHaveProperty('cameraPosition')
      expect(zone).toHaveProperty('cameraTarget')
      expect(zone).toHaveProperty('orbPosition')
      expect(zone.cameraPosition).toHaveLength(3)
      expect(zone.cameraTarget).toHaveLength(3)
    })
  })

  it('getZone returns correct zone by id', () => {
    const zone = getZone(2)
    expect(zone.name).toBe('Mid-Aisle')
  })

  it('getZone returns null for invalid id', () => {
    expect(getZone(99)).toBeNull()
  })
})
