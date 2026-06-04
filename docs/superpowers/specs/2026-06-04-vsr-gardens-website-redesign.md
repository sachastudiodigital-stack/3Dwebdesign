# VSR Gardens — Cinematic Scroll Website Redesign Spec

**Date:** 2026-06-04
**Status:** Approved

---

## Goal

Replace the existing React Three Fiber 3D hall website with a cinematic, scroll-based luxury wedding venue website for VSR Gardens, Warangal. The site opens with a full-screen video hero and reveals each section as the user scrolls, using the client's real venue videos as backgrounds throughout.

---

## Business Details

| Field | Value |
|-------|-------|
| Business Name | VSR Gardens |
| Type | Marriage Function Hall / Wedding Venue / Event Venue |
| Address | Hunter Road, near HP Petrol Bunk, beside Sri Chaitanya School, Ramannapet, Warangal, Telangana – 506002 |
| Phone | +91 98495 55900 |
| Hours | Open 24 Hours |
| Tagline | Where Every Celebration Becomes a Memory |

---

## Architecture

**Type:** Single-page React application. Scroll-based. All content on one page, no routing.

**Core pattern:** Full-width sections stacked vertically. Framer Motion `useInView` triggers fade-in animations as each section enters the viewport. Videos autoplay muted and loop as backgrounds.

```
App
├── Navbar (fixed, transparent → dark on scroll)
├── HeroSection (fullscreen video, centred text, 2 CTAs)
├── AboutSection (video right, text left, 4 stats)
├── GallerySection (full-width video clip + 3×3 image grid)
├── PackagesSection (3 cards: Silver / Gold / Royal)
├── TestimonialsSection (3 quote cards)
├── AmenitiesSection (icon grid, 10 amenities)
├── FAQSection (accordion, 6 questions)
├── BlogSection (3 article cards)
├── ContactSection (enquiry form + address + Google Maps)
└── Footer
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Vite + React 18 | Build tooling, component framework |
| Framer Motion | Scroll-triggered fade animations, section reveals |
| Tailwind CSS | Utility styling |
| Google Fonts (Playfair Display + Inter) | Serif headings + clean body text |
| Zustand | Enquiry form state |
| HTML5 `<video>` | Autoplay muted looping venue videos |
| Vitest + Testing Library | Unit tests for interactive components |

**Removed from previous build:** React Three Fiber, Three.js, @react-three/drei, @react-three/postprocessing, GSAP. All 3D dependencies stripped.

---

## Color Tokens

```js
const colors = {
  black:    '#0a0a0a',   // page background
  darkCard: '#111111',   // card/section backgrounds
  border:   '#2a2a2a',   // subtle dividers
  gold:     '#C9A027',   // primary accent — headings, borders, CTAs
  goldLight:'#D4AF37',   // hover states, highlights
  white:    '#F5F5F0',   // primary text
  muted:    '#888888',   // secondary text
}
```

---

## Typography

- **Headings:** Playfair Display (Google Font) — serif, elegant, luxury feel
- **Body / UI:** Inter (Google Font) — clean, readable sans-serif
- **Import in index.html:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  ```

---

## Video Assets

Three MP4 files already uploaded — copy to `public/videos/`:

| File | Usage |
|------|-------|
| `WhatsApp_Video_20260601_at_5.11.06_PM.mp4` → `hall-hero.mp4` | Hero section fullscreen background |
| `WhatsApp_Video_20260601_at_5.09.29_PM.mp4` → `hall-about.mp4` | About section right-side video |
| `WhatsApp_Video_20260601_at_5.09.03_PM_1.mp4` → `hall-gallery.mp4` | Gallery section feature clip |

All videos: `autoPlay muted loop playsInline`, `object-fit: cover`.

---

## Animation System

All section content uses Framer Motion with consistent config:

```js
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}
// Used with: useInView({ once: true, margin: '-100px' })
```

- Staggered children: `staggerChildren: 0.15`
- Navbar: transparent at top, transitions to `rgba(10,10,10,0.95)` with backdrop-blur on scroll

---

## Sections — Full Specification

