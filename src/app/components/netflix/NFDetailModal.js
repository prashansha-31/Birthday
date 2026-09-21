'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NFFullscreenPlayer from './NFFullscreenPlayer';

export default function NFDetailModal({ media, onClose }) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  useEffect(() => {
    if (!media) setFullscreenOpen(false);
  }, [media]);

  const handlePlayNow = () => {
    setFullscreenOpen(true);
  };

  const handleFullscreenClose = () => {
    setFullscreenOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {media && !fullscreenOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflowY: 'auto',
              padding: 'clamp(12px, 5vw, 60px) 16px 32px',
            }}
          >
            <div style={{ position: 'fixed', inset: 0 }} onClick={onClose} />

            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 700,
                background: '#181818',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 10,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 50,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(20,20,20,0.92)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(20,20,20,0.92)';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                ✕
              </button>

              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
                <img
                  src={media.img}
                  alt={media.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.7)',
                    display: 'block',
                  }}
                  draggable={false}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background: 'linear-gradient(to top, #181818 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 20,
                    zIndex: 8,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 'clamp(16px, 4vw, 26px)',
                      fontWeight: 900,
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      marginBottom: 12,
                      textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {media.title}
                  </h2>

                  <button
                    onClick={handlePlayNow}
                    style={{
                      background: '#e50914',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 'clamp(12px, 2vw, 15px)',
                      padding: '9px 22px',
                      borderRadius: 4,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      boxShadow: '0 2px 10px rgba(0,0,0,0.6)',
                      transition: 'background 0.18s, transform 0.1s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f6121d')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '#e50914')}
                  >
                    <svg viewBox="0 0 24 24" fill="white" style={{ width: 16, height: 16 }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Play Video
                  </button>
                </div>
              </div>

              <div
                style={{
                  padding: 'clamp(14px, 3vw, 24px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 'clamp(10px, 2vw, 13px)' }}>
                  <span style={{ color: '#46d369', fontWeight: 700 }}>{media.match}</span>
                  <span style={{ color: '#aaa' }}>{media.duration}</span>
                  <span style={{ border: '1px solid #555', padding: '1px 5px', borderRadius: 2, fontSize: 'clamp(8px, 1.5vw, 11px)', fontWeight: 700, color: '#ccc' }}>{media.age}</span>
                </div>
                <p style={{ fontSize: 'clamp(11px, 2vw, 14px)', color: '#ddd', fontWeight: 400, lineHeight: 1.6, margin: 0 }}>
                  {media.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                  {media.tags?.map((tag, i) => (
                    <span key={i} style={{ background: '#2a2a2a', color: '#bbb', padding: '4px 10px', borderRadius: 4, fontSize: '11px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <NFFullscreenPlayer
        videoSrc={media?.videoSrc || null}
        thumbnailSrc={media?.img}
        isOpen={fullscreenOpen}
        onClose={handleFullscreenClose}
      />
    </>
  );
}
