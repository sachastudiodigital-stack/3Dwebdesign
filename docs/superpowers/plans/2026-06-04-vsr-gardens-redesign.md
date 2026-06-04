# VSR Gardens Cinematic Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing React Three Fiber 3D site with a cinematic scroll-based luxury wedding venue website for VSR Gardens, Warangal, using the client's real venue videos throughout.

**Architecture:** Single-page React app. Full-width stacked sections. Framer Motion `useInView` triggers fade-up animations as sections enter viewport. Three real venue MP4s autoplay as backgrounds. No 3D, no WebGL.

**Tech Stack:** Vite 8 + React 18, Framer Motion, Tailwind CSS v4, Zustand, Vitest + Testing Library. Removes: Three.js, R3F, drei, postprocessing, GSAP.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `public/videos/hall-hero.mp4` | Create (copy) | Hero fullscreen background video |
| `public/videos/hall-about.mp4` | Create (copy) | About section right-side video |
| `public/videos/hall-gallery.mp4` | Create (copy) | Gallery feature clip |
| `public/images/gallery/gallery-1.jpg` … `gallery-9.jpg` | Create (ffmpeg) | Gallery grid stills |
| `index.html` | Modify | Add Google Fonts, update title |
| `src/index.css` | Rewrite | New color tokens, body scroll, fonts |
| `src/store/useStore.js` | Rewrite | Strip 3D state, keep only enquiry form state |
| `src/data/content.js` | Rewrite | VSR Gardens packages, testimonials, FAQs, blogs, amenities |
| `src/hooks/useScrollNavbar.js` | Create | Returns `isScrolled` boolean (window.scrollY > 80) |
| `src/components/Navbar.jsx` | Create | Fixed navbar, transparent→dark on scroll, hamburger mobile |
| `src/components/HeroSection.jsx` | Create | Fullscreen video hero, two CTA buttons |
| `src/components/AboutSection.jsx` | Create | Two-col: text+stats left, video right |
| `src/components/GallerySection.jsx` | Create | Full-width video + 3×3 image grid |
| `src/components/PackagesSection.jsx` | Create | 3 package cards |
| `src/components/TestimonialsSection.jsx` | Create | 3 quote cards |
| `src/components/AmenitiesSection.jsx` | Create | 10-item icon grid |
| `src/components/FAQSection.jsx` | Create | Accordion, 6 questions |
| `src/components/BlogSection.jsx` | Create | 3 article cards |
| `src/components/ContactSection.jsx` | Create | Enquiry form + address + map |
| `src/components/Footer.jsx` | Create | Logo, nav links, copyright |
| `src/components/FAQSection.test.jsx` | Create | Accordion open/close tests |
| `src/components/ContactSection.test.jsx` | Create | Form validation + mailto tests |
| `src/App.jsx` | Rewrite | Assemble all sections, remove all 3D imports |
| `src/hooks/useCameraTransition.js` | Delete | No longer needed |
| `src/hooks/useCameraTransition.test.js` | Delete | No longer needed |
| `src/hooks/useIsMobile.js` | Delete | Replaced by CSS responsive |
| `src/zones/` (entire directory) | Delete | No longer needed |
| `src/components/Scene/`, `Hall/`, `Stage/`, `Chandeliers/`, `Seating/`, `Particles/`, `Navigation/` | Delete | All 3D components removed |
| `src/components/UI/` (old) | Delete | LoadingScreen, MiniMap, ZonePanel, SoundToggle replaced |
| `vite.config.js` | Modify | Remove rolldown manual chunks (not needed without 3D) |
| `package.json` | Modify | Remove 3D deps, add framer-motion |

---

## Task 1: Copy videos and extract gallery stills

**Files:**
- Create: `public/videos/hall-hero.mp4`
- Create: `public/videos/hall-about.mp4`
- Create: `public/videos/hall-gallery.mp4`
- Create: `public/images/gallery/gallery-1.jpg` through `gallery-9.jpg`

- [ ] **Step 1: Create public directories**

```bash
mkdir -p /home/user/3Dwebdesign/public/videos
mkdir -p /home/user/3Dwebdesign/public/images/gallery
```

- [ ] **Step 2: Copy and rename the 3 uploaded videos**

Source files are at `/root/.claude/uploads/d9c32499-5729-46f9-b8dd-2997ff48a35d/`

```bash
cp "/root/.claude/uploads/d9c32499-5729-46f9-b8dd-2997ff48a35d/e0bd39fa-WhatsApp_Video_20260601_at_5.11.06_PM.mp4" \
   /home/user/3Dwebdesign/public/videos/hall-hero.mp4

cp "/root/.claude/uploads/d9c32499-5729-46f9-b8dd-2997ff48a35d/5b1f8a85-WhatsApp_Video_20260601_at_5.09.29_PM.mp4" \
   /home/user/3Dwebdesign/public/videos/hall-about.mp4

cp "/root/.claude/uploads/d9c32499-5729-46f9-b8dd-2997ff48a35d/4cb53694-WhatsApp_Video_20260601_at_5.09.03_PM_1.mp4" \
   /home/user/3Dwebdesign/public/videos/hall-gallery.mp4
```

