import BlogNavButtons from '../components/BlogNavButtons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeveloperInfo() {
  return (
    <div>
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Developer Info</h1>
      <p>開発者向けの新しい情報ページです。</p>
    </div>
  );
}
