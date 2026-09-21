'use client';
import Image from 'next/image';
import ScrollReveal from './ScrollReveal';

const meetingData = {
  1: {
    title: 'First Meeting',
    subtitle: 'Metro, Chocolate & Raja Saab 🍫🎬',
    icon: '🌹',
    color: '#c2687a',
    bgFrom: '#fff0f5',
    bgTo: '#f5eaff',
    accent: 'rgba(249,198,208,0.3)',
    accentBorder: 'rgba(249,198,208,0.6)',
    photo: '/assets/meeting1.jpg',
    paragraphs: [
      'Our first meeting is a memory I\'ll always keep close to my heart. ❤️ You came to pick me up from the metro, and that simple little moment already made me feel so special.',
      'Then I gave you a chocolate, and we spent the day together, enjoying our first movie — Raja Saab. 🍫🎬❤️',
      'There was a little nervousness and awkwardness, but somewhere between those small moments, everything started feeling so comfortable and special.',
      'I was genuinely so happy that day, and I think that\'s when our beautiful story truly began. 🫶🏻',
    ],
    closingQuote: 'Our first meeting, our first movie, our first memories — and hopefully, a lifetime of firsts together. ❤️♾️',
  },
  2: {
    title: 'Second Meeting',
    subtitle: '5th March, 2026 • Mall, Movie & College 🎬📜',
    icon: '🎬',
    color: '#8b6aa7',
    bgFrom: '#f5eaff',
    bgTo: '#fff5e8',
    accent: 'rgba(212,184,224,0.3)',
    accentBorder: 'rgba(212,184,224,0.6)',
    photo: '/assets/meeting2.jpg',
    paragraphs: [
      'The second time we met was another beautiful memory. 🥹❤️ We went to the mall and watched The Kerala Story 2 together. 🎬',
      'After the movie, we went to my college to collect my certificate, and then spent some more time together outside the college.',
      'Even though it was just a simple day, being with you made those little moments feel special. ❤️',
    ],
    closingQuote: 'Maybe that\'s what I love about us — we don\'t need anything grand, just being together makes an ordinary day memorable. 🫶🏻',
  },
  3: {
    title: 'Third Meeting',
    subtitle: '16th May, 2026 • Movie, McDonald\'s & Holy Yatra 🍔🎬🛕',
    icon: '🛕',
    color: '#d4956a',
    bgFrom: '#fff5e8',
    bgTo: '#fff0f5',
    accent: 'rgba(255,214,176,0.3)',
    accentBorder: 'rgba(255,214,176,0.6)',
    photo: '/assets/meeting3.jpg',
    paragraphs: [
      'Our third meeting was one of the most memorable days we spent together. 🥹❤️ We started with a movie, Krishnavataram, and then spent some time together at McDonald’s. 🍔🎬',
      'After that, we went to Raman Reti, Ladli Ji (Barsana), and then Govardhan, where we also did the Govardhan Parikrama together. 🫶🏻❤️',
      'It wasn’t just about the places we visited; it was about experiencing all those little moments with you. From a movie to a long journey and the Parikrama, the whole day became a beautiful memory that I’ll always cherish.',
    ],
    closingQuote: 'A day full of memories, laughter, togetherness, and you. ❤️♾️',
  },
  4: {
    title: 'Fourth Meeting',
    subtitle: '22nd July, 2026 • Office Surprise & "Hello, Mrs. Komal" 🥹❤️',
    icon: '🎁',
    color: '#5a8fa7',
    bgFrom: '#eaf5ff',
    bgTo: '#f5eaff',
    accent: 'rgba(184,224,212,0.3)',
    accentBorder: 'rgba(184,224,212,0.6)',
    photo: '/assets/meeting4.jpg',
    paragraphs: [
      'Our fourth meeting was a complete surprise. 🥹❤️ I surprised you outside your office, and the moment you saw me, you were completely shocked. You just kept looking at me, as if for a few seconds your mind had stopped working. 😭❤️',
      'Your heartbeat was fast, you were surprised, and honestly, seeing that reaction made me so happy. 🫶🏻',
      'And then I looked at you and said, "Hello, Mrs. Komal." ❤️ The way you got even more shocked at those words is a moment I’ll never forget. 😂🥹',
    ],
    closingQuote: 'That little surprise, your reaction, and that "Mrs. Komal" moment — one of my favourite memories with you. ❤️♾️',
  },
  5: {
    title: 'Fifth Meeting',
    subtitle: '29th August, 2026 • Unannounced Visit & Awarapan 2 🎬❤️',
    icon: '✨',
    color: '#c2687a',
    bgFrom: '#fff0f5',
    bgTo: '#f5eaff',
    accent: 'rgba(249,198,208,0.3)',
    accentBorder: 'rgba(249,198,208,0.6)',
    photo: '/assets/meeting5.jpg',
    paragraphs: [
      'Our fifth meeting was another little surprise. 🥹❤️ Once again, I came to see you outside your office without telling you. There’s something special about seeing your face when you least expect me to be there. 🫶🏻',
      'After that, we spent some time together and watched Awarapan 2. 🎬❤️',
      'It was another simple day, but just like every time, being with you made it special. I think these unexpected meetings are becoming some of my favourite memories because I get to see that beautiful smile and spend a little more time with you. ❤️',
    ],
    closingQuote: 'Another surprise, another movie, another beautiful memory with you. ♾️❤️',
  },
};

