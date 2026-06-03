import { useRef } from 'react'
import useIsMobile from './hooks/useIsMobile'
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
import HeroZone from './zones/HeroZone'
import AboutZone from './zones/AboutZone'
import GalleryZone from './zones/GalleryZone'
import PackagesZone from './zones/PackagesZone'
import TestimonialsZone from './zones/TestimonialsZone'
import FAQZone from './zones/FAQZone'
import BlogZone from './zones/BlogZone'
import EnquiryZone from './zones/EnquiryZone'
import MiniMap from './components/UI/MiniMap'
import ZonePanel from './components/UI/ZonePanel'
import SoundToggle from './components/UI/SoundToggle'
import useStore from './store/useStore'

const ZONE_CONTENT = {
  2: <AboutZone />,
  3: <GalleryZone />,
  4: <PackagesZone />,
  5: <TestimonialsZone />,
  6: <FAQZone />,
  7: <BlogZone />,
  8: <EnquiryZone />,
}

function SceneProgress() {
  const { progress } = useProgress()
  return <LoadingScreen progress={progress} />
}

export default function App() {
  const flyToZoneRef = useRef(null)
  const { currentZone, setZone } = useStore()
  const isMobile = useIsMobile()

  function handleMinimapClick(zoneId) {
    flyToZoneRef.current?.(zoneId)
    setZone(zoneId)
  }

  function handleClosePanel() {
    flyToZoneRef.current?.(1)
    setZone(1)
  }

  return (
    <>
    <div style={{ width: '100vw', height: isMobile ? '50vh' : '100vh', background: '#000' }}>
      <Scene disablePostprocessing={isMobile}>
        <Environment />
        <Floor />
        <Ceiling />
        <Walls />
        <Stage />
        <ChandelierRow />
        <ChairRows />
        {!isMobile && <RosePetals />}
        {!isMobile && <StageGlitter />}
        <CameraController />
        <OrbManager flyToZoneRef={flyToZoneRef} />
        {currentZone === 1 && (
          <HeroZone onEnter={() => handleMinimapClick(2)} />
        )}
      </Scene>
      <SceneProgress />
      {!isMobile && <MiniMap currentZone={currentZone} onZoneClick={handleMinimapClick} />}
      {!isMobile && currentZone > 1 && (
        <ZonePanel zoneId={currentZone} onClose={handleClosePanel}>
          {ZONE_CONTENT[currentZone]}
        </ZonePanel>
      )}
      {!isMobile && <SoundToggle />}
    </div>
    {isMobile && (
      <div style={{ overflowY: 'auto', background: '#1A1A1A', padding: '2rem 1rem' }}>
        <section style={{ marginBottom: '3rem' }}><AboutZone /></section>
        <section style={{ marginBottom: '3rem' }}><GalleryZone /></section>
        <section style={{ marginBottom: '3rem' }}><PackagesZone /></section>
        <section style={{ marginBottom: '3rem' }}><TestimonialsZone /></section>
        <section style={{ marginBottom: '3rem' }}><FAQZone /></section>
        <section style={{ marginBottom: '3rem' }}><BlogZone /></section>
        <section style={{ marginBottom: '3rem' }}><EnquiryZone /></section>
      </div>
    )}
    </>
  )
}
