'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import NetflixIntroAnimation from './netflix/NetflixIntroAnimation';
import NetflixProfile from './netflix/NetflixProfile';
import NetflixMain from './netflix/NetflixMain';

export default function NetflixSection() {
  const [activeStage, setActiveStage] = useState('none'); // 'none' | 'intro' | 'profile' | 'main'

  const handleStartExperience = () => {
    setActiveStage('intro');
  };

  const handleClose = () => {
    setActiveStage('none');
  };

  return (
    <section
      id="netflix-experience"
      style={{
        background: 'linear-gradient(160deg, #0a0a0c 0%, #1a080d 50%, #0c0005 100%)',
        padding: '5rem 1.5rem',
        position: 'relative',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Subtle glowing red ambient light behind card */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(229,9,20,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div className="petal-divider">🎬 ✦ 🍿 ✦ 🍿</div>
          <h2 className="section-title" style={{ color: '#e50914' }}>
            Komal&apos;s Netflix Special 🍿
          </h2>
          <p className="section-subtitle" style={{ color: '#aaa' }}>
            An Exclusive Original Series Crafted Just For You
          </p>
        </ScrollReveal>

        {/* Feature Showcase Card */}
        <ScrollReveal delay={150}>
          <div
            style={{
              background: 'rgba(20,20,25,0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '2.5rem',
              border: '1px solid rgba(229,9,20,0.3)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(229,9,20,0.15)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              marginTop: '1.5rem',
            }}
          >
            {/* Netflix Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(229,9,20,0.15)',
                border: '1px solid rgba(229,9,20,0.4)',
                borderRadius: '30px',
                padding: '6px 16px',
                marginBottom: '1.25rem',
              }}
            >
              <span style={{ color: '#e50914', fontWeight: 900, fontSize: '1.1rem' }}>N</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: '#ffc1c4', textTransform: 'uppercase' }}>
                Netflix Original
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '1rem',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              &ldquo;Komal &amp; Kushagra — Season 1&rdquo;
            </h3>

            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: '#ddd',
                lineHeight: 1.7,
                maxWidth: '620px',
                marginBottom: '2rem',
              }}
            >
              Experience our love story in true Netflix style! Complete with iconic TUDUM sound effect, profile selection, custom movie categories, trailers, and memorable clips.
            </p>

            <button
              onClick={handleStartExperience}
              style={{
                background: 'linear-gradient(135deg, #e50914 0%, #b80710 100%)',
                color: '#fff',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1.05rem',
                fontWeight: 700,
                padding: '14px 38px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(229,9,20,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(229,9,20,0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(229,9,20,0.5)';
              }}
            >
              <span>🍿</span> Watch Netflix Special 🎬
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Fullscreen Interactive Netflix App Modal Flow */}
      <AnimatePresence>
        {activeStage !== 'none' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99990,
              background: '#000',
            }}
          >
            {activeStage === 'intro' && (
              <NetflixIntroAnimation onComplete={() => setActiveStage('profile')} />
            )}

            {activeStage === 'profile' && (
              <NetflixProfile onComplete={() => setActiveStage('main')} />
            )}

            {activeStage === 'main' && (
              <NetflixMain onClose={handleClose} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
