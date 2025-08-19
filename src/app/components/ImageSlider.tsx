'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length, reduce]);

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
    <div>
      <div className="relative w-full overflow-hidden aspect-square min-h-[300px]">
        <div
          className="flex motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {images.map((src, i) => (
            <div key={src} className="flex-shrink-0 w-full">
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                width={700}
                height={700}
                className="w-full h-auto max-w-[700px] aspect-square object-cover cursor-pointer"
                onClick={() => setSelected(src)}
              />
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelected(null)}
        >
          <Image
            src={selected}
            alt="拡大画像"
            width={1000}
            height={1000}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
