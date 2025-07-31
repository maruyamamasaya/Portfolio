'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface ArcanaCardCarouselProps {
  images?: string[];
  autoSlideInterval?: number;
}

export const defaultImages = Array.from({ length: 12 }, (_, i) =>
  `/images/arcana/arcanacard${String(i + 1).padStart(5, '0')}.svg`,
);

export default function ArcanaCardCarousel({
  images = defaultImages,
  autoSlideInterval = 3000,
}: ArcanaCardCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, autoSlideInterval);
    return () => clearInterval(id);
  }, [images.length, autoSlideInterval, reduce]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative w-[300px] h-[425px] sm:w-[700px] sm:h-[990px] mx-auto">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Arcana card ${i + 1}`}
          width={700}
          height={990}
          className={`absolute inset-0 transition-opacity duration-300 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 transition-base"
        aria-label="Previous"
      >
        &lt;
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 transition-base"
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
}
