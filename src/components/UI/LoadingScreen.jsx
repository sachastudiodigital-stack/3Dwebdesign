export default function LoadingScreen({ progress }) {
  if (progress >= 100) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: '#0a0005',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <div
        style={{
          width: 120, height: 120,
          border: '3px solid #D4AF37',
          borderRadius: '50%',
          borderTopColor: 'transparent',
          animation: 'spin 1.5s linear infinite',
        }}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <h1 style={{ color: '#D4AF37', fontSize: '2rem', fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}>
        Royal Convention Hall
      </h1>

      <p style={{ color: '#FFFFF0', opacity: 0.7, fontSize: '0.9rem', letterSpacing: '0.05em' }}>
        Preparing your royal experience...
      </p>

      <div style={{ width: 240, height: 3, background: 'rgba(212,175,55,0.2)', borderRadius: 2 }}>
        <div
          style={{
            height: '100%', background: '#D4AF37', borderRadius: 2,
            width: `${progress}%`, transition: 'width 0.3s ease',
          }}
        />
      </div>

      <span style={{ color: '#D4AF37', fontSize: '0.8rem' }}>{Math.round(progress)}%</span>
    </div>
  )
}
