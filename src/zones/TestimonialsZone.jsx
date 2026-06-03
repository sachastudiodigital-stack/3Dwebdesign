import { testimonials } from '../data/content'

export default function TestimonialsZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        What Couples Say
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {testimonials.map((t) => (
          <div key={t.id} style={{
            background: 'rgba(212,175,55,0.07)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 6, padding: '1rem',
          }}>
            <p style={{ fontStyle: 'italic', lineHeight: 1.7, opacity: 0.9, marginBottom: '0.75rem' }}>
              "{t.quote}"
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#D4AF37', fontSize: '0.9rem' }}>— {t.couple}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{t.date}</span>
            </div>
            <div style={{ color: '#D4AF37', marginTop: 4 }}>{'★'.repeat(t.stars)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
