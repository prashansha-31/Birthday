'use client';

import { useState } from 'react';
import ScreenContainer from './ScreenContainer';
import NFHeader from './NFHeader';
import NFRow from './NFRow';
import NFDetailModal from './NFDetailModal';
import NFFullscreenPlayer from './NFFullscreenPlayer';
import { HERO, ROWS } from './netflixData';

export default function NetflixMain({ onClose }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [heroFullscreen, setHeroFullscreen] = useState(false);

  const titleLines = HERO.title.split('\n');

  return (
    <ScreenContainer>
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          background: '#141414',
          color: '#fff',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          overflowX: 'hidden',
        }}
      >
        <NFHeader />

        {/* Back to Site Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 18,
              right: 140,
              zIndex: 60,
              background: 'rgba(0,0,0,0.65)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 30,
              padding: '6px 16px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              fontWeight: 600,
            }}
          >
            ← Close Netflix
          </button>
        )}

        {/* Hero Section */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(60vw, 75vh, 85vh)',
            minHeight: 320,
            display: 'flex',
            alignItems: 'flex-end',
            paddingBottom: 'clamp(20px, 5vw, 60px)',
            paddingLeft: 'clamp(16px, 5vw, 60px)',
            paddingRight: 'clamp(16px, 5vw, 60px)',
            paddingTop: 80,
          }}
        >
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, background: '#000' }}>
            <img
              src="/assets/komal_hero_solo.jpg"
              alt="Hero Desktop"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                filter: 'brightness(0.55) contrast(1.05)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(20,20,20,0.9) 0%, rgba(20,20,20,0.4) 50%, transparent 80%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '35%',
                background: 'linear-gradient(to top, #141414 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Hero Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: 'clamp(280px, 55%, 600px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(8px, 1.5vw, 16px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#e50914', fontWeight: 900, fontSize: 'clamp(20px, 4vw, 34px)', lineHeight: 1 }}>N</span>
              <span
                style={{
                  fontSize: 'clamp(9px, 1.2vw, 12px)',
                  fontWeight: 700,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#ccc',
                  paddingTop: 2,
                }}
              >
                {HERO.badgeLabel}
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(26px, 6vw, 64px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#fff',
                textTransform: 'uppercase',
                lineHeight: 0.95,
                textShadow: '0 2px 14px rgba(0,0,0,0.8)',
                margin: 0,
              }}
            >
              {titleLines.map((line, i) => (
                <span key={i} style={{ display: 'block' }}>{line}</span>
              ))}
            </h1>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: 'clamp(10px, 1.5vw, 13px)', fontWeight: 600 }}>
              <span style={{ color: '#46d369' }}>{HERO.match}</span>
              <span style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '0 5px', fontSize: '10px', borderRadius: 2 }}>{HERO.year}</span>
              <span style={{ color: '#ccc' }}>{HERO.duration}</span>
              <span style={{ border: '1px solid #e50914', padding: '0 6px', fontSize: '10px', color: '#e50914', fontWeight: 800, borderRadius: 2 }}>
                {HERO.quality}
              </span>
            </div>

            <p
              style={{
                fontSize: 'clamp(12px, 1.8vw, 16px)',
                color: 'rgba(230,230,230,0.95)',
                fontWeight: 400,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {HERO.description}
            </p>

            {/* Hero Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 6 }}>
              <button
                onClick={() => setHeroFullscreen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#fff',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: 'clamp(12px, 1.8vw, 16px)',
                  padding: '9px 24px',
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="black" style={{ width: 18, height: 18 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Trailer
              </button>

              <button
                onClick={() => setSelectedMedia(ROWS[0].items[0])}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(109,109,110,0.7)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 'clamp(12px, 1.8vw, 16px)',
                  padding: '9px 22px',
                  borderRadius: 4,
                  border: 'none',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="white" style={{ width: 18, height: 18 }}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Movie Rows */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            paddingBottom: 60,
            paddingLeft: 'clamp(16px, 4vw, 60px)',
            paddingRight: 'clamp(16px, 4vw, 60px)',
            marginTop: 'clamp(-20px, -3vw, -40px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {ROWS.map((section) => (
            <NFRow
              key={section.id}
              title={section.rowTitle}
              items={section.items}
              onSelect={(item) => setSelectedMedia(item)}
            />
          ))}
        </div>

        <NFDetailModal
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />

        <NFFullscreenPlayer
          videoSrc={HERO.videoSrc}
          thumbnailSrc="/assets/komal_hero_solo.jpg"
          isOpen={heroFullscreen}
          onClose={() => setHeroFullscreen(false)}
        />
      </div>
    </ScreenContainer>
  );
}
