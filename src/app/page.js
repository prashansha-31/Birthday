'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import VideoEntrance from './components/VideoEntrance';
import ConfettiBackground from './components/FloatingHearts';
import HeroSection from './components/HeroSection';
import RokaSection from './components/RokaSection';
import MeetingSection from './components/MeetingSection';
import LoveLettersSection from './components/LoveLettersSection';
import SurpriseSection from './components/SurpriseSection';
import FinalSurpriseSection from './components/FinalSurpriseSection';
import SectionDivider from './components/SectionDivider';

export default function Home() {
  // Sequence stages: 'video' -> 'main'
  const [stage, setStage] = useState('video');

  return (
    <>
      <AnimatePresence mode="wait">
        {stage === 'video' && (
          <VideoEntrance key="video" onComplete={() => setStage('main')} />
        )}
      </AnimatePresence>

      {/* Main website content after video intro */}
      {stage === 'main' && (
        <>
          {/* Party confetti paper background */}
          <ConfettiBackground />

          <main
            style={{
              position: 'relative',
              zIndex: 1,
              opacity: 1,
              transition: 'opacity 0.8s ease',
            }}
          >
            {/* 1. HERO — Birthday Wish with her photos */}
            <HeroSection />

            <SectionDivider emoji="💍" />

            {/* 2. ROKA — Two photos & story */}
            <RokaSection />

            <SectionDivider emoji="🌹" />

            {/* 3. FIRST MEETING */}
            <MeetingSection number={1} />

            <SectionDivider emoji="💌" />

            {/* 4. LOVE LETTERS */}
            <LoveLettersSection />

            <SectionDivider emoji="🍿" />

            {/* 5. SECOND MEETING */}
            <MeetingSection number={2} />

            <SectionDivider emoji="🌼" />

            {/* 6. THIRD MEETING */}
            <MeetingSection number={3} />

            <SectionDivider emoji="🎉" />

            {/* 7. BALLOON SURPRISE */}
            <SurpriseSection />

            <SectionDivider emoji="🌙" />

            {/* 8. FOURTH MEETING */}
            <MeetingSection number={4} />

            <SectionDivider emoji="⭐" />

            {/* 9. FIFTH MEETING */}
            <MeetingSection number={5} />

            <SectionDivider emoji="✨" />

            {/* 10. FINAL SURPRISES & DIVINE RADHA RANI CLOSING */}
            <FinalSurpriseSection />
          </main>
        </>
      )}
    </>
  );
}
