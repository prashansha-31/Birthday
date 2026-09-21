'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer({ active = true }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  // Play audio helper with safety handling
  const startPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          setNeedsInteraction(false);
        })
        .catch(() => {
          // Browser blocked autoplay due to autoplay policy
          setIsPlaying(false);
          setNeedsInteraction(true);
        });
    }
  }, [volume]);

  // Attempt playback when active becomes true
  useEffect(() => {
    if (!active) return;
    startPlayback();
  }, [active, startPlayback]);

  // Global user gesture fallback: starts playback on the very first touch/click anywhere
  useEffect(() => {
    if (!active || isPlaying) return;

    const handleFirstGesture = () => {
      const audio = audioRef.current;
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setNeedsInteraction(false);
            window.removeEventListener('click', handleFirstGesture);
            window.removeEventListener('touchstart', handleFirstGesture);
            window.removeEventListener('keydown', handleFirstGesture);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [active, isPlaying]);

  // Track playback time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setNeedsInteraction(false);
      }).catch(() => {});
    }
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  // Only render if active stage has reached
  if (!active) return null;

  return (
    <>
      {/* Both MP3 and MPEG sources for 100% universal browser compatibility */}
      <audio ref={audioRef} loop preload="auto" playsInline>
        <source src="/hona-tha-pyar.mp3" type="audio/mpeg" />
        <source src="/hona-tha-pyar.mpeg" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
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
        {/* Floating Tap-to-Play hint if browser blocked autoplay */}
        <AnimatePresence>
          {needsInteraction && !isPlaying && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              onClick={togglePlay}
              style={{
                background: 'linear-gradient(135deg, #e91e63 0%, #880e4f 100%)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '24px',
                padding: '8px 18px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(233, 30, 99, 0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'Outfit', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              >
                🎵
              </motion.span>
              <span>Tap to Play Song ❤️</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded music control panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'linear-gradient(135deg, rgba(30,10,40,0.96) 0%, rgba(80,20,60,0.96) 100%)',
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
                <div
                  style={{
                    fontSize: '0.65rem',
                    color: 'rgba(255,150,180,0.7)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '3px',
                  }}
                >
                  🎵 Now Playing
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#fff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Hona Tha Pyar ❤️
                </div>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  width: '100%',
                  height: '3px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '2px',
                  marginBottom: '14px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #e91e63, #f48fb1)',
                    borderRadius: '2px',
                    transition: 'width 0.5s linear',
                  }}
                />
              </div>

              {/* Volume */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem' }}>
                  {volume === 0 ? '🔇' : volume < 0.4 ? '🔉' : '🔊'}
                </span>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Quick Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={togglePlay}
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: isPlaying
                ? 'rgba(255,255,255,0.15)'
                : 'linear-gradient(135deg, #f06292, #e91e63)',
              border: '1px solid rgba(255,150,180,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
              fontSize: '1.1rem',
              backdropFilter: 'blur(10px)',
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </motion.button>

          {/* Main Floating Circle Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded((e) => !e)}
            style={{
              width: '54px',
              height: '54px',
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
            {/* Pulsing ring animation when playing */}
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
            <span style={{ fontSize: '1.35rem' }}>{isPlaying ? '🎵' : '🎶'}</span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
