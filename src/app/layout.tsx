import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Portfolio Blog',
  description: 'Next.js Portfolio with Markdown Blog'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen font-xp text-black bg-gradient-to-b from-blue-600 to-blue-400">
        <div className="xp-window m-4">
          <Header />
          <main className="xp-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
