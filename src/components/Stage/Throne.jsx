export default function Throne() {
  return (
    <group position={[0, 0.5, -13]}>
      {/* Seat */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#FFFFF0" roughness={0.5} />
      </mesh>
      {/* Back rest */}
      <mesh position={[0, 0.9, -0.3]} castShadow>
        <boxGeometry args={[1.8, 1.2, 0.15]} />
        <meshStandardMaterial color="#FFFFF0" roughness={0.5} />
      </mesh>
      {/* Ornate top piece */}
      <mesh position={[0, 1.6, -0.3]}>
        <torusGeometry args={[0.6, 0.08, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.85, 0.55, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.7]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.85, 0.55, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.7]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Legs */}
      {[[-0.75, -0.3], [0.75, -0.3], [-0.75, 0.3], [0.75, 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}
