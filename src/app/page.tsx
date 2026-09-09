import HomeWindow from './components/HomeWindow';
import { getSortedPosts } from '@/lib/posts';
export const metadata = {
  title: 'Web制作・業務改善・AI活用支援',
  description: '小さな事業のWeb制作、業務改善、AI活用を、相談から運用まで一貫して支援します。',
};

export default async function HomePage() {
  const posts = await getSortedPosts();
  return <HomeWindow posts={posts} />;
}
