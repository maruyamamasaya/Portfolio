'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex gap-3 items-center mt-6">
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#000000] hover:opacity-90 px-4 py-2 rounded-md text-white text-sm font-medium flex items-center gap-2 transition"
        aria-label="Xでシェア"
      >
        <Image src="/images/X.png" alt="X" width={16} height={16} className="w-4 h-4" />
        Xでシェア
      </a>
    </div>
  );
}
