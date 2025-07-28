import { getSortedPosts } from '@/lib/posts';
import LeftSidebar from '@/app/components/LeftSidebar';
import PostCard from '@/app/components/PostCard';

export default async function BlogIndex() {
  const posts = await getSortedPosts();
  const latest = posts.slice(0, 3);
  const rest = posts.slice(3);

  return (
    <div className="blog-container">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <div className="md:flex">
        <aside className="md:w-1/5 md:pr-4 mb-4 md:mb-0">
          <LeftSidebar />
        </aside>
        <div className="md:flex-1 space-y-8">
          <section className="main-content">
            <h2 className="text-xl font-bold mb-4">最新記事</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
          {rest.length > 0 && (
            <section className="main-content">
              <h2 className="text-xl font-bold mb-4">過去の記事</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
