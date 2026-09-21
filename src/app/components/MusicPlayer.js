'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-play on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.loop = true;

    const tryPlay = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    tryPlay();

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => audio.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <>
      <audio ref={audioRef} src="/hona-tha-pyar.mpeg" preload="auto" />

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'linear-gradient(135deg, rgba(30,10,40,0.97) 0%, rgba(80,20,60,0.97) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,150,180,0.25)',
                borderRadius: '20px',
                padding: '16px 20px',
                minWidth: '220px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(233,30,99,0.15)',
              }}
            >
              {/* Song info */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{
                  fontSize: '0.65rem',
                  color: 'rgba(255,150,180,0.7)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '3px',
                }}>
                  🎵 Now Playing
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  Hona Tha Pyar ❤️
                </div>
              </div>

              {/* Progress bar */}
              <div style={{
                width: '100%',
                height: '3px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
                marginBottom: '14px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #e91e63, #f48fb1)',
                  borderRadius: '2px',
                  transition: 'width 0.5s linear',
                }} />
              </div>

              {/* Volume */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem' }}>{volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  style={{
                    flex: 1,
                    accentColor: '#e91e63',
                    cursor: 'pointer',
                    height: '4px',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main floating button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setExpanded(e => !e)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e91e63 0%, #9c27b0 100%)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(233,30,99,0.5)',
            position: 'relative',
          }}
        >
          {/* Pulsing ring when playing */}
          {isPlaying && (
            <motion.div
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                background: 'rgba(233,30,99,0.4)',
                pointerEvents: 'none',
              }}
            />
          )}
          <span style={{ fontSize: '1.4rem' }}>{isPlaying ? '🎵' : '🎶'}</span>
        </motion.button>

        {/* Play/Pause quick button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={togglePlay}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: isPlaying
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #f06292, #e91e63)',
            border: '1px solid rgba(255,150,180,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.button>
      </motion.div>
    </>
  );
}
