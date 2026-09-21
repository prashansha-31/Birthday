'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './netflix.css';

export default function NetflixIntroAnimation({ onComplete }) {
  const [scale, setScale] = useState(1);
  const audioRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const updateScale = () => {
      const minDim = Math.min(window.innerWidth, window.innerHeight);
      setScale(minDim < 480 ? minDim / 500 : 1);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const triggerComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  };

  useEffect(() => {
    // Attempt TUDUM audio playback
    try {
      audioRef.current = new Audio('/videos/netflix.mp3');
      audioRef.current.play().catch(() => {
        // Autoplay policy prevented immediate sound playback without interaction
      });
    } catch (e) {
      // Audio error catch
    }

    const timer = setTimeout(() => {
      triggerComplete();
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  const handleScreenClick = () => {
    // Play sound on user interaction if blocked initially
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      onClick={handleScreenClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <div
        id="netflix-intro-container"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="netflixintro" data-letter="N">
          <div className="helper-1">
            <div className="effect-brush">
              {[...Array(31)].map((_, idx) => (
                <span key={`fur-1-${31 - idx}`} className={`fur-${31 - idx}`} />
              ))}
            </div>
            <div className="effect-lumieres">
              {[...Array(28)].map((_, idx) => (
                <span key={`lamp-${idx + 1}`} className={`lamp-${idx + 1}`} />
              ))}
            </div>
          </div>

          <div className="helper-2">
            <div className="effect-brush">
              {[...Array(31)].map((_, idx) => (
                <span key={`fur-2-${31 - idx}`} className={`fur-${31 - idx}`} />
              ))}
            </div>
          </div>

          <div className="helper-3">
            <div className="effect-brush">
              {[...Array(31)].map((_, idx) => (
                <span key={`fur-3-${31 - idx}`} className={`fur-${31 - idx}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
