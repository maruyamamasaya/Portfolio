import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Header />
        <main className="container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
