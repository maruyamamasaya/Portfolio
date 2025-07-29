'use client';

import ArcanaCardCarousel, { defaultImages } from './ArcanaCardCarousel';

export default function ArcanaCarouselList() {
  const sets = [
    defaultImages.slice(0, 4),
    defaultImages.slice(4, 8),
    defaultImages.slice(8, 12),
  ];

  return (
    <div className="space-y-8">
      {sets.map((imgs, i) => (
        <ArcanaCardCarousel key={i} images={imgs} autoSlideInterval={3000} />
      ))}
    </div>
  );
}
