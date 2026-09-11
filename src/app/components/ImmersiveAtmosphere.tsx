'use client';

import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import {
  ProjectVisualColor,
  useVisualEnvironment,
  VisualQuality,
} from './visual/VisualEnvironmentContext';

type Ripple = {
  id: number;
  createdAt: number;
  x: number;
  y: number;
  size: number;
  duration: number;
};

type ParticleState = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  speedX: number;
  speedY: number;
  drift: number;
  size: number;
  phase: number;
};

const qualityParticleCount: Record<VisualQuality, number> = {
  high: 36,
  medium: 22,
  low: 10,
};

export default function ImmersiveAtmosphere() {
  const {
    quality,
    reducedMotion,
    setScrollProgress,
    setPointer,
    scrollProgress,
    currentProjectColor,
    currentSpace,
  } = useVisualEnvironment();

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const particleState = useRef<ParticleState[]>([]);
  const animationRef = useRef<number>(0);
  const pointerRef = useRef({ x: -9999, y: -9999 });

  const projectColor = useMemo<ProjectVisualColor>(
    () => currentProjectColor || { accentColor: 'rgba(150, 184, 255, 0.4)' },
    [currentProjectColor],
  );

  const ambientColor = useMemo(() => {
    const base = quality === 'low' ? 0.45 : quality === 'medium' ? 0.62 : 0.75;
    return `color-mix(in srgb, ${projectColor.accentColor} ${Math.round(base * 100)}%, rgba(30, 44, 80, 0.65))`;
  }, [projectColor.accentColor, quality]);

  useEffect(() => {
    const root = document.documentElement;
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const onMotion = () => {
      if (reduceQuery.matches) {
        root.style.setProperty('--motion-scale', '0');
      } else {
        root.style.setProperty('--motion-scale', '1');
      }
    };

    const updatePointer = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      root.style.setProperty('--cursor-x', `${x}%`);
      root.style.setProperty('--cursor-y', `${y}%`);
      setPointer({ x: event.clientX, y: event.clientY });
      root.style.setProperty('--pointer-trail-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-trail-y', `${event.clientY}px`);

      root.style.setProperty(
        '--depth-parallax-x',
        `${((event.clientX / window.innerWidth) - 0.5) * 4}px`,
      );
      root.style.setProperty(
        '--depth-parallax-y',
        `${((event.clientY / window.innerHeight) - 0.5) * 4}px`,
      );
    };

    const onLeave = () => {
      setPointer(null);
      root.style.setProperty('--depth-parallax-x', '0px');
      root.style.setProperty('--depth-parallax-y', '0px');
    };

    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, window.scrollY / max);
      setScrollProgress(ratio);
      root.style.setProperty('--scroll-phase', `${ratio}`);
      root.style.setProperty('--space-shift', `${ratio * 22 - 11}px`);
    };

    const updatePointerLayer = (event: Event) => {
      if (reducedMotion) return;
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const rippleTarget =
        target.closest('[data-ripple="true"]') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.vfx-trigger');
      if (!rippleTarget) return;

      const rect = rippleTarget.getBoundingClientRect();
      const x = event instanceof PointerEvent ? event.clientX : rect.left + rect.width / 2;
      const y = event instanceof PointerEvent ? event.clientY : rect.top + rect.height / 2;
      const size = Math.min(260, Math.max(90, Math.max(rect.width, rect.height) * 2.2));
      const now = performance.now();
      setRipples((prev) => [...prev.filter((item) => now - item.id < 2200), {
        id: now,
        createdAt: Date.now(),
        x,
        y,
        size,
        duration: quality === 'low' ? 900 : quality === 'medium' ? 1200 : 1500,
      }]);
    };

    onMotion();
    onScroll();
    window.addEventListener('pointermove', updatePointer);
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('pointerdown', updatePointerLayer);
    reduceQuery.addEventListener('change', onMotion);

    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', updatePointerLayer);
      reduceQuery.removeEventListener('change', onMotion);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reducedMotion, setPointer, setScrollProgress, quality]);

  useEffect(() => {
    if (reducedMotion || quality === 'low') return;

    const total = qualityParticleCount[quality];
    if (particleState.current.length !== total) {
      particleState.current = Array.from({ length: total }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseX: Math.random() * window.innerWidth,
        baseY: Math.random() * window.innerHeight,
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        drift: 0.2 + Math.random() * 0.45,
        size: 26 + Math.random() * 34,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    const tick = () => {
      const p = particleState.current;
      const scrollRate = scrollProgress;
      const pointer = pointerRef.current;
      const pointerActive =
        Number.isFinite(pointer.x) &&
        Number.isFinite(pointer.y) &&
        pointer.x > -1000 &&
        pointer.y > -1000;

      for (let i = 0; i < p.length; i += 1) {
        const state = p[i];
        if (!state) continue;

        if (state.x < 0) state.x = window.innerWidth;
        if (state.x > window.innerWidth) state.x = 0;
        if (state.y < 0) state.y = window.innerHeight;
        if (state.y > window.innerHeight) state.y = 0;

        state.x += state.speedX + state.drift * (0.12 * scrollRate);
        state.y += state.speedY + state.drift * (0.06 * scrollRate);
        state.phase += 0.0018;

        if (pointerActive) {
          const dx = state.x - pointer.x;
          const dy = state.y - pointer.y;
          const dist = Math.max(1, Math.hypot(dx, dy));
          const threshold = quality === 'high' ? 240 : 180;
          const forceRatio = Math.max(0, 1 - dist / threshold);
          if (forceRatio > 0) {
            const attract = Math.sin(scrollRate * Math.PI * 1.7 + (state.baseX / 400));
            const force = forceRatio * (quality === 'high' ? 0.24 : 0.16);
            const sign = attract >= 0 ? 1 : -1;
            state.x += (dx / dist) * force * sign;
            state.y += (dy / dist) * force * sign;
          }
        }

        const el = particleRefs.current[i];
        if (!el) continue;
        const parallaxX = pointerActive ? ((pointer.x / window.innerWidth) - 0.5) * (quality === 'high' ? 10 : 6) : 0;
        const parallaxY = pointerActive ? ((pointer.y / window.innerHeight) - 0.5) * (quality === 'high' ? 12 : 8) : 0;
        const driftX = Math.sin(state.phase) * 12;
        const driftY = Math.cos(state.phase) * 8;
        const opacity = Math.min(0.34, 0.12 + state.phase % 1 * 0.06 + scrollRate * 0.08);
        const scale = 0.8 + state.phase % 0.55 + (quality === 'high' ? 0.25 : 0);

        el.style.transform = `translate3d(${state.x + driftX + parallaxX}px, ${state.y + driftY + parallaxY}px, 0)`;
        el.style.opacity = `${opacity}`;
        el.style.scale = `${scale}`;
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [quality, reducedMotion, scrollProgress]);

  useEffect(() => {
    if (!ripples.length) return;
    const timeout = window.setTimeout(() => {
      setRipples((current) => current.filter((item) => Date.now() - item.createdAt < 1800));
    }, 1850);
    return () => window.clearTimeout(timeout);
  }, [ripples]);

  const particleCount = qualityParticleCount[quality];
  if (quality !== 'low') {
    if (particleState.current.length > particleCount) {
      particleState.current = particleState.current.slice(0, particleCount);
    }
    if (particleRefs.current.length > particleCount) {
      particleRefs.current = particleRefs.current.slice(0, particleCount);
    }
  }

  useEffect(() => {
    const root = document.documentElement;
    const nextDepth = Math.min(1, Math.max(0, scrollProgress * 1.2));
    root.style.setProperty('--vfx-depth', `${nextDepth}`);
    root.style.setProperty('--vfx-space-hue', currentSpace === 'contact' ? '18' : '258');
  }, [scrollProgress, currentSpace]);

  return (
    <div
      ref={rootRef}
      className="immersive-atmosphere vfx-parallax-layer"
      aria-hidden="true"
      style={{ '--project-accent': ambientColor } as CSSProperties}
    >
      <div className="immersive-layer immersive-layer-aura vfx-parallax-layer-bg" />
      <div className="immersive-layer immersive-layer-aurora vfx-parallax-layer-mid" />
      <div className="immersive-layer immersive-layer-mesh vfx-parallax-layer-mid" />
      <div className="immersive-layer immersive-layer-fog vfx-parallax-layer-top" />
      <div className="immersive-layer immersive-layer-spotlight" />
      <div className="immersive-layer ambient-shimmer" />
      <div className="immersive-layer immersive-layer-trail" />
      <div className="immersive-layer immersive-layer-orbital">
        {Array.from({ length: quality === 'low' ? 3 : 6 }, (_, i) => (
          <span
            key={i}
            className="immersive-orb"
            style={
              {
                '--orb-delay': `${i * 1.2 + (quality === 'low' ? 1 : 0)}s`,
                '--orb-size': `${120 + (i % 2) * 36}px`,
                '--orb-top': `${10 + i * 16}%`,
                '--orb-left': `${10 + (i * 16) % 70}%`,
                '--orb-alpha': `${0.04 + (i % 3) * 0.03}`,
                '--orb-pulse': `${i % 2 === 0 ? 1 : -1}`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="immersive-layer immersive-particles" aria-hidden="true">
        {Array.from({ length: particleCount }, (_, i) => (
          <span
            key={`p-${i}`}
            className="visual-particle"
            ref={(node) => {
              particleRefs.current[i] = node;
            }}
          />
        ))}
      </div>
      <div className="immersive-layer immersive-ripples">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="visual-ripple"
            style={{
              '--ripple-x': `${ripple.x}px`,
              '--ripple-y': `${ripple.y}px`,
              '--ripple-size': `${ripple.size}px`,
              '--ripple-duration': `${ripple.duration}ms`,
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
