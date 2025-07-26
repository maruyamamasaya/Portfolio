import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { Post } from '@/lib/posts';
import PostCard from '@/app/components/PostCard';
import { getPostsByCategory } from '@/lib/posts';
import { categories, type Category } from '../../../data/categories';

interface Params extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  category: Category;
  posts: Post[];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: categories.map(cat => ({ params: { slug: cat.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const slug = params?.slug ?? '';
  const category = categories.find(cat => cat.slug === slug);
  if (!category) {
    return { notFound: true };
  }
  const posts = getPostsByCategory(slug);
  return {
    props: {
      category,
      posts,
    },
  };
};

export default function CategoryPage({ category, posts }: Props) {
  return (
    <div className="blog-container">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
      <p className="mb-4">{category.description}</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
