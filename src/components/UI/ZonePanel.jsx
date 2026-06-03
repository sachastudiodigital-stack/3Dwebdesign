export default function ZonePanel({ zoneId, onClose, children }) {
  if (zoneId === 1 || zoneId === null || zoneId === undefined) return null

  return (
    <div
      style={{
        position: 'fixed',
        right: 0, top: 0, bottom: 0,
        width: 'min(420px, 90vw)',
        zIndex: 40,
        background: 'rgba(26,26,26,0.88)',
        backdropFilter: 'blur(12px)',
        borderLeft: '2px solid #D4AF37',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
        animation: 'slideIn 0.4s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>

      <div style={{ height: 3, background: '#D4AF37', borderRadius: 2, marginBottom: 8 }} />

      <button
        aria-label="Close panel"
        onClick={onClose}
        style={{
          position: 'absolute', top: 12, right: 16,
          background: 'none', border: 'none',
          color: '#D4AF37', fontSize: 22, cursor: 'pointer', lineHeight: 1,
        }}
      >
        ×
      </button>

      {children}
    </div>
  )
}
