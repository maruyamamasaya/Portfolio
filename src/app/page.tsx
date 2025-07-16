import { getSortedPosts } from '@/lib/posts';
import HomeWindow from './components/HomeWindow';
import HeroAnimation from './components/HeroAnimation';

export default async function HomePage() {
  const posts = getSortedPosts();

  return (
    <>
      <HeroAnimation />
      <HomeWindow posts={posts} />
    </>
  );
}
