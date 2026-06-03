import FloralWall from './FloralWall'

export default function Stage() {
  return (
    <group>
      {/* Stage platform */}
      <mesh position={[0, 0.25, -12]} receiveShadow castShadow>
        <boxGeometry args={[18, 0.5, 7]} />
        <meshStandardMaterial color="#F5F5F0" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Stage steps */}
      <mesh position={[0, 0.1, -8.5]}>
        <boxGeometry args={[18, 0.2, 1]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, -9.2]}>
        <boxGeometry args={[18, 0.2, 0.8]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.3} />
      </mesh>

      {/* Floral wall */}
      <FloralWall />

      {/* Central circular floral piece above stage */}
      <mesh position={[0, 5.8, -13]}>
        <torusGeometry args={[1.5, 0.3, 8, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
      </mesh>
    </group>
  )
}
