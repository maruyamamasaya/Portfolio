'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface ArcanaCardCarouselProps {
  images?: string[];
  autoSlideInterval?: number;
}

export const defaultImages = Array.from({ length: 12 }, (_, i) =>
  `/image/arcana/arcanacard${String(i + 1).padStart(5, '0')}.png`,
);

export default function ArcanaCardCarousel({
  images = defaultImages,
  autoSlideInterval = 3000,
}: ArcanaCardCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, autoSlideInterval);
    return () => clearInterval(id);
  }, [images.length, autoSlideInterval]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="relative w-[700px] h-[990px] mx-auto">
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
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1"
        aria-label="Previous"
      >
        &lt;
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1"
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
}
