import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'

const stats = [
  { icon: '🪑', value: '700', label: 'Sitting Capacity' },
  { icon: '🧑‍🤝‍🧑', value: '1800', label: 'Standing Capacity' },
  { icon: '🚗', value: '100', label: 'Parking Vehicles' },
  { icon: '⏰', value: '24 Hrs', label: 'Always Open' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{ background: 'var(--black)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="about-grid">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="section-label">About Us</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">A Venue Built for Your Most Special Day</motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '1rem' }}>
            VSR Gardens is Warangal&apos;s premier marriage function hall, designed to make every celebration unforgettable. With a sitting capacity of 700 and standing capacity of 1800, we comfortably host weddings of every scale in elegance and style.
          </motion.p>
          <motion.p variants={fadeUp} style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1rem' }}>
            From weddings and receptions to engagements and corporate events, we offer in-house catering, ample parking for 100 vehicles, and a professional team that ensures every detail is perfect — so you can focus entirely on your celebration.
          </motion.p>
          <motion.div variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} style={{ background: 'var(--dark-card)', border: '1px solid var(--border)', borderTop: '2px solid var(--gold)', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--gold)', fontWeight: 600 }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem', letterSpacing: '0.05em' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--gold)', aspectRatio: '9/16', maxHeight: '560px' }}>
          <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src="/videos/hall-about.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  )
}
