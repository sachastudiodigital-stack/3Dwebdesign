import { useProgress } from '@react-three/drei'
import Scene from './components/Scene/Scene'
import Environment from './components/Scene/Environment'
import LoadingScreen from './components/UI/LoadingScreen'

function SceneProgress() {
  const { progress } = useProgress()
  return <LoadingScreen progress={progress} />
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Scene>
        <Environment />
      </Scene>
      <SceneProgress />
    </div>
  )
}
