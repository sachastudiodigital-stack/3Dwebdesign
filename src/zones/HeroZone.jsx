import { Html } from '@react-three/drei'

export default function HeroZone({ onEnter }) {
  return (
    <Html position={[0, 3.5, 12]} center transform occlude={false}>
      <div style={{
        textAlign: 'center',
        color: '#FFFFF0',
        fontFamily: 'Georgia, serif',
        userSelect: 'none',
        pointerEvents: 'auto',
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          color: '#D4AF37',
          textShadow: '0 0 20px rgba(212,175,55,0.5)',
          letterSpacing: '0.08em',
          marginBottom: '0.5rem',
        }}>
          Royal Convention Hall
        </h1>
        <p style={{
          fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
          opacity: 0.85,
          letterSpacing: '0.15em',
          marginBottom: '2rem',
        }}>
          WHERE EVERY CELEBRATION BECOMES A LEGEND
        </p>
        <button
          onClick={onEnter}
          style={{
            background: 'transparent',
            border: '2px solid #D4AF37',
            color: '#D4AF37',
            padding: '0.75rem 2.5rem',
            fontSize: '1rem',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            borderRadius: 2,
            transition: 'all 0.3s',
          }}
          onMouseOver={e => { e.target.style.background = '#D4AF37'; e.target.style.color = '#1A1A1A' }}
          onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#D4AF37' }}
        >
          BEGIN YOUR JOURNEY →
        </button>
      </div>
    </Html>
  )
}
