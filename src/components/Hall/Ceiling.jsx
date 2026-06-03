export default function Ceiling() {
  const panelRows = 4
  const panelCols = 3
  const hallW = 20
  const hallD = 32
  const ceilH = 6.5
  const panelW = hallW / panelCols - 0.3
  const panelD = hallD / panelRows - 0.3

  const panels = []
  for (let r = 0; r < panelRows; r++) {
    for (let c = 0; c < panelCols; c++) {
      const x = -hallW / 2 + (c + 0.5) * (hallW / panelCols)
      const z = -hallD / 2 + (r + 0.5) * (hallD / panelRows) + hallD / 2 - 8
      panels.push({ x, z, key: `${r}-${c}` })
    }
  }

  return (
    <group>
      {/* Main ceiling plane */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ceilH, 0]}>
        <planeGeometry args={[hallW, hallD]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.9} />
      </mesh>

      {/* Recessed panels */}
      {panels.map(({ x, z, key }) => (
        <mesh key={key} rotation={[Math.PI / 2, 0, 0]} position={[x, ceilH - 0.05, z]}>
          <planeGeometry args={[panelW, panelD]} />
          <meshStandardMaterial color="#EEEEEE" roughness={0.95} />
        </mesh>
      ))}

      {/* LED strip emissive */}
      <mesh position={[0, ceilH - 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[9.5, 10, 4]} />
        <meshStandardMaterial
          color="#FFF5CC"
          emissive="#FFF5CC"
          emissiveIntensity={1.5}
          roughness={1}
        />
      </mesh>
    </group>
  )
}
