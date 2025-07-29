import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import PageTransition from './components/PageTransition';
import TagListWrapper from './components/TagListWrapper';
import { ThemeProvider } from './components/ThemeProvider';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://freehackapp.com'),
  title: 'でじサポ｜パソコン相談室',
  description:
    '法人・個人向けにOA機器の整備や設定、ソフトウェアのお困りごとをサポートするポートフォリオサイト。修理記録や最新テック情報、開発日誌などを掲載。',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    images: '/images/eye-catch.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
          <div className="bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto p-2">
              <TagListWrapper />
            </div>
          </div>
          <PageTransition>
            <main className="container mx-auto p-4">
              {children}
              <Breadcrumbs />
            </main>
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
