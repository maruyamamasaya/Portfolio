import './globals.css';
import './mobile.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Portfolio Blog',
  description: 'Next.js Portfolio with Markdown Blog'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Portfolio</h1>
            <nav>
              <ul className="flex space-x-4 text-sm">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </nav>
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
