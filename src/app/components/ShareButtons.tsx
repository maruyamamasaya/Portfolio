'use client';
import { useEffect, useState } from 'react';

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
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Xでシェア"
        className="group inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow transition-transform duration-200 hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current"
        >
          <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2" />
        </svg>
        Xでシェア
      </a>
    </div>
  );
}
