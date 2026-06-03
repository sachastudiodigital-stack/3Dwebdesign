import { ZONES } from '../../data/zones'

const DOT_POSITIONS = [
  { id: 1, x: 70, y: 90 },
  { id: 2, x: 70, y: 72 },
  { id: 3, x: 28, y: 55 },
  { id: 4, x: 112, y: 55 },
  { id: 5, x: 70, y: 38 },
  { id: 6, x: 70, y: 24 },
  { id: 7, x: 70, y: 14 },
  { id: 8, x: 22, y: 70 },
]

export default function MiniMap({ currentZone, onZoneClick }) {
  return (
    <div style={{
      position: 'fixed', top: 16, right: 16, zIndex: 50,
      width: 140, height: 100,
      background: 'rgba(26,26,26,0.8)',
      border: '1px solid rgba(212,175,55,0.4)',
      borderRadius: 6,
      backdropFilter: 'blur(4px)',
    }}>
      <svg width="140" height="100" style={{ position: 'absolute', top: 0, left: 0 }}>
        <rect x="10" y="8" width="120" height="84" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
        <line x1="70" y1="92" x2="70" y2="8" stroke="rgba(180,0,0,0.4)" strokeWidth="3" />
        <rect x="20" y="8" width="100" height="12" fill="rgba(196,18,48,0.3)" />
      </svg>

      {DOT_POSITIONS.map(({ id, x, y }) => {
        const zone = ZONES.find((z) => z.id === id)
        const isActive = id === currentZone
        return (
          <button
            key={id}
            role="button"
            title={`${zone.label}${isActive ? ' (current)' : ''}`}
            onClick={() => onZoneClick(id)}
            style={{
              position: 'absolute',
              left: x - 5, top: y - 5,
              width: 10, height: 10,
              borderRadius: '50%',
              background: isActive ? '#D4AF37' : 'rgba(255,255,255,0.5)',
              border: isActive ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              padding: 0,
              transform: isActive ? 'scale(1.4)' : 'scale(1)',
              transition: 'all 0.2s',
            }}
          />
        )
      })}
    </div>
  )
}
