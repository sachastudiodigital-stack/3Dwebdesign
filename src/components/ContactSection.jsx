import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '../utils/animations'

const inputStyle = {
  width: '100%', padding: '0.75rem 1rem',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid #2a2a2a',
  color: '#F5F5F0', fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem', outline: 'none',
  borderRadius: '1px', transition: 'border-color 0.2s',
}

const labelStyle = {
  display: 'block', color: '#C9A027',
  fontSize: '0.75rem', letterSpacing: '0.1em',
  textTransform: 'uppercase', marginBottom: '0.4rem',
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const isValid = form.name.trim().length > 0 && form.phone.trim().length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nGuests: ${form.guests}\nMessage: ${form.message}`
    window.location.href = `mailto:vsrgardens@gmail.com?subject=Wedding Enquiry - ${form.name}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} style={{ background: 'var(--dark-card)', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-label" style={{ textAlign: 'center' }}>Contact</motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Plan Your Celebration
        </motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}
          className="contact-grid">

          <motion.div variants={fadeUp}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', color: 'var(--gold)', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>Thank You!</h3>
                <p style={{ color: 'var(--muted)' }}>We&apos;ll contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { label: 'Full Name', name: 'name', type: 'text', required: true },
                  { label: 'Phone Number', name: 'phone', type: 'tel', required: true },
                  { label: 'Event Date', name: 'date', type: 'date', required: false },
                  { label: 'Number of Guests', name: 'guests', type: 'number', required: false },
                ].map(({ label, name, type, required }) => (
                  <div key={name}>
                    <label htmlFor={name} style={labelStyle}>{label}</label>
                    <input id={name} name={name} type={type} required={required}
                      value={form[name]} onChange={handleChange} style={inputStyle} />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea id="message" name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={!isValid}
                  style={{ background: isValid ? 'var(--gold)' : 'rgba(201,160,39,0.3)', color: '#0a0a0a', border: 'none', padding: '1rem', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: isValid ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}>
                  Submit Enquiry
                </button>
              </form>
            )}
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.25rem' }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Phone</p>
              <a href="tel:+919849555900" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--white)', textDecoration: 'none' }}>+91 98495 55900</a>
            </div>
            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.25rem' }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Address</p>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                Hunter Road, near HP Petrol Bunk,<br />beside Sri Chaitanya School,<br />Ramannapet, Warangal,<br />Telangana – 506002
              </p>
            </div>
            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '1.25rem' }}>
              <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Hours</p>
              <p style={{ color: 'var(--white)', fontSize: '0.9rem' }}>Open 24 Hours</p>
            </div>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', height: '220px' }}>
              <iframe
                title="VSR Gardens Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.3!2d79.5941!3d17.9784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU4JzQyLjIiTiA3OcKwMzUnMzguOCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="220"
                style={{ border: 0, display: 'block', filter: 'grayscale(0.8) invert(0.9)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
