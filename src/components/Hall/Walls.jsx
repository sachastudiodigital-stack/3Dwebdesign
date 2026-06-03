export default function Walls() {
  const hallW = 20
  const hallD = 32
  const wallH = 6.5
  const panelCount = 8

  const woodPanels = Array.from({ length: panelCount }, (_, i) => ({
    key: i,
    z: -hallD / 2 + (i + 0.5) * (hallD / panelCount) + hallD / 2 - 8,
  }))

  return (
    <group>
      {/* Left side wall */}
      <mesh position={[-hallW / 2, wallH / 2, 0]}>
        <boxGeometry args={[0.2, wallH, hallD]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.9} />
      </mesh>

      {/* Right side wall */}
      <mesh position={[hallW / 2, wallH / 2, 0]}>
        <boxGeometry args={[0.2, wallH, hallD]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.9} />
      </mesh>

      {/* Back wall — crimson stage backdrop */}
      <mesh position={[0, wallH / 2, -hallD / 2 + hallD / 2 - 8]}>
        <boxGeometry args={[hallW, wallH, 0.2]} />
        <meshStandardMaterial color="#C41230" roughness={0.8} />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, wallH / 2, hallD / 2 - 8]}>
        <boxGeometry args={[hallW, wallH, 0.2]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.9} />
      </mesh>

      {/* Left walnut wood panels */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`left-${key}`} position={[-hallW / 2 + 0.15, wallH / 2, z]}>
          <boxGeometry args={[0.15, wallH * 0.7, hallD / panelCount - 0.4]} />
          <meshStandardMaterial color="#4A3728" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}

      {/* Right walnut wood panels */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`right-${key}`} position={[hallW / 2 - 0.15, wallH / 2, z]}>
          <boxGeometry args={[0.15, wallH * 0.7, hallD / panelCount - 0.4]} />
          <meshStandardMaterial color="#4A3728" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}

      {/* Left LED strips */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`ledL-${key}`} position={[-hallW / 2 + 0.12, wallH * 0.5, z]}>
          <boxGeometry args={[0.05, wallH * 0.5, 0.1]} />
          <meshStandardMaterial color="#FFE4A0" emissive="#FFE4A0" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Right LED strips */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`ledR-${key}`} position={[hallW / 2 - 0.12, wallH * 0.5, z]}>
          <boxGeometry args={[0.05, wallH * 0.5, 0.1]} />
          <meshStandardMaterial color="#FFE4A0" emissive="#FFE4A0" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}
