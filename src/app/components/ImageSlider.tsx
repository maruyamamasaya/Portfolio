'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current !== null) {
      const diff = e.clientX - startX.current;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          setIndex((prev) => (prev + 1) % images.length);
        } else {
          setIndex((prev) => (prev - 1 + images.length) % images.length);
        }
      }
    }
    startX.current = null;
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full">
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
