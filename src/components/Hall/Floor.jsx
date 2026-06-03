export default function Floor() {
  return (
    <group>
      {/* Marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 32]} />
        <meshStandardMaterial
          color="#F5F5F0"
          roughness={0.1}
          metalness={0.05}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Red carpet aisle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 2]} receiveShadow>
        <planeGeometry args={[2.4, 24]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>

      {/* Left garland border strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.4, 0.003, 2]}>
        <planeGeometry args={[0.3, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>

      {/* Right garland border strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.4, 0.003, 2]}>
        <planeGeometry args={[0.3, 24]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
      </mesh>
    </group>
  )
}
