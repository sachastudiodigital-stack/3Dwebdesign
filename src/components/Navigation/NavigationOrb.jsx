import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function NavigationOrb({ zone, onNavigate, disabled }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.position.y = zone.orbPosition[1] + Math.sin(clock.elapsedTime * 1.5) * 0.08
    meshRef.current.scale.setScalar(hovered ? 1.3 : 1)
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={zone.orbPosition}
        onClick={() => !disabled && onNavigate(zone)}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={hovered ? 3 : 1.5}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      {hovered && (
        <Html position={[zone.orbPosition[0], zone.orbPosition[1] + 0.4, zone.orbPosition[2]]} center>
          <div style={{
            background: 'rgba(26,26,26,0.85)',
            color: '#D4AF37',
            padding: '4px 10px',
            borderRadius: 4,
            fontSize: 13,
            fontFamily: 'Georgia, serif',
            whiteSpace: 'nowrap',
            border: '1px solid #D4AF37',
            pointerEvents: 'none',
          }}>
            {zone.label} →
          </div>
        </Html>
      )}
    </group>
  )
}