export default function MeetingSection({ number }) {
  const data = meetingData[number];

  return (
    <section
      id={`meeting-${number}`}
      style={{
        background: `linear-gradient(160deg, ${data.bgFrom} 0%, ${data.bgTo} 100%)`,
        padding: '6rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large decorative icon */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '3%',
          transform: 'translateY(-50%)',
          fontSize: '10rem',
          opacity: 0.04,
          pointerEvents: 'none',
          lineHeight: 1,
        }}
      >
        {data.icon}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div className="petal-divider">{data.icon} ✦ {data.icon}</div>
          <h2 className="section-title" style={{ color: data.color }}>
            {data.title}
          </h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </ScrollReveal>

        {/* Meeting number badge */}
        <ScrollReveal delay={100}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${data.accent}, ${data.accentBorder})`,
                border: `2px solid ${data.accentBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Great Vibes', cursive",
                fontSize: '2.2rem',
                color: data.color,
                boxShadow: `0 8px 30px ${data.accent}`,
              }}
            >
              {number}
            </div>
          </div>
        </ScrollReveal>

        {/* Photo — real or placeholder */}
        <ScrollReveal delay={150}>
          {data.photo ? (
            <div
              className="photo-frame"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                aspectRatio: '3/4',
                borderRadius: '20px',
                overflow: 'hidden',
                margin: '0 auto 2rem',
                boxShadow: `0 15px 45px ${data.accent}, 6px 6px 0 ${data.accentBorder}`,
              }}
            >
              <Image
                src={data.photo}
                alt={data.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
                sizes="(max-width: 768px) 85vw, 380px"
              />
              {/* Meeting badge on photo */}
              <div
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '1.3rem',
                  color: data.color,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                }}
              >
                {number}
              </div>
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                aspectRatio: '16/7',
                background: `linear-gradient(135deg, ${data.accent}, rgba(255,255,255,0.4))`,
                border: `2px dashed ${data.accentBorder}`,
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '2rem',
              }}
            >
              <span style={{ fontSize: '2.5rem', opacity: 0.35 }}>{data.icon}</span>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.75rem',
                  color: data.color,
                  opacity: 0.55,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Photo coming soon
              </span>
            </div>
          )}
        </ScrollReveal>

        {/* Description paragraphs */}
        <ScrollReveal delay={200}>
          <div
            className="glass-card"
            style={{
              padding: '2rem 2.5rem',
              marginBottom: '1.5rem',
              borderLeft: `4px solid ${data.color}`,
              borderRadius: '12px 24px 24px 12px',
            }}
          >
            {data.paragraphs.map((para, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                  color: '#5a3d4a',
                  lineHeight: 2,
                  marginTop: idx > 0 ? '1rem' : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </ScrollReveal>

        {/* Closing quote */}
        <ScrollReveal delay={300}>
          <div
            style={{
              padding: '1.5rem 2rem',
              background: `linear-gradient(135deg, ${data.accent}, rgba(255,255,255,0.3))`,
              borderRadius: '20px',
              border: `1px solid ${data.accentBorder}`,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                color: data.color,
                lineHeight: 1.5,
              }}
            >
              &ldquo;{data.closingQuote}&rdquo;
            </p>
            <p
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.8rem',
                color: '#7a5a68',
                marginTop: '0.5rem',
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
