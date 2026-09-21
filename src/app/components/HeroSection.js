'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const photos = [
  '/assets/komal_hero_solo.jpg',
  '/assets/komal_solo_2.jpg',
  '/assets/komal_solo_3.jpg',
  '/assets/komal_solo_4.jpg',
  '/assets/komal_solo_5.jpg',
];

export default function HeroSection() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [age, setAge] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const birthday = new Date('2000-09-21');
    const today = new Date();
    const diff = today - birthday;
    setAge(Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
  }, []);

  const goToPhoto = (idx) => {
    if (idx === currentPhoto) return;
    setFading(true);
    setTimeout(() => {
      setCurrentPhoto(idx);
      setFading(false);
    }, 300);
  };

  const nextPhoto = () => {
    goToPhoto((currentPhoto + 1) % photos.length);
  };

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(nextPhoto, 4000);
    return () => clearInterval(timer);
  }, [currentPhoto]);

  return (
    <section
      id="hero"
      style={{
        background: 'linear-gradient(160deg, #fff0f5 0%, #f9e8ff 40%, #fff8f0 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '3rem',
        paddingBottom: '3rem',
      }}
    >
      {/* Decorative bg blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,184,224,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,198,208,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Photo side ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>

          {/* Photo frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
            }}
          >
            {/* Decorative frame border */}
            <div
              style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #f9c6d0, #d4b8e0, #ffd6b0, #f9c6d0)',
                backgroundSize: '300% 300%',
                animation: 'shimmer 4s linear infinite',
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                boxShadow: '0 20px 60px rgba(194,104,122,0.2)',
                cursor: 'pointer',
                background: '#f9e8ff',
              }}
              onClick={nextPhoto}
              title="Click for next photo ✨"
            >
              <Image
                src={photos[currentPhoto]}
                alt="Komal"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  opacity: fading ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />

              {/* Click hint overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem 1rem 1rem',
                  background: 'linear-gradient(to top, rgba(61,42,53,0.5) 0%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '0.05em',
                  }}
                >
                  👆 click to see next
                </span>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {currentPhoto + 1} / {photos.length}
                </span>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goToPhoto(i)}
                style={{
                  width: i === currentPhoto ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '10px',
                  background: i === currentPhoto ? '#c2687a' : '#f9c6d0',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Text side ── */}
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(249,198,208,0.3)',
              border: '1px solid #f9c6d0',
              borderRadius: '50px',
              padding: '0.5rem 1.25rem',
              fontSize: '0.85rem',
              color: '#c2687a',
              fontFamily: 'Outfit, sans-serif',
              animation: 'fadeIn 1s ease',
            }}
          >
            🎂 It&apos;s your special day!
          </div>

          <h1
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.1,
              color: '#c2687a',
              animation: 'fadeInUp 1s ease 0.2s both',
            }}
          >
            Happy Birthday,
            <br />
            <span style={{ color: '#8b6aa7' }}>Komal ✨</span>
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
              color: '#7a5a68',
              fontStyle: 'italic',
              lineHeight: 1.8,
              maxWidth: '420px',
              animation: 'fadeInUp 1s ease 0.4s both',
            }}
          >
            On this beautiful day, I want you to know that you are the most precious person in my world.
            Every moment with you feels like a dream I never want to wake up from.
          </p>

          {/* Age badge — only render on client once age is calculated */}
          {age !== null && (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(249,198,208,0.4), rgba(212,184,224,0.4))',
                border: '1px solid rgba(249,198,208,0.6)',
                borderRadius: '20px',
                padding: '1.2rem 2.5rem',
                animation: 'fadeInUp 1s ease 0.6s both',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '3.5rem',
                  color: '#c2687a',
                  lineHeight: 1,
                }}
              >
                {age}
              </div>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.8rem',
                  color: '#7a5a68',
                  marginTop: '0.25rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Years of Pure Magic
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
