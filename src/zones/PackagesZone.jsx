import { packages } from '../data/content'

export default function PackagesZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Packages
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {packages.map((pkg) => (
          <div key={pkg.id} style={{
            background: pkg.id === 'royal' ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${pkg.id === 'royal' ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
            borderRadius: 6, padding: '1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h3 style={{ color: '#D4AF37', fontSize: '1.1rem' }}>{pkg.name}</h3>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Up to {pkg.guests} guests · {pkg.hours}h</span>
            </div>
            <ul style={{ paddingLeft: '1rem', opacity: 0.85, fontSize: '0.9rem', lineHeight: 1.7 }}>
              {pkg.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ marginTop: '0.75rem', color: '#D4AF37', fontSize: '0.85rem' }}>{pkg.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