- [ ] **Step 3: Verify videos copied**

```bash
ls -lh /home/user/3Dwebdesign/public/videos/
```
Expected: 3 files, each 1.7–2.2 MB

- [ ] **Step 4: Extract 3 stills from each video using python3 + OpenCV**

```python
# Run as: python3 /tmp/extract_stills.py
import cv2, os

videos = [
    ('/home/user/3Dwebdesign/public/videos/hall-hero.mp4', [0.2, 0.5, 0.8]),
    ('/home/user/3Dwebdesign/public/videos/hall-about.mp4', [0.2, 0.5, 0.8]),
    ('/home/user/3Dwebdesign/public/videos/hall-gallery.mp4', [0.2, 0.5, 0.8]),
]

out_dir = '/home/user/3Dwebdesign/public/images/gallery'
idx = 1

for path, positions in videos:
    cap = cv2.VideoCapture(path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    for pos in positions:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(total * pos))
        ret, frame = cap.read()
        if ret:
            cv2.imwrite(f'{out_dir}/gallery-{idx}.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 90])
            print(f'Saved gallery-{idx}.jpg')
            idx += 1
    cap.release()
```

Save and run:
```bash
cat > /tmp/extract_stills.py << 'PYEOF'
import cv2, os
videos = [
    ('/home/user/3Dwebdesign/public/videos/hall-hero.mp4', [0.2, 0.5, 0.8]),
    ('/home/user/3Dwebdesign/public/videos/hall-about.mp4', [0.2, 0.5, 0.8]),
    ('/home/user/3Dwebdesign/public/videos/hall-gallery.mp4', [0.2, 0.5, 0.8]),
]
out_dir = '/home/user/3Dwebdesign/public/images/gallery'
idx = 1
for path, positions in videos:
    cap = cv2.VideoCapture(path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    for pos in positions:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(total * pos))
        ret, frame = cap.read()
        if ret:
            cv2.imwrite(f'{out_dir}/gallery-{idx}.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 90])
            print(f'Saved gallery-{idx}.jpg')
            idx += 1
    cap.release()
PYEOF
python3 /tmp/extract_stills.py
```

- [ ] **Step 5: Verify 9 images extracted**

```bash
ls -lh /home/user/3Dwebdesign/public/images/gallery/
```
Expected: 9 files named `gallery-1.jpg` through `gallery-9.jpg`

- [ ] **Step 6: Commit**

```bash
cd /home/user/3Dwebdesign
git add public/
git commit -m "feat: add venue videos and gallery stills to public assets"
```

---

## Task 2: Update dependencies and config

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Modify: `index.html`

- [ ] **Step 1: Install framer-motion**

```bash
cd /home/user/3Dwebdesign
npm install framer-motion
```

- [ ] **Step 2: Remove 3D dependencies**

```bash
npm uninstall three @react-three/fiber @react-three/drei @react-three/postprocessing gsap
```

- [ ] **Step 3: Update vite.config.js — remove manual chunks (no longer needed)**

Replace the full content of `vite.config.js`:

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

- [ ] **Step 4: Update index.html — add Google Fonts + correct title**

Replace the full content of `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VSR Gardens — Wedding Venue in Warangal</title>
    <meta name="description" content="VSR Gardens — Warangal's premier marriage function hall. Spacious, elegant, and professional venue for weddings, receptions, and all celebrations." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Rewrite src/index.css**

Replace the full content of `src/index.css`:

```css
@import "tailwindcss";

:root {
  --black: #0a0a0a;
  --dark-card: #111111;
  --border: #2a2a2a;
  --gold: #C9A027;
  --gold-light: #D4AF37;
  --white: #F5F5F0;
  --muted: #888888;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--black);
  color: var(--white);
  font-family: var(--font-sans);
  overflow-x: hidden;
}

#root {
  width: 100%;
  min-height: 100vh;
}

h1, h2, h3 {
  font-family: var(--font-serif);
}

.section-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: var(--white);
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.btn-gold {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--gold);
  color: #0a0a0a;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  text-decoration: none;
}

.btn-gold:hover {
  background: var(--gold-light);
}

