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

const ringVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
}

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.8, duration: 0.4 } },
}

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
                <div style={{ position: 'relative', width: 56, height: 56 }}>
                  <motion.svg width={56} height={56} viewBox="0 0 56 56" style={{ position: 'absolute', top: 0, left: 0 }}>
                    <motion.circle
                      cx={28} cy={28} r={24}
                      fill="none"
                      stroke="var(--gold)"
                      strokeWidth={1.5}
                      variants={ringVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                    />
                  </motion.svg>
                  <motion.div
                    variants={iconVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={24} color="var(--gold)" strokeWidth={1.5} />
                  </motion.div>
                </div>
              </div>
              <p style={{ color: 'var(--white)', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.03em', lineHeight: 1.4 }}>{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
