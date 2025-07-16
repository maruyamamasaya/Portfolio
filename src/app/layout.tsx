import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import Taskbar from './components/Taskbar';

export const metadata: Metadata = {
  title: '電脳幻境プロジェクト',
  description: '「現実」と「仮想」の境界をゆらがせる幻想的な情報空間へようこそ。最新のデジタルツール解説やレトロコンピューティングの探求、仮想空間を舞台にしたアートワークまで、電脳世界の魅力を多角的に発信。',
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
          <main className="win98-content">{children}</main>
          <Footer />
        </div>
        <Taskbar />
      </body>
    </html>
  );
}
