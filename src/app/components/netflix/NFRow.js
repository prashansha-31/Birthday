'use client';

export default function NFRow({ title, items = [], onSelect }) {
  return (
    <div style={{ width: '100%' }}>
      <h3
        style={{
          fontSize: 'clamp(14px, 2vw, 19px)',
          fontWeight: 700,
          color: '#e5e5e5',
          marginBottom: 12,
          letterSpacing: '0.02em',
        }}
      >
        {title}
      </h3>

      <div
        className="nf-row-scroll"
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 12,
          scrollSnapType: 'x mandatory',
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect?.(item)}
            className="nf-card"
            style={{
              position: 'relative',
              flexShrink: 0,
              width: 'clamp(160px, 42vw, 250px)',
              aspectRatio: '16/9',
              borderRadius: 6,
              background: '#181818',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.08)',
              scrollSnapAlign: 'start',
              transition: 'transform 0.25s ease, border-color 0.25s ease',
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              draggable={false}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: 10,
                right: 10,
                fontSize: 'clamp(10px, 1.8vw, 13px)',
                fontWeight: 600,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .nf-row-scroll::-webkit-scrollbar { display: none !important; }
        .nf-row-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        @media (hover: hover) {
          .nf-card:hover { transform: scale(1.05); border-color: rgba(229,9,20,0.7) !important; }
        }
      `}</style>
    </div>
  );
}
