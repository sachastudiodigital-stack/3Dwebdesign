export default function Environment() {
  return (
    <>
      <ambientLight intensity={0.4} color="#FFF5E0" />
      <directionalLight
        position={[0, 8, 0]}
        intensity={0.8}
        color="#FFFAF0"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[0, 3, 15]} intensity={0.3} color="#FFF0E0" />
      <pointLight position={[0, 3, -10]} intensity={0.5} color="#C41230" distance={12} />
      <fog attach="fog" args={['#1a0a0a', 25, 60]} />
    </>
  )
}
