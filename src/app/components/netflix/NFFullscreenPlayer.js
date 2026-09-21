'use client';

import { useRef, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function NFFullscreenPlayer({ videoSrc, thumbnailSrc, isOpen, onClose }) {
  const videoRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimer = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      videoRef.current?.pause();
      setIsPlaying(false);
      setHasError(false);
      return;
    }

    const t = setTimeout(() => {
      if (videoRef.current && videoSrc) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }, 100);
    return () => clearTimeout(t);
  }, [isOpen, videoSrc]);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      return;
    }
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(hideTimer.current);
  }, [isPlaying]);

  const revealControls = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    if (isPlaying) {
      hideTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    revealControls();
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseMove={revealControls}
          onTouchStart={revealControls}
        >
          {thumbnailSrc && !isPlaying && (
            <img
              src={thumbnailSrc}
              alt="Thumbnail"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 0.4,
              }}
            />
          )}

          {videoSrc && !hasError && (
            <video
              ref={videoRef}
              src={videoSrc}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                background: '#000',
              }}
              onError={() => setHasError(true)}
              onEnded={() => {
                setIsPlaying(false);
                setShowControls(true);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
              onClick={togglePlay}
            />
          )}

          {hasError && (
            <div style={{ color: '#fff', textAlign: 'center', zIndex: 10 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⚠️</div>
              <div style={{ fontSize: 16 }}>Video player ready</div>
            </div>
          )}

          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'opacity 0.3s',
              opacity: showControls ? 1 : 0,
              pointerEvents: showControls ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'clamp(12px, 3vw, 24px) clamp(16px, 4vw, 32px)',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            >
              <img
                src="/videos/netflix.svg"
                alt="Netflix"
                style={{ height: 'clamp(20px, 4vw, 32px)', opacity: 0.9 }}
                onError={(e) => (e.target.style.display = 'none')}
              />
              <button
                onClick={onClose}
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  width: 'clamp(32px, 5vw, 44px)',
                  height: 'clamp(32px, 5vw, 44px)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(14px, 2vw, 20px)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={togglePlay}
                style={{
                  width: 'clamp(56px, 10vw, 80px)',
                  height: 'clamp(56px, 10vw, 80px)',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)',
                  border: '2px solid rgba(255,255,255,0.85)',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(6px)',
                  transition: 'background 0.2s, transform 0.1s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(229,9,20,0.85)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.55)')}
                onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: 'clamp(24px, 4vw, 36px)', height: 'clamp(24px, 4vw, 36px)' }}>
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: 'clamp(24px, 4vw, 36px)', height: 'clamp(24px, 4vw, 36px)', marginLeft: '10%' }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>

            <div
              style={{
                padding: 'clamp(12px, 3vw, 24px) clamp(16px, 4vw, 32px)',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
