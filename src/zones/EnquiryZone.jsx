import { useState } from 'react'

const fieldStyle = {
  width: '100%', padding: '0.6rem 0.75rem',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,175,55,0.3)',
  borderRadius: 4, color: '#FFFFF0',
  fontFamily: 'Georgia, serif', fontSize: '0.9rem',
  outline: 'none',
}

const labelStyle = {
  display: 'block', color: '#D4AF37',
  fontSize: '0.75rem', letterSpacing: '0.08em',
  marginBottom: '0.3rem',
}

export default function EnquiryZone() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nDate: ${form.date}\nGuests: ${form.guests}\nMessage: ${form.message}`
    const mailto = `mailto:info@royalconventionhall.com?subject=Wedding Enquiry - ${form.name}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  const isValid = form.name.trim().length > 0 && form.phone.trim().length > 0

  if (submitted) {
    return (
      <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif', textAlign: 'center', padding: '2rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
        <h3 style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Thank You!</h3>
        <p style={{ opacity: 0.8 }}>We'll contact you within 24 hours.</p>
      </div>
    )
  }

  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '0.5rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Enquire Now
      </h2>
      <p style={{ opacity: 0.7, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        Let us help make your celebration unforgettable.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { label: 'Full Name', name: 'name', type: 'text', required: true },
          { label: 'Phone Number', name: 'phone', type: 'tel', required: true },
          { label: 'Event Date', name: 'date', type: 'date', required: false },
          { label: 'Number of Guests', name: 'guests', type: 'number', required: false },
        ].map(({ label, name, type, required }) => (
          <div key={name}>
            <label htmlFor={name} style={labelStyle}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              required={required}
              value={form[name]}
              onChange={handleChange}
              style={fieldStyle}
            />
          </div>
        ))}

        <div>
          <label htmlFor="message" style={labelStyle}>Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            style={{ ...fieldStyle, resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          style={{
            background: isValid ? '#D4AF37' : 'rgba(212,175,55,0.3)',
            border: 'none', color: '#1A1A1A',
            padding: '0.8rem', borderRadius: 4,
            fontFamily: 'Georgia, serif', fontSize: '1rem',
            letterSpacing: '0.08em', cursor: isValid ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
          }}
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  )
}