.btn-outline {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: transparent;
  color: var(--gold);
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  border: 1px solid var(--gold);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-outline:hover {
  background: var(--gold);
  color: #0a0a0a;
}
```

- [ ] **Step 6: Verify build still passes (will fail on 3D imports — expected)**

```bash
npm run build 2>&1 | head -20
```

Expected: errors about missing three/r3f modules (fine — we'll delete those files in later tasks)

- [ ] **Step 7: Commit**

```bash
git add package.json vite.config.js index.html src/index.css
git commit -m "feat: swap deps — remove 3D libs, add framer-motion, add Google Fonts"
```

---

## Task 3: Rewrite store and content data

**Files:**
- Rewrite: `src/store/useStore.js`
- Rewrite: `src/data/content.js`

No tests needed — pure data, tested indirectly via component tests.

- [ ] **Step 1: Rewrite src/store/useStore.js — enquiry form state only**

```js
import { create } from 'zustand'

const useStore = create((set) => ({
  form: { name: '', phone: '', date: '', guests: '', message: '' },
  submitted: false,
  setField: (field, value) => set((state) => ({ form: { ...state.form, [field]: value } })),
  setSubmitted: (val) => set({ submitted: val }),
  resetForm: () => set({ form: { name: '', phone: '', date: '', guests: '', message: '' }, submitted: false }),
}))

export default useStore
```

- [ ] **Step 2: Rewrite src/data/content.js — full VSR Gardens content**

```js
export const packages = [
  {
    id: 'silver',
    name: 'Silver',
    guests: 200,
    hours: 8,
    price: 'Contact for Pricing',
    featured: false,
    features: [
      'Up to 200 guests',
      'Basic floral décor',
      'Standard lighting',
      'Seating arrangement',
      'Parking for 50 cars',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    guests: 350,
    hours: 12,
    price: 'Contact for Pricing',
    featured: true,
    features: [
      'Up to 350 guests',
      'Premium floral décor',
      'Catering coordination',
      'AV system included',
      'Parking for 100 cars',
    ],
  },
  {
    id: 'royal',
    name: 'Royal',
    guests: 500,
    hours: 16,
    price: 'Contact for Pricing',
    featured: false,
    features: [
      'Up to 500 guests',
      'Full luxury décor',
      'Catering included',
      'AV + LED screen',
      'Bridal room',
      'Valet parking',
    ],
  },
]

export const testimonials = [
  {
    id: 1,
    quote: 'The place looks elegant and can accommodate a large number of people. Highly recommend for any wedding!',
    name: 'Ravi & Priya',
    event: 'Wedding, 2025',
    stars: 5,
  },
  {
    id: 2,
    quote: 'Good management and ambience. The team was very professional and helpful throughout our reception.',
    name: 'Suresh K.',
    event: 'Reception, 2025',
    stars: 5,
  },
  {
    id: 3,
    quote: 'Very spacious and very neat. Perfect venue for a large wedding. We loved every single moment.',
    name: 'Meera & Arjun',
    event: 'Engagement, 2024',
    stars: 5,
  },
]

export const faqs = [
  {
    q: 'What is the maximum guest capacity?',
    a: 'VSR Gardens comfortably accommodates up to 500 guests with full seating arrangements.',
  },
  {
    q: 'Is parking available?',
    a: 'Yes, we have ample parking for 100+ vehicles, with valet parking available in the Royal package.',
  },
  {
    q: 'Can we bring our own caterer?',
    a: 'Outside caterers are welcome with a nominal kitchen usage fee. We also offer in-house catering coordination.',
  },
  {
    q: 'Are there decoration restrictions?',
    a: 'We allow all traditional and modern decorations. We only restrict use of open flames outside designated areas.',
  },
  {
    q: 'How far in advance should we book?',
    a: 'We recommend booking at least 6–12 months in advance, especially for peak wedding season (October–February).',
  },
  {
    q: 'Can we use outside vendors (photographers, florists, DJ)?',
    a: 'Yes, outside vendors are welcome with prior approval and compliance with our venue guidelines.',
  },
]

export const amenities = [
  { icon: '🏛', label: 'Spacious Hall' },
  { icon: '🚗', label: 'Ample Parking' },
  { icon: '💐', label: 'Bridal Room' },
  { icon: '🍽', label: 'Catering Support' },
  { icon: '🎵', label: 'AV System' },
  { icon: '⏰', label: 'Open 24 Hours' },
  { icon: '✨', label: 'Elegant Ambience' },
  { icon: '🧹', label: 'Immaculate Cleanliness' },
  { icon: '👔', label: 'Professional Staff' },
  { icon: '📍', label: 'Prime Location' },
]

export const blogs = [
  {
    id: 1,
    title: '10 Tips for Planning Your Dream Telugu Wedding',
    excerpt: 'From choosing the right venue to coordinating with vendors — everything you need to know for a perfect Telugu wedding.',
    date: 'May 2026',
    icon: '💒',
  },
  {
    id: 2,
    title: 'Top Wedding Décor Trends for 2026',
    excerpt: 'Floral walls, crystal chandeliers, and crimson-gold palettes are dominating this wedding season in Telangana.',
    date: 'April 2026',
    icon: '🌸',
  },
  {
    id: 3,
    title: "Why VSR Gardens is Warangal's Most Sought-After Venue",
    excerpt: 'A behind-the-scenes look at what makes VSR Gardens the top choice for weddings and celebrations in Warangal.',
    date: 'March 2026',
    icon: '⭐',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/store/useStore.js src/data/content.js
git commit -m "feat: rewrite store and content data for VSR Gardens"
```

---

## Task 4: Create animation utilities and useScrollNavbar hook

**Files:**
- Create: `src/hooks/useScrollNavbar.js`
- Create: `src/utils/animations.js`

- [ ] **Step 1: Create src/hooks/useScrollNavbar.js**

```js
import { useState, useEffect } from 'react'

export default function useScrollNavbar(threshold = 80) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return isScrolled
}
```

- [ ] **Step 2: Create src/utils/animations.js**

```js
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useScrollNavbar.js src/utils/animations.js
git commit -m "feat: add scroll navbar hook and shared animation variants"
```

---

## Task 5: Build Navbar component

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: Create src/components/Navbar.jsx**

```jsx
import { useState } from 'react'
import useScrollNavbar from '../hooks/useScrollNavbar'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const isScrolled = useScrollNavbar()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isScrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        borderBottom: isScrolled ? '1px solid #2a2a2a' : 'none',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--gold)',
          textDecoration: 'none',
          letterSpacing: '0.05em',
        }}
      >
        VSR Gardens
      </a>

      {/* Desktop nav links */}
      <ul
        style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          alignItems: 'center',
        }}
        className="hidden-mobile"
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                color: 'var(--white)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                opacity: 0.85,
                transition: 'color 0.2s, opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.color = 'var(--gold)'; e.target.style.opacity = '1' }}
              onMouseLeave={(e) => { e.target.style.color = 'var(--white)'; e.target.style.opacity = '0.85' }}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="btn-gold" style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}>
            Enquire Now
          </a>
        </li>
      </ul>

      {/* Hamburger button (mobile) */}
      <button
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--white)',
          cursor: 'pointer',
          fontSize: '1.5rem',
        }}
        className="show-mobile"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10,10,10,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            zIndex: 200,
          }}
        >
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              color: 'var(--white)',
              fontSize: '1.8rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
          {[...links, { label: 'Enquire Now', href: '#contact' }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: 'var(--white)',
                textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
```

- [ ] **Step 2: Add mobile responsive CSS to src/index.css**

Append to `src/index.css`:

```css
@media (max-width: 768px) {
  .hidden-mobile { display: none !important; }
  .show-mobile { display: block !important; }
}
@media (min-width: 769px) {
  .show-mobile { display: none !important; }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx src/index.css
git commit -m "feat: add Navbar with scroll transparency and mobile hamburger menu"
```

---

## Task 6: Build HeroSection

**Files:**
- Create: `src/components/HeroSection.jsx`

- [ ] **Step 1: Create src/components/HeroSection.jsx**

```jsx
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/videos/hall-hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '800px',
        }}
      >
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>
          Warangal&apos;s Premier Wedding Venue
        </p>

        <h1
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            color: 'var(--white)',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          VSR Gardens
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(245,245,240,0.8)',
            letterSpacing: '0.05em',
            fontWeight: 300,
            marginBottom: '2.5rem',
          }}
        >
          Where Every Celebration Becomes a Memory
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#about" className="btn-outline">Explore Venue</a>
          <a href="#contact" className="btn-gold">Enquire Now</a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'var(--gold)',
          fontSize: '1.5rem',
          opacity: 0.7,
        }}
      >
        ↓
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.jsx
git commit -m "feat: add HeroSection with fullscreen video background and animated entrance"
```

---

## Task 7: Build AboutSection

**Files:**
- Create: `src/components/AboutSection.jsx`

- [ ] **Step 1: Create src/components/AboutSection.jsx**

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'

const stats = [
  { icon: '🏛', value: '500+', label: 'Guests Capacity' },
  { icon: '⏰', value: '24 Hrs', label: 'Open Always' },
  { icon: '✨', value: 'Premium', label: 'Ambience' },
  { icon: '📍', value: 'Warangal', label: 'Telangana' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'var(--black)',
        padding: '6rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Left: text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.p variants={fadeUp} className="section-label">About Us</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            A Venue Built for Your Most Special Day
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              color: 'var(--muted)',
              lineHeight: 1.8,
              marginBottom: '1rem',
              fontSize: '1rem',
            }}
          >
            VSR Gardens is Warangal&apos;s most sought-after marriage function hall, designed to turn
            your celebrations into lifelong memories. Our spacious, elegantly maintained venue
            accommodates up to 500 guests in comfort and style.
          </motion.p>
          <motion.p
            variants={fadeUp}
            style={{
              color: 'var(--muted)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              fontSize: '1rem',
            }}
          >
            From weddings and receptions to engagements and corporate events, our professional team
            ensures every detail is perfect — so you can focus entirely on your celebration.
          </motion.p>

          {/* Stats grid */}
          <motion.div
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                style={{
                  background: 'var(--dark-card)',
                  border: '1px solid var(--border)',
                  borderTop: '2px solid var(--gold)',
                  padding: '1.25rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--gold)', fontWeight: 600 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem', letterSpacing: '0.05em' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            position: 'relative',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid var(--gold)',
            aspectRatio: '9/16',
            maxHeight: '560px',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src="/videos/hall-about.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add about-grid responsive CSS to src/index.css**

Append to `src/index.css`:

```css
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr !important;
  }
  .about-grid > *:nth-child(2) {
    order: -1;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutSection.jsx src/index.css
git commit -m "feat: add AboutSection with stats grid and venue video"
```

---

## Task 8: Build GallerySection

**Files:**
- Create: `src/components/GallerySection.jsx`

- [ ] **Step 1: Create src/components/GallerySection.jsx**

```jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'

const images = Array.from({ length: 9 }, (_, i) => `/images/gallery/gallery-${i + 1}.jpg`)

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(null)

  return (
    <section
      id="gallery"
      ref={ref}
      style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-label"
          style={{ textAlign: 'center' }}
        >
          Gallery
        </motion.p>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-title"
          style={{ textAlign: 'center' }}
        >
          The Venue
        </motion.h2>

        {/* Full-width video clip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            width: '100%',
            maxHeight: '400px',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid var(--border)',
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
          >
            <source src="/videos/hall-gallery.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* 3×3 image grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
          }}
          className="gallery-grid"
        >
          {images.map((src, i) => (
            <motion.div
              key={src}
              variants={fadeUp}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                cursor: 'pointer',
                border: hovered === i ? '1px solid var(--gold)' : '1px solid transparent',
                transition: 'border-color 0.2s',
              }}
            >
              <img
                src={src}
                alt={`VSR Gardens venue ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transform: hovered === i ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.4s ease',
                }}
              />
              {hovered === i && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(201,160,39,0.15)',
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginTop: '1.5rem', letterSpacing: '0.1em' }}>
          Hunter Road, Ramannapet, Warangal
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add gallery-grid responsive CSS to src/index.css**

Append to `src/index.css`:

```css
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/GallerySection.jsx src/index.css
git commit -m "feat: add GallerySection with feature video and 3x3 image grid"
```

---

## Task 9: Build PackagesSection and TestimonialsSection

**Files:**
- Create: `src/components/PackagesSection.jsx`
- Create: `src/components/TestimonialsSection.jsx`

- [ ] **Step 1: Create src/components/PackagesSection.jsx**

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { packages } from '../data/content'

export default function PackagesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="packages"
      ref={ref}
      style={{ background: 'var(--black)', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>
          Our Packages
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Choose Your Celebration
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="packages-grid"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={fadeUp}
              style={{
                background: 'var(--dark-card)',
                border: pkg.featured ? '1px solid var(--gold)' : '1px solid var(--border)',
                borderTop: '3px solid var(--gold)',
                padding: '2rem',
                position: 'relative',
                boxShadow: pkg.featured ? '0 0 30px rgba(201,160,39,0.15)' : 'none',
              }}
            >
              {pkg.featured && (
                <div style={{
                  position: 'absolute',
                  top: '-1px',
                  right: '1.5rem',
                  background: 'var(--gold)',
                  color: '#0a0a0a',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  padding: '0.25rem 0.75rem',
                }}>
                  POPULAR
                </div>
              )}

              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.6rem',
                color: 'var(--gold)',
                marginBottom: '0.5rem',
              }}>
                {pkg.name}
              </h3>

              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Up to {pkg.guests} guests · {pkg.hours} hours
              </p>

              <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                {pkg.features.map((f) => (
                  <li key={f} style={{
                    color: 'var(--white)',
                    fontSize: '0.9rem',
                    padding: '0.4rem 0',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                color: 'var(--muted)',
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}>
                {pkg.price}
              </p>

              <a href="#contact" className={pkg.featured ? 'btn-gold' : 'btn-outline'}
                style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                Enquire Now
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create src/components/TestimonialsSection.jsx**

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { testimonials } from '../data/content'

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>
          Testimonials
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          What Couples Say
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="testimonials-grid"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              style={{
                background: 'var(--black)',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--gold)',
                padding: '2rem',
              }}
            >
              <div style={{ color: 'var(--gold)', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                {'★'.repeat(t.stars)}
              </div>
              <p style={{
                color: 'var(--white)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{t.event}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add responsive CSS to src/index.css**

Append to `src/index.css`:

```css
@media (max-width: 768px) {
  .packages-grid,
  .testimonials-grid {
    grid-template-columns: 1fr !important;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/PackagesSection.jsx src/components/TestimonialsSection.jsx src/index.css
git commit -m "feat: add PackagesSection and TestimonialsSection with scroll animations"
```

---

## Task 10: Build AmenitiesSection and BlogSection

**Files:**
- Create: `src/components/AmenitiesSection.jsx`
- Create: `src/components/BlogSection.jsx`

- [ ] **Step 1: Create src/components/AmenitiesSection.jsx**

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { amenities } from '../data/content'

export default function AmenitiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{ background: 'var(--black)', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>
          Amenities
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Venue Highlights
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem',
          }}
          className="amenities-grid"
        >
          {amenities.map((a) => (
            <motion.div
              key={a.label}
              variants={fadeUp}
              style={{
                background: 'var(--dark-card)',
                border: '1px solid var(--border)',
                padding: '1.75rem 1rem',
                textAlign: 'center',
                transition: 'border-color 0.2s',
              }}
              whileHover={{ borderColor: 'var(--gold)' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{a.icon}</div>
              <p style={{ color: 'var(--white)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.03em' }}>
                {a.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create src/components/BlogSection.jsx**

```jsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { blogs } from '../data/content'

export default function BlogSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>
          Blog
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Wedding Insights
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="blog-grid"
        >
          {blogs.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeUp}
              style={{
                background: 'var(--black)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <div style={{
                background: 'var(--dark-card)',
                height: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                borderBottom: '1px solid var(--border)',
              }}>
                {post.icon}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                  {post.date}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  color: 'var(--white)',
                  lineHeight: 1.4,
                  marginBottom: '0.75rem',
                }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {post.excerpt}
                </p>
                <a href="#" style={{
                  color: 'var(--gold)',
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  fontWeight: 500,
                }}>
                  Read More →
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add responsive CSS to src/index.css**

Append to `src/index.css`:

```css
@media (max-width: 768px) {
  .amenities-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .blog-grid {
    grid-template-columns: 1fr !important;
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  .amenities-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/AmenitiesSection.jsx src/components/BlogSection.jsx src/index.css
git commit -m "feat: add AmenitiesSection and BlogSection"
```

---

## Task 11: Build FAQSection with tests

**Files:**
- Create: `src/components/FAQSection.jsx`
- Create: `src/components/FAQSection.test.jsx`

- [ ] **Step 1: Write the failing test first**

```jsx
// src/components/FAQSection.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import FAQSection from './FAQSection'

test('renders all 6 FAQ questions', () => {
  render(<FAQSection />)
  expect(screen.getByText(/maximum guest capacity/i)).toBeInTheDocument()
  expect(screen.getByText(/parking available/i)).toBeInTheDocument()
  expect(screen.getByText(/bring our own caterer/i)).toBeInTheDocument()
  expect(screen.getByText(/decoration restrictions/i)).toBeInTheDocument()
  expect(screen.getByText(/how far in advance/i)).toBeInTheDocument()
  expect(screen.getByText(/outside vendors/i)).toBeInTheDocument()
})

test('answers are hidden by default', () => {
  render(<FAQSection />)
  expect(screen.queryByText(/up to 500 guests/i)).not.toBeInTheDocument()
})

test('clicking a question reveals its answer', () => {
  render(<FAQSection />)
  fireEvent.click(screen.getByText(/maximum guest capacity/i))
  expect(screen.getByText(/up to 500 guests/i)).toBeInTheDocument()
})

test('clicking an open question closes it', () => {
  render(<FAQSection />)
  const btn = screen.getByText(/maximum guest capacity/i)
  fireEvent.click(btn)
  expect(screen.getByText(/up to 500 guests/i)).toBeInTheDocument()
  fireEvent.click(btn)
  expect(screen.queryByText(/up to 500 guests/i)).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
cd /home/user/3Dwebdesign && npx vitest run src/components/FAQSection.test.jsx 2>&1 | tail -10
```
Expected: FAIL (FAQSection does not exist)

- [ ] **Step 3: Create src/components/FAQSection.jsx**

```jsx
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { faqs } from '../data/content'

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [open, setOpen] = useState(null)

  return (
    <section
      ref={ref}
      style={{ background: 'var(--black)', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>
          FAQ
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              variants={fadeUp}
              style={{
                border: '1px solid var(--border)',
                borderLeft: open === i ? '3px solid var(--gold)' : '1px solid var(--border)',
                background: 'var(--dark-card)',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'var(--white)',
                  padding: '1.25rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: 'var(--gold)', fontSize: '1rem', flexShrink: 0, marginLeft: '1rem' }}
                >
                  ▾
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      padding: '0 1.5rem 1.25rem',
                      color: 'var(--muted)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                    }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx vitest run src/components/FAQSection.test.jsx 2>&1 | tail -10
```
Expected: 4 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/components/FAQSection.jsx src/components/FAQSection.test.jsx
git commit -m "feat: add FAQSection with animated accordion and tests"
```

---

## Task 12: Build ContactSection with tests

**Files:**
- Create: `src/components/ContactSection.jsx`
- Create: `src/components/ContactSection.test.jsx`

- [ ] **Step 1: Write the failing tests**

```jsx
// src/components/ContactSection.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import ContactSection from './ContactSection'

test('renders all 5 form fields', () => {
  render(<ContactSection />)
  expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/event date/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
})

test('submit button is disabled when name and phone are empty', () => {
  render(<ContactSection />)
  expect(screen.getByRole('button', { name: /submit enquiry/i })).toBeDisabled()
})

test('submit button enables when name and phone are filled', () => {
  render(<ContactSection />)
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { name: 'name', value: 'Ravi' } })
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { name: 'phone', value: '9849555900' } })
  expect(screen.getByRole('button', { name: /submit enquiry/i })).not.toBeDisabled()
})

test('shows success message after submit', () => {
  render(<ContactSection />)
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { name: 'name', value: 'Ravi' } })
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { name: 'phone', value: '9849555900' } })
  fireEvent.click(screen.getByRole('button', { name: /submit enquiry/i }))
  expect(screen.getByText(/thank you/i)).toBeInTheDocument()
  expect(screen.getByText(/within 24 hours/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npx vitest run src/components/ContactSection.test.jsx 2>&1 | tail -10
```

- [ ] **Step 3: Create src/components/ContactSection.jsx**

```jsx
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid #2a2a2a',
  color: '#F5F5F0',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  outline: 'none',
  borderRadius: '1px',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block',
  color: '#C9A027',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '0.4rem',
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const isValid = form.name.trim().length > 0 && form.phone.trim().length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nGuests: ${form.guests}\nMessage: ${form.message}`
    window.location.href = `mailto:vsrgardens@gmail.com?subject=Wedding Enquiry - ${form.name}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>
          Contact
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Plan Your Celebration
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left: form */}
          <motion.div variants={fadeUp}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', color: 'var(--gold)', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                  Thank You!
                </h3>
                <p style={{ color: 'var(--muted)' }}>We&apos;ll contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { label: 'Full Name', name: 'name', type: 'text', required: true },
                  { label: 'Phone Number', name: 'phone', type: 'tel', required: true },
                  { label: 'Event Date', name: 'date', type: 'date', required: false },
                  { label: 'Number of Guests', name: 'guests', type: 'number', required: false },
                ].map(({ label, name, type, required }) => (
                  <div key={name}>
                    <label htmlFor={name} style={labelStyle}>{label}</label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      required={required}
                      value={form[name]}
                      onChange={handleChange}
                      style={inputStyle}
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
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isValid}
                  style={{
                    background: isValid ? 'var(--gold)' : 'rgba(201,160,39,0.3)',
                    color: '#0a0a0a',
                    border: 'none',
                    padding: '1rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: isValid ? 'pointer' : 'not-allowed',
                    transition: 'background 0.2s',
                  }}
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: contact info + map */}
          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.25rem' }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Phone
              </p>
              <a href="tel:+919849555900" style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                color: 'var(--white)',
                textDecoration: 'none',
              }}>
                +91 98495 55900
              </a>
            </div>

            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.25rem' }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Address
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Hunter Road, near HP Petrol Bunk,<br />
                beside Sri Chaitanya School,<br />
                Ramannapet, Warangal,<br />
                Telangana – 506002
              </p>
            </div>

            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.25rem' }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Hours
              </p>
              <p style={{ color: 'var(--white)', fontSize: '0.9rem' }}>Open 24 Hours</p>
            </div>

            {/* Google Maps embed */}
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', height: '220px' }}>
              <iframe
                title="VSR Gardens Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.3!2d79.5941!3d17.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU4JzQyLjIiTiA3OcKwMzUnMzguOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0, display: 'block', filter: 'grayscale(0.8) invert(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npx vitest run src/components/ContactSection.test.jsx 2>&1 | tail -10
