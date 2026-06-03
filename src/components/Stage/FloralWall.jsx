import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function FloralWall() {
  const meshRef = useRef()
  const count = 1200

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const crimson = new THREE.Color('#C41230')
    const white = new THREE.Color('#FFFFFF')
    const blush = new THREE.Color('#FFB6C1')

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3

      const y = positions[i * 3 + 1]
      const t = THREE.MathUtils.clamp((y + 2.5) / 4, 0, 1)
      const color = t < 0.4
        ? crimson.clone().lerp(blush, t / 0.4)
        : blush.clone().lerp(white, (t - 0.4) / 0.6)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [])

  return (
    <points ref={meshRef} position={[0, 2.5, -15.8]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.18} vertexColors sizeAttenuation />
    </points>
  )
}
