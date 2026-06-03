import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'

export default function Scene({ children }) {
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
    </Canvas>
  )
}
