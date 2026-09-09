import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-intro">
          <Link href="/" className="site-brand site-brand-footer"><span>{siteConfig.shortName}</span><strong>{siteConfig.name}</strong></Link>
          <p>{siteConfig.description}</p>
        </div>
        <div className="site-footer-links">
          <div><p>MENU</p>{siteConfig.navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
          <div><p>SOCIAL</p>{siteConfig.social.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<span aria-hidden="true">↗</span></a>)}</div>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        <div><Link href="/policy/privacy">プライバシー</Link><Link href="/policy/law">特定商取引法に基づく表記</Link></div>
      </div>
    </footer>
  );
}
