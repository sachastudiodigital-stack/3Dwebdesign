# Indian Marriage Convention Hall — 3D Immersive Website Design Spec

**Date:** 2026-06-03
**Status:** Approved

---

## Goal

Build a fully immersive 3D website for an Indian marriage convention hall where the entire website experience lives inside a faithful 3D recreation of the actual hall. Visitors navigate by flying through the hall, discovering each website section (About, Gallery, Packages, Testimonials, FAQ, Blog, Enquiry) as zones within the space. The site serves dual purposes: marketing the venue to couples/event planners and providing an immersive virtual tour experience.

---

## Architecture

**Type:** Single-page React application. No routing. One continuous 3D scene with zone-based content overlays.

**Core Pattern:** R3F Canvas → Scene → Zones. Camera is the navigation mechanism. Content is overlaid as HTML panels on top of the 3D scene using `@react-three/drei`'s `<Html>` component and standard React portals.

```
Browser
└── React App
    ├── LoadingScreen (2D overlay, unmounts after assets ready)
    ├── R3F Canvas
    │   ├── Environment & Lighting
    │   ├── Hall (floor, ceiling, walls, wood panels)
    │   ├── Stage (floral wall, throne, candelabras, red backdrop)
    │   ├── Chandeliers × 4
    │   ├── SeatingRows (instanced chairs + aisle carpet)
    │   ├── Particles (rose petals, glitter)
    │   ├── NavigationOrbs (glowing hotspots per zone)
    │   └── CameraController (GSAP-driven)
    └── UILayer (2D React, pointer-events overlay)
        ├── MiniMap
        ├── ZoneContentPanel (slides in per zone)
        ├── EnquiryForm
        └── SoundToggle
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite + React 18 | Build tooling, component framework |
| React Three Fiber (R3F) | 3D scene as React components |
| @react-three/drei | Helpers: Environment, Html, useGLTF, Instances, CameraControls |
| @react-three/postprocessing | Bloom (chandeliers/candles), DepthOfField, Vignette |
| Three.js | Underlying 3D engine |
| GSAP | Camera fly-through animations between zones |
| Zustand | Global state: currentZone, isLoading, isMuted, formData |
| Tailwind CSS | 2D UI overlay styling |
| @gltf-transform/core + Draco | GLTF model compression |

---

## Color Tokens

```js
const colors = {
  crimson:  '#C41230',   // stage backdrop, carpet
  gold:     '#D4AF37',   // accents, candelabras, orbs, UI highlights
  ivory:    '#FFFFF0',   // floral wall base, throne, ceiling
  walnut:   '#4A3728',   // side wall wood panels
  marble:   '#F5F5F0',   // floor tiles
  charcoal: '#1A1A1A',   // overlay panel backgrounds (80% opacity)
}
```

---

## The 3D Hall — Faithful Recreation

Based on the actual venue videos. All measurements are approximate ratios; exact values tuned during implementation.

### Floor
- White marble tile with subtle vein texture (PBR material)
- Reflective surface (MeshStandardMaterial, roughness 0.1, metalness 0.05)
- Central aisle: deep red patterned carpet runner from entrance to stage steps
- Aisle bordered by white floral garland strips (instanced flower geometry)

### Ceiling
- White coffered ceiling with rectangular recessed panels
- LED strip lights running along panel edges (emissive white, low intensity)
- Ceiling height: ~6 units (relative scale)

### Walls
- Side walls: off-white base with vertical dark walnut wood panels, evenly spaced
- Warm LED strip accent lighting between wood panels (emissive amber)
- Left wall: large LED display screen (emissive texture, shows couple photo slideshow)
- Back wall: solid crimson red, full width, full height — stage backdrop

### Stage
- Elevated platform (~0.5 units high), white marble surface
- **Floral wall:** full-width cascading flower arrangement — deep crimson at bottom, fading to pure white at top. Implemented as instanced sphere geometry (flowers) with gradient color attribute
- **Central hanging piece:** large circular floral chandelier above center stage (white flowers, crystal drops)
- **Royal throne/sofa:** white with ornate silver frame, center stage. GLTF model or procedural geometry
- **Candelabras × 4:** tall gold floor candelabras flanking throne. Point lights with flickering animation
- **Stage steps:** white marble, full width

### Chandeliers × 4
- Hung in a row down the ceiling center line
- Crystal geometry: many small BoxGeometry pieces arranged radially
- Each chandelier has a PointLight child (warm white, intensity 2, distance 8)
- Bloom post-processing applied to chandelier lights
- Subtle idle sway animation (sin wave on rotation.z, period ~4s)

### Seating
- White chairs with gold sash, arranged in rows either side of the aisle
- Implemented as InstancedMesh for performance (one draw call for all chairs)
- ~200 chairs total in the scene
- Soft shadow casting on marble floor

### Particles
- **Rose petals:** 300 small pink/red plane geometries drifting down from ceiling, random XZ start positions, looping
- **Stage glitter:** 500 tiny gold points above the floral wall, slow shimmer animation

---

## Zone Map & Camera Positions

8 zones. Each zone has a fixed camera position + target, content type, and a navigation orb position.

| # | Zone Name | Camera Position | Look At | Content |
|---|-----------|----------------|---------|---------|
| 1 | Entrance | `[0, 2, 18]` | `[0, 2, 0]` | Hero: hall name, tagline, "Begin Your Journey" CTA |
| 2 | Mid-Aisle | `[0, 2.5, 10]` | `[0, 2, 0]` | About: hall story, capacity (500 guests), location, year established |
| 3 | Left Side | `[-6, 3, 4]` | `[0, 2, -2]` | Gallery: 12 wedding photos as floating 3D frames on left wall |
| 4 | Right Side | `[6, 3, 4]` | `[0, 2, -2]` | Packages: 3 package cards floating in 3D (Silver, Gold, Royal) |
| 5 | Stage Approach | `[0, 2.5, 1]` | `[0, 3, -8]` | Testimonials: couple quotes appear as floating golden scrolls near stage |
| 6 | Stage Close-up | `[0, 3, -4]` | `[0, 4, -8]` | FAQ: 6 questions appear as golden scroll items overlaid on floral wall |
| 7 | Overhead | `[0, 12, 2]` | `[0, 0, -2]` | Blog: 3 article cards arranged on floor below, visible from above |
| 8 | Side Desk | `[-8, 2, 6]` | `[0, 2, 0]` | Enquiry Form: full panel slides in |

### Navigation Orbs
- Gold glowing sphere (radius 0.15), emissive gold material with bloom
- Float animation: gentle bob (sin wave, amplitude 0.1, period 2s)
- Hover: scale to 1.3, show zone label tooltip
- Click: trigger camera transition to that zone

### Camera Transitions
- GSAP timeline, duration 1.5s, ease: `power2.inOut`
- Animate `camera.position` and `controls.target` simultaneously
- During transition: disable orb raycasting, show subtle motion blur

---

## UI Layer (2D Overlays)

### Loading Screen
- Full-screen dark overlay
- Animated gold mandala SVG (CSS rotation animation)
- Hall name in large serif font
- Progress bar in gold
- "Preparing your royal experience..." tagline
- Unmounts when R3F `useProgress` reports 100%

### Zone Content Panel
- Slides in from right (transform translateX animation, 0.4s ease)
- Semi-transparent dark background (rgba(26,26,26,0.85)), backdrop-blur
- Gold top border accent
- Close button (×) returns camera to previous zone
- Content varies per zone (see Zone Map above)

### Mini-Map
- Fixed top-right corner, 140×100px
- Simplified SVG floor plan: rectangle with aisle line, stage rectangle, 8 zone dots
- Current zone dot highlighted gold, others white
- Click any dot to fly to that zone
- Semi-transparent dark background

### Enquiry Form (Zone 8)
- Fields: Full Name, Phone Number, Event Date (date picker), Number of Guests, Message
- Gold "Submit Enquiry" button
- On submit: `mailto:` fallback by default — form data encoded into a `mailto:` link that opens the client's email client. No backend required. Can be upgraded to a serverless function later.
- Success state: "Thank you! We'll contact you within 24 hours." with gold checkmark

### Sound Toggle
- Fixed bottom-right, gold speaker icon
- Toggles ambient Indian classical/shehnai background music (Web Audio API)
- Default: muted (autoplay policy compliance)
- Music: looping ambient track, volume 0.3

---

## Performance Strategy

| Challenge | Solution |
|-----------|---------|
| 200 chairs | `InstancedMesh` — single draw call |
| Rose petals (300) | `Points` geometry or instanced planes |
| GLTF models | Draco compression, lazy load per zone |
| Textures | KTX2 format, max 1024×1024 for secondary, 2048 for stage |
| Mobile | Detect `isMobile`, reduce particle count to 50, disable postprocessing, static camera start |
| Initial load | Show loading screen, preload only Zone 1 assets first, stream rest |

---

## File Structure

```
/
├── public/
│   ├── models/          GLTF models (throne, candelabra, chandelier)
│   ├── textures/        PBR texture maps
│   ├── audio/           ambient.mp3
│   └── images/          gallery photos, blog thumbnails
├── src/
│   ├── components/
│   │   ├── Scene/
│   │   │   ├── Scene.jsx          R3F Canvas + postprocessing
│   │   │   └── Environment.jsx    lighting, fog, environment map
│   │   ├── Hall/
│   │   │   ├── Floor.jsx
│   │   │   ├── Ceiling.jsx
│   │   │   ├── Walls.jsx
│   │   │   └── WoodPanels.jsx
│   │   ├── Stage/
│   │   │   ├── Stage.jsx          platform + steps
│   │   │   ├── FloralWall.jsx     instanced flower geometry
│   │   │   ├── Throne.jsx
│   │   │   └── Candelabras.jsx
│   │   ├── Chandeliers/
│   │   │   └── Chandelier.jsx     reused × 4 with position prop
│   │   ├── Seating/
│   │   │   ├── ChairRows.jsx      InstancedMesh
│   │   │   └── Aisle.jsx          carpet + garland borders
│   │   ├── Particles/
│   │   │   ├── RosePetals.jsx
│   │   │   └── StageGlitter.jsx
│   │   ├── Navigation/
│   │   │   ├── NavigationOrb.jsx  single orb component
│   │   │   ├── OrbManager.jsx     renders all 8 orbs
│   │   │   └── CameraController.jsx  GSAP zone transitions
│   │   └── UI/
│   │       ├── LoadingScreen.jsx
│   │       ├── MiniMap.jsx
│   │       ├── ZonePanel.jsx      per-zone content wrapper
│   │       ├── EnquiryForm.jsx
│   │       └── SoundToggle.jsx
│   ├── zones/
│   │   ├── HeroZone.jsx
│   │   ├── AboutZone.jsx
│   │   ├── GalleryZone.jsx
│   │   ├── PackagesZone.jsx
│   │   ├── TestimonialsZone.jsx
│   │   ├── FAQZone.jsx
│   │   ├── BlogZone.jsx
│   │   └── EnquiryZone.jsx
│   ├── store/
│   │   └── useStore.js            Zustand store
│   ├── data/
│   │   ├── zones.js               zone config (positions, content)
│   │   ├── packages.js
│   │   ├── testimonials.js
│   │   ├── faq.js
│   │   └── blog.js
│   ├── hooks/
│   │   └── useCameraTransition.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Data Content (Placeholder — to be replaced by client)

