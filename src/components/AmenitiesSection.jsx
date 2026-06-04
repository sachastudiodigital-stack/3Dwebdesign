import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { amenities } from '../data/content'

export default function AmenitiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{ background: 'var(--black)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-label" style={{ textAlign: 'center' }}>Amenities</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Venue Highlights</motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }} className="amenities-grid">
          {amenities.map((a) => (
            <motion.div key={a.label} variants={fadeUp}
              whileHover={{ borderColor: 'var(--gold)' }}
              style={{ background: 'var(--dark-card)', border: '1px solid var(--border)', padding: '1.75rem 1rem', textAlign: 'center', transition: 'border-color 0.2s' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{a.icon}</div>
              <p style={{ color: 'var(--white)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.03em' }}>{a.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
