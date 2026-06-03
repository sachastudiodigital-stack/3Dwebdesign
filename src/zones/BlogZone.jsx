import { blogs } from '../data/content'

export default function BlogZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Blog
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {blogs.map((post) => (
          <div key={post.id} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 6, overflow: 'hidden',
          }}>
            <div style={{ height: 120, background: 'rgba(212,175,55,0.1)', overflow: 'hidden' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
            </div>
            <div style={{ padding: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#D4AF37', opacity: 0.7, marginBottom: 4 }}>{post.date}</div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: '0.4rem', lineHeight: 1.4 }}>{post.title}</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.6 }}>{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
