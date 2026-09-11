'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type VisualSpace = 'default' | 'hero' | 'works' | 'about' | 'skills' | 'contact';
export type VisualQuality = 'high' | 'medium' | 'low';

export type ProjectVisualColor = {
  accentColor: string;
  secondaryColor?: string;
  glowColor?: string;
};

export type SectionPalette = {
  ambient: string;
  depth: string;
  particle: string;
};

type VisualEnvironmentState = {
  quality: VisualQuality;
  reducedMotion: boolean;
  currentSpace: VisualSpace;
  currentProjectColor?: ProjectVisualColor;
  sectionPalette: SectionPalette;
  scrollProgress: number;
  pointer: { x: number; y: number } | null;
  setCurrentSpace: (space: VisualSpace) => void;
  setCurrentProjectColor: (color?: ProjectVisualColor | null) => void;
  setScrollProgress: (progress: number) => void;
  setPointer: (pointer: { x: number; y: number } | null) => void;
  setQuality: (quality: VisualQuality) => void;
  resetProjectColor: () => void;
};

const defaultSectionPalette: Record<VisualSpace, SectionPalette> = {
  default: {
    ambient: 'rgba(120, 158, 255, 0.16)',
    depth: 'rgba(88, 112, 186, 0.26)',
    particle: 'rgba(173, 196, 255, 0.14)',
  },
  hero: {
    ambient: 'rgba(135, 166, 255, 0.2)',
    depth: 'rgba(95, 118, 225, 0.28)',
    particle: 'rgba(187, 207, 255, 0.18)',
  },
  works: {
    ambient: 'rgba(145, 150, 255, 0.16)',
    depth: 'rgba(111, 122, 198, 0.2)',
    particle: 'rgba(173, 176, 255, 0.16)',
  },
  about: {
    ambient: 'rgba(76, 132, 255, 0.14)',
    depth: 'rgba(58, 80, 145, 0.24)',
    particle: 'rgba(142, 179, 255, 0.12)',
  },
  skills: {
    ambient: 'rgba(73, 181, 255, 0.18)',
    depth: 'rgba(60, 113, 194, 0.22)',
    particle: 'rgba(129, 204, 255, 0.14)',
  },
  contact: {
    ambient: 'rgba(129, 102, 255, 0.2)',
    depth: 'rgba(111, 88, 193, 0.2)',
    particle: 'rgba(191, 168, 255, 0.16)',
  },
};

const VisualEnvironmentContext = createContext<VisualEnvironmentState | null>(null);

type ProviderProps = {
  children: ReactNode;
};

const detectInitialQuality = (): VisualQuality => {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'low';
  }
  const isMobile = window.innerWidth <= 768;
  if (isMobile) return 'medium';
  const deviceMemory = (window.navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (!deviceMemory || deviceMemory <= 4) return 'medium';
  if (window.innerWidth >= 1600 && window.innerHeight >= 900) return 'high';
  return 'medium';
};

function blendColor(value: string, alpha = 1): string {
  if (!value) return `rgba(140, 170, 255, ${alpha})`;
  if (/^rgba/.test(value)) return value;
  if (/^#/.test(value) && value.length >= 4) {
    const hex = value.replace('#', '');
    const normalized = hex.length === 3
      ? hex.split('').map((char) => char + char).join('')
      : hex;
    const toNum = (idx: number) => Number.parseInt(normalized.slice(idx * 2, idx * 2 + 2), 16);
    const r = toNum(0) / 255;
    const g = toNum(1) / 255;
    const b = toNum(2) / 255;
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${alpha})`;
  }
  return `rgba(140, 170, 255, ${alpha})`;
}

export function VisualEnvironmentProvider({ children }: ProviderProps) {
  const [quality, setQuality] = useState<VisualQuality>('medium');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [currentSpace, setCurrentSpace] = useState<VisualSpace>('default');
  const [currentProjectColor, setCurrentProjectColorState] = useState<ProjectVisualColor | undefined>();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointerState] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    setQuality(detectInitialQuality());
    const onChange = () => {
      setReducedMotion(mq.matches);
      setQuality((prev) => (mq.matches ? 'low' : prev === 'low' ? 'medium' : prev));
    };
    mq.addEventListener('change', onChange);
    const onResize = () => {
      setQuality(detectInitialQuality());
    };
    window.addEventListener('resize', onResize);
    return () => {
      mq.removeEventListener('change', onChange);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const palette = defaultSectionPalette[currentSpace] ?? defaultSectionPalette.default;
    const projectAccent = currentProjectColor?.accentColor;
    const projectSecondary = currentProjectColor?.secondaryColor;
    const projectGlow = currentProjectColor?.glowColor;
    root.style.setProperty('--vfx-space-ambient', palette.ambient);
    root.style.setProperty('--vfx-space-depth', palette.depth);
    root.style.setProperty('--vfx-space-particle', palette.particle);
    root.style.setProperty('--vfx-scroll-progress', scrollProgress.toString());
    root.style.setProperty('--vfx-quality', quality);
    root.style.setProperty('--vfx-project-accent', projectAccent ?? 'rgba(145, 181, 255, 0.2)');
    root.style.setProperty(
      '--vfx-project-secondary',
      projectSecondary ?? 'rgba(142, 168, 255, 0.16)',
    );
    root.style.setProperty('--vfx-project-glow', projectGlow ?? 'rgba(95, 145, 255, 0.2)');
    root.style.setProperty('--vfx-motion-scale', reducedMotion ? '0' : '1');
  }, [currentSpace, currentProjectColor, quality, reducedMotion, scrollProgress]);

  const setCurrentProjectColor = useCallback((color?: ProjectVisualColor | null) => {
    setCurrentProjectColorState(
      color
        ? {
            accentColor: color.accentColor,
            secondaryColor: color.secondaryColor ?? blendColor(color.accentColor, 0.16),
            glowColor: color.glowColor ?? blendColor(color.accentColor, 0.22),
          }
        : undefined,
    );
  }, []);

  const resetProjectColor = useCallback(() => setCurrentProjectColorState(undefined), []);

  const value = useMemo(
    () => ({
      quality,
      reducedMotion,
      currentSpace,
      currentProjectColor,
      sectionPalette: defaultSectionPalette[currentSpace] ?? defaultSectionPalette.default,
      scrollProgress,
      pointer,
      setCurrentSpace,
      setCurrentProjectColor,
      setScrollProgress,
      setPointer: setPointerState,
      setQuality,
      resetProjectColor,
    }),
    [
      quality,
      reducedMotion,
      currentSpace,
      currentProjectColor,
      scrollProgress,
      pointer,
      setCurrentProjectColor,
      resetProjectColor,
    ],
  );

  return <VisualEnvironmentContext.Provider value={value}>{children}</VisualEnvironmentContext.Provider>;
}

export function useVisualEnvironment(): VisualEnvironmentState {
  const ctx = useContext(VisualEnvironmentContext);
  if (!ctx) {
    throw new Error('useVisualEnvironment must be used within VisualEnvironmentProvider');
  }
  return ctx;
}