```
Expected: 4 tests pass

- [ ] **Step 5: Add responsive CSS to src/index.css**

Append to `src/index.css`:

```css
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ContactSection.jsx src/components/ContactSection.test.jsx src/index.css
git commit -m "feat: add ContactSection with form, address, and map embed + tests"
```

---

## Task 13: Build Footer

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create src/components/Footer.jsx**

```jsx
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid #2a2a2a',
      padding: '3rem 2rem',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.6rem',
        color: 'var(--gold)',
        marginBottom: '0.5rem',
      }}>
        VSR Gardens
      </p>
      <p style={{
        color: 'var(--muted)',
        fontSize: '0.85rem',
        letterSpacing: '0.05em',
        marginBottom: '1.5rem',
        fontStyle: 'italic',
      }}>
        Where Every Celebration Becomes a Memory
      </p>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['#about', '#gallery', '#packages', '#contact'].map((href) => (
          <a
            key={href}
            href={href}
            style={{
              color: 'var(--muted)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.target.style.color = 'var(--gold)' }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--muted)' }}
          >
            {href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)}
          </a>
        ))}
      </div>

      <a href="tel:+919849555900" style={{
        color: 'var(--white)',
        textDecoration: 'none',
        fontSize: '1rem',
        letterSpacing: '0.05em',
        display: 'block',
        marginBottom: '1.5rem',
      }}>
        +91 98495 55900
      </a>

      <p style={{ color: '#444', fontSize: '0.75rem' }}>
        © {year} VSR Gardens. All rights reserved. · Hunter Road, Ramannapet, Warangal, Telangana
      </p>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer with logo, nav links, phone, and copyright"
