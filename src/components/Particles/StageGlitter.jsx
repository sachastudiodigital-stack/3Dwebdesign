import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function StageGlitter({ count = 500 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = 2 + Math.random() * 3
      pos[i * 3 + 2] = -13 + (Math.random() - 0.5) * 0.5
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.material.opacity = 0.4 + Math.sin(clock.elapsedTime * 2) * 0.3
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#D4AF37" size={0.04} sizeAttenuation transparent opacity={0.6} />
    </points>
  )
}