### 1. Navbar
- Fixed top, full width
- Logo left: "VSR Gardens" in Playfair Display gold
- Nav links right: About · Gallery · Packages · Contact
- Background: transparent at hero, dark + backdrop-blur after scrolling 80px
- Mobile: hamburger menu, full-screen dark overlay

### 2. HeroSection
- Full viewport height (`100vh`)
- Background: `<video>` tag with `hall-hero.mp4`, dark overlay (`rgba(0,0,0,0.55)`)
- Centre-aligned content:
  - Small gold label: "WARANGAL'S PREMIER WEDDING VENUE"
  - H1: "VSR Gardens" — Playfair Display, ~5rem, white
  - Tagline: "Where Every Celebration Becomes a Memory" — Inter light, 1.2rem, muted
  - Two buttons side by side:
    - "Explore Venue" — gold border, transparent fill, smooth scroll to #about
    - "Enquire Now" — solid gold fill, black text, scroll to #contact
- Bottom: animated chevron-down icon bouncing

### 3. AboutSection (`id="about"`)
- Two-column layout (text left, video right) on desktop; stacked on mobile
- Left: 
  - Gold label: "ABOUT US"
  - H2: "A Venue Built for Your Most Special Day"
  - 3–4 sentences: spacious, elegant, professional, Warangal's finest
  - 4 stat boxes in a 2×2 grid:
    - 🏛 500+ Guests
    - ⏰ Open 24 Hours
    - ✨ Premium Ambience
    - 📍 Warangal, Telangana
- Right: `<video>` playing `hall-about.mp4`, rounded corners, gold border

### 4. GallerySection (`id="gallery"`)
- Gold label + H2: "The Venue"
- Full-width `<video>` playing `hall-gallery.mp4` at top (max-height 400px)
- Below: 3×3 image grid
  - Images: 9 stills extracted from the videos (use ffmpeg to extract frames → save to `public/images/gallery/`)
  - Each image: dark overlay on hover, gold border appears, subtle scale(1.03)
- Caption: "Hunter Road, Ramannapet, Warangal"

