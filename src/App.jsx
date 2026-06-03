import Scene from './components/Scene/Scene'
import Environment from './components/Scene/Environment'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Scene>
        <Environment />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gold" />
        </mesh>
      </Scene>
    </div>
  )
}
