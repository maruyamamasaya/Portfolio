"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Taskbar() {
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
  );

  const shortcuts = [
    { href: '/', label: 'Home' },
    { href: '/art_blog', label: 'Art Blog' },
    { href: '/artworks_blog', label: 'ArtWorks' }
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win98-taskbar">
      <button className="win98-start-button">Start</button>
      <nav className="flex space-x-2 ml-2">
        {shortcuts.map(item => (
          <Link
            href={item.href}
            key={item.href}
            className="text-sm px-2 py-1 hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <span className="taskbar-clock ml-auto">{time}</span>
    </div>
  );
}
