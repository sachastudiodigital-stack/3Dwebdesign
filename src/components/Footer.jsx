export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid #2a2a2a', padding: '3rem 2rem', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
        VSR Gardens
      </p>
      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.05em', marginBottom: '1.5rem', fontStyle: 'italic' }}>
        Where Every Celebration Becomes a Memory
      </p>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['#about', '#gallery', '#packages', '#contact'].map((href) => (
          <a key={href} href={href}
            style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.05em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.target.style.color = 'var(--gold)' }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--muted)' }}>
            {href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1)}
          </a>
        ))}
      </div>
      <a href="tel:+919849555900" style={{ color: 'var(--white)', textDecoration: 'none', fontSize: '1rem', letterSpacing: '0.05em', display: 'block', marginBottom: '1.5rem' }}>
        +91 98495 55900
      </a>
      <p style={{ color: '#444', fontSize: '0.75rem' }}>
        © {year} VSR Gardens. All rights reserved. · Hunter Road, Ramannapet, Warangal, Telangana
      </p>
    </footer>
  )
}
