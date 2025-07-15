import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: '電脳幻境プロジェクト',
  description: 'Next.js Portfolio with Markdown Blog',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    images: '/images/second.png',
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen font-digital text-black win98-body">
        <div className="win98-window m-4">
          <Header />
          <main className="win98-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
