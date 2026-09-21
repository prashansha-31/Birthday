'use client';

export default function SectionDivider({ emoji = '✦', style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        margin: 0,
        background: 'linear-gradient(90deg, transparent, rgba(249,198,208,0.3), rgba(212,184,224,0.4), rgba(249,198,208,0.3), transparent)',
        height: '80px',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '1.2rem',
        }}
      >
        <span style={{ color: '#f9c6d0', opacity: 0.6 }}>· · ·</span>
        <span style={{ fontSize: '1.5rem', animation: 'heartBeat 3s ease-in-out infinite' }}>{emoji}</span>
        <span style={{ color: '#d4b8e0', opacity: 0.6 }}>· · ·</span>
      </div>
    </div>
  );
}
