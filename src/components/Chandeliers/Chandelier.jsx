import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Chandelier({ position }) {
  const groupRef = useRef()

  const crystals = useMemo(() => {
    const items = []
    const tiers = [
      { count: 12, radius: 0.8, y: 0, length: 0.3 },
      { count: 18, radius: 1.4, y: -0.4, length: 0.5 },
      { count: 24, radius: 1.8, y: -0.8, length: 0.7 },
    ]
    tiers.forEach(({ count, radius, y, length }, ti) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        items.push({
          key: `${ti}-${i}`,
          x: Math.cos(angle) * radius,
          y,
          z: Math.sin(angle) * radius,
          length,
        })
      }
    })
    return items
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.25) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Central crown */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Chandelier stem */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Crystal drops */}
      {crystals.map(({ key, x, y, z, length }) => (
        <mesh key={key} position={[x, y, z]}>
          <boxGeometry args={[0.04, length, 0.04]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.85}
            metalness={0.1}
            roughness={0}
            envMapIntensity={2}
          />
        </mesh>
      ))}

      {/* Central light source */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={2.5}
        color="#FFF5CC"
        distance={10}
        castShadow={false}
      />

      {/* Emissive sphere at center */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#FFFACD" emissive="#FFFACD" emissiveIntensity={3} />
      </mesh>
    </group>
  )
}
