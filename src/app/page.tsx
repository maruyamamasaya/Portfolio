import HomeWindow from './components/HomeWindow';
import { getSortedPosts } from '@/lib/posts';
export const metadata = {
  title: 'Home',
};

export default async function HomePage() {
  const posts = await getSortedPosts();
  return (
    <div className="-mx-4 sm:-mx-6 md:-mx-8">
      <HomeWindow posts={posts} />
    </div>
  );
}
