import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Candelabra({ position }) {
  const lightRef = useRef()

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 8 + position[0]) * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Shaft */}
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.08, 1.8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Top cup */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Flame glow */}
      <pointLight ref={lightRef} position={[0, 1.2, 0]} color="#FF8C00" intensity={2} distance={5} />
      {/* Flame visual */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={3} />
      </mesh>
    </group>
  )
}

export default function Candelabras() {
  return (
    <group>
      <Candelabra position={[-3, 0.5, -12.5]} />
      <Candelabra position={[-1.5, 0.5, -12.5]} />
      <Candelabra position={[1.5, 0.5, -12.5]} />
      <Candelabra position={[3, 0.5, -12.5]} />
    </group>
  )
}
