import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { testimonials } from '../data/content'
import { Star } from 'lucide-react'

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-label" style={{ textAlign: 'center' }}>Testimonials</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>What Couples Say</motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="testimonials-grid">
          {testimonials.map((t) => (
            <motion.div key={t.id} variants={fadeUp}
              style={{ background: 'var(--black)', border: '1px solid var(--border)', borderLeft: '3px solid var(--gold)', padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} color="var(--gold)" fill="var(--gold)" strokeWidth={1} />
                ))}
              </div>
              <p style={{ color: 'var(--white)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '0.95rem' }}>&ldquo;{t.quote}&rdquo;</p>
              <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{t.event}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
