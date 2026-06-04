import { useState } from 'react'
import useScrollNavbar from '../hooks/useScrollNavbar'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const isScrolled = useScrollNavbar()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: isScrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none',
        borderBottom: isScrolled ? '1px solid #2a2a2a' : 'none',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <a href="#" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)', textDecoration: 'none', letterSpacing: '0.05em' }}>
        VSR Gardens
      </a>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }} className="hidden-mobile">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} style={{ color: 'var(--white)', textDecoration: 'none', fontSize: '0.9rem', letterSpacing: '0.05em', opacity: 0.85, transition: 'color 0.2s, opacity 0.2s' }}
              onMouseEnter={(e) => { e.target.style.color = 'var(--gold)'; e.target.style.opacity = '1' }}
              onMouseLeave={(e) => { e.target.style.color = 'var(--white)'; e.target.style.opacity = '0.85' }}>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="btn-gold" style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}>Enquire Now</a>
        </li>
      </ul>

      <button aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', background: 'none', border: 'none', color: 'var(--white)', cursor: 'pointer', fontSize: '1.5rem' }}
        className="show-mobile">
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.97)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', zIndex: 200 }}>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'var(--white)', fontSize: '1.8rem', cursor: 'pointer' }}>
            ✕
          </button>
          {[...links, { label: 'Enquire Now', href: '#contact' }].map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--white)', textDecoration: 'none', letterSpacing: '0.05em' }}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
