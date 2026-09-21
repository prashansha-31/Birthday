'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const miniLetters = [
  {
    id: 1,
    title: '1. Just You',
    emoji: '💌',
    color: '#c2687a',
    bg: 'linear-gradient(135deg, #fff0f5 0%, #f9c6d0 100%)',
    borderColor: '#f9c6d0',
    body: `Komal,\nI don’t need a perfect day to be happy. I just need a little time with you. ❤️ Somehow, even the simplest moments become special when you’re with me.`,
    quote: `You are my favourite part of every day. 🫶🏻`,
  },
  {
    id: 2,
    title: '2. My Person',
    emoji: '🥹',
    color: '#8b6aa7',
    bg: 'linear-gradient(135deg, #f5eaff 0%, #d4b8e0 100%)',
    borderColor: '#d4b8e0',
    body: `Sometimes I just look at you and think, "How did I get so lucky?" 🥹❤️\nYou came into my life so unexpectedly, but now I can’t imagine my future without you in it.`,
    quote: `You’re not just someone I love, you’re my person. ♾️`,
  },
  {
    id: 3,
    title: '3. Always Us',
    emoji: '🫶🏻',
    color: '#d4956a',
    bg: 'linear-gradient(135deg, #fff5e8 0%, #ffd6b0 100%)',
    borderColor: '#ffd6b0',
    body: `No matter how busy life gets or how much things change, I hope we always find our way back to these little moments — laughing together, talking about nothing, and simply being us. ❤️`,
    quote: `Because with you, ordinary moments feel extraordinary. 🫶🏻`,
  },
  {
    id: 4,
    title: '4. A Little Promise',
    emoji: '♾️',
    color: '#c2687a',
    bg: 'linear-gradient(135deg, #ffeef2 0%, #f4a7b9 100%)',
    borderColor: '#f4a7b9',
    body: `Komal,\nI can’t promise that every day will be perfect, but I can promise that I’ll always try to make you smile, stand beside you, and choose you again and again. ❤️`,
    quote: `Today, tomorrow, and every day after that — it’s you. ♾️`,
  },
];

export default function LoveLettersSection() {
  const [bigLetterOpened, setBigLetterOpened] = useState(false);
  const [activeMiniId, setActiveMiniId] = useState(null);

  const toggleMini = (id) => {
    setActiveMiniId(activeMiniId === id ? null : id);
  };

  return (
    <section
      id="love-letters"
      style={{
        background: 'linear-gradient(160deg, #fff5e8 0%, #fff0f5 50%, #f5eaff 100%)',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(249,198,208,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(212,184,224,0.2) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div className="petal-divider">💌 ✦ 💌</div>
          <h2 className="section-title">Mini Love Letters</h2>
          <p className="section-subtitle">
            A big letter holding 4 little handwritten notes inside for Komal
          </p>
        </ScrollReveal>

        {/* Big Envelope Box */}
        <ScrollReveal delay={150}>
          <div style={{ marginTop: '2rem' }}>
            {!bigLetterOpened ? (
              /* Big Sealed Envelope Button */
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setBigLetterOpened(true)}
                style={{
                  background: 'linear-gradient(145deg, #ffffff 0%, #fff0f5 100%)',
                  borderRadius: '28px',
                  padding: '3.5rem 2rem',
                  border: '2px solid rgba(249,198,208,0.8)',
                  boxShadow: '0 20px 50px rgba(194,104,122,0.15), 0 0 0 8px rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative Flap Triangle */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '180px solid transparent',
                    borderRight: '180px solid transparent',
                    borderTop: '70px solid rgba(249,198,208,0.3)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Big Wax Seal */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c2687a 0%, #9e4758 100%)',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    color: '#fff',
                    boxShadow: '0 8px 25px rgba(194,104,122,0.4)',
                    border: '3px solid #fff',
                    animation: 'heartBeat 3s ease-in-out infinite',
                  }}
                >
                  💌
                </div>

                <h3
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
                    color: '#c2687a',
                    marginBottom: '0.5rem',
                  }}
                >
                  For My Dearest Komal
                </h3>

                <p
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '0.95rem',
                    color: '#7a5a68',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  ✦ Tap the Big Letter to Open &amp; Unfold ✦
                </p>
              </motion.div>
            ) : (
              /* Opened Big Letter Box revealing 4 Mini Letters */
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '28px',
                  padding: '2.5rem 2rem',
                  border: '2px solid rgba(249,198,208,0.8)',
                  boxShadow: '0 20px 50px rgba(194,104,122,0.15)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2rem',
                    borderBottom: '1px dashed rgba(249,198,208,0.8)',
                    paddingBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>📬</span>
                    <span
                      style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: '2rem',
                        color: '#c2687a',
                      }}
                    >
                      4 Mini Letters Inside
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setBigLetterOpened(false);
                      setActiveMiniId(null);
                    }}
                    style={{
                      background: 'rgba(249,198,208,0.3)',
                      color: '#c2687a',
                      border: '1px solid rgba(249,198,208,0.7)',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Fold Back 💌
                  </button>
                </div>

                {/* Grid of 4 Mini Letters */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {miniLetters.map((letter) => {
                    const isOpen = activeMiniId === letter.id;
                    return (
                      <motion.div
                        key={letter.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: letter.bg,
                          borderRadius: '20px',
                          border: `2px solid ${letter.borderColor}`,
                          overflow: 'hidden',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
                        }}
                      >
                        {/* Mini Envelope Top Header */}
                        <div
                          onClick={() => toggleMini(letter.id)}
                          style={{
                            padding: '1.25rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            userSelect: 'none',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>{letter.emoji}</span>
                            <span
                              style={{
                                fontFamily: "'Great Vibes', cursive",
                                fontSize: '1.5rem',
                                color: letter.color,
                                fontWeight: 600,
                              }}
                            >
                              {letter.title}
                            </span>
                          </div>

                          <span
                            style={{
                              fontSize: '1rem',
                              color: letter.color,
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                            }}
                          >
                            ▼
                          </span>
                        </div>

                        {/* Unfolded Mini Letter Body */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35 }}
                              style={{
                                background: 'rgba(255,255,255,0.92)',
                                borderTop: `1px dashed ${letter.borderColor}`,
                                padding: '1.5rem',
                              }}
                            >
                              {/* Notebook Lines Paper */}
                              <div
                                style={{
                                  backgroundImage:
                                    'repeating-linear-gradient(transparent, transparent 27px, rgba(212,184,224,0.2) 27px, rgba(212,184,224,0.2) 28px)',
                                  backgroundSize: '100% 28px',
                                  padding: '0.5rem 0',
                                }}
                              >
                                <p
                                  style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: '1.1rem',
                                    color: '#5a3d4a',
                                    lineHeight: 1.8,
                                    whiteSpace: 'pre-line',
                                    margin: 0,
                                  }}
                                >
                                  {letter.body}
                                </p>

                                <div
                                  style={{
                                    marginTop: '1.25rem',
                                    paddingTop: '0.75rem',
                                    borderTop: `1px solid ${letter.borderColor}`,
                                  }}
                                >
                                  <p
                                    style={{
                                      fontFamily: "'Cormorant Garamond', serif",
                                      fontSize: '1.15rem',
                                      fontWeight: 700,
                                      color: letter.color,
                                      margin: 0,
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    {letter.quote}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
