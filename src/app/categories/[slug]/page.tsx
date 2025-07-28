import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategory, getAllCategorySlugs } from '@/lib/categories';
import { getPostsByCategory } from '@/lib/posts';
import BlogNavButtons from '../../components/BlogNavButtons';
import PostCard from '../../components/PostCard';

export async function generateStaticParams() {
  return getAllCategorySlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = getCategory(params.slug);
  return { title: cat ? `Category: ${cat.name}` : 'Not Found' };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) {
    notFound();
  }
  const posts = await getPostsByCategory(params.slug);
  if (!posts.length) {
    notFound();
  }
  return (
    <div className="blog-container">
      <BlogNavButtons />
      <h1 className="text-2xl font-bold mb-4">Category: {category.name}</h1>
      <p className="mb-4">{category.description}</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
