'use client';
import { useEffect, useRef } from 'react';

// Party popper confetti paper in background
const COLORS = ['#f9c6d0', '#d4b8e0', '#ffd6b0', '#b8e0d4', '#f5d67a', '#f4a7b9', '#c8e6c9', '#ffe0b2'];

export default function ConfettiBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pieces = [];

    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      const isRect = i % 3 !== 0;
      const size = 6 + (i % 5) * 3;
      const color = COLORS[i % COLORS.length];

      el.style.cssText = `
        position: fixed;
        left: ${(i * 2.5) % 100}vw;
        top: -30px;
        width: ${isRect ? size + 'px' : size / 1.5 + 'px'};
        height: ${isRect ? size / 2 + 'px' : size / 1.5 + 'px'};
        background: ${color};
        border-radius: ${isRect ? '2px' : '50%'};
        opacity: ${0.25 + (i % 4) * 0.1};
        animation: confettiFall ${12 + (i % 8) * 2}s linear infinite;
        animation-delay: ${(i % 10) * -1.5}s;
        transform: rotate(${(i * 37) % 360}deg);
        pointer-events: none;
        z-index: 0;
      `;
      container.appendChild(el);
      pieces.push(el);
    }

    return () => pieces.forEach(p => p.remove());
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} />;
}
