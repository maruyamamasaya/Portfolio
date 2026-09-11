'use client';

import { CSSProperties, useEffect } from 'react';

const rippleCount = 6;

export default function ImmersiveAtmosphere() {
  useEffect(() => {
    const supportsMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (!supportsMotion) {
      return;
    }

    let raf = 0;
    const root = document.documentElement;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMouse = (e: MouseEvent) => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        root.style.setProperty('--cursor-x', `${x}%`);
        root.style.setProperty('--cursor-y', `${y}%`);
        raf = 0;
      });
    };

    const updateScroll = () => {
      const scrollY = Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight));
      root.style.setProperty('--scroll-phase', `${scrollY}`);
    };

    const onPreferenceChange = () => {
      if (reduceMotionQuery.matches) {
        root.style.setProperty('--motion-scale', '0');
      } else {
        root.style.setProperty('--motion-scale', '1');
      }
    };

    onPreferenceChange();
    updateScroll();

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('scroll', updateScroll, { passive: true });
    reduceMotionQuery.addEventListener('change', onPreferenceChange);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('scroll', updateScroll);
      reduceMotionQuery.removeEventListener('change', onPreferenceChange);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <div className="immersive-atmosphere" aria-hidden="true">
      <div className="immersive-layer immersive-layer-aurora" />
      <div className="immersive-layer immersive-layer-mesh" />
      <div className="immersive-layer immersive-layer-fog" />
      <div className="immersive-layer immersive-layer-spotlight" />
      <div className="immersive-layer immersive-layer-orbs">
        {Array.from({ length: rippleCount }, (_, i) => (
          <span
            key={i}
            className="immersive-orb"
            style={{
              '--orb-delay': `${i * 1.3}s`,
              '--orb-size': `${160 + (i % 3) * 50}px`,
              '--orb-top': `${16 + (i % 2) * 34}%`,
              '--orb-left': `${12 + (i * 14) % 70}%`,
              '--orb-alpha': `${0.07 + (i % 3) * 0.05}`,
            } as CSSProperties}
          />
        ))}
      </div>
      <div className="immersive-surface">
        <span />
      </div>
    </div>
  );
}
