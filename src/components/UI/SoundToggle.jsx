export default function SoundToggle({ isMuted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 50,
        width: 44, height: 44, borderRadius: '50%',
        background: 'rgba(26,26,26,0.8)',
        border: '1px solid rgba(212,175,55,0.5)',
        color: '#D4AF37',
        fontSize: 20, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        transition: 'border-color 0.2s',
      }}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  )
}
