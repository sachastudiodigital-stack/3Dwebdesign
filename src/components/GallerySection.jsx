import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'

const images = Array.from({ length: 9 }, (_, i) => `/images/gallery/gallery-${i + 1}.jpg`)

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(null)

  return (
    <section id="gallery" ref={ref} style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-label" style={{ textAlign: 'center' }}>Gallery</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-title" style={{ textAlign: 'center' }}>The Venue</motion.h2>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ width: '100%', maxHeight: '400px', overflow: 'hidden', marginBottom: '2rem', border: '1px solid var(--border)' }}>
          <video autoPlay muted loop playsInline style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}>
            <source src="/videos/hall-gallery.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }} className="gallery-grid">
          {images.map((src, i) => (
            <motion.div key={src} variants={fadeUp}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', border: hovered === i ? '1px solid var(--gold)' : '1px solid transparent', transition: 'border-color 0.2s' }}>
              <img src={src} alt={`VSR Gardens venue ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered === i ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.4s ease' }} />
              {hovered === i && <div style={{ position: 'absolute', inset: 0, background: 'rgba(201,160,39,0.15)' }} />}
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
