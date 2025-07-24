import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import Taskbar from './components/Taskbar';

export const metadata: Metadata = {
  title: 'パソコンレスキュー公式サイト',
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
      <body className="min-h-screen font-digital text-black win98-body win98-desktop">
        <div className="win98-window m-4">
          <Header />
          <main className="win98-content relative">{children}</main>
          <Footer />
        </div>
        <Taskbar />
      </body>
    </html>
  );
}
