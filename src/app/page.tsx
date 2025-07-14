import Link from 'next/link';
import { getSortedPosts } from '@/lib/posts';

export default async function HomePage() {
  const posts = getSortedPosts();
  const categories = [
    { name: 'おすすめ記事', href: '/recommend' },
    { name: 'NEWS', href: '/news' },
    { name: 'PHOTO', href: '/photo' },
    { name: 'PROFILE', href: '/profile' },
    { name: 'STORE', href: '/store' },
  ];

  return (
    <div>
      <div className="xp-titlebar">トップページ</div>
      <div className="mb-8 xp-content">
        <h2 className="text-xl font-semibold mb-4">カテゴリー</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                className="block bg-white rounded shadow p-4 text-center hover:bg-gray-50"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="xp-content">
      <h2 className="text-xl font-semibold mb-4">Blog</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug} className="border-b pb-4 flex items-start space-x-2">
            {post.image && (
              <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
            )}
            <div>
              <Link href={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline">
                {post.title}
              </Link>
              <span className="block text-sm text-gray-500">{post.date}</span>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
