'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  images: string[];
  autoSlideInterval?: number;
}

export default function ArcanaWorkCarousel({
  images,
  autoSlideInterval = 3000,
}: Props) {
  const totalSlides = Math.ceil(images.length / 3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (totalSlides <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % totalSlides);
    }, autoSlideInterval);
    return () => clearInterval(id);
  }, [totalSlides, autoSlideInterval]);

  const prev = () => setIndex((i) => (i - 1 + totalSlides) % totalSlides);
  const next = () => setIndex((i) => (i + 1) % totalSlides);

  const start = index * 3;
  const current = images
    .slice(start, start + 3)
    .concat(images.slice(0, Math.max(0, start + 3 - images.length)));

  return (
    <div className="relative flex items-center justify-center space-x-2">
      <button
        onClick={prev}
        className="px-2 py-1 bg-black/50 text-white"
        aria-label="Previous"
      >
        &lt;
      </button>
      <div className="flex space-x-2">
        {current.map((src, i) => (
          <Image
            key={`${index}-${i}`}
            src={src}
            alt={`Arcana card ${start + i + 1}`}
            width={233}
            height={330}
            className="object-cover"
          />
        ))}
      </div>
      <button
        onClick={next}
        className="px-2 py-1 bg-black/50 text-white"
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
}
