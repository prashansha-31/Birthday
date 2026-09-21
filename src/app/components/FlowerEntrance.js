'use client';
import { useState } from 'react';

export default function FlowerEntrance({ onEnter }) {
  const [clicked, setClicked] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(() => {
      setLeaving(true);
      setTimeout(onEnter, 600);
    }, 400);
  };

  if (leaving) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(160deg, #fff0f8 0%, #f5e8ff 40%, #fff5e0 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: clicked ? 0 : 1,
        transition: 'opacity 0.6s ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={handleClick}
    >
      {/* Decorative petals behind flower */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${1 + Math.sin(i) * 0.5}rem`,
              left: `${8 + (i * 8) % 90}%`,
              top: `${5 + (i * 13) % 85}%`,
              opacity: 0.12,
              animation: `floatUp ${10 + i}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {['🌸', '🌺', '✨', '🌷', '💐'][i % 5]}
          </div>
        ))}
      </div>

      {/* Main flower SVG — pastel animated */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Glow ring */}
        <div
          style={{
            position: 'absolute',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,198,208,0.5) 0%, rgba(212,184,224,0.3) 50%, transparent 70%)',
            animation: 'pulse-glow 3s ease-in-out infinite',
          }}
        />

        {/* Flower SVG */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 200 200"
          style={{
            filter: clicked
              ? 'drop-shadow(0 0 40px rgba(249,198,208,1))'
              : 'drop-shadow(0 8px 30px rgba(194,104,122,0.3))',
            transform: clicked ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.4s ease, filter 0.4s ease',
            animation: 'heartBeat 4s ease-in-out infinite',
          }}
        >
          {/* Petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="28"
              ry="52"
              fill={i % 2 === 0 ? '#f9c6d0' : '#d4b8e0'}
              opacity="0.85"
              transform={`rotate(${angle} 100 100) translate(0 -30)`}
            />
          ))}
          {/* Center */}
          <circle cx="100" cy="100" r="30" fill="#ffd6b0" opacity="0.95" />
          <circle cx="100" cy="100" r="20" fill="#f5d67a" opacity="0.9" />
          <circle cx="100" cy="100" r="10" fill="#f4a7b9" opacity="0.95" />
        </svg>
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: '#c2687a',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}
        >
          A Gift for You, Komal
        </div>
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.85rem',
            color: '#8b6aa7',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          ✦ tap the flower to open ✦
        </div>
      </div>

      {/* Pulse ring hint */}
      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: '2px solid rgba(249,198,208,0.5)',
          position: 'absolute',
          animation: 'pulse-glow 2s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
