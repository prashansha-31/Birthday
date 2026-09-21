'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Romantic sound synthesizer via Web Audio API (graceful fallback if blocked)
const playSound = (type, isMuted) => {
  if (isMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (type === 'twang') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.32);
      gain.gain.setValueAtTime(0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.32);
    } else if (type === 'chime') {
      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const start = ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 1.5);
      });
    }
  } catch {
    // Audio is a bonus feature; fail silently
  }
};

export default function CupidEntrance({ onComplete }) {
  // Stages: 'aim' -> 'firing' -> 'bloomed'
  const [stage, setStage] = useState('aim');
  const [isPulling, setIsPulling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [arrowY, setArrowY] = useState(510);

  // Generate 260 blooming blossoms positioned strictly along the parametric heart formula
  // Center of heart canopy: (300, 200)
  const blossoms = useMemo(() => {
    const list = [];
    const colors = [
      '#ff2a6d',
      '#ff6b8b',
      '#ff758f',
      '#ff85a1',
      '#f72585',
      '#b5179e',
      '#ffb3c1',
      '#ffccd5',
      '#ffd166',
      '#ff4d6d',
      '#c9184a',
      '#f06292',
    ];

    for (let i = 0; i < 280; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()); // Uniform interior distribution

      // Parametric cardioid/heart formula
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

      // Coordinate scaling centered at (300, 200)
      const x = 300 + hx * r * 8.8;
      const y = 200 + hy * r * 8.8;

      const scale = 0.55 + Math.random() * 0.7;
      const color = colors[i % colors.length];
      const delay = 0.35 + Math.random() * 1.6;
      const rotation = (Math.random() - 0.5) * 60;
      const isSakura = i % 3 === 0;

      list.push({ id: i, x, y, scale, color, delay, rotation, isSakura });
    }
    return list;
  }, []);

  // Shockwave burst particles on impact
  const burstParticles = useMemo(() => {
    const list = [];
    const colors = ['#ffd700', '#ff4081', '#ff80ab', '#ffffff', '#f50057'];
    for (let i = 0; i < 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const dist = 50 + Math.random() * 90;
      list.push({
        id: i,
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        color: colors[i % colors.length],
        delay: Math.random() * 0.1,
        size: 3 + Math.random() * 5,
      });
    }
    return list;
  }, []);

  // Ambient falling cherry petals
  const petals = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 13 + Math.random() * 15,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 6,
      rotate: Math.random() * 360,
    }));
  }, []);

  // Handle shooting arrow
  const handleFire = () => {
    if (stage !== 'aim') return;
    playSound('twang', isMuted);
    setStage('firing');
    setIsPulling(false);

    // Smooth arrow flight from 510 to 205 (target heart)
    setArrowY(205);

    // When arrow strikes target heart:
    setTimeout(() => {
      playSound('chime', isMuted);
      setStage('bloomed');
    }, 380);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setArrowY(510);
    setStage('aim');
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'radial-gradient(ellipse at 50% 35%, #fff6f8 0%, #fde8ee 45%, #f9c2d1 85%, #f4a2b9 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        userSelect: 'none',
        overflow: 'hidden',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* ── CSS Animations for Pure Smooth Performance ── */}
      <style>{`
        @keyframes heartBlossom {
          0% { transform: scale(0); opacity: 0; }
          65% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 0.95; }
        }
        .blossom-active {
          transform-origin: 0 0;
          animation: heartBlossom 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes pulseTarget {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .pulse-heart {
          animation: pulseTarget 1.8s ease-in-out infinite;
          transform-origin: 300px 200px;
        }
        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .floating-canopy {
          animation: floatGentle 4s ease-in-out infinite;
          transform-origin: 300px 200px;
        }
      `}</style>

      {/* ── Top Header Navigation Bar ── */}
      <header
        style={{
          width: '100%',
          padding: '12px clamp(16px, 4vw, 32px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 4px 18px rgba(224, 87, 128, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.3rem' }}>🏹</span>
          <span
            style={{
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#880e4f',
              letterSpacing: '0.04em',
            }}
          >
            Cupid&apos;s Birthday Archery
          </span>
          <span
            style={{
              background: '#fce4ec',
              color: '#c2185b',
              padding: '3px 10px',
              borderRadius: '12px',
              fontSize: '0.72rem',
              fontWeight: 600,
              border: '1px solid #f8bbd0',
            }}
          >
            Komal 🌸
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {stage === 'bloomed' && (
            <button
              onClick={handleReset}
              title="Shoot bow again"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(224, 87, 128, 0.4)',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#ad1457',
                cursor: 'pointer',
              }}
            >
              🔄 Replay Bow
            </button>
          )}

          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(224, 87, 128, 0.3)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: '#ad1457',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{isMuted ? '🔇 Sound Off' : '🔊 Sound On'}</span>
          </button>

          <button
            onClick={onComplete}
            style={{
              background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              padding: '7px 18px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(233, 30, 99, 0.28)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.03em',
            }}
          >
            Skip to Site ➔
          </button>
        </div>
      </header>

      {/* ── Main Stage Container ── */}
      <div
        onClick={handleFire}
        onMouseDown={() => stage === 'aim' && setIsPulling(true)}
        onMouseUp={handleFire}
        onTouchStart={() => stage === 'aim' && setIsPulling(true)}
        onTouchEnd={handleFire}
        style={{
          position: 'relative',
          flex: 1,
          width: '100%',
          maxWidth: '860px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: stage === 'aim' ? 'pointer' : 'default',
          padding: '0 16px',
        }}
      >
        {/* Stage 1 Aim Hint */}
        {stage === 'aim' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: '12px',
              textAlign: 'center',
              zIndex: 30,
              pointerEvents: 'none',
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
                color: '#880e4f',
                fontWeight: 600,
                margin: 0,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(255, 255, 255, 0.8)',
              }}
            >
              Aim for the Heart & Release
            </h2>
            <p
              style={{
                fontSize: 'clamp(0.8rem, 1.8vw, 0.95rem)',
                color: '#ad1457',
                margin: '4px 0 0 0',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              ✦ Tap anywhere to loose Cupid&apos;s arrow 🏹 ✦
            </p>
          </motion.div>
        )}

        {/* ── Responsive Scaled SVG Canvas (Exact 600x620 ViewBox) ── */}
        <svg
          viewBox="0 0 600 620"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: 'calc(100vh - 170px)',
            overflow: 'visible',
            zIndex: 10,
          }}
        >
          <defs>
            {/* Gold Bow Gradient */}
            <linearGradient id="bowGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#f3e5ab" />
              <stop offset="100%" stopColor="#aa771c" />
            </linearGradient>

            {/* Tree Bark Gradient */}
            <linearGradient id="treeBarkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2c1810" />
              <stop offset="45%" stopColor="#4e2c1d" />
              <stop offset="80%" stopColor="#633722" />
              <stop offset="100%" stopColor="#7a462d" />
            </linearGradient>

            {/* Target Heart Radial Glow */}
            <radialGradient id="targetHeartGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4081" />
              <stop offset="65%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#ad1457" />
            </radialGradient>

            {/* Drop Shadows */}
            <filter id="glowDrop" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#e91e63" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* ═══════════ TARGET HEART (AIM & FIRING STAGES) ═══════════ */}
          {(stage === 'aim' || stage === 'firing') && (
            <g className="pulse-heart">
              {/* Outer Decorative Ring */}
              <circle
                cx="300"
                cy="200"
                r="52"
                fill="none"
                stroke="rgba(233, 30, 99, 0.3)"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* Glowing Aura */}
              <circle
                cx="300"
                cy="200"
                r="40"
                fill="rgba(255, 64, 129, 0.2)"
              />

              {/* Target Heart Body */}
              <g transform="translate(300, 196)" filter="url(#glowDrop)">
                <path
                  d="M 0, -8 C -14, -26 -36, -14 -36, 6 C -36, 24 -8, 38 0, 48 C 8, 38 36, 24 36, 6 C 36, -14 14, -26 0, -8 Z"
                  fill="url(#targetHeartGrad)"
                />
                {/* Heart Center Star */}
                <text x="0" y="16" textAnchor="middle" fontSize="20" fill="#fff">
                  ✨
                </text>
              </g>
            </g>
          )}

          {/* ═══════════ BURST SHOCKWAVE PARTICLES (ON HIT) ═══════════ */}
          {stage === 'bloomed' && (
            <g>
              {burstParticles.map((p) => (
                <motion.circle
                  key={p.id}
                  cx="300"
                  cy="200"
                  r={p.size}
                  fill={p.color}
                  initial={{ cx: 300, cy: 200, opacity: 1 }}
                  animate={{
                    cx: 300 + p.x,
                    cy: 200 + p.y,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.75, delay: p.delay, ease: 'easeOut' }}
                />
              ))}
            </g>
          )}

          {/* ═══════════ ORGANIC SAKURA HEART TREE ═══════════ */}
          {stage === 'bloomed' && (
            <g>
              {/* Ground Mound / Grassy Base */}
              <ellipse cx="300" cy="580" rx="160" ry="18" fill="rgba(194, 24, 91, 0.12)" />
              <ellipse cx="300" cy="578" rx="110" ry="12" fill="rgba(173, 20, 87, 0.16)" />

              {/* Tree Trunk and Sprawling Branches */}
              <motion.g
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                style={{ transformOrigin: '300px 578px' }}
              >
                {/* Stately Curved Trunk */}
                <path
                  d="M 284,578 C 286,500 288,430 292,360 C 295,325 298,300 300,280 C 302,300 305,325 308,360 C 312,430 314,500 316,578 Z"
                  fill="url(#treeBarkGrad)"
                />

                {/* Left Branch spreading into Left Heart Lobe */}
                <path
                  d="M 293,360 C 275,320 235,280 200,250 C 170,225 155,185 160,150"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="11"
                  strokeLinecap="round"
                />

                {/* Left Outer Lower Twig */}
                <path
                  d="M 235,280 C 205,270 175,265 145,260"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Left Inner Branch */}
                <path
                  d="M 195,245 C 205,205 225,175 245,150"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Right Branch spreading into Right Heart Lobe */}
                <path
                  d="M 307,360 C 325,320 365,280 400,250 C 430,225 445,185 440,150"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="11"
                  strokeLinecap="round"
                />

                {/* Right Outer Lower Twig */}
                <path
                  d="M 365,280 C 395,270 425,265 455,260"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Right Inner Branch */}
                <path
                  d="M 405,245 C 395,205 375,175 355,150"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Center Ridge Branch */}
                <path
                  d="M 300,280 C 298,245 298,215 300,185"
                  fill="none"
                  stroke="url(#treeBarkGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </motion.g>

              {/* ═══════════ CANOPY OF 280 BLOOMING HEARTS & SAKURA FLOWERS ═══════════ */}
              <g className="floating-canopy">
                {blossoms.map((b) => (
                  <g
                    key={b.id}
                    transform={`translate(${b.x}, ${b.y}) rotate(${b.rotation})`}
                  >
                    <g
                      className="blossom-active"
                      style={{ animationDelay: `${b.delay}s` }}
                    >
                      {b.isSakura ? (
                        /* Delicate Sakura 5-Petal Blossom */
                        <g transform={`scale(${b.scale * 0.85})`}>
                          <circle cx="0" cy="-6" r="4.5" fill={b.color} />
                          <circle cx="5.7" cy="-1.8" r="4.5" fill={b.color} />
                          <circle cx="3.5" cy="4.8" r="4.5" fill={b.color} />
                          <circle cx="-3.5" cy="4.8" r="4.5" fill={b.color} />
                          <circle cx="-5.7" cy="-1.8" r="4.5" fill={b.color} />
                          <circle cx="0" cy="0" r="2.5" fill="#fff9c4" />
                        </g>
                      ) : (
                        /* Romantic Heart Flower */
                        <path
                          d="M 0,-4 C -5,-12 -12,-8 -12,-1 C -12,5 -3,11 0,16 C 3,11 12,5 12,-1 C 12,-8 5,-12 0,-4 Z"
                          fill={b.color}
                          transform={`scale(${b.scale})`}
                          filter="drop-shadow(0 2px 3px rgba(173, 20, 87, 0.2))"
                        />
                      )}
                    </g>
                  </g>
                ))}
              </g>
            </g>
          )}

          {/* ═══════════ CUPID'S RECURVE BOW & STRING (AIM & FIRING) ═══════════ */}
          {(stage === 'aim' || stage === 'firing') && (
            <g transform="translate(300, 520)">
              {/* Bow Limbs */}
              <path
                d="M -100,25 C -75,-25 -25,-40 0,-42 C 25,-40 75,-25 100,25"
                fill="none"
                stroke="url(#bowGoldGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                filter="drop-shadow(0 3px 6px rgba(0,0,0,0.18))"
              />

              {/* Bow Center Grip & End Finials */}
              <rect x="-12" y="-45" width="24" height="8" rx="4" fill="#880e4f" />
              <circle cx="0" cy="-41" r="3.5" fill="#ffd700" />
              <circle cx="-100" cy="25" r="4.5" fill="#ffd700" />
              <circle cx="100" cy="25" r="4.5" fill="#ffd700" />

              {/* Bowstring */}
              <path
                d={
                  isPulling
                    ? 'M -100,25 Q 0,22 100,25'
                    : stage === 'firing'
                    ? 'M -100,25 Q 0,-38 100,25'
                    : 'M -100,25 Q 0,-25 100,25'
                }
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                opacity="0.9"
                style={{
                  transition: stage === 'firing' ? 'all 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'all 0.1s ease',
                }}
              />
            </g>
          )}

          {/* ═══════════ CUPID'S ARROW (AIM & FIRING) ═══════════ */}
          {(stage === 'aim' || stage === 'firing') && (
            <g
              transform={`translate(300, ${arrowY + (isPulling ? 20 : 0)})`}
              style={{
                transition: stage === 'firing' ? 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.1s ease',
              }}
            >
              {/* Arrow Trail Effect during Flight */}
              {stage === 'firing' && (
                <line
                  x1="0"
                  y1="35"
                  x2="0"
                  y2="100"
                  stroke="rgba(255, 64, 129, 0.45)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              )}

              {/* Golden Shaft */}
              <line
                x1="0"
                y1="25"
                x2="0"
                y2="-70"
                stroke="#d4af37"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Heart Arrowhead */}
              <path
                d="M 0,-85 C -10,-72 -12,-58 0,-63 C 12,-58 10,-72 0,-85 Z"
                fill="#e91e63"
                stroke="#ffd700"
                strokeWidth="1.5"
              />

              {/* White Feathers Fletching */}
              <path d="M -9,22 L 0,12 L 9,22" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M -7,12 L 0,4 L 7,12" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="0" cy="25" r="3" fill="#d4af37" />
            </g>
          )}
        </svg>

        {/* ── STAGE 3: SLEEK FLOATING BIRTHDAY CELEBRATION CARD ── */}
        <AnimatePresence>
          {stage === 'bloomed' && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: '12px',
                width: 'calc(100% - 32px)',
                maxWidth: '540px',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                borderRadius: '24px',
                padding: '16px 24px',
                textAlign: 'center',
                boxShadow: '0 16px 40px rgba(194, 24, 91, 0.22), 0 0 0 1px rgba(233, 30, 99, 0.1)',
                zIndex: 60,
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  fontStyle: 'italic',
                  color: '#ad1457',
                  letterSpacing: '0.04em',
                }}
              >
                ✦ The arrow has found its mark ✦
              </div>

              <h1
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
                  color: '#880e4f',
                  margin: '2px 0 0 0',
                  lineHeight: 1.1,
                  textShadow: '0 3px 12px rgba(136, 14, 79, 0.15)',
                }}
              >
                Happy Birthday, Komal 🌸
              </h1>

              <p
                style={{
                  fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
                  color: '#4a2838',
                  marginTop: '4px',
                  marginBottom: '14px',
                  lineHeight: 1.45,
                  fontWeight: 400,
                }}
              >
                May this year bloom with all the boundless love, beauty, and magical memories you deserve.
              </p>

              <button
                onClick={onComplete}
                style={{
                  background: 'linear-gradient(135deg, #e91e63 0%, #ad1457 100%)',
                  color: '#fff',
                  fontSize: 'clamp(0.85rem, 1.9vw, 1rem)',
                  fontWeight: 600,
                  padding: '11px 32px',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(233, 30, 99, 0.38)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(233, 30, 99, 0.48)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(233, 30, 99, 0.38)';
                }}
              >
                Enter Komal&apos;s Birthday World 🌸 ✨
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating Cherry Blossom Petals Background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
          overflow: 'hidden',
        }}
      >
        {petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '-10%', x: `${p.x}vw`, rotate: p.rotate, opacity: 0 }}
            animate={{
              y: '110vh',
              x: `${p.x + (Math.sin(p.id) * 8)}vw`,
              rotate: p.rotate + 360,
              opacity: [0, 0.75, 0.75, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              fontSize: `${p.size}px`,
              filter: 'drop-shadow(0 2px 4px rgba(233, 30, 99, 0.15))',
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
