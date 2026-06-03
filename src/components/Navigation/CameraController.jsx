import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { ZONES } from '../../data/zones'

export default function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    const entrance = ZONES[0]
    camera.position.set(...entrance.cameraPosition)
    camera.lookAt(...entrance.cameraTarget)
  }, [camera])

  return null
}
