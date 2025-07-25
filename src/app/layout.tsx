import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'でじサポ｜パソコン相談室',
  description:
    '法人・個人向けにOA機器の整備や設定、ソフトウェアのお困りごとをサポートするポートフォリオサイト。修理記録や最新テック情報、開発日誌などを掲載。',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    images: '/images/eye-catch.png',
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 text-[#222426] dark:text-gray-200 font-sans font-medium antialiased">
        <Header />
        <main className="container mx-auto p-4">
          {children}
          <Breadcrumbs />
        </main>
        <Footer />
      </body>
    </html>
  );
}
