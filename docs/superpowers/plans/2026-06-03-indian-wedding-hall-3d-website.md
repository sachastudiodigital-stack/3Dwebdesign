# Indian Marriage Convention Hall — 3D Immersive Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully immersive 3D website where the entire experience lives inside a faithful recreation of the Indian marriage convention hall, with 8 navigable zones reached via GSAP camera fly-throughs.

**Architecture:** Single-page React + React Three Fiber app. No routing. One continuous 3D scene (hall geometry + lighting + particles) with Zustand-driven zone state and 2D HTML overlays for content panels, mini-map, and enquiry form.

**Tech Stack:** Vite 5, React 18, React Three Fiber, @react-three/drei, @react-three/postprocessing, Three.js, GSAP, Zustand, Tailwind CSS, Vitest, @testing-library/react

---

## Phase 1: Project Setup

### Task 1: Initialize project and install all dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`

- [ ] **Step 1: Scaffold Vite + React project**

```bash
cd /home/user/3Dwebdesign
npm create vite@latest . -- --template react
```

- [ ] **Step 2: Install 3D + animation dependencies**

```bash
npm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap zustand
```

- [ ] **Step 3: Install UI + dev dependencies**

```bash
npm install tailwindcss @tailwindcss/vite autoprefixer
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 4: Replace `vite.config.js` with this**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.js',
  },
})
```

- [ ] **Step 5: Create `src/test-setup.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Create `src/index.css`**

```css
@import "tailwindcss";

:root {
  --crimson: #C41230;
  --gold: #D4AF37;
  --ivory: #FFFFF0;
  --walnut: #4A3728;
  --marble: #F5F5F0;
  --charcoal: #1A1A1A;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: #000;
  overflow: hidden;
  font-family: 'Georgia', serif;
}

#root {
  width: 100vw;
  height: 100vh;
  position: relative;
}
```

- [ ] **Step 7: Replace `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 8: Replace `src/App.jsx` with placeholder**

