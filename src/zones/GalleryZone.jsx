const placeholderImages = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery-${i + 1}.jpg`,
  alt: `Wedding ${i + 1}`,
}))

export default function GalleryZone() {
  return (
    <div style={{ color: '#FFFFF0', fontFamily: 'Georgia, serif' }}>
      <h2 style={{ color: '#D4AF37', fontSize: '1.6rem', marginBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.3)', paddingBottom: '0.5rem' }}>
        Gallery
      </h2>
      <p style={{ opacity: 0.7, marginBottom: '1rem', fontSize: '0.9rem' }}>A glimpse of celebrations at Royal Convention Hall</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {placeholderImages.map(({ id, src, alt }) => (
          <div key={id} style={{
            aspectRatio: '1',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <img
              src={src}
              alt={alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { e.target.style.display = 'none' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
