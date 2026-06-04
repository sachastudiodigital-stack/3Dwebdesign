import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'
import { blogs } from '../data/content'
import { Church, Flower2, Star } from 'lucide-react'

const blogIcons = [Church, Flower2, Star]

export default function BlogSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-label" style={{ textAlign: 'center' }}>Blog</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Wedding Insights</motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="blog-grid">
          {blogs.map((post, i) => {
            const Icon = blogIcons[i % blogIcons.length]
            return (
            <motion.article key={post.id} variants={fadeUp}
              style={{ background: 'var(--black)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ background: 'var(--dark-card)', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
                <Icon size={48} color="var(--gold)" strokeWidth={1} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{post.date}</p>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--white)', lineHeight: 1.4, marginBottom: '0.75rem' }}>{post.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>{post.excerpt}</p>
                <a href="#" style={{ color: 'var(--gold)', fontSize: '0.85rem', textDecoration: 'none', letterSpacing: '0.05em', fontWeight: 500 }}>Read More →</a>
              </div>
            </motion.article>
          )})}
        </motion.div>
      </div>
    </section>
  )
}
