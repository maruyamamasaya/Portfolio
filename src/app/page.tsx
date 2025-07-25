import HomeWindow from './components/HomeWindow';
import { getSortedPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getSortedPosts();
  return <HomeWindow posts={posts} />;
}
