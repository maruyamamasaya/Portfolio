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
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#000000] hover:opacity-90 px-4 py-2 rounded-md text-white text-sm font-medium flex items-center gap-2 transition"
        aria-label="Xでシェア"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
        >
          <path d="M17.64 3H21L14.5 10.69 22.5 21h-5.99L11.47 14.5 5.8 21H2.36l6.97-8.28L1.64 3h5.98l4.65 5.84L17.64 3z" />
        </svg>
        Xでシェア
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877F2] hover:opacity-90 px-4 py-2 rounded-md text-white text-sm font-medium flex items-center gap-2 transition"
        aria-label="Facebookでシェア"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
        >
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
        Facebookでシェア
      </a>
    </div>
  );
}
