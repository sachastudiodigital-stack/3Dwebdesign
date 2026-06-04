import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { faqs } from '../data/content'
import { ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [open, setOpen] = useState(null)

  return (
    <section ref={ref} style={{ background: 'var(--black)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>FAQ</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Frequently Asked Questions
        </motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => (
            <motion.div key={faq.q} variants={fadeUp}
              style={{ border: open === i ? '1px solid var(--gold)' : '1px solid var(--border)', borderLeft: open === i ? '3px solid var(--gold)' : '1px solid var(--border)', background: 'var(--dark-card)', transition: 'border-color 0.2s' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', padding: '1.25rem 1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 500 }}>
                {faq.q}
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                  style={{ color: 'var(--gold)', flexShrink: 0, marginLeft: '1rem', display: 'flex' }}>
                  <ChevronDown size={18} strokeWidth={2} />
                </motion.span>
              </button>

              {open === i && (
                <div
                  id={`faq-answer-${i}`}
                  style={{ overflow: 'hidden' }}>
                  <p style={{ padding: '0 1.5rem 1.25rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
