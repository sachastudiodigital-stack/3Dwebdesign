import { useEffect } from 'react'
import { ZONES } from '../../data/zones'
import NavigationOrb from './NavigationOrb'
import useStore from '../../store/useStore'
import useCameraTransition from '../../hooks/useCameraTransition'

export default function OrbManager({ flyToZoneRef }) {
  const { isTransitioning, currentZone } = useStore()
  const { flyToZone } = useCameraTransition()

  useEffect(() => {
    if (flyToZoneRef) flyToZoneRef.current = flyToZone
  }, [flyToZone, flyToZoneRef])

  return (
    <>
      {ZONES.map((zone) =>
        zone.id !== currentZone ? (
          <NavigationOrb
            key={zone.id}
            zone={zone}
            onNavigate={flyToZone}
            disabled={isTransitioning}
          />
        ) : null
      )}
    </>
  )
}