### 5. PackagesSection (`id="packages"`)
- Dark background (#111111)
- Gold label + H2: "Our Packages"
- 3 cards side by side (stack on mobile):

| Package | Guests | Hours | Features | Highlight |
|---------|--------|-------|----------|-----------|
| Silver | Up to 200 | 8 hrs | Basic floral, standard lighting, parking | — |
| Gold | Up to 350 | 12 hrs | Premium floral, catering coordination, AV, parking | ⭐ Featured (gold glow border) |
| Royal | Up to 500 | 16 hrs | Full décor, catering, AV + LED screen, bridal room, valet | — |

- Each card: dark bg, gold top border, price "Contact for Pricing", "Enquire Now" button

### 6. TestimonialsSection
- Full-width section, slightly lighter dark bg (#111)
- Gold label + H2: "What Couples Say"
- 3 quote cards with:
  - Star rating (5 stars, gold)
  - Quote text (from actual customer reviews)
  - Couple/person name + event type

**Content:**
1. "The place looks elegant and can accommodate a large number of people. Highly recommend!" — Ravi & Priya, Wedding 2025
2. "Good management and ambience. The team was very professional and helpful throughout." — Suresh K., Reception 2025
3. "Very spacious and very neat. Perfect venue for a large wedding. We loved every moment." — Meera & Arjun, Engagement 2024

### 7. AmenitiesSection
- Dark background
- Gold label + H2: "Venue Highlights"
- 5-column icon grid (2 rows of 5, wrap on mobile):

| Icon | Label |
|------|-------|
| 🏛 | Spacious Hall |
| 🚗 | Ample Parking |
| 💐 | Bridal Room |
| 🍽 | Catering Support |
| 🎵 | AV System |
| ⏰ | Open 24 Hours |
| ✨ | Elegant Ambience |
| 🧹 | Immaculate Cleanliness |
| 👔 | Professional Staff |
| 📍 | Prime Location |

### 8. FAQSection
- Gold label + H2: "Frequently Asked Questions"
- Accordion (one open at a time), gold chevron icon rotates on open
- 6 questions:
  1. What is the maximum guest capacity? → Up to 500 guests with full seating.
  2. Is parking available? → Yes, ample parking for 100+ vehicles.
  3. Can we bring our own caterer? → Outside caterers welcome with a nominal kitchen usage fee.
  4. Are there decoration restrictions? → All traditional and modern decorations allowed; no open flames outside designated areas.
  5. How far in advance should we book? → 6–12 months in advance recommended for peak season (Oct–Feb).
  6. Can we use outside vendors (photographers, florists, DJ)? → Yes, outside vendors welcome with prior approval.

### 9. BlogSection
- Gold label + H2: "Wedding Insights"
- 3 cards with placeholder images (dark bg with gold icon):
  1. "10 Tips for Planning Your Dream Telugu Wedding" — May 2026
  2. "Top Wedding Décor Trends for 2026" — April 2026
  3. "Why VSR Gardens is Warangal's Most Sought-After Venue" — March 2026
- Each card: image top, title, excerpt, "Read More →" gold link

### 10. ContactSection (`id="contact"`)
- Two-column layout:
- **Left — Enquiry Form:**
  - H2: "Plan Your Celebration"
  - Fields: Full Name, Phone Number, Event Date (date picker), Number of Guests, Message
  - Gold "Submit Enquiry" button
  - mailto fallback: `mailto:vsrgardens@gmail.com` (placeholder — client to update)
  - Success state: "Thank you! We'll contact you within 24 hours. ✓"
- **Right — Contact Info:**
  - Phone: +91 98495 55900 (clickable `tel:` link)
  - Address: Hunter Road, near HP Petrol Bunk, beside Sri Chaitanya School, Ramannapet, Warangal, Telangana – 506002
  - Hours: Open 24 Hours
  - Google Maps iframe embed for the address

### 11. Footer
- Dark background (#0a0a0a)
- Logo + tagline centred
- Nav links row
- "© 2026 VSR Gardens. All rights reserved."
- Phone number

---

## Mobile Responsiveness

- All sections stack vertically on < 768px
- Hero: text scales down, both buttons stack
- About: video below text
- Gallery: 2-column grid (not 3)
- Packages: single column cards
- Amenities: 3 columns
- Navbar: hamburger menu

---

## File Structure

```
/
├── public/
│   ├── videos/
│   │   ├── hall-hero.mp4
│   │   ├── hall-about.mp4
│   │   └── hall-gallery.mp4
│   └── images/
│       └── gallery/
│           ├── gallery-1.jpg  (through gallery-9.jpg — ffmpeg stills)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── GallerySection.jsx
│   │   ├── PackagesSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── AmenitiesSection.jsx
│   │   ├── FAQSection.jsx
│   │   ├── BlogSection.jsx
│   │   ├── ContactSection.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── content.js   (packages, testimonials, faqs, blogs, amenities)
│   ├── hooks/
│   │   └── useScrollNavbar.js
│   ├── store/
│   │   └── useStore.js  (enquiry form state only — strip 3D state)
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html            (add Google Fonts link)
├── vite.config.js
└── package.json
```

---

## Packages to Add / Remove

**Add:**
```bash
npm install framer-motion
```

**Remove (no longer needed):**
```bash
npm uninstall three @react-three/fiber @react-three/drei @react-three/postprocessing gsap
```

---

## Gallery Image Extraction

Extract 9 stills from the 3 videos using ffmpeg (3 per video):
```bash
ffmpeg -i hall-hero.mp4 -vf "select='eq(n,30)+eq(n,90)+eq(n,150)'" -vsync 0 gallery-%d.jpg
```

---

## Success Criteria

1. Site loads in under 3 seconds (no heavy 3D/WebGL)
2. Hero video plays immediately on load (autoplay muted)
3. All 9 sections visible and readable on desktop and mobile
4. Scroll animations trigger smoothly without jank
5. Enquiry form submits via mailto
6. Contact section shows correct VSR Gardens address and phone
7. All 3 venue videos embedded and playing
