import HomeWindow from './components/HomeWindow';
import { getSortedPosts } from '@/lib/posts';

export default async function HomePage() {
  const posts = await getSortedPosts();
  return <HomeWindow posts={posts} />;
}
