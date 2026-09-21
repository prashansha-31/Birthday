'use client';
import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const BALLOON_EMOJIS = ['🎈', '🎀', '🎊', '💗', '✨', '🌸', '💖', '🎉'];
const BALLOON_COLORS = [
  '#f9c6d0', '#d4b8e0', '#ffd6b0', '#b8e0d4', '#f5d67a',
  '#f4a7b9', '#c8a8e0', '#ffc4a4',
];

// Fixed stable initial balloons — NO Math.random() so SSR matches client
const INITIAL_BALLOONS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  emoji: BALLOON_EMOJIS[i % BALLOON_EMOJIS.length],
  color: BALLOON_COLORS[i % BALLOON_COLORS.length],
  popped: false,
  // stable sizes/delays — will be randomized on client via useEffect
  animDelay: 0,
  size: 3.5,
}));

function ConfettiPiece({ x, y, color }) {
  return (
    <span
      style={{
        position: 'fixed',
        left: x,
        top: y,
        fontSize: '10px',
        color,
        animation: 'confettiFall 1.8s ease-out forwards',
        pointerEvents: 'none',
        zIndex: 9999,
        userSelect: 'none',
      }}
    >
      ●
    </span>
  );
}

export default function SurpriseSection() {
  const [balloons, setBalloons] = useState(INITIAL_BALLOONS);
  const [confetti, setConfetti] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [allPopped, setAllPopped] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Randomize balloon sizes/delays ONLY on client to avoid hydration mismatch
  useEffect(() => {
    setBalloons(prev =>
      prev.map((b, i) => ({
        ...b,
        size: 3 + Math.random() * 2,
        animDelay: Math.random() * 2,
      }))
    );
  }, []);

  const popBalloon = (id, event) => {
    const { clientX, clientY } = event;
    const newConfetti = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: clientX + (Math.random() - 0.5) * 100,
      y: clientY + (Math.random() - 0.5) * 60,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    }));

    setConfetti(prev => [...prev, ...newConfetti]);
    setTimeout(
      () => setConfetti(prev => prev.filter(c => !newConfetti.find(n => n.id === c.id))),
      2200
    );

    setBalloons(prev => prev.map(b => (b.id === id ? { ...b, popped: true } : b)));

    setPoppedCount(p => {
      const next = p + 1;
      if (next === 12) {
        setTimeout(() => setShowMessage(true), 400);
        setAllPopped(true);
      }
      return next;
    });
  };

  return (
    <section
      id="surprise"
      style={{
        background: 'linear-gradient(160deg, #f5eaff 0%, #fff0f5 50%, #fff5e8 100%)',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
      }}
    >
      {/* Confetti burst particles */}
      {confetti.map(c => (
        <ConfettiPiece key={c.id} x={c.x} y={c.y} color={c.color} />
      ))}

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div className="petal-divider">🎉 ✦ 🎊</div>
          <h2 className="section-title">A Little Surprise for You!</h2>
          <p className="section-subtitle">
            Pop all the balloons for a special message — don&apos;t be shy! 🎈
          </p>
        </ScrollReveal>

        {/* Score */}
        <ScrollReveal delay={200}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '1rem',
              color: '#7a5a68',
            }}
          >
            Popped:{' '}
            <span style={{ fontWeight: 700, color: '#c2687a', fontSize: '1.2rem' }}>
              {poppedCount}
            </span>{' '}
            / 12 🎈
          </div>
        </ScrollReveal>

        {/* Balloon grid */}
        <ScrollReveal delay={300}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '1.5rem',
              justifyItems: 'center',
              padding: '2rem',
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: '32px',
              border: '1px solid rgba(249,198,208,0.4)',
              marginBottom: '2rem',
            }}
          >
            {balloons.map(balloon => (
              <div
                key={balloon.id}
                onClick={!balloon.popped ? e => popBalloon(balloon.id, e) : undefined}
                className={balloon.popped ? '' : 'balloon'}
                style={{
                  fontSize: `${balloon.size}rem`,
                  cursor: balloon.popped ? 'default' : 'pointer',
                  opacity: balloon.popped ? 0.15 : 1,
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                  animationDelay: `${balloon.animDelay}s`,
                  filter: balloon.popped
                    ? 'grayscale(1)'
                    : 'drop-shadow(0 8px 16px rgba(194,104,122,0.25))',
                  userSelect: 'none',
                  transform: balloon.popped ? 'scale(0.1)' : undefined,
                }}
                title={balloon.popped ? 'Popped! 🎊' : 'Click to pop! 🎈'}
              >
                {balloon.popped ? '💨' : balloon.emoji}
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Reveal message */}
        {showMessage && (
          <div
            style={{
              textAlign: 'center',
              animation: 'scaleIn 0.6s ease',
              padding: '3rem 2rem',
              background: 'linear-gradient(135deg, rgba(249,198,208,0.4), rgba(212,184,224,0.4))',
              borderRadius: '32px',
              border: '2px solid rgba(249,198,208,0.6)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎊</div>
            <h3
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#c2687a',
                marginBottom: '1rem',
              }}
            >
              You found the secret message!
            </h3>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                color: '#5a3d4a',
                fontStyle: 'italic',
                lineHeight: 1.8,
                maxWidth: '500px',
                margin: '0 auto',
              }}
            >
              Komal, just like each balloon you popped, you have a way of making every moment brighter
              and more colorful. I love you more than all the stars in the sky. 🌟
            </p>
            <div
              style={{
                marginTop: '1.5rem',
                fontFamily: "'Great Vibes', cursive",
                fontSize: '2rem',
                color: '#8b6aa7',
              }}
            >
              Happy Birthday, my love! 💕
            </div>
          </div>
        )}

        {!allPopped && (
          <p
            style={{
              textAlign: 'center',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.85rem',
              color: '#7a5a68',
              marginTop: '1.5rem',
              opacity: 0.7,
            }}
          >
            🎈 Pop all 12 balloons to reveal your surprise message!
          </p>
        )}
      </div>
    </section>
  );
}