### Packages
- **Silver** — Up to 200 guests, basic floral décor, 8 hours, ₹[client to provide]
- **Gold** — Up to 350 guests, premium floral décor, catering coordination, 12 hours, ₹[client to provide]
- **Royal** — Up to 500 guests, full décor, catering, AV system, bridal room, 16 hours, ₹[client to provide]

### Testimonials (3)
- Couple name, wedding date, short quote, star rating

### FAQ (6 questions)
- Capacity? Parking? Catering policy? Decoration restrictions? Advance booking? Outside vendors?

### Blog (3 articles)
- Wedding planning tips, décor trends, venue highlights

---

## Constraints & Non-Goals

- **No payment processing** — enquiry form only, no online booking with payment
- **No user accounts** — no login, no dashboard
- **No CMS** — content is hardcoded in data files; client updates via code
- **No SSR** — pure client-side SPA (Vite)
- **Mobile:** On screens < 768px width, the 3D scene renders as a static overhead view of the hall (no camera fly-through). Content sections become a vertical scroll below the static 3D hero. Particles disabled. Postprocessing disabled.

---

## Success Criteria

1. Hall loads in under 5 seconds on a modern desktop with good connection
2. Camera transitions between all 8 zones without visual glitches
3. All 8 website sections are accessible and readable
4. Enquiry form submits successfully
5. Rose petals, chandelier glow, and stage sparkle visible and performant (>40fps desktop)
6. Mobile users see a usable (if simplified) experience