```jsx
export default function App() {
  return <div style={{ color: 'white', padding: 20 }}>Hall loading...</div>
}
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Browser shows "Hall loading..." on black background at `http://localhost:5173`

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: initialize Vite + React project with R3F and Tailwind"
```

---

### Task 2: Zustand store

**Files:**
- Create: `src/store/useStore.js`
- Create: `src/store/useStore.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/store/useStore.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { act } from '@testing-library/react'
import useStore from './useStore'

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({
      currentZone: 0,
      previousZone: null,
      isTransitioning: false,
      isLoading: true,
      isMuted: true,
    })
  })

  it('initializes with zone 0', () => {
    expect(useStore.getState().currentZone).toBe(0)
  })

  it('setZone updates currentZone and previousZone', () => {
    act(() => useStore.getState().setZone(3))
    expect(useStore.getState().currentZone).toBe(3)
    expect(useStore.getState().previousZone).toBe(0)
  })

  it('setTransitioning toggles isTransitioning', () => {
    act(() => useStore.getState().setTransitioning(true))
    expect(useStore.getState().isTransitioning).toBe(true)
  })

  it('setLoading updates isLoading', () => {
    act(() => useStore.getState().setLoading(false))
    expect(useStore.getState().isLoading).toBe(false)
  })

  it('toggleMute flips isMuted', () => {
    act(() => useStore.getState().toggleMute())
    expect(useStore.getState().isMuted).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/store/useStore.test.js
```

Expected: FAIL — "Cannot find module './useStore'"

- [ ] **Step 3: Create `src/store/useStore.js`**

```js
import { create } from 'zustand'

const useStore = create((set, get) => ({
  currentZone: 0,
  previousZone: null,
  isTransitioning: false,
  isLoading: true,
  isMuted: true,

  setZone: (zoneIndex) => set((state) => ({
    previousZone: state.currentZone,
    currentZone: zoneIndex,
  })),

  setTransitioning: (val) => set({ isTransitioning: val }),
  setLoading: (val) => set({ isLoading: val }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
}))

export default useStore
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/store/useStore.test.js
```

Expected: 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/store/
git commit -m "feat: add Zustand store with zone, transition, loading, mute state"
```

---

### Task 3: Zone configuration data

**Files:**
- Create: `src/data/zones.js`
- Create: `src/data/zones.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/data/zones.test.js
import { describe, it, expect } from 'vitest'
import { ZONES, getZone } from './zones'

describe('zones data', () => {
  it('exports 8 zones', () => {
    expect(ZONES).toHaveLength(8)
  })

  it('each zone has required fields', () => {
    ZONES.forEach((zone) => {
      expect(zone).toHaveProperty('id')
      expect(zone).toHaveProperty('name')
      expect(zone).toHaveProperty('cameraPosition')
      expect(zone).toHaveProperty('cameraTarget')
      expect(zone).toHaveProperty('orbPosition')
      expect(zone.cameraPosition).toHaveLength(3)
      expect(zone.cameraTarget).toHaveLength(3)
    })
  })

  it('getZone returns correct zone by id', () => {
    const zone = getZone(2)
    expect(zone.name).toBe('Mid-Aisle')
  })

  it('getZone returns null for invalid id', () => {
    expect(getZone(99)).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/data/zones.test.js
```

Expected: FAIL — "Cannot find module './zones'"

- [ ] **Step 3: Create `src/data/zones.js`**

```js
export const ZONES = [
  {
    id: 1,
    name: 'Entrance',
    label: 'Welcome',
    cameraPosition: [0, 2, 18],
    cameraTarget: [0, 2, 0],
    orbPosition: [0, 2.5, 14],
  },
  {
    id: 2,
    name: 'Mid-Aisle',
    label: 'About',
    cameraPosition: [0, 2.5, 10],
    cameraTarget: [0, 2, 0],
    orbPosition: [1.5, 2.5, 8],
  },
  {
    id: 3,
    name: 'Left Side',
    label: 'Gallery',
    cameraPosition: [-6, 3, 4],
    cameraTarget: [0, 2, -2],
    orbPosition: [-4, 2.5, 6],
  },
  {
    id: 4,
    name: 'Right Side',
    label: 'Packages',
    cameraPosition: [6, 3, 4],
    cameraTarget: [0, 2, -2],
    orbPosition: [4, 2.5, 6],
  },
  {
    id: 5,
    name: 'Stage Approach',
    label: 'Testimonials',
    cameraPosition: [0, 2.5, 1],
    cameraTarget: [0, 3, -8],
    orbPosition: [1.5, 2.5, 2],
  },
  {
    id: 6,
    name: 'Stage Close-up',
    label: 'FAQ',
    cameraPosition: [0, 3, -4],
    cameraTarget: [0, 4, -8],
    orbPosition: [1.5, 3, -3],
  },
  {
    id: 7,
    name: 'Overhead',
    label: 'Blog',
    cameraPosition: [0, 12, 2],
    cameraTarget: [0, 0, -2],
    orbPosition: [1.5, 3, -5],
  },
  {
    id: 8,
    name: 'Side Desk',
    label: 'Enquire',
    cameraPosition: [-8, 2, 6],
    cameraTarget: [0, 2, 0],
    orbPosition: [-5, 2.5, 8],
  },
]

export const getZone = (id) => ZONES.find((z) => z.id === id) ?? null
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/data/zones.test.js
```

Expected: 4 tests PASS

- [ ] **Step 5: Create `src/data/content.js`**

```js
export const packages = [
  {
    id: 'silver',
    name: 'Silver',
    guests: 200,
    hours: 8,
    price: 'Contact for pricing',
    features: ['Basic floral décor', 'Standard lighting', 'Seating arrangement', 'Parking for 50 cars'],
  },
  {
    id: 'gold',
    name: 'Gold',
    guests: 350,
    hours: 12,
    price: 'Contact for pricing',
    features: ['Premium floral décor', 'Advanced lighting', 'Catering coordination', 'AV system', 'Parking for 100 cars'],
  },
  {
    id: 'royal',
    name: 'Royal',
    guests: 500,
    hours: 16,
    price: 'Contact for pricing',
    features: ['Full luxury décor', 'Catering included', 'AV system + LED screen', 'Bridal room', 'Valet parking', 'Event coordinator'],
  },
]

export const testimonials = [
  {
    id: 1,
    couple: 'Priya & Arjun',
    date: 'March 2026',
    quote: 'The hall was absolutely breathtaking. Every guest was speechless when they walked in. The chandeliers, the floral stage — pure magic.',
    stars: 5,
  },
  {
    id: 2,
    couple: 'Sneha & Rahul',
    date: 'January 2026',
    quote: 'Flawless execution from start to finish. The team handled everything with such grace. Our dream wedding became reality here.',
    stars: 5,
  },
  {
    id: 3,
    couple: 'Meera & Vikram',
    date: 'November 2025',
    quote: 'We visited many halls but nothing compared to this. The ambiance, the décor, the capacity — it exceeded every expectation.',
    stars: 5,
  },
]

export const faqs = [
  { q: 'What is the maximum guest capacity?', a: 'Our hall comfortably accommodates up to 500 guests with full seating arrangements.' },
  { q: 'Is parking available?', a: 'Yes, we have ample parking for 100+ vehicles, with valet parking available in the Royal package.' },
  { q: 'Can we bring our own caterer?', a: 'Outside caterers are welcome with a nominal kitchen usage fee. We also offer in-house catering coordination.' },
  { q: 'Are there decoration restrictions?', a: 'We allow all traditional and modern decorations. We only restrict use of open flames outside designated areas.' },
  { q: 'How far in advance should we book?', a: 'We recommend booking at least 6–12 months in advance for peak wedding season (Oct–Feb).' },
  { q: 'Is there a bridal room?', a: 'Yes, a fully equipped air-conditioned bridal suite is included in our Gold and Royal packages.' },
]

export const blogs = [
  {
    id: 1,
    title: '10 Tips for Planning Your Dream Indian Wedding',
    excerpt: 'From choosing the right venue to coordinating with vendors, here is everything you need to know.',
    date: 'May 2026',
    image: '/images/blog-1.jpg',
  },
  {
    id: 2,
    title: 'Top Wedding Décor Trends for 2026',
    excerpt: 'Floral walls, crystal chandeliers, and crimson-gold palettes are dominating this wedding season.',
    date: 'April 2026',
    image: '/images/blog-2.jpg',
  },
  {
    id: 3,
    title: 'Why Our Hall is the Most Sought-After Venue in the City',
    excerpt: 'A behind-the-scenes look at what makes our convention hall stand out for every celebration.',
    date: 'March 2026',
    image: '/images/blog-3.jpg',
  },
]
```

- [ ] **Step 6: Commit**

```bash
git add src/data/
git commit -m "feat: add zone config and content data (packages, testimonials, faq, blog)"
```

---

## Phase 2: Scene Foundation

### Task 4: R3F Canvas and basic scene

**Files:**
- Create: `src/components/Scene/Scene.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/components/Scene/Scene.jsx`**

```jsx
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
```

- [ ] **Step 2: Create `src/components/Scene/Environment.jsx`**

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment as DreiEnvironment, Fog } from '@react-three/drei'

export default function Environment() {
  return (
    <>
      {/* Ambient warm light */}
      <ambientLight intensity={0.4} color="#FFF5E0" />

      {/* Main directional from ceiling */}
      <directionalLight
        position={[0, 8, 0]}
        intensity={0.8}
        color="#FFFAF0"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Subtle fill from front */}
      <directionalLight position={[0, 3, 15]} intensity={0.3} color="#FFF0E0" />

      {/* Crimson fill from stage wall */}
      <pointLight position={[0, 3, -10]} intensity={0.5} color="#C41230" distance={12} />

      {/* Subtle purple atmospheric fog */}
      <fog attach="fog" args={['#1a0a0a', 25, 60]} />
    </>
  )
}
```

- [ ] **Step 3: Update `src/App.jsx`**

```jsx
import Scene from './components/Scene/Scene'
import Environment from './components/Scene/Environment'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Scene>
        <Environment />
        {/* Hall geometry added in next tasks */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="gold" />
        </mesh>
      </Scene>
    </div>
  )
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Expected: Black canvas with a gold cube visible, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ src/App.jsx
git commit -m "feat: add R3F Canvas, Scene wrapper, and Environment lighting"
```

---

### Task 5: Loading screen

**Files:**
- Create: `src/components/UI/LoadingScreen.jsx`
- Create: `src/components/UI/LoadingScreen.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/UI/LoadingScreen.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingScreen from './LoadingScreen'

describe('LoadingScreen', () => {
  it('renders hall name and tagline', () => {
    render(<LoadingScreen progress={0} />)
    expect(screen.getByText(/Royal Convention Hall/i)).toBeInTheDocument()
    expect(screen.getByText(/Preparing your royal experience/i)).toBeInTheDocument()
  })

  it('shows progress percentage', () => {
    render(<LoadingScreen progress={42} />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('does not render when progress is 100', () => {
    const { container } = render(<LoadingScreen progress={100} />)
    expect(container.firstChild).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/UI/LoadingScreen.test.jsx
```

Expected: FAIL — "Cannot find module './LoadingScreen'"

- [ ] **Step 3: Create `src/components/UI/LoadingScreen.jsx`**

```jsx
export default function LoadingScreen({ progress }) {
  if (progress >= 100) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#0a0005',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2rem',
      }}
    >
      {/* Mandala spinner */}
      <div
        style={{
          width: 120, height: 120,
          border: '3px solid #D4AF37',
          borderRadius: '50%',
          borderTopColor: 'transparent',
          animation: 'spin 1.5s linear infinite',
        }}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <h1 style={{ color: '#D4AF37', fontSize: '2rem', fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}>
        Royal Convention Hall
      </h1>

      <p style={{ color: '#FFFFF0', opacity: 0.7, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
        Preparing your royal experience...
      </p>

      {/* Progress bar */}
      <div style={{ width: 240, height: 3, background: 'rgba(212,175,55,0.2)', borderRadius: 2 }}>
        <div
          style={{
            height: '100%', background: '#D4AF37', borderRadius: 2,
            width: `${progress}%`, transition: 'width 0.3s ease',
          }}
        />
      </div>

      <span style={{ color: '#D4AF37', fontSize: '0.8rem' }}>{Math.round(progress)}%</span>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/UI/LoadingScreen.test.jsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Wire loading screen into App.jsx**

```jsx
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
```

- [ ] **Step 6: Commit**

```bash
git add src/components/UI/
git commit -m "feat: add loading screen with progress bar and gold spinner"
```

---

## Phase 3: Hall Geometry

### Task 6: Floor — marble tiles + red carpet aisle

**Files:**
- Create: `src/components/Hall/Floor.jsx`

- [ ] **Step 1: Create `src/components/Hall/Floor.jsx`**

```jsx
import { useRef } from 'react'
import * as THREE from 'three'

export default function Floor() {
  // Marble floor — full hall footprint: 20 wide × 32 deep
  // Carpet aisle: 2 wide × 28 deep, centered
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

      {/* Red carpet aisle — runs from z=14 (entrance) to z=-10 (stage steps) */}
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
```

- [ ] **Step 2: Add Floor to App.jsx Scene**

```jsx
import Floor from './components/Hall/Floor'

// Inside <Scene>:
<Floor />
```

- [ ] **Step 3: Verify in browser**

Expected: White marble floor with red carpet aisle down the center, visible from entrance camera position.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hall/Floor.jsx src/App.jsx
git commit -m "feat: add marble floor with red carpet aisle and garland borders"
```

---

### Task 7: Ceiling — coffered panels + LED strips

**Files:**
- Create: `src/components/Hall/Ceiling.jsx`

- [ ] **Step 1: Create `src/components/Hall/Ceiling.jsx`**

```jsx
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

      {/* Recessed panels — slightly lower than ceiling */}
      {panels.map(({ x, z, key }) => (
        <mesh key={key} rotation={[Math.PI / 2, 0, 0]} position={[x, ceilH - 0.05, z]}>
          <planeGeometry args={[panelW, panelD]} />
          <meshStandardMaterial color="#EEEEEE" roughness={0.95} />
        </mesh>
      ))}

      {/* LED strip emissive lines along ceiling perimeter */}
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
```

- [ ] **Step 2: Add to App.jsx**

```jsx
import Ceiling from './components/Hall/Ceiling'
// Inside <Scene>: <Ceiling />
```

- [ ] **Step 3: Verify in browser** — ceiling with recessed panels visible from below.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hall/Ceiling.jsx src/App.jsx
git commit -m "feat: add coffered ceiling with LED strip accent lighting"
```

---

### Task 8: Walls — side walls, wood panels, back crimson wall

**Files:**
- Create: `src/components/Hall/Walls.jsx`

- [ ] **Step 1: Create `src/components/Hall/Walls.jsx`**

```jsx
export default function Walls() {
  const hallW = 20
  const hallD = 32
  const wallH = 6.5
  const panelCount = 8

  // Wood panels along each side wall
  const woodPanels = Array.from({ length: panelCount }, (_, i) => ({
    key: i,
    z: -hallD / 2 + (i + 0.5) * (hallD / panelCount) + hallD / 2 - 8,
  }))

  return (
    <group>
      {/* Left side wall */}
      <mesh position={[-hallW / 2, wallH / 2, 0]}>
        <boxGeometry args={[0.2, wallH, hallD]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.9} />
      </mesh>

      {/* Right side wall */}
      <mesh position={[hallW / 2, wallH / 2, 0]}>
        <boxGeometry args={[0.2, wallH, hallD]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.9} />
      </mesh>

      {/* Back wall — crimson stage backdrop */}
      <mesh position={[0, wallH / 2, -hallD / 2 + hallD / 2 - 8]}>
        <boxGeometry args={[hallW, wallH, 0.2]} />
        <meshStandardMaterial color="#C41230" roughness={0.8} />
      </mesh>

      {/* Front wall (behind entrance) */}
      <mesh position={[0, wallH / 2, hallD / 2 - 8]}>
        <boxGeometry args={[hallW, wallH, 0.2]} />
        <meshStandardMaterial color="#F0EDE8" roughness={0.9} />
      </mesh>

      {/* Left side walnut wood panels */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`left-${key}`} position={[-hallW / 2 + 0.15, wallH / 2, z]}>
          <boxGeometry args={[0.15, wallH * 0.7, hallD / panelCount - 0.4]} />
          <meshStandardMaterial color="#4A3728" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}

      {/* Right side walnut wood panels */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`right-${key}`} position={[hallW / 2 - 0.15, wallH / 2, z]}>
          <boxGeometry args={[0.15, wallH * 0.7, hallD / panelCount - 0.4]} />
          <meshStandardMaterial color="#4A3728" roughness={0.7} metalness={0.1} />
        </mesh>
      ))}

      {/* LED strips between wood panels — left wall */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`ledL-${key}`} position={[-hallW / 2 + 0.12, wallH * 0.5, z]}>
          <boxGeometry args={[0.05, wallH * 0.5, 0.1]} />
          <meshStandardMaterial color="#FFE4A0" emissive="#FFE4A0" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* LED strips between wood panels — right wall */}
      {woodPanels.map(({ key, z }) => (
        <mesh key={`ledR-${key}`} position={[hallW / 2 - 0.12, wallH * 0.5, z]}>
          <boxGeometry args={[0.05, wallH * 0.5, 0.1]} />
          <meshStandardMaterial color="#FFE4A0" emissive="#FFE4A0" emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}
```

- [ ] **Step 2: Add to App.jsx**

```jsx
import Walls from './components/Hall/Walls'
// Inside <Scene>: <Walls />
```

- [ ] **Step 3: Verify in browser** — hall walls visible, crimson back wall, wood panels on sides with warm LED glow.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hall/Walls.jsx src/App.jsx
git commit -m "feat: add hall walls with crimson backdrop, walnut wood panels, and LED strips"
```

---

## Phase 4: Stage

### Task 9: Stage platform, steps, and floral wall

**Files:**
- Create: `src/components/Stage/Stage.jsx`
- Create: `src/components/Stage/FloralWall.jsx`

- [ ] **Step 1: Create `src/components/Stage/FloralWall.jsx`**

```jsx
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function FloralWall() {
  const meshRef = useRef()
  const count = 1200

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const crimson = new THREE.Color('#C41230')
    const white = new THREE.Color('#FFFFFF')
    const blush = new THREE.Color('#FFB6C1')

    for (let i = 0; i < count; i++) {
      // Wall spans x: -8 to 8, y: -1.5 to 3.5 (relative to group), z: 0
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3

      // Gradient: crimson at bottom (y < -0.5), white at top (y > 1.5), blush in between
      const y = positions[i * 3 + 1]
      const t = THREE.MathUtils.clamp((y + 2.5) / 4, 0, 1)
      const color = t < 0.4
        ? crimson.clone().lerp(blush, t / 0.4)
        : blush.clone().lerp(white, (t - 0.4) / 0.6)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [])

  return (
    <points ref={meshRef} position={[0, 2.5, -15.8]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.18} vertexColors sizeAttenuation />
    </points>
  )
}
```

- [ ] **Step 2: Create `src/components/Stage/Stage.jsx`**

```jsx
import FloralWall from './FloralWall'

export default function Stage() {
  return (
    <group>
      {/* Stage platform */}
      <mesh position={[0, 0.25, -12]} receiveShadow castShadow>
        <boxGeometry args={[18, 0.5, 7]} />
        <meshStandardMaterial color="#F5F5F0" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Stage steps — 2 steps, full width */}
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
```

- [ ] **Step 3: Add to App.jsx**

```jsx
import Stage from './components/Stage/Stage'
// Inside <Scene>: <Stage />
```

- [ ] **Step 4: Verify in browser** — white stage platform, crimson-to-white floral wall across full back wall.

- [ ] **Step 5: Commit**

```bash
git add src/components/Stage/
git commit -m "feat: add stage platform, steps, and instanced floral wall with gradient"
```

---

### Task 10: Throne and candelabras

**Files:**
- Create: `src/components/Stage/Throne.jsx`
- Create: `src/components/Stage/Candelabras.jsx`

- [ ] **Step 1: Create `src/components/Stage/Throne.jsx`**

```jsx
export default function Throne() {
  return (
    <group position={[0, 0.5, -13]}>
      {/* Seat */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#FFFFF0" roughness={0.5} />
      </mesh>
      {/* Back rest */}
      <mesh position={[0, 0.9, -0.3]} castShadow>
        <boxGeometry args={[1.8, 1.2, 0.15]} />
        <meshStandardMaterial color="#FFFFF0" roughness={0.5} />
      </mesh>
      {/* Ornate top piece */}
      <mesh position={[0, 1.6, -0.3]}>
        <torusGeometry args={[0.6, 0.08, 8, 20, Math.PI]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.85, 0.55, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.7]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.85, 0.55, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.7]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Legs */}
      {[[-0.75, -0.3], [0.75, -0.3], [-0.75, 0.3], [0.75, 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.1, z]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}
```

- [ ] **Step 2: Create `src/components/Stage/Candelabras.jsx`**

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Candelabra({ position }) {
  const lightRef = useRef()

  useFrame(({ clock }) => {
    if (lightRef.current) {
      // Flicker: intensity oscillates between 1.5 and 2.5
      lightRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 8 + position[0]) * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Shaft */}
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.08, 1.8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.1, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Top cup */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Flame glow */}
      <pointLight ref={lightRef} position={[0, 1.2, 0]} color="#FF8C00" intensity={2} distance={5} />
      {/* Flame visual */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#FF6600" emissive="#FF6600" emissiveIntensity={3} />
      </mesh>
    </group>
  )
}

export default function Candelabras() {
  return (
    <group>
      <Candelabra position={[-3, 0.5, -12.5]} />
      <Candelabra position={[-1.5, 0.5, -12.5]} />
      <Candelabra position={[1.5, 0.5, -12.5]} />
      <Candelabra position={[3, 0.5, -12.5]} />
    </group>
  )
}
```

- [ ] **Step 3: Add to Stage.jsx imports**

```jsx
import Throne from './Throne'
import Candelabras from './Candelabras'

// Inside Stage group, after existing elements:
<Throne />
<Candelabras />
```

- [ ] **Step 4: Verify in browser** — throne visible center stage, 4 candelabras with flickering orange light.

- [ ] **Step 5: Commit**

```bash
git add src/components/Stage/
git commit -m "feat: add procedural throne and gold candelabras with flickering flame lights"
```

---

## Phase 5: Chandeliers

### Task 11: Crystal chandeliers × 4

**Files:**
- Create: `src/components/Chandeliers/Chandelier.jsx`

- [ ] **Step 1: Create `src/components/Chandeliers/Chandelier.jsx`**

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Chandelier({ position }) {
  const groupRef = useRef()

  // Crystal pieces arranged radially in 3 tiers
  const crystals = useMemo(() => {
    const items = []
    const tiers = [
      { count: 12, radius: 0.8, y: 0, length: 0.3 },
      { count: 18, radius: 1.4, y: -0.4, length: 0.5 },
      { count: 24, radius: 1.8, y: -0.8, length: 0.7 },
    ]
    tiers.forEach(({ count, radius, y, length }, ti) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        items.push({
          key: `${ti}-${i}`,
          x: Math.cos(angle) * radius,
          y,
          z: Math.sin(angle) * radius,
          length,
        })
      }
    })
    return items
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.25) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Central crown */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Chandelier stem */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Crystal drops */}
      {crystals.map(({ key, x, y, z, length }) => (
        <mesh key={key} position={[x, y, z]}>
          <boxGeometry args={[0.04, length, 0.04]} />
          <meshStandardMaterial
            color="#FFFFFF"
            transparent
            opacity={0.85}
            metalness={0.1}
            roughness={0}
            envMapIntensity={2}
          />
        </mesh>
      ))}

      {/* Central light source — warm white with bloom */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={2.5}
        color="#FFF5CC"
        distance={10}
        castShadow={false}
      />

      {/* Emissive sphere at center */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#FFFACD" emissive="#FFFACD" emissiveIntensity={3} />
      </mesh>
    </group>
  )
}
```

- [ ] **Step 2: Create `src/components/Chandeliers/ChandelierRow.jsx`**

```jsx
import Chandelier from './Chandelier'

// 4 chandeliers hung in a row down the center line at ceiling height
export default function ChandelierRow() {
  const positions = [
    [0, 6.3, 10],
    [0, 6.3, 3],
    [0, 6.3, -4],
    [0, 6.3, -11],
  ]
  return (
    <>
      {positions.map((pos, i) => (
        <Chandelier key={i} position={pos} />
      ))}
    </>
  )
}
```

- [ ] **Step 3: Add to App.jsx**

```jsx
import ChandelierRow from './components/Chandeliers/ChandelierRow'
// Inside <Scene>: <ChandelierRow />
```

- [ ] **Step 4: Verify in browser** — 4 crystal chandeliers hanging from ceiling, gently swaying, glowing warm yellow-white.

- [ ] **Step 5: Commit**

```bash
git add src/components/Chandeliers/
git commit -m "feat: add 4 crystal chandeliers with sway animation and warm point lights"
```

---

## Phase 6: Seating

### Task 12: Instanced chair rows

**Files:**
- Create: `src/components/Seating/ChairRows.jsx`

- [ ] **Step 1: Create `src/components/Seating/ChairRows.jsx`**

```jsx
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

// Single chair: seat + backrest + 4 legs — built as one merged geometry
function buildChairGeometry() {
  const group = new THREE.Group()

  // Seat
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.05, 0.45))
  seat.position.set(0, 0.45, 0)
  group.add(seat)

  // Backrest
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.5, 0.05))
  back.position.set(0, 0.7, -0.2)
  group.add(back)

  // 4 legs
  const legPositions = [[-0.18, 0, -0.18], [0.18, 0, -0.18], [-0.18, 0, 0.18], [0.18, 0, 0.18]]
  legPositions.forEach(([x, , z]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.45, 6))
    leg.position.set(x, 0.225, z)
    group.add(leg)
  })

  return group
}

export default function ChairRows() {
  const meshRef = useRef()
  const sashRef = useRef()

  const { matrices, count } = useMemo(() => {
    const matrices = []
    const dummy = new THREE.Object3D()

    // Left block: rows 0..9, columns 0..9 (starting at x=-2.5, stepping -0.6)
    // Right block: rows 0..9, columns 0..9 (starting at x=2.5, stepping +0.6)
    const rowCount = 10
    const colCount = 10
    const rowStep = 0.7   // z spacing
    const colStep = 0.55  // x spacing
    const zStart = 12     // front of hall

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        // Left block
        dummy.position.set(-1.5 - c * colStep, 0, zStart - r * rowStep)
        dummy.rotation.y = 0
        dummy.updateMatrix()
        matrices.push(dummy.matrix.clone())

        // Right block
        dummy.position.set(1.5 + c * colStep, 0, zStart - r * rowStep)
        dummy.rotation.y = 0
        dummy.updateMatrix()
        matrices.push(dummy.matrix.clone())
      }
    }

    return { matrices, count: matrices.length }
  }, [])

  useEffect(() => {
    if (!meshRef.current) return
    matrices.forEach((m, i) => meshRef.current.setMatrixAt(i, m))
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [matrices])

  return (
    <group>
      {/* Chair bodies — white */}
      <instancedMesh ref={meshRef} args={[null, null, count]} castShadow receiveShadow>
        <boxGeometry args={[0.45, 0.9, 0.45]} />
        <meshStandardMaterial color="#FAFAFA" roughness={0.7} />
      </instancedMesh>
    </group>
  )
}
```

- [ ] **Step 2: Add to App.jsx**

```jsx
import ChairRows from './components/Seating/ChairRows'
// Inside <Scene>: <ChairRows />
```

- [ ] **Step 3: Verify in browser** — rows of white chairs either side of red carpet aisle.

- [ ] **Step 4: Commit**

```bash
git add src/components/Seating/
git commit -m "feat: add instanced chair rows (200 chairs, single draw call)"
```

---

## Phase 7: Particles

### Task 13: Rose petals and stage glitter

**Files:**
- Create: `src/components/Particles/RosePetals.jsx`
- Create: `src/components/Particles/StageGlitter.jsx`

- [ ] **Step 1: Create `src/components/Particles/RosePetals.jsx`**

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RosePetals({ count = 300 }) {
  const pointsRef = useRef()

  const { positions, velocities, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18     // x: spread across hall width
      positions[i * 3 + 1] = Math.random() * 6           // y: start at various ceiling heights
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 // z: spread hall depth
      velocities[i] = 0.008 + Math.random() * 0.012      // fall speed
      offsets[i] = Math.random() * Math.PI * 2           // phase offset for drift
    }
    return { positions, velocities, offsets }
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array
    const t = clock.elapsedTime

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i]
      pos[i * 3] += Math.sin(t * 0.5 + offsets[i]) * 0.005 // gentle drift

      // Reset to ceiling when fallen below floor
      if (pos[i * 3 + 1] < -0.5) {
        pos[i * 3 + 1] = 6.5
        pos[i * 3] = (Math.random() - 0.5) * 18
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#FFB6C1" size={0.08} sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}
```

- [ ] **Step 2: Create `src/components/Particles/StageGlitter.jsx`**

```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function StageGlitter({ count = 500 }) {
  const pointsRef = useRef()

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16
      positions[i * 3 + 1] = 2 + Math.random() * 3
      positions[i * 3 + 2] = -13 + (Math.random() - 0.5) * 0.5
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, phases }
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.elapsedTime
    pointsRef.current.material.opacity = 0.4 + Math.sin(t * 2) * 0.3
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  )
}
```

- [ ] **Step 3: Add both to App.jsx**

```jsx
import RosePetals from './components/Particles/RosePetals'
import StageGlitter from './components/Particles/StageGlitter'
// Inside <Scene>: <RosePetals /> <StageGlitter />
```

- [ ] **Step 4: Verify in browser** — pink petals drifting down, gold glitter shimmering above stage.

- [ ] **Step 5: Commit**

```bash
git add src/components/Particles/
git commit -m "feat: add rose petal drift and stage gold glitter particles"
```

---

## Phase 8: Navigation System

### Task 14: Camera transition hook

**Files:**
- Create: `src/hooks/useCameraTransition.js`
- Create: `src/hooks/useCameraTransition.test.js`

- [ ] **Step 1: Write the failing test**

```js
// src/hooks/useCameraTransition.test.js
import { describe, it, expect, vi } from 'vitest'
import { buildTransitionTimeline } from './useCameraTransition'

describe('buildTransitionTimeline', () => {
  it('calls gsap.to with correct camera position', () => {
    const mockGsap = { to: vi.fn() }
    const camera = { position: { x: 0, y: 2, z: 18 } }
    const target = { x: 0, y: 2, z: 0 }

    buildTransitionTimeline(mockGsap, camera, target, [0, 2.5, 10], [0, 2, 0], vi.fn())

    expect(mockGsap.to).toHaveBeenCalledWith(
      camera.position,
      expect.objectContaining({ x: 0, y: 2.5, z: 10 })
    )
  })

  it('calls onComplete callback', () => {
    const mockGsap = { to: vi.fn((_, opts) => opts.onComplete?.()) }
    const onComplete = vi.fn()
    const camera = { position: { x: 0, y: 2, z: 18 } }
    const target = { x: 0, y: 2, z: 0 }

    buildTransitionTimeline(mockGsap, camera, target, [0, 2, 10], [0, 2, 0], onComplete)
    expect(onComplete).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/useCameraTransition.test.js
```

Expected: FAIL

- [ ] **Step 3: Create `src/hooks/useCameraTransition.js`**

```js
import { useCallback, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import useStore from '../store/useStore'

// Pure function — exported for testing
export function buildTransitionTimeline(gsapInstance, camera, controlsTarget, toPosition, toTarget, onComplete) {
  gsapInstance.to(camera.position, {
    x: toPosition[0],
    y: toPosition[1],
    z: toPosition[2],
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete,
  })
  gsapInstance.to(controlsTarget, {
    x: toTarget[0],
    y: toTarget[1],
    z: toTarget[2],
    duration: 1.5,
    ease: 'power2.inOut',
  })
}

export default function useCameraTransition() {
  const { camera } = useThree()
  const controlsTargetRef = useRef({ x: 0, y: 2, z: 0 })
  const { setZone, setTransitioning } = useStore()

  const flyToZone = useCallback((zone) => {
    setTransitioning(true)
    buildTransitionTimeline(
      gsap,
      camera,
      controlsTargetRef.current,
      zone.cameraPosition,
      zone.cameraTarget,
      () => {
        setZone(zone.id)
        setTransitioning(false)
      }
    )
  }, [camera, setZone, setTransitioning])

  return { flyToZone, controlsTargetRef }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/hooks/useCameraTransition.test.js
```

Expected: 2 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useCameraTransition hook with GSAP zone fly-through"
```

---

### Task 15: Navigation orbs and camera controller

**Files:**
- Create: `src/components/Navigation/NavigationOrb.jsx`
- Create: `src/components/Navigation/OrbManager.jsx`
- Create: `src/components/Navigation/CameraController.jsx`

- [ ] **Step 1: Create `src/components/Navigation/NavigationOrb.jsx`**

```jsx
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function NavigationOrb({ zone, onNavigate, disabled }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    // Gentle bob
    meshRef.current.position.y = zone.orbPosition[1] + Math.sin(clock.elapsedTime * 1.5) * 0.08
    meshRef.current.scale.setScalar(hovered ? 1.3 : 1)
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={zone.orbPosition}
        onClick={() => !disabled && onNavigate(zone)}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={hovered ? 3 : 1.5}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      {hovered && (
        <Html position={[zone.orbPosition[0], zone.orbPosition[1] + 0.4, zone.orbPosition[2]]} center>
          <div style={{
            background: 'rgba(26,26,26,0.85)',
            color: '#D4AF37',
            padding: '4px 10px',
            borderRadius: 4,
            fontSize: 13,
            fontFamily: 'Georgia, serif',
            whiteSpace: 'nowrap',
            border: '1px solid #D4AF37',
            pointerEvents: 'none',
          }}>
            {zone.label} →
          </div>
        </Html>
      )}
    </group>
  )
}
```

- [ ] **Step 2: Create `src/components/Navigation/OrbManager.jsx`**

```jsx
import { ZONES } from '../../data/zones'
import NavigationOrb from './NavigationOrb'
import useStore from '../../store/useStore'
import useCameraTransition from '../../hooks/useCameraTransition'

export default function OrbManager() {
  const { isTransitioning, currentZone } = useStore()
  const { flyToZone } = useCameraTransition()

  return (
    <>
      {ZONES.map((zone) =>
        zone.id !== currentZone ? (
          <NavigationOrb
            key={zone.id}
            zone={zone}
            onNavigate={flyToZone}
            disabled={isTransitioning}
          />
        ) : null
      )}
    </>
  )
}
```

- [ ] **Step 3: Create `src/components/Navigation/CameraController.jsx`**

```jsx
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { ZONES } from '../../data/zones'

// Sets initial camera to Zone 1 (Entrance) on mount
export default function CameraController() {
  const { camera } = useThree()

  useEffect(() => {
    const entrance = ZONES[0]
    camera.position.set(...entrance.cameraPosition)
    camera.lookAt(...entrance.cameraTarget)
  }, [camera])

  return null
}
```

- [ ] **Step 4: Add navigation to App.jsx**

```jsx
import OrbManager from './components/Navigation/OrbManager'
import CameraController from './components/Navigation/CameraController'
// Inside <Scene>: <CameraController /> <OrbManager />
```

- [ ] **Step 5: Verify in browser** — gold glowing orbs visible at each zone entrance, hover shows label tooltip, camera starts at entrance position.

- [ ] **Step 6: Commit**

```bash
git add src/components/Navigation/ src/App.jsx
git commit -m "feat: add navigation orbs with hover tooltips and GSAP camera controller"
```

---

## Phase 9: UI Overlays

### Task 16: Mini-map

**Files:**
- Create: `src/components/UI/MiniMap.jsx`
- Create: `src/components/UI/MiniMap.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/UI/MiniMap.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MiniMap from './MiniMap'

describe('MiniMap', () => {
  it('renders all 8 zone dots', () => {
    render(<MiniMap currentZone={1} onZoneClick={vi.fn()} />)
    const dots = screen.getAllByRole('button')
    expect(dots).toHaveLength(8)
  })

  it('calls onZoneClick with zone id when dot clicked', () => {
    const onClick = vi.fn()
    render(<MiniMap currentZone={1} onZoneClick={onClick} />)
    fireEvent.click(screen.getAllByRole('button')[2])
    expect(onClick).toHaveBeenCalledWith(3)
  })

  it('marks current zone as active', () => {
    render(<MiniMap currentZone={3} onZoneClick={vi.fn()} />)
    const active = screen.getByTitle('Gallery (current)')
    expect(active).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/UI/MiniMap.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Create `src/components/UI/MiniMap.jsx`**

```jsx
import { ZONES } from '../../data/zones'

// Dot positions mapped to a 140×100 minimap viewport
const DOT_POSITIONS = [
  { id: 1, x: 70, y: 90 },  // Entrance — bottom center
  { id: 2, x: 70, y: 72 },  // Mid-Aisle
  { id: 3, x: 28, y: 55 },  // Left Side
  { id: 4, x: 112, y: 55 }, // Right Side
  { id: 5, x: 70, y: 38 },  // Stage Approach
  { id: 6, x: 70, y: 24 },  // Stage Close-up
  { id: 7, x: 70, y: 14 },  // Overhead
  { id: 8, x: 22, y: 70 },  // Side Desk
]

export default function MiniMap({ currentZone, onZoneClick }) {
  return (
    <div style={{
      position: 'fixed', top: 16, right: 16, zIndex: 50,
      width: 140, height: 100,
      background: 'rgba(26,26,26,0.8)',
      border: '1px solid rgba(212,175,55,0.4)',
      borderRadius: 6,
      backdropFilter: 'blur(4px)',
    }}>
      <svg width="140" height="100" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Hall outline */}
        <rect x="10" y="8" width="120" height="84" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
        {/* Aisle line */}
        <line x1="70" y1="92" x2="70" y2="8" stroke="rgba(180,0,0,0.4)" strokeWidth="3" />
        {/* Stage */}
        <rect x="20" y="8" width="100" height="12" fill="rgba(196,18,48,0.3)" />
      </svg>

      {DOT_POSITIONS.map(({ id, x, y }) => {
        const zone = ZONES.find((z) => z.id === id)
        const isActive = id === currentZone
        return (
          <button
            key={id}
            role="button"
            title={`${zone.label}${isActive ? ' (current)' : ''}`}
            onClick={() => onZoneClick(id)}
            style={{
              position: 'absolute',
              left: x - 5, top: y - 5,
              width: 10, height: 10,
              borderRadius: '50%',
              background: isActive ? '#D4AF37' : 'rgba(255,255,255,0.5)',
              border: isActive ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              padding: 0,
              transform: isActive ? 'scale(1.4)' : 'scale(1)',
              transition: 'all 0.2s',
            }}
          />
        )
      })}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/UI/MiniMap.test.jsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Wire MiniMap into App.jsx**

```jsx
import MiniMap from './components/UI/MiniMap'
import useStore from './store/useStore'
import { ZONES } from './data/zones'
// import useCameraTransition at top level - needed for minimap click

// Inside App component, outside the Canvas:
// <MiniMap currentZone={currentZone} onZoneClick={handleMinimapClick} />
// Note: handleMinimapClick needs to call flyToZone — wire this in Task 18 (full integration)
```

- [ ] **Step 6: Commit**

```bash
git add src/components/UI/MiniMap.jsx src/components/UI/MiniMap.test.jsx
git commit -m "feat: add minimap with zone dots, active highlight, and click navigation"
```

---

### Task 17: Zone content panel

**Files:**
- Create: `src/components/UI/ZonePanel.jsx`
- Create: `src/components/UI/ZonePanel.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/UI/ZonePanel.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ZonePanel from './ZonePanel'

describe('ZonePanel', () => {
  it('renders children when zone > 1', () => {
    render(<ZonePanel zoneId={2} onClose={vi.fn()}>About content</ZonePanel>)
    expect(screen.getByText('About content')).toBeInTheDocument()
  })

  it('does not render when zone is 1 (entrance/hero)', () => {
    render(<ZonePanel zoneId={1} onClose={vi.fn()}>Hero content</ZonePanel>)
    // Zone 1 is the hero — no panel needed, content is in the 3D scene
    expect(screen.queryByText('Hero content')).not.toBeInTheDocument()
  })

  it('calls onClose when × button clicked', () => {
    const onClose = vi.fn()
    render(<ZonePanel zoneId={3} onClose={onClose}>Gallery</ZonePanel>)
    fireEvent.click(screen.getByLabelText('Close panel'))
    expect(onClose).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/UI/ZonePanel.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Create `src/components/UI/ZonePanel.jsx`**

```jsx
import { useEffect, useRef } from 'react'

export default function ZonePanel({ zoneId, onClose, children }) {
  // Zone 1 is the entrance hero — no content panel
  if (zoneId === 1 || zoneId === null || zoneId === undefined) return null

  return (
    <div
      style={{
        position: 'fixed',
        right: 0, top: 0, bottom: 0,
        width: 'min(420px, 90vw)',
        zIndex: 40,
        background: 'rgba(26,26,26,0.88)',
        backdropFilter: 'blur(12px)',
        borderLeft: '2px solid #D4AF37',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
        animation: 'slideIn 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>

      {/* Gold top accent bar */}
      <div style={{ height: 3, background: '#D4AF37', borderRadius: 2, marginBottom: 8 }} />

      {/* Close button */}
      <button
        aria-label="Close panel"
        onClick={onClose}
        style={{
          position: 'absolute', top: 12, right: 16,
          background: 'none', border: 'none',
          color: '#D4AF37', fontSize: 22, cursor: 'pointer', lineHeight: 1,
        }}
      >
        ×
      </button>

      {children}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/UI/ZonePanel.test.jsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/UI/ZonePanel.jsx src/components/UI/ZonePanel.test.jsx
git commit -m "feat: add slide-in zone content panel with gold border and close button"
```

---

### Task 18: Sound toggle

**Files:**
- Create: `src/components/UI/SoundToggle.jsx`
- Create: `src/components/UI/SoundToggle.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/UI/SoundToggle.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SoundToggle from './SoundToggle'

describe('SoundToggle', () => {
  it('shows muted icon when isMuted is true', () => {
    render(<SoundToggle isMuted={true} onToggle={vi.fn()} />)
    expect(screen.getByLabelText('Unmute music')).toBeInTheDocument()
  })

  it('shows sound icon when isMuted is false', () => {
    render(<SoundToggle isMuted={false} onToggle={vi.fn()} />)
    expect(screen.getByLabelText('Mute music')).toBeInTheDocument()
  })

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn()
    render(<SoundToggle isMuted={true} onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/UI/SoundToggle.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Create `src/components/UI/SoundToggle.jsx`**

```jsx
export default function SoundToggle({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 50,
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(26,26,26,0.8)',
        border: '1px solid rgba(212,175,55,0.5)',
        color: '#D4AF37',
        fontSize: 20, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        transition: 'border-color 0.2s',
      }}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/UI/SoundToggle.test.jsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/UI/SoundToggle.jsx src/components/UI/SoundToggle.test.jsx
git commit -m "feat: add sound toggle button with mute/unmute state"
```

---

## Phase 10: Zone Content

### Task 19: Hero zone (Zone 1 — Entrance)

**Files:**
- Create: `src/zones/HeroZone.jsx`

- [ ] **Step 1: Create `src/zones/HeroZone.jsx`**

```jsx
import { Html } from '@react-three/drei'

// Hero content lives inside the 3D scene as an Html overlay at the entrance
export default function HeroZone({ onEnter }) {
  return (
    <Html position={[0, 3.5, 12]} center transform occlude={false}>
      <div style={{
        textAlign: 'center',
        color: '#FFFFF0',
        fontFamily: 'Georgia, serif',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          color: '#D4AF37',
          textShadow: '0 0 20px rgba(212,175,55,0.5)',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
        }}>
          Royal Convention Hall
        </h1>
        <p style={{
          fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
          opacity: 0.85,
          letterSpacing: '0.15em',
          marginBottom: '2rem',
        }}>
          WHERE EVERY CELEBRATION BECOMES A LEGEND
        </p>
        <button
          onClick={onEnter}
          style={{
            background: 'transparent',
            border: '2px solid #D4AF37',
            color: '#D4AF37',
            padding: '0.75rem 2.5rem',
            fontSize: '1rem',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            borderRadius: 2,
            transition: 'all 0.3s',
          }}
          onMouseOver={e => { e.target.style.background = '#D4AF37'; e.target.style.color = '#1A1A1A' }}
          onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#D4AF37' }}
        >
          BEGIN YOUR JOURNEY →
        </button>
      </div>
    </Html>
  )
}
```

- [ ] **Step 2: Add to App.jsx Scene**

```jsx
import HeroZone from './zones/HeroZone'
import { ZONES } from './data/zones'
// Will be wired with flyToZone in full integration task
// For now: <HeroZone onEnter={() => {}} />
```

- [ ] **Step 3: Verify** — Hall name, tagline, and "Begin Your Journey" button visible in 3D scene at entrance.

- [ ] **Step 4: Commit**

```bash
git add src/zones/HeroZone.jsx
git commit -m "feat: add hero zone with hall name, tagline, and enter CTA in 3D scene"
```

---

### Task 20: About, Gallery, Packages, Testimonials, FAQ, Blog zones

**Files:**
- Create: `src/zones/AboutZone.jsx`
- Create: `src/zones/GalleryZone.jsx`
- Create: `src/zones/PackagesZone.jsx`
- Create: `src/zones/TestimonialsZone.jsx`
- Create: `src/zones/FAQZone.jsx`
- Create: `src/zones/BlogZone.jsx`

- [ ] **Step 1: Create `src/zones/AboutZone.jsx`**

```jsx
export default function AboutZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        About Our Hall
      </h2>
      <p style={{ lineHeight: 1.8, opacity: 0.9, marginBottom: '1rem' }}>
        Royal Convention Hall has been the premier wedding destination in the city for over a decade. Our grand ballroom is renowned for its breathtaking crystal chandeliers, elegant crimson and ivory décor, and world-class hospitality.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
        {[
          { label: 'Capacity', value: '500 Guests' },
          { label: 'Hall Size', value: '12,000 sq ft' },
          { label: 'Established', value: '2012' },
          { label: 'Events Hosted', value: '1,200+' },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'rgba(212,175,55,0.1)', padding: '0.75rem', borderRadius: 4, border: '1px solid rgba(212,175,55,0.2)' }}>
            <div style={{ color: '#D4AF37', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
            <div style={{ fontSize: '1.1rem', marginTop: 4 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/zones/GalleryZone.jsx`**

```jsx
const placeholderImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery-${i + 1}.jpg`,
  alt: `Wedding ${i + 1}`,
}))

export default function GalleryZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Gallery
      </h2>
      <p style={{ opacity: 0.7, marginBottom: '1rem', fontSize: '0.9rem' }}>A glimpse of celebrations at Royal Convention Hall</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {placeholderImages.map(({ id, src, alt }) => (
          <div key={id} style={{
            aspectRatio: '1',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <img
              src={src}
              alt={alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/zones/PackagesZone.jsx`**

```jsx
import { packages } from '../data/content'

export default function PackagesZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Packages
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {packages.map((pkg) => (
          <div key={pkg.id} style={{
            background: pkg.id === 'royal' ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${pkg.id === 'royal' ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
            borderRadius: 6, padding: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 style={{ color: '#D4AF37', fontSize: '1.1rem' }}>{pkg.name}</h3>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Up to {pkg.guests} guests · {pkg.hours}h</span>
            </div>
            <ul style={{ paddingLeft: '1rem', opacity: 0.85, fontSize: '0.9rem', lineHeight: 1.7 }}>
              {pkg.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ marginTop: '0.75rem', color: '#D4AF37', fontSize: '0.85rem' }}>{pkg.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/zones/TestimonialsZone.jsx`**

```jsx
import { testimonials } from '../data/content'

export default function TestimonialsZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        What Couples Say
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {testimonials.map((t) => (
          <div key={t.id} style={{
            background: 'rgba(212,175,55,0.07)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 6, padding: '1rem',
          }}>
            <p style={{ fontStyle: 'italic', lineHeight: 1.7, opacity: 0.9, marginBottom: '0.75rem' }}>
              "{t.quote}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#D4AF37', fontSize: '0.9rem' }}>— {t.couple}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{t.date}</span>
            </div>
            <div style={{ color: '#D4AF37', marginTop: 4 }}>{'★'.repeat(t.stars)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create `src/zones/FAQZone.jsx`**

```jsx
import { useState } from 'react'
import { faqs } from '../data/content'

export default function FAQZone() {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {faqs.map((faq, i) => (
          <div key={i} style={{ border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', textAlign: 'left', background: 'none',
                border: 'none', color: '#FFFFF0', padding: '0.75rem 1rem',
                cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                fontFamily: 'Georgia, serif', fontSize: '0.9rem',
              }}
            >
              {faq.q}
              <span style={{ color: '#D4AF37' }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 1rem 0.75rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.7 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create `src/zones/BlogZone.jsx`**

```jsx
import { blogs } from '../data/content'

export default function BlogZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Blog
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {blogs.map((post) => (
          <div key={post.id} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 6, overflow: 'hidden',
          }}>
            <div style={{ height: 120, background: 'rgba(212,175,55,0.1)', overflow: 'hidden' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
            </div>
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#D4AF37', opacity: 0.7, marginBottom: 4 }}>{post.date}</div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{post.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.6 }}>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Commit all zones**

```bash
git add src/zones/
git commit -m "feat: add About, Gallery, Packages, Testimonials, FAQ, Blog zone content"
```

---

### Task 21: Enquiry zone with mailto form

**Files:**
- Create: `src/zones/EnquiryZone.jsx`
- Create: `src/zones/EnquiryZone.test.jsx`

- [ ] **Step 1: Write the failing test**

```jsx
// src/zones/EnquiryZone.test.jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import EnquiryZone from './EnquiryZone'

describe('EnquiryZone', () => {
  it('renders all form fields', () => {
    render(<EnquiryZone />)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument()
    expect(screen.getByLabelText('Event Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Number of Guests')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('submit button is disabled when required fields are empty', () => {
    render(<EnquiryZone />)
    expect(screen.getByRole('button', { name: /Submit Enquiry/i })).toBeDisabled()
  })

  it('submit button enabled when name and phone filled', () => {
    render(<EnquiryZone />)
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'Priya' } })
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '9876543210' } })
    expect(screen.getByRole('button', { name: /Submit Enquiry/i })).not.toBeDisabled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/zones/EnquiryZone.test.jsx
```

Expected: FAIL

- [ ] **Step 3: Create `src/zones/EnquiryZone.jsx`**

```jsx
import { useState } from 'react'

const fieldStyle = {
  width: '100%', padding: '0.6rem 0.75rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,175,55,0.3)',
  borderRadius: 4, color: '#FFFFF0',
  fontFamily: 'Georgia, serif', fontSize: '0.9rem',
  outline: 'none',
}

const labelStyle = {
  display: 'block', color: '#D4AF37',
  fontSize: '0.75rem', letterSpacing: '0.08em',
  marginBottom: '0.3rem',
}

export default function EnquiryZone() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nGuests: ${form.guests}\nMessage: ${form.message}`
    const mailto = `mailto:info@royalconventionhall.com?subject=Wedding Enquiry - ${form.name}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  const isValid = form.name.trim().length > 0 && form.phone.trim().length > 0

  if (submitted) {
    return (
      <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif', textAlign: 'center', padding: '2rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Thank You!</h3>
        <p style={{ opacity: 0.8 }}>We'll contact you within 24 hours.</p>
      </div>
    )
  }

  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '0.5rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Enquire Now
      </h2>
      <p style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Let us help make your celebration unforgettable.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { label: 'Full Name', name: 'name', type: 'text', required: true },
          { label: 'Phone Number', name: 'phone', type: 'tel', required: true },
          { label: 'Event Date', name: 'date', type: 'date', required: false },
          { label: 'Number of Guests', name: 'guests', type: 'number', required: false },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} style={labelStyle}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              style={fieldStyle}
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" style={labelStyle}>Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            style={{ ...fieldStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            background: isValid ? '#D4AF37' : 'rgba(212,175,55,0.3)',
            border: 'none', color: '#1A1A1A',
            padding: '0.8rem', borderRadius: 4,
            fontFamily: 'Georgia, serif', fontSize: '1rem',
            letterSpacing: '0.08em', cursor: isValid ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
          }}
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/zones/EnquiryZone.test.jsx
```

Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/zones/EnquiryZone.jsx src/zones/EnquiryZone.test.jsx
git commit -m "feat: add enquiry form with mailto submission and validation"
```

---

## Phase 11: Full Integration

### Task 22: Wire everything together in App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with the full integrated version**

```jsx
import { useCallback, useRef } from 'react'
import { useProgress } from '@react-three/drei'
import Scene from './components/Scene/Scene'
import Environment from './components/Scene/Environment'
import Floor from './components/Hall/Floor'
import Ceiling from './components/Hall/Ceiling'
import Walls from './components/Hall/Walls'
import Stage from './components/Stage/Stage'
import ChandelierRow from './components/Chandeliers/ChandelierRow'
import ChairRows from './components/Seating/ChairRows'
import RosePetals from './components/Particles/RosePetals'
import StageGlitter from './components/Particles/StageGlitter'
import CameraController from './components/Navigation/CameraController'
import OrbManager from './components/Navigation/OrbManager'
import LoadingScreen from './components/UI/LoadingScreen'
import MiniMap from './components/UI/MiniMap'
import ZonePanel from './components/UI/ZonePanel'
import SoundToggle from './components/UI/SoundToggle'
import HeroZone from './zones/HeroZone'
import AboutZone from './zones/AboutZone'
import GalleryZone from './zones/GalleryZone'
import PackagesZone from './zones/PackagesZone'
import TestimonialsZone from './zones/TestimonialsZone'
import FAQZone from './zones/FAQZone'
import BlogZone from './zones/BlogZone'
import EnquiryZone from './zones/EnquiryZone'
import useStore from './store/useStore'
import { ZONES, getZone } from './data/zones'

const ZONE_CONTENT = {
  2: <AboutZone />,
  3: <GalleryZone />,
  4: <PackagesZone />,
  5: <TestimonialsZone />,
  6: <FAQZone />,
  7: <BlogZone />,
  8: <EnquiryZone />,
}

function ProgressGate({ children }) {
  const { progress } = useProgress()
  return (
    <>
      <LoadingScreen progress={progress} />
      {children}
    </>
  )
}

export default function App() {
  const { currentZone, isMuted, toggleMute, setZone, setTransitioning, isTransitioning } = useStore()
  const flyToZoneRef = useRef(null)

  const handleMinimapClick = useCallback((zoneId) => {
    if (flyToZoneRef.current && !isTransitioning) {
      const zone = getZone(zoneId)
      if (zone) flyToZoneRef.current(zone)
    }
  }, [isTransitioning])

  const handleClosePanel = useCallback(() => {
    if (flyToZoneRef.current) {
      const entrance = ZONES[0]
      flyToZoneRef.current(entrance)
    }
  }, [])

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
        {currentZone === 1 && (
          <HeroZone onEnter={() => handleMinimapClick(2)} />
        )}
      </Scene>

      <ProgressGate>
        <MiniMap currentZone={currentZone} onZoneClick={handleMinimapClick} />

        <ZonePanel zoneId={currentZone} onClose={handleClosePanel}>
          {ZONE_CONTENT[currentZone]}
        </ZonePanel>

        <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
      </ProgressGate>
    </div>
  )
}
```

- [ ] **Step 2: Update `OrbManager.jsx` to accept and set flyToZoneRef**

```jsx
import { useEffect } from 'react'
import { ZONES } from '../../data/zones'
import NavigationOrb from './NavigationOrb'
import useStore from '../../store/useStore'
import useCameraTransition from '../../hooks/useCameraTransition'

export default function OrbManager({ flyToZoneRef }) {
  const { isTransitioning, currentZone } = useStore()
  const { flyToZone } = useCameraTransition()

  // Expose flyToZone to parent (App) via ref so minimap can use it
  useEffect(() => {
    if (flyToZoneRef) flyToZoneRef.current = flyToZone
  }, [flyToZone, flyToZoneRef])

  return (
    <>
      {ZONES.map((zone) =>
        zone.id !== currentZone ? (
          <NavigationOrb
            key={zone.id}
            zone={zone}
            onNavigate={flyToZone}
            disabled={isTransitioning}
          />
        ) : null
      )}
    </>
  )
}
```

- [ ] **Step 3: Verify full integration in browser**

```bash
npm run dev
```

Expected:
- Loading screen shows while assets load
- Hall renders: floor, ceiling, walls, stage, chandeliers, chairs, particles
- Gold orbs float at zone positions
- Clicking orb triggers smooth camera fly-through
- Zone panel slides in from right showing content
- Minimap in top-right shows current zone
- Sound toggle in bottom-right
- Hero text visible at entrance

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/components/Navigation/OrbManager.jsx
git commit -m "feat: full integration - all zones, panels, minimap, and navigation wired together"
```

---

## Phase 12: Postprocessing + Mobile

### Task 23: Bloom postprocessing for chandeliers and candles

**Files:**
- Modify: `src/components/Scene/Scene.jsx`

- [ ] **Step 1: Update `src/components/Scene/Scene.jsx` to add postprocessing**

```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

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
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            intensity={0.8}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
```

- [ ] **Step 2: Verify in browser** — chandelier lights now have a soft golden bloom glow. Candelabra flames bloom orange. Edges of screen have vignette darkening.

- [ ] **Step 3: Commit**

```bash
git add src/components/Scene/Scene.jsx
git commit -m "feat: add bloom postprocessing for chandelier glow and vignette"
```

---

### Task 24: Mobile detection and simplified experience

**Files:**
- Create: `src/hooks/useIsMobile.js`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create `src/hooks/useIsMobile.js`**

```js
import { useState, useEffect } from 'react'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return isMobile
}
```

- [ ] **Step 2: Update `src/App.jsx` — add mobile import and conditional rendering**

Add at the top of App.jsx imports:
```jsx
import useIsMobile from './hooks/useIsMobile'
```

Inside the `App` function, after the store destructuring:
```jsx
const isMobile = useIsMobile()
```

Update the `<Scene>` JSX to pass isMobile to particles and postprocessing:
```jsx
<RosePetals count={isMobile ? 50 : 300} />
<StageGlitter count={isMobile ? 0 : 500} />
```

Wrap `<EffectComposer>` inside Scene.jsx conditionally — pass a `disablePostprocessing` prop:

Update `src/components/Scene/Scene.jsx`:
```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function Scene({ children, disablePostprocessing = false }) {
  return (
    <Canvas
      shadows={!disablePostprocessing}
      camera={{ position: [0, 2, 18], fov: 60, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        {children}
        {!disablePostprocessing && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={0.8} mipmapBlur />
            <Vignette eskil={false} offset={0.1} darkness={0.6} />
          </EffectComposer>
        )}
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
```

Pass `disablePostprocessing={isMobile}` to `<Scene>` in App.jsx.

- [ ] **Step 3: Add mobile scroll layout below canvas for mobile**

In App.jsx, after the closing `</div>` of the canvas container, add:

```jsx
{isMobile && (
  <div style={{
    position: 'relative', zIndex: 10,
    background: '#0a0005', color: '#FFFFF0',
    fontFamily: 'Georgia, serif', padding: '2rem 1.5rem',
  }}>
    <div style={{ borderTop: '2px solid #D4AF37', marginBottom: '2rem' }} />
    <AboutZone />
    <div style={{ borderTop: '1px solid rgba(212,175,55,0.3)', margin: '2rem 0' }} />
    <PackagesZone />
    <div style={{ borderTop: '1px solid rgba(212,175,55,0.3)', margin: '2rem 0' }} />
    <TestimonialsZone />
    <div style={{ borderTop: '1px solid rgba(212,175,55,0.3)', margin: '2rem 0' }} />
    <FAQZone />
    <div style={{ borderTop: '1px solid rgba(212,175,55,0.3)', margin: '2rem 0' }} />
    <EnquiryZone />
  </div>
)}
```

- [ ] **Step 4: Verify on mobile viewport** — resize browser to < 768px. Expected: reduced particles, no postprocessing, scroll sections below 3D hero.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useIsMobile.js src/App.jsx src/components/Scene/Scene.jsx
git commit -m "feat: mobile detection - reduced particles, no postprocessing, scroll fallback"
```

---

### Task 25: Run all tests and final verification

- [ ] **Step 1: Run full test suite**

```bash
npx vitest run
```

Expected output:
```
✓ src/store/useStore.test.js (5 tests)
✓ src/data/zones.test.js (4 tests)
✓ src/components/UI/LoadingScreen.test.jsx (3 tests)
✓ src/components/UI/MiniMap.test.jsx (3 tests)
✓ src/components/UI/ZonePanel.test.jsx (3 tests)
✓ src/components/UI/SoundToggle.test.jsx (3 tests)
✓ src/hooks/useCameraTransition.test.js (2 tests)
✓ src/zones/EnquiryZone.test.jsx (3 tests)

Test Files: 8 passed
Tests:      26 passed
```

- [ ] **Step 2: Manual browser checklist**

```bash
npm run dev
```

Check each item:
- [ ] Loading screen appears, then fades
- [ ] Hall visible: marble floor, red carpet, white walls, wood panels, crimson back wall
- [ ] 4 crystal chandeliers with bloom glow visible
- [ ] Rose petals drifting from ceiling
- [ ] Gold stage glitter shimmering above floral wall
- [ ] Throne visible center stage
- [ ] 4 candelabras with flickering light
- [ ] Chair rows either side of aisle
- [ ] Gold orbs visible at zone entrances
- [ ] Clicking orb triggers smooth camera fly-through
- [ ] Zone content panel slides in correctly for zones 2–8
- [ ] Hero text + CTA visible at Zone 1
- [ ] Minimap shows current zone highlighted
- [ ] Minimap click navigates to zone
- [ ] Sound toggle visible bottom-right
- [ ] Enquiry form submits (opens mailto)
- [ ] Mobile view (< 768px) shows simplified experience

- [ ] **Step 3: Build check**

```bash
npm run build
```

Expected: Build completes with no errors. Check `dist/` folder exists.

- [ ] **Step 4: Final commit and push**

```bash
git add -A
git commit -m "feat: complete 3D Indian wedding hall website - all zones, navigation, mobile support"
git push -u origin claude/optimistic-hamilton-6LPno
```

---

## Success Criteria

1. `npx vitest run` → 26 tests passing, 0 failures
2. `npm run build` → exits 0, no errors
3. All 8 zones navigable via orbs and minimap
4. Enquiry form opens mailto on submit
5. Rose petals, chandelier bloom, stage glitter all visible on desktop
6. Mobile viewport shows scroll layout with simplified 3D hero
