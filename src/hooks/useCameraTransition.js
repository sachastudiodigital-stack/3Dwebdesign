import { useCallback, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import useStore from '../store/useStore'

// Pure function — exported for testing
export function buildTransitionTimeline(gsapInstance, camera, controlsTarget, toPosition, toTarget, onComplete) {
  gsapInstance.to(camera.position, {
    x: toPosition[0],
    y: toPosition[1],
    z: toPosition[2],
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete,
  })
  gsapInstance.to(controlsTarget, {
    x: toTarget[0],
    y: toTarget[1],
    z: toTarget[2],
    duration: 1.5,
    ease: 'power2.inOut',
  })
}

export default function useCameraTransition() {
  const { camera } = useThree()
  const controlsTargetRef = useRef({ x: 0, y: 2, z: 0 })
  const { setZone, setTransitioning } = useStore()

  const flyToZone = useCallback((zone) => {
    setTransitioning(true)
    buildTransitionTimeline(
      gsap,
      camera,
      controlsTargetRef.current,
      zone.cameraPosition,
      zone.cameraTarget,
      () => {
        setZone(zone.id)
        setTransitioning(false)
      }
    )
  }, [camera, setZone, setTransitioning])

  return { flyToZone, controlsTargetRef }
}