```

---

## Task 14: Delete all 3D files and rewrite App.jsx

**Files:**
- Delete: `src/components/Chandeliers/`, `src/components/Hall/`, `src/components/Navigation/`, `src/components/Particles/`, `src/components/Scene/`, `src/components/Seating/`, `src/components/Stage/`, `src/components/UI/`
- Delete: `src/zones/` (entire directory)
- Delete: `src/hooks/useCameraTransition.js`, `src/hooks/useCameraTransition.test.js`, `src/hooks/useIsMobile.js`
- Delete: `src/data/zones.js`
- Rewrite: `src/App.jsx`

- [ ] **Step 1: Delete all 3D component directories and old files**

```bash
cd /home/user/3Dwebdesign
rm -rf src/components/Chandeliers
rm -rf src/components/Hall
rm -rf src/components/Navigation
rm -rf src/components/Particles
rm -rf src/components/Scene
rm -rf src/components/Seating
rm -rf src/components/Stage
rm -rf src/components/UI
rm -rf src/zones
rm -f src/hooks/useCameraTransition.js
rm -f src/hooks/useCameraTransition.test.js
rm -f src/hooks/useIsMobile.js
rm -f src/data/zones.js
```

- [ ] **Step 2: Rewrite src/App.jsx**

```jsx
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import GallerySection from './components/GallerySection'
import PackagesSection from './components/PackagesSection'
import TestimonialsSection from './components/TestimonialsSection'
import AmenitiesSection from './components/AmenitiesSection'
import FAQSection from './components/FAQSection'
import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <PackagesSection />
        <TestimonialsSection />
        <AmenitiesSection />
        <FAQSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Run all tests — expect only FAQSection and ContactSection tests to remain**

