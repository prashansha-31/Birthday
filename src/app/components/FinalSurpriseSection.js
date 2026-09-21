'use client';
import { useState } from 'react';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

const wishes = [
  { id: 1, emoji: '🌸', title: 'Endless Joy', text: 'May every single day of this new year of your life be filled with laughter, warmth, and all the little things that make your heart happy.', color: '#c2687a' },
  { id: 2, emoji: '⭐', title: 'Your Dreams', text: 'Every dream you hold, every wish you whisper — I hope they all come true, one beautiful day at a time.', color: '#8b6aa7' },
  { id: 3, emoji: '💐', title: 'Our Future', text: 'I look forward to every adventure, every quiet evening, and every milestone we will share as we build our beautiful life together.', color: '#d4956a' },
  { id: 4, emoji: '🕯️', title: 'Always Loved', text: 'No matter where life takes us, know that you are deeply, endlessly, completely loved — by me, always.', color: '#5a8fa7' },
];

const SPARKLE_POS = [
  { top: '10%', left: '5%', delay: '0s', size: '1.2rem' },
  { top: '20%', right: '8%', delay: '0.5s', size: '0.9rem' },
  { top: '60%', left: '3%', delay: '1s', size: '1rem' },
  { top: '75%', right: '5%', delay: '1.5s', size: '1.3rem' },
  { bottom: '10%', left: '15%', delay: '0.8s', size: '0.8rem' },
  { top: '40%', right: '2%', delay: '0.3s', size: '1.1rem' },
];

