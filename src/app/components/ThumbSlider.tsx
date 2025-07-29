'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface Slide {
  src: string;
  caption: string;
}

interface Props {
  slides: Slide[];
}

export default function ThumbSlider({ slides }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div>
      <div className="relative w-full overflow-hidden aspect-[4/3]">
        <div
          className="flex motion-safe:transition-transform motion-reduce:transition-none duration-300 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={slide.src}
                alt={slide.caption}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                {slide.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-2 space-x-2">
        {slides.map((slide, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-12 h-12 overflow-hidden rounded ${index === i ? 'ring-2 ring-primary' : ''}`}
          >
            <Image
              src={slide.src}
              alt={`Thumbnail for ${slide.caption}`}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
