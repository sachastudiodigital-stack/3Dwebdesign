import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { packages } from '../data/content'

export default function PackagesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="packages" ref={ref} style={{ background: 'var(--black)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-label" style={{ textAlign: 'center' }}>Our Packages</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Choose Your Celebration</motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="packages-grid">
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={fadeUp}
              style={{ background: 'var(--dark-card)', border: pkg.featured ? '1px solid var(--gold)' : '1px solid var(--border)', borderTop: '3px solid var(--gold)', padding: '2rem', position: 'relative', boxShadow: pkg.featured ? '0 0 30px rgba(201,160,39,0.15)' : 'none' }}>
              {pkg.featured && (
                <div style={{ position: 'absolute', top: '-1px', right: '1.5rem', background: 'var(--gold)', color: '#0a0a0a', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', padding: '0.25rem 0.75rem' }}>POPULAR</div>
              )}
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{pkg.name}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Up to {pkg.guests} guests · {pkg.hours} hours</p>
              <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                {pkg.features.map((f) => (
                  <li key={f} style={{ color: 'var(--white)', fontSize: '0.9rem', padding: '0.4rem 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--gold)' }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--muted)', marginBottom: '1.5rem', fontStyle: 'italic' }}>{pkg.price}</p>
              <a href="#contact" className={pkg.featured ? 'btn-gold' : 'btn-outline'} style={{ width: '100%', textAlign: 'center', display: 'block' }}>Enquire Now</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