export default function FinalSurpriseSection() {
  const [revealed, setRevealed] = useState([]);

  const revealCard = (id) => {
    if (!revealed.includes(id)) {
      setRevealed(prev => [...prev, id]);
    }
  };

  return (
    <section
      id="final-surprise"
      style={{
        background: 'linear-gradient(160deg, #fff0f5 0%, #f5eaff 30%, #fff5e8 70%, #fff0f5 100%)',
        padding: '6rem 1.5rem 8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sparkles */}
      {SPARKLE_POS.map((pos, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            ...pos,
            animationDelay: pos.delay,
            fontSize: pos.size,
          }}
        >
          ✨
        </span>
      ))}

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div className="petal-divider">✨ 💖 ✨</div>
          <h2 className="section-title" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}>
            The Last Surprise
          </h2>
          <p className="section-subtitle">
            Four wishes, sealed with love — click each card to open your gift 🎁
          </p>
        </ScrollReveal>

        {/* Wish cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.5rem',
            margin: '2rem 0 4rem',
          }}
        >
          {wishes.map((wish, idx) => {
            const isOpen = revealed.includes(wish.id);
            return (
              <ScrollReveal key={wish.id} delay={idx * 120}>
                <div
                  onClick={() => revealCard(wish.id)}
                  style={{
                    cursor: isOpen ? 'default' : 'pointer',
                    perspective: '1000px',
                  }}
                >
                  <div
                    style={{
                      background: isOpen
                        ? 'rgba(255,255,255,0.85)'
                        : `linear-gradient(135deg, ${wish.color}22, ${wish.color}44)`,
                      border: `2px solid ${wish.color}55`,
                      borderRadius: '24px',
                      padding: '2rem 1.5rem',
                      textAlign: 'center',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.5s ease',
                      boxShadow: isOpen
                        ? `0 20px 60px ${wish.color}33`
                        : `0 8px 30px ${wish.color}22`,
                      transform: isOpen ? 'scale(1.03)' : 'scale(1)',
                      animation: isOpen ? 'scaleIn 0.4s ease' : 'none',
                      minHeight: '220px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                    }}
                  >
                    <div style={{ fontSize: isOpen ? '2.5rem' : '3rem', transition: 'font-size 0.4s ease' }}>
                      {isOpen ? wish.emoji : '🎁'}
                    </div>

                    {isOpen ? (
                      <>
                        <h3
                          style={{
                            fontFamily: "'Great Vibes', cursive",
                            fontSize: '1.6rem',
                            color: wish.color,
                          }}
                        >
                          {wish.title}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '0.95rem',
                            color: '#5a3d4a',
                            lineHeight: 1.8,
                            fontStyle: 'italic',
                          }}
                        >
                          {wish.text}
                        </p>
                      </>
                    ) : (
                      <>
                        <p
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontSize: '0.8rem',
                            color: wish.color,
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          Tap to Open 🎁
                        </p>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '0.9rem',
                            color: '#7a5a68',
                            fontStyle: 'italic',
                          }}
                        >
                          A wish awaits...
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Grand finale */}
        <ScrollReveal delay={500}>
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'linear-gradient(135deg, rgba(249,198,208,0.3), rgba(212,184,224,0.3), rgba(255,214,176,0.3))',
              borderRadius: '40px',
              border: '2px solid rgba(249,198,208,0.5)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '4rem',
            }}
          >
            {/* Background hearts */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12rem',
                opacity: 0.04,
                pointerEvents: 'none',
                animation: 'heartBeat 3s ease-in-out infinite',
              }}
            >
              💕
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'heartBeat 2s ease-in-out infinite' }}>
                💍
              </div>
              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                  color: '#c2687a',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                To My Komal,
                <br />
                My Forever ❤️
              </h2>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  color: '#5a3d4a',
                  lineHeight: 1.9,
                  maxWidth: '600px',
                  margin: '0 auto',
                  fontStyle: 'italic',
                }}
              >
                From the moment we said yes to each other, my life became a more beautiful story. You are my favorite person, my peace, my adventure, my home. I am so grateful for every moment with you.
                <br /><br />
                This is just the beginning of everything we are going to be. Happy birthday, my love. May this year be the most wonderful one yet — because you deserve nothing less than magic.
              </p>
              <div
                style={{
                  marginTop: '2.5rem',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '1rem',
                  color: '#7a5a68',
                  letterSpacing: '0.05em',
                }}
              >
                With all my heart,
              </div>
              <div
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '2.5rem',
                  color: '#8b6aa7',
                  marginTop: '0.25rem',
                }}
              >
                Kushagra 💕
              </div>

              {/* Final emojis */}
              <div
                style={{
                  marginTop: '2rem',
                  fontSize: '2rem',
                  letterSpacing: '0.5rem',
                  animation: 'heartBeat 2.5s ease-in-out infinite',
                }}
              >
                💕 🌸 💕 🌸 💕
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Divine Ending — Radha Rani Ashirvaad Section */}
        <ScrollReveal delay={700}>
          <div
            style={{
              textAlign: 'center',
              padding: '3.5rem 2rem',
              background: 'linear-gradient(145deg, rgba(255,245,232,0.95), rgba(255,238,245,0.95))',
              borderRadius: '36px',
              border: '2px solid rgba(229,180,110,0.6)',
              boxShadow: '0 20px 60px rgba(194,104,122,0.15), 0 0 40px rgba(255,214,176,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Peacock Feather Icon */}
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '0.75rem',
                animation: 'heartBeat 3s ease-in-out infinite',
              }}
            >
              🦚
            </div>

            <h2
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                color: '#b85c37',
                marginBottom: '1.5rem',
              }}
            >
              In the end… ❤️
            </h2>

            {/* Radha Krishna Darshan Photo */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                aspectRatio: '4/3',
                margin: '0 auto 2rem',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(184,92,55,0.25), 0 0 0 6px rgba(255,255,255,0.8)',
                border: '3px solid rgba(229,180,110,0.8)',
              }}
            >
              <Image
                src="/assets/radha_krishna.jpg"
                alt="Sri Sri Radha Krishna Darshan"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </div>

            {/* Devotional Text */}
            <div
              style={{
                maxWidth: '650px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.1rem, 2.3vw, 1.35rem)',
                  color: '#4a2e35',
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                Shayad humara milna sirf ek ittefaq nahi tha.
                <br />
                <strong style={{ color: '#b85c37', fontWeight: 700 }}>
                  Radha Rani ke ashirvaad se hum dono mile hain
                </strong>
                , aur unki kripa se hi hamara rishta itna khoobsurat bana hai. 🦚❤️
              </p>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.1rem, 2.3vw, 1.35rem)',
                  color: '#4a2e35',
                  lineHeight: 1.9,
                  margin: 0,
                }}
              >
                Bas yunhi unka ashirvaad hum dono par bana rahe, aur humara saath hamesha bana rahe. 🫶🏻
              </p>

              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1.25rem 2rem',
                  background: 'linear-gradient(135deg, rgba(229,180,110,0.2), rgba(194,104,122,0.15))',
                  borderRadius: '50px',
                  border: '1px solid rgba(229,180,110,0.5)',
                  display: 'inline-block',
                }}
              >
                <p
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                    color: '#b85c37',
                    margin: 0,
                  }}
                >
                  Prem se bolo… Radhe Radhe! 🙏🏻❤️🌸
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
