'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="flex-shrink-0 w-full">
            <Image
              src={src}
              alt={`slide-${i}`}
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
