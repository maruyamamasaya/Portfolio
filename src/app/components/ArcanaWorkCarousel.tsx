'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Props {
  images: string[];
  autoSlideInterval?: number;
}

export default function ArcanaWorkCarousel({
  images,
  autoSlideInterval = 3000,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(images.length / itemsPerSlide);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduce || totalSlides <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % totalSlides);
    }, autoSlideInterval);
    return () => clearInterval(id);
  }, [totalSlides, autoSlideInterval, reduce]);

  const prev = () => setIndex((i) => (i - 1 + totalSlides) % totalSlides);
  const next = () => setIndex((i) => (i + 1) % totalSlides);

  const start = index * itemsPerSlide;
  const current = images
    .slice(start, start + itemsPerSlide)
    .concat(images.slice(0, Math.max(0, start + itemsPerSlide - images.length)));
  const imgWidth = isMobile ? 200 : 233;
  const imgHeight = isMobile ? 283 : 330;

  return (
    <div className="relative flex items-center justify-center space-x-2">
      <button
        onClick={prev}
        className="px-2 py-1 bg-black/50 text-white transition-base"
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
            width={imgWidth}
            height={imgHeight}
            className="object-cover"
          />
        ))}
      </div>
      <button
        onClick={next}
        className="px-2 py-1 bg-black/50 text-white transition-base"
        aria-label="Next"
      >
        &gt;
      </button>
    </div>
  );
}
