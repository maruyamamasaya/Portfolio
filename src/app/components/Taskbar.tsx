"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Taskbar() {
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
  );

  const shortcuts = [
    { href: '/', icon: '/images/icon_home.png', alt: 'Home' },
    { href: '/art_blog', icon: '/images/icon_art_blog.png', alt: 'Art Blog' },
    { href: '/artworks_blog', icon: '/images/icon_artworks.png', alt: 'ArtWorks' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win98-taskbar font-xp">
      <button className="win98-start-button">Start</button>
      <nav className="flex space-x-2 ml-2">
        {shortcuts.map(item => (
          <Link href={item.href} key={item.href}>
            <img src={item.icon} alt={item.alt} className="w-6 h-6" />
          </Link>
        ))}
      </nav>
      <span className="taskbar-clock ml-auto">{time}</span>
    </div>
  );
}
