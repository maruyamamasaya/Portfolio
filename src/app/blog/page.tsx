import { getSortedPosts } from '@/lib/posts';
import LeftSidebar from '@/app/components/LeftSidebar';
import HomePostCard from '@/app/components/HomePostCard';
import SearchBar from '@/app/components/SearchBar';
import { categories } from '../../../data/categories';

export default async function BlogIndex() {
  const posts = await getSortedPosts();
  const latest = posts.slice(0, 3);
  const categoryPosts = categories
    .map((cat) => ({
      ...cat,
      posts: posts.filter((p) => p.category === cat.slug),
    }))
    .filter((cat) => cat.posts.length > 0);

  return (
    <div className="blog-container mt-4 md:flex py-8">
      <div className="md:flex-1 space-y-8 md:order-last">
        <div className="sm:hidden mb-4">
          <SearchBar />
        </div>
        <section className="main-content">
          <h2 className="text-xl font-bold mb-4">最新記事</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <HomePostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
        {categoryPosts.map((cat) => (
          <section key={cat.slug} className="main-content">
            <h2 className="text-xl font-bold mb-4">{cat.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.posts.map((post) => (
                <HomePostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <aside className="md:w-1/5 md:pr-4 mt-8 md:mt-0 md:order-first">
        <LeftSidebar />
      </aside>
    </div>
  );
}
