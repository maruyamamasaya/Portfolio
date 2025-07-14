import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Portfolio Blog',
  description: 'Next.js Portfolio with Markdown Blog'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-white shadow">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">My Portfolio</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-white mt-8 p-4 text-center text-sm text-gray-500">
          &copy; 2025 My Portfolio
        </footer>
      </body>
    </html>
  );
}
