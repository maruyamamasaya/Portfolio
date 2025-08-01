'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export interface Artwork {
  id: number;
  title: string;
  year: number;
  medium: string;
  description?: string;
  image: string;
}

interface Props {
  artworks: Artwork[];
}

export default function ArtworkSlideshow({ artworks }: Props) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || artworks.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % artworks.length);
    }, 5000);
    return () => clearInterval(id);
  }, [artworks.length, reduce]);

  return (
    <>
      {/* Desktop layout with overlay caption */}
      <div className="relative w-full aspect-[4/3] overflow-hidden hidden sm:block">
        {artworks.map((art, i) => (
          <div
            key={art.id}
            className={`absolute inset-0 motion-safe:transition-opacity motion-reduce:transition-none duration-300 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={art.image} alt={art.title} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 space-y-1">
              <h3 className="text-lg font-semibold">{art.title}</h3>
              <p className="text-sm">
                {art.year} / {art.medium}
              </p>
              {art.description && <p className="text-sm">{art.description}</p>}
            </div>
          </div>
        ))}
      </div>
      {/* Mobile layout shows caption below the image */}
      <div className="sm:hidden">
        {artworks.map((art, i) => (
          <div
            key={art.id}
            className={`motion-safe:transition-opacity motion-reduce:transition-none duration-300 ease-in-out ${
              i === index ? 'block' : 'hidden'
            }`}
          >
            <Image
              src={art.image}
              alt={art.title}
              width={600}
              height={450}
              className="w-full h-auto object-cover"
            />
            <div className="p-4 space-y-1 text-center">
              <h3 className="text-lg font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-500">
                {art.year} / {art.medium}
              </p>
              {art.description && <p className="text-sm">{art.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
