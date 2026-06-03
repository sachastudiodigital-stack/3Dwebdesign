import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function RosePetals({ count = 300 }) {
  const pointsRef = useRef()

  const { positions, velocities, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = Math.random() * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      velocities[i] = 0.008 + Math.random() * 0.012
      offsets[i] = Math.random() * Math.PI * 2
    }
    return { positions, velocities, offsets }
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array
    const t = clock.elapsedTime

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i]
      pos[i * 3] += Math.sin(t * 0.5 + offsets[i]) * 0.005

      if (pos[i * 3 + 1] < -0.5) {
        pos[i * 3 + 1] = 6.5
        pos[i * 3] = (Math.random() - 0.5) * 18
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FFB6C1" size={0.08} sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}
