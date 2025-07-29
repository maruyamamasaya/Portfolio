import HomeWindow from './components/HomeWindow';
import { getSortedPosts } from '@/lib/posts';
import type { Metadata } from 'next';
export const metadata = {
  title: 'Home',
} satisfies Metadata;

export default async function HomePage() {
  const posts = await getSortedPosts();
  return <HomeWindow posts={posts} />;
}
