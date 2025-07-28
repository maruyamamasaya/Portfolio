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
    <div className="flex gap-2 mt-4">
      <a
        href={`https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-blue-700 text-white rounded"
      >
        Facebook
      </a>
    </div>
  );
}
