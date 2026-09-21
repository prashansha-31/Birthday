'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VideoEntrance({ onComplete }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setHasStarted(true))
        .catch(() => {
          // If browser blocks un-muted autoplay, try muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
    }
  }, []);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSkip = () => {
    onComplete?.();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <video
        ref={videoRef}
        src="/assets/intro_video.mp4"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#000',
        }}
        playsInline
        onEnded={onComplete}
        onClick={() => {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play();
          }
        }}
      />

      {/* Top right Skip & Unmute controls */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {isMuted && (
          <button
            onClick={handleToggleMute}
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: 30,
              padding: '8px 16px',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🔊 Tap for Sound
          </button>
        )}

        <button
          onClick={handleSkip}
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 30,
            padding: '8px 18px',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Skip to Site ✨
        </button>
      </div>

      {/* Bottom hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          pointerEvents: 'none',
        }}
      >
        ✦ Playing Birthday Video ✦
      </div>
    </motion.div>
  );
}
