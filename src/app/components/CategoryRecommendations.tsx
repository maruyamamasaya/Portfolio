import Link from 'next/link';
import HomePostCard from './HomePostCard';
import { categories } from '../../../data/categories';
import { getPostsByCategory } from '@/lib/posts';

export const dynamic = 'force-dynamic';

export default async function CategoryRecommendations() {
  const selected = categories.slice(0, 3);

  const categoryPosts = await Promise.all(
    selected.map(async (cat) => ({
      ...cat,
      posts: (await getPostsByCategory(cat.slug)).slice(0, 3),
    })),
  );

  return (
    <section className="px-4 sm:px-6 md:px-10 w-full mx-auto space-y-8">
      <h2 className="text-xl font-bold text-center">カテゴリー別おすすめ</h2>
      <div className="space-y-8">
        {categoryPosts.map((cat) => (
          <div key={cat.slug} className="space-y-4">
            <h3 className="text-lg font-semibold">
              <Link
                href={`/categories/${cat.slug}`}
                className="accent-text hover:underline transition-base"
              >
                {cat.name}
              </Link>
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {cat.posts.map((post) => (
                <li key={post.slug}>
                  <HomePostCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/categories" className="accent-text hover:underline transition-base">
          もっと見る
        </Link>
      </div>
    </section>
  );
}
