'use client';
import Image from 'next/image';

export default function NFHeader() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        padding: '12px clamp(16px, 4vw, 36px)',
      }}
    >
      {/* Left Logo + Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 28px)' }}>
        <img
          src="/videos/netflix.svg"
          alt="Netflix"
          style={{ width: 'clamp(60px, 8vw, 92px)', height: 'auto' }}
          draggable={false}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 13,
            color: '#ccc',
            fontWeight: 400,
          }}
          className="nf-desktop-nav"
        >
          <span style={{ color: '#fff', fontWeight: 600 }}>Home</span>
          <span style={{ color: '#aaa' }}>Romantic Series</span>
          <span style={{ color: '#aaa' }}>Memories</span>
          <span style={{ color: '#aaa' }}>Komal&apos;s Favorites</span>
        </div>
      </div>

      {/* Right User Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 4,
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.3)',
            position: 'relative',
          }}
        >
          <Image
            src="/assets/komal_hero_solo.jpg"
            alt="Komal"
            fill
            style={{ objectFit: 'cover' }}
            sizes="34px"
          />
        </div>
        <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>
          Komal ❤️
        </span>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .nf-desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
