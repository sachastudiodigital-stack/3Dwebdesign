export default function AboutZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        About Our Hall
      </h2>
      <p style={{ lineHeight: 1.8, opacity: 0.9, marginBottom: '1rem' }}>
        Royal Convention Hall has been the premier wedding destination in the city for over a decade. Our grand ballroom is renowned for its breathtaking crystal chandeliers, elegant crimson and ivory décor, and world-class hospitality.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
        {[
          { label: 'Capacity', value: '500 Guests' },
          { label: 'Hall Size', value: '12,000 sq ft' },
          { label: 'Established', value: '2012' },
          { label: 'Events Hosted', value: '1,200+' },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: 'rgba(212,175,55,0.1)', padding: '0.75rem', borderRadius: 4, border: '1px solid rgba(212,175,55,0.2)' }}>
            <div style={{ color: '#D4AF37', fontSize: '0.75rem', letterSpacing: '0.1em' }}>{label.toUpperCase()}</div>
            <div style={{ fontSize: '1.1rem', marginTop: 4 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
