import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function Scene({ children, disablePostprocessing = false }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 18], fov: 60, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
      {!disablePostprocessing && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.6} intensity={0.8} mipmapBlur />
          <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
