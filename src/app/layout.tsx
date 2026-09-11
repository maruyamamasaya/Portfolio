import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Breadcrumbs from './components/Breadcrumbs';
import PageTransition from './components/PageTransition';
import TagListHeader from './components/TagListHeader';
import { getTagCounts } from '@/lib/posts';
import { ThemeProvider } from './components/ThemeProvider';
import { siteConfig } from '@/config/site';
import ImmersiveAtmosphere from './components/ImmersiveAtmosphere';

export const metadata = {
  metadataBase: new URL('https://freehackapp.com'),
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tagCounts = await getTagCounts();
  const displayCounts = tagCounts.slice(0, 30);
  return (
    <html lang="ja">
      <head><link rel="alternate" type="application/rss+xml" href="/rss.xml" /></head>
      <body
        className="min-h-screen bg-[var(--site-paper)] text-[var(--site-ink)] font-sans font-normal antialiased transition-base"
      >
        <ThemeProvider>
          <ImmersiveAtmosphere />
          <div className="relative z-10 isolate">
            <Header />
            <PageTransition>
              <main id="main-content" className="mx-auto px-2 sm:px-6 md:px-8">
                {children}
                <Breadcrumbs />
              </main>
            </PageTransition>
            <TagListHeader tagCounts={displayCounts} />
            <Footer />
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
