import { useRef } from 'react'
import { useProgress } from '@react-three/drei'
import Scene from './components/Scene/Scene'
import OrbManager from './components/Navigation/OrbManager'
import CameraController from './components/Navigation/CameraController'
import Environment from './components/Scene/Environment'
import Floor from './components/Hall/Floor'
import Ceiling from './components/Hall/Ceiling'
import Walls from './components/Hall/Walls'
import Stage from './components/Stage/Stage'
import LoadingScreen from './components/UI/LoadingScreen'
import ChandelierRow from './components/Chandeliers/ChandelierRow'
import ChairRows from './components/Seating/ChairRows'
import RosePetals from './components/Particles/RosePetals'
import StageGlitter from './components/Particles/StageGlitter'

function SceneProgress() {
  const { progress } = useProgress()
  return <LoadingScreen progress={progress} />
}

export default function App() {
  const flyToZoneRef = useRef(null)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Scene>
        <Environment />
        <Floor />
        <Ceiling />
        <Walls />
        <Stage />
        <ChandelierRow />
        <ChairRows />
        <RosePetals />
        <StageGlitter />
        <CameraController />
        <OrbManager flyToZoneRef={flyToZoneRef} />
      </Scene>
      <SceneProgress />
    </div>
  )
}
