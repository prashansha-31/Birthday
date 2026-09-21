'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ScreenContainer from './ScreenContainer';
import { PROFILE } from './netflixData';

export default function NetflixProfile({ onComplete }) {
  const [selected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(true);
    setTimeout(() => {
      onComplete?.();
    }, 300);
  };

  return (
    <ScreenContainer>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: '#141414',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
        }}
      >
        {/* Netflix Logo Header */}
        <div style={{ position: 'fixed', top: '24px', left: '32px', zIndex: 50 }}>
          <img
            src="/videos/netflix.svg"
            alt="Netflix"
            style={{ width: 'clamp(70px, 10vw, 100px)', height: 'auto' }}
            draggable={false}
          />
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              fontWeight: 400,
              fontSize: 'clamp(24px, 5vw, 44px)',
              color: '#fff',
              letterSpacing: '-0.01em',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Who&apos;s Watching?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            onClick={handleSelect}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            className="nf-profile-wrap"
          >
            <div
              style={{
                position: 'relative',
                width: 'clamp(130px, 28vw, 180px)',
                height: 'clamp(130px, 28vw, 180px)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: selected ? '4px solid #e50914' : '3px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                boxShadow: selected ? '0 0 30px rgba(229,9,20,0.6)' : '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              <Image
                src={PROFILE.image}
                alt={PROFILE.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                sizes="180px"
                draggable={false}
              />
            </div>

            <span
              style={{
                marginTop: '1rem',
                fontSize: 'clamp(16px, 3vw, 22px)',
                fontWeight: 500,
                color: selected ? '#fff' : '#aaa',
                transition: 'color 0.3s',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {PROFILE.name}
            </span>
          </motion.div>

          <button
            onClick={handleSelect}
            style={{
              marginTop: '1.5rem',
              padding: '10px 36px',
              border: `1px solid ${selected ? '#e50914' : '#555'}`,
              background: selected ? '#e50914' : 'transparent',
              color: selected ? '#fff' : '#aaa',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              cursor: 'pointer',
              transition: 'all 0.3s',
              borderRadius: 4,
            }}
          >
            Enter Netflix
          </button>
        </div>

        <style jsx global>{`
          @media (hover: hover) {
            .nf-profile-wrap:hover div {
              border-color: #e50914 !important;
              transform: scale(1.05);
            }
            .nf-profile-wrap:hover span {
              color: #fff !important;
            }
          }
        `}</style>
      </div>
    </ScreenContainer>
  );
}