```bash
npx vitest run 2>&1 | tail -15
```

Expected: FAQSection (4 tests) + ContactSection (4 tests) = 8 tests pass. The old 3D tests are now deleted.

- [ ] **Step 4: Run build — must succeed with no errors**

```bash
npm run build 2>&1 | tail -10
```

Expected: build succeeds, smaller bundle than before

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: delete all 3D components and rewrite App.jsx for VSR Gardens cinematic site"
```

---

## Task 15: Final verification and push

**Files:** None new — verification only

- [ ] **Step 1: Run full test suite**

```bash
npx vitest run --reporter=verbose 2>&1 | tail -20
```
Expected: 8 tests pass (FAQSection × 4, ContactSection × 4)

- [ ] **Step 2: Run production build**

```bash
npm run build 2>&1 | grep -E "dist/|error" | grep -v "Consider\|Adjust"
```
Expected: clean build, total bundle well under 500KB (no Three.js)

- [ ] **Step 3: Start preview server and take screenshot**

```bash
npm run preview -- --host 0.0.0.0 --port 4173 &
sleep 3
node -e "
const { chromium } = require('/opt/node22/lib/node_modules/playwright')
;(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] })
  const p = await b.newPage()
  await p.goto('http://localhost:4173', { waitUntil: 'domcontentloaded', timeout: 15000 })
  await p.waitForTimeout(3000)
  await p.screenshot({ path: '/tmp/vsr-final.png', fullPage: false })
  const errors = []
  p.on('pageerror', e => errors.push(e.message))
  console.log('Screenshot saved. Errors:', errors.length ? errors : 'none')
  await b.close()
})()
"
```

- [ ] **Step 4: Update .gitignore if needed**

Verify `public/videos/` is NOT in .gitignore (videos should be committed):
```bash
cat /home/user/3Dwebdesign/.gitignore
```
Expected: no entry for `public/videos/` or `public/images/`

- [ ] **Step 5: Final commit and push**

```bash
cd /home/user/3Dwebdesign
git add -A
git status  # confirm nothing unexpected
git commit -m "feat: VSR Gardens cinematic website — complete redesign with venue videos" --allow-empty
git push -u origin claude/optimistic-hamilton-6LPno
```
