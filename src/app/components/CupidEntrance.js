'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CupidEntrance({ onComplete }) {
  // States: 'aim' -> 'firing' -> 'blooming' -> 'done'
  const [stage, setStage] = useState('aim');
  const [bloomedHearts, setBloomedHearts] = useState([]);
  const canvasRef = useRef(null);

  // Generate blooming heart positions using heart parametric formula
  useEffect(() => {
    const list = [];
    const colors = ['#f44336', '#e91e63', '#ec407a', '#ff4081', '#f06292', '#ff80ab', '#ffb74d', '#ffd54f', '#f06292', '#e91e63'];
    const total = 320;

    for (let i = 0; i < total; i++) {
      // Sample inside parametric heart
      let t = Math.random() * Math.PI * 2;
      let r = Math.sqrt(Math.random()); // uniform distribution inside shape

      // Parametric heart
      let hx = 16 * Math.pow(Math.sin(t), 3);
      let hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // Scale & position relative to heart canopy center
      let x = hx * r * 9.5;
      let y = hy * r * 9.5 - 120; // Shift above tree trunk

      let scale = 0.5 + Math.random() * 0.8;
      let color = colors[Math.floor(Math.random() * colors.length)];
      let delay = Math.random() * 1.8; // Staggered blooming delay
      let rotation = (Math.random() - 0.5) * 45;

      list.push({ id: i, x, y, scale, color, delay, rotation });
    }

    setBloomedHearts(list);
  }, []);

  const handleShoot = () => {
    if (stage !== 'aim') return;
    setStage('firing');
    setTimeout(() => {
      setStage('blooming');
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#09070f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: "'Courier New', Courier, monospace",
        color: '#fff',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* ── MacOS Top Window Header Bar ── */}
      <div
        style={{
          width: '100%',
          background: '#120d1c',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
          <span style={{ marginLeft: 12, fontWeight: 600, color: '#f9c6d0', fontFamily: 'Outfit, sans-serif' }}>
            Happy Birthday · draw the bow, hit the heart
          </span>
        </div>

        <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>localhost / birthday</div>
      </div>

      {/* ── Main Archery & Blooming Stage ── */}
      <div
        onClick={handleShoot}
        style={{
          flex: 1,
          width: '100%',
          background: 'radial-gradient(circle at 50% 40%, #fff8f5 0%, #faede8 60%, #f7e2db 100%)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: stage === 'aim' ? 'pointer' : 'default',
          overflow: 'hidden',
        }}
      >
        {/* Soft background glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,30,99,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Stage 1: Aiming Instructions & Target Heart ── */}
        {stage === 'aim' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: '120px',
              textAlign: 'center',
              color: '#3a2028',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.8rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              zIndex: 10,
            }}
          >
            Aim for the heart
            <div style={{ fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif', color: '#8b6aa7', marginTop: '4px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              ✦ tap anywhere to release cupid&apos;s arrow 🏹 ✦
            </div>
          </motion.div>
        )}

        {/* Target Sphere (in Aim stage) */}
        {stage === 'aim' && (
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '40%',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #e91e63 0%, #880e4f 100%)',
              boxShadow: '0 10px 30px rgba(233,30,99,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '2.2rem',
              zIndex: 5,
            }}
          >
            💗
          </motion.div>
        )}

        {/* Cupid Recurve Bow (in Aim & Firing stage) */}
        {(stage === 'aim' || stage === 'firing') && (
          <div
            style={{
              position: 'absolute',
              bottom: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 8,
            }}
          >
            {/* Arrow shooting upward animation */}
            <motion.div
              animate={stage === 'firing' ? { y: -380, opacity: [1, 1, 0] } : { y: 0 }}
              transition={{ duration: 0.55, ease: 'easeIn' }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Arrow Head */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderBottom: '14px solid #c2687a',
                }}
              />
              {/* Shaft */}
              <div style={{ width: '3px', height: '90px', background: '#5a3d4a' }} />
              {/* Golden Winged Fletch */}
              <div style={{ fontSize: '0.9rem', color: '#ffd54f', marginTop: '-6px' }}>🪶</div>
            </motion.div>

            {/* Recurve Bow SVG */}
            <svg width="120" height="70" viewBox="0 0 120 70" style={{ marginTop: '-20px' }}>
              {/* Limb */}
              <path
                d="M 10,60 Q 60,-10 110,60"
                fill="none"
                stroke="#5a3d4a"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* String */}
              <line
                x1="10"
                y1="60"
                x2="110"
                y2="60"
                stroke="#d4b8e0"
                strokeWidth="2"
              />
            </svg>
          </div>
        )}

        {/* ── Stage 3: Blooming Tree & Heart Leaves ── */}
        {stage === 'blooming' && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Growing Dark Elegant Tree Trunk */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '240px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: '100px',
                width: '12px',
                background: 'linear-gradient(to top, #3e2723 0%, #5d4037 100%)',
                borderRadius: '6px',
                transformOrigin: 'bottom center',
                zIndex: 2,
              }}
            >
              {/* Main Branches */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '-40px',
                  width: '50px',
                  height: '6px',
                  background: '#5d4037',
                  borderRadius: '3px',
                  transform: 'rotate(-35deg)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '-40px',
                  width: '50px',
                  height: '6px',
                  background: '#5d4037',
                  borderRadius: '3px',
                  transform: 'rotate(35deg)',
                }}
              />
            </motion.div>

            {/* Heart-Shaped Canopy of Blooming Hearts */}
            <div
              style={{
                position: 'absolute',
                bottom: '340px',
                width: 0,
                height: 0,
                zIndex: 3,
              }}
            >
              {bloomedHearts.map((h) => (
                <motion.div
                  key={h.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: h.scale, opacity: 1 }}
                  transition={{ delay: h.delay, duration: 0.6, ease: 'backOut' }}
                  style={{
                    position: 'absolute',
                    left: `${h.x}px`,
                    top: `${h.y}px`,
                    fontSize: '1.2rem',
                    color: h.color,
                    transform: `rotate(${h.rotation}deg)`,
                    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))',
                  }}
                >
                  💗
                </motion.div>
              ))}
            </div>

            {/* Script Text & Happy Birthday Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              style={{
                position: 'absolute',
                left: ' clamp(16px, 8vw, 60px)',
                bottom: '140px',
                zIndex: 10,
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontStyle: 'italic',
                  color: '#6a4050',
                  marginBottom: '0.2rem',
                }}
              >
                and... make it count
              </div>

              <h1
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
                  color: '#c2687a',
                  lineHeight: 1.1,
                  margin: 0,
                  textShadow: '0 4px 15px rgba(194,104,122,0.2)',
                }}
              >
                Happy Birthday
              </h1>

              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
                  color: '#7a5a68',
                  marginTop: '0.4rem',
                  letterSpacing: '0.05em',
                }}
              >
                here&apos;s to a year that blooms ✨
              </div>

              <button
                onClick={onComplete}
                style={{
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #c2687a 0%, #8b6aa7 100%)',
                  color: '#fff',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  padding: '10px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(194,104,122,0.4)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Enter Komal&apos;s Birthday World 🌸
              </button>
            </motion.div>
          </div>
        )}
      </div>


    </motion.div>
  );
}
