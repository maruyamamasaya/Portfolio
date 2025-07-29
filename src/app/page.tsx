import HomeWindow from './components/HomeWindow';
import { getSortedPosts } from '@/lib/posts';
export const metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const posts = await getSortedPosts();
  return <HomeWindow posts={posts} />;
}
