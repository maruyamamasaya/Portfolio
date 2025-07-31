'use client';

import { useState, useEffect } from 'react';

export default function ClientOnlyAbout() {
  const [mounted, setMounted] = useState(false);
  const [randomValue, setRandomValue] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setRandomValue(Math.random());
    setWidth(window.innerWidth);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-sm space-y-1">
      <p>ランダム値: {randomValue}</p>
      {width !== null && <p>Window幅: {width}</p>}
    </div>
  );
}
