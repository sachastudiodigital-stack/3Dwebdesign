import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useScrollNavbar from '../hooks/useScrollNavbar'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const isScrolled = useScrollNavbar()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  const linkStyle = (to) => ({
    color: pathname === to ? 'var(--gold)' : 'var(--white)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    letterSpacing: '0.05em',
    opacity: pathname === to ? 1 : 0.85,
    transition: 'color 0.2s, opacity 0.2s',
  })

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1.25rem 2rem', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      background: isScrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.3s ease',
    }}>
      <Link to="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--gold)', textDecoration: 'none', letterSpacing: '0.05em' }}>
        VSR Gardens
      </Link>

      <ul style={{ display: 'flex', gap: '1.75rem', listStyle: 'none', alignItems: 'center' }} className="hidden-mobile">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} style={linkStyle(link.to)}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = pathname === link.to ? 'var(--gold)' : 'var(--white)'; e.currentTarget.style.opacity = pathname === link.to ? '1' : '0.85' }}>
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/contact" className="btn-gold" style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}>Enquire Now</Link>
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
            style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'var(--white)', fontSize: '1.8rem', cursor: 'pointer' }}>✕
          </button>
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: pathname === link.to ? 'var(--gold)' : 'var(--white)', textDecoration: 'none', letterSpacing: '0.05em' }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
