import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { Users, Car, UtensilsCrossed, Flower2, Music, Clock, Sparkles, Star, MapPin, UserCheck } from 'lucide-react'

const amenities = [
  { Icon: Users, label: '700 Sitting Capacity' },
  { Icon: UserCheck, label: '1800 Standing Capacity' },
  { Icon: Car, label: '100 Car Parking' },
  { Icon: UtensilsCrossed, label: 'In-House Catering' },
  { Icon: Flower2, label: 'Bridal Room' },
  { Icon: Music, label: 'AV System' },
  { Icon: Clock, label: 'Open 24 Hours' },
  { Icon: Sparkles, label: 'Elegant Ambience' },
  { Icon: Star, label: 'Immaculate Cleanliness' },
  { Icon: MapPin, label: 'Prime Location, Warangal' },
]

export default function AmenitiesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{ background: 'var(--black)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>Amenities</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Venue Highlights</motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}
          className="amenities-grid">
          {amenities.map(({ Icon, label }) => (
            <motion.div key={label} variants={fadeUp}
              whileHover={{ borderColor: 'var(--gold)', y: -4 }}
              style={{ background: 'var(--dark-card)', border: '1px solid var(--border)', padding: '1.75rem 1rem', textAlign: 'center', transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                <Icon size={28} color="var(--gold)" strokeWidth={1.5} />
              </div>
              <p style={{ color: 'var(--white)', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.4 }}>{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
