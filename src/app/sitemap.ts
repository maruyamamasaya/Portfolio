import { MetadataRoute } from 'next';
import { getSortedPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://freehackapp.com';

  const routes = ['', '/about', '/ai-course', '/arcana', '/blog', '/categories', '/contact', '/search', '/tags', '/works'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }),
  );

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getSortedPosts();
    postEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
    }));
  } catch {
    // If the posts directory is missing, just return the static routes
  }

  return [...routes, ...postEntries];
}
