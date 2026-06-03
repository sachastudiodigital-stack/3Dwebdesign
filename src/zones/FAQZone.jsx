import { useState } from 'react'
import { faqs } from '../data/content'

export default function FAQZone() {
  const [open, setOpen] = useState(null)

  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {faqs.map((faq, i) => (
          <div key={faq.q} style={{ border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              style={{
                width: '100%', textAlign: 'left', background: 'none',
                border: 'none', color: '#FFFFF0', padding: '0.75rem 1rem',
                cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                fontFamily: 'Georgia, serif', fontSize: '0.9rem',
              }}
            >
              {faq.q}
              <span style={{ color: '#D4AF37' }}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div id={`faq-answer-${i}`} style={{ padding: '0 1rem 0.75rem', opacity: 0.8, fontSize: '0.9rem', lineHeight: 1.7 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
