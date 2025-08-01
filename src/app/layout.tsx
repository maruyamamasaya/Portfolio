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
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  metadataBase: new URL('https://freehackapp.com'),
  title: 'Digi Goose（デジグース）｜最新AIから業務効率まで、幅広くお任せ　テクニカル法人サポート',
  description:
    '最新AI活用から業務効率化までをトータルで支援するテクニカル法人サポートサイト。中高生向けの家庭教師型パソコンスクールも運営。',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    images: '/images/eye-catch.png',
  },
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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${poppins.className} min-h-screen bg-gray-100 dark:bg-gray-700 text-light dark:text-dark font-normal antialiased transition-base`}
      >
        <ThemeProvider>
          <Header />
          <PageTransition>
            <main id="main-content" className="mx-auto px-2 sm:px-6 md:px-8">
              {children}
              <Breadcrumbs />
            </main>
          </PageTransition>
          <div className="bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
            <div className="container mx-auto p-2">
              <TagListHeader tagCounts={displayCounts} />
            </div>
          </div>
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
