'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteConfig } from '@/config/site';

const DarkModeToggle = dynamic(() => import('./DarkModeToggle'), { ssr: false });

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">本文へ移動</a>
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label={`${siteConfig.name} ホーム`}><span>{siteConfig.shortName}</span><strong>{siteConfig.name}</strong></Link>
        <nav className="site-desktop-nav" aria-label="メインナビゲーション">
          {siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        <div className="site-header-actions">
          <DarkModeToggle />
          <Link href={siteConfig.contact.general} className="site-contact-link">相談する</Link>
          <button type="button" className="site-menu-button" aria-label="メニューを開閉" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((open) => !open)}><span /><span /></button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="site-mobile-nav" aria-label="モバイルナビゲーション">
          {siteConfig.navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}<span aria-hidden="true">→</span></Link>)}
          <Link href={siteConfig.contact.general} onClick={() => setIsMenuOpen(false)}>お問い合わせ<span aria-hidden="true">↗</span></Link>
        </nav>
      )}
    </header>
  );
}
