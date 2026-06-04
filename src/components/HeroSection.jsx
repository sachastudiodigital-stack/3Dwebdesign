import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/videos/hall-hero.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: '800px' }}
      >
        <p className="section-label" style={{ marginBottom: '1.5rem' }}>
          Warangal&apos;s Premier Wedding Venue
        </p>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--white)', lineHeight: 1.1, marginBottom: '1.25rem' }}>
          VSR Gardens
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(245,245,240,0.8)', letterSpacing: '0.05em', fontWeight: 300, marginBottom: '2.5rem' }}>
          Where Every Celebration Becomes a Memory
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#about" className="btn-outline">Explore Venue</a>
          <a href="#contact" className="btn-gold">Enquire Now</a>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, color: 'var(--gold)', fontSize: '1.5rem', opacity: 0.7 }}
      >
        ↓
      </motion.div>
    </section>
  )
}
