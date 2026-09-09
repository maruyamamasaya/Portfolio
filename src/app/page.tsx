import HomeWindow from './components/HomeWindow';
import { getSortedPosts } from '@/lib/posts';
export const metadata = {
  title: '丸山雅也｜デジタルクリエイター ポートフォリオ',
  description: 'Web、デザイン、AI活用を横断し、事業のアイデアを運用できる仕組みまで形にするデジタルクリエイターのポートフォリオ。',
};

export default async function HomePage() {
  const posts = await getSortedPosts();
  return <HomeWindow posts={posts} />;
}
