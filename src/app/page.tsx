import { getSortedPosts } from '@/lib/posts';
import HomeWindow from './components/HomeWindow';

export default async function HomePage() {
  const posts = getSortedPosts();

  return <HomeWindow posts={posts} />;
}
