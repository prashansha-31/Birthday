'use client';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

export default function RokaSection() {
  return (
    <section
      id="roka"
      style={{
        background: 'linear-gradient(160deg, #fff0f5 0%, #f5eaff 50%, #fff5e8 100%)',
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14rem',
          opacity: 0.03,
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        💍
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div className="petal-divider">🌸 ꩜ 🌸</div>
          <h2 className="section-title">Our Roka 💍</h2>
          <p className="section-subtitle">14th December, 2025</p>
        </ScrollReveal>

        {/* Two photos side by side, moderate size */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginTop: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Photo 1 — Family blessings */}
          <ScrollReveal delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div
                className="photo-frame"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '3/4',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(194,104,122,0.2), 6px 6px 0 rgba(249,198,208,0.4)',
                  margin: '0 auto',
                }}
              >
                <Image
                  src="/assets/roka_family.jpg"
                  alt="Our Roka — Family Blessings"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
                  sizes="(max-width: 768px) 80vw, 320px"
                />
                {/* Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '30px',
                    padding: '0.3rem 0.85rem',
                    fontSize: '0.7rem',
                    color: '#c2687a',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  🙏 Family Blessings
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Photo 2 — Together */}
          <ScrollReveal delay={250}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div
                className="photo-frame"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '320px',
                  aspectRatio: '3/4',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(139,106,167,0.2), -6px 6px 0 rgba(212,184,224,0.4)',
                  margin: '0 auto',
                }}
              >
                <Image
                  src="/assets/roka_together.jpg"
                  alt="Our Roka — Together"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                  sizes="(max-width: 768px) 80vw, 320px"
                />
                {/* Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(255,255,255,0.88)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '30px',
                    padding: '0.3rem 0.85rem',
                    fontSize: '0.7rem',
                    color: '#8b6aa7',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  🦚 Our First Yes
                </div>
                {/* Heart stamp */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    right: '0.75rem',
                    fontSize: '1.5rem',
                    animation: 'heartBeat 2s ease-in-out infinite',
                    filter: 'drop-shadow(0 4px 8px rgba(194,104,122,0.4))',
                  }}
                >
                  💍
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* The story — Kushagra's heartfelt words */}
        <ScrollReveal delay={350}>
          <div
            className="glass-card"
            style={{
              padding: '2rem 2.5rem',
              marginBottom: '2rem',
              borderLeft: '4px solid #c2687a',
              borderRadius: '12px 24px 24px 12px',
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#5a3d4a',
                lineHeight: 2,
              }}
            >
              The day of our roka was the very first day we met… and maybe that&apos;s why it will always be one of the most special days of my life. 🥹❤️
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#5a3d4a',
                lineHeight: 2,
                marginTop: '1rem',
              }}
            >
              When you saw me for the first time, the happiness on your face made me so happy from within. You really liked my clothes, and you even noticed the <strong style={{ color: '#c2687a' }}>peacock feather 🦚</strong> on my blazer — that little moment became so special to me. 🫶🏻
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#5a3d4a',
                lineHeight: 2,
                marginTop: '1rem',
              }}
            >
              That day, I was a little nervous and a little awkward too, but meeting you brought a different kind of comfort.
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#5a3d4a',
                lineHeight: 2,
                marginTop: '1rem',
              }}
            >
              That day wasn&apos;t just about our roka; it was the beginning of a beautiful chapter in my story, with <strong style={{ color: '#8b6aa7' }}>&ldquo;Komal&rdquo;</strong> in it. ❤️
            </p>
          </div>
        </ScrollReveal>

        {/* Closing quote */}
        <ScrollReveal delay={500}>
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(249,198,208,0.2), rgba(212,184,224,0.2))',
              borderRadius: '24px',
              border: '1px solid rgba(249,198,208,0.4)',
            }}
          >
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(1.3rem, 3.5vw, 2.2rem)',
                color: '#c2687a',
                lineHeight: 1.5,
              }}
            >
              &ldquo;From our first meeting to a lifetime together — let&apos;s always remain &lsquo;us.&rsquo; ♾️❤️&rdquo;
            </p>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.85rem',
                color: '#7a5a68',
                marginTop: '0.75rem',
                letterSpacing: '0.1em',
              }}
            >
              — Kushagra 💕
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
