import { getSortedPosts } from '@/lib/posts';

interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
}

export default async function sitemap(): Promise<SitemapEntry[]> {
  const baseUrl = 'https://freehackapp.com';

  const formatDate = (date: string | Date): string => {
    const parsed = new Date(date);
    return isNaN(parsed.getTime())
      ? new Date().toISOString().split('T')[0]
      : parsed.toISOString().split('T')[0];
  };

  const routes: SitemapEntry[] = [
    '',
    '/about',
    '/ai-course',
    '/arcana',
    '/blog',
    '/categories',
    '/contact',
    '/contact/business',
    '/contact/tutor',
    '/pricing/business',
    '/pricing/tutor',
    '/search',
    '/services',
    '/tags',
    '/rss.xml',
    '/works',
    '/policy/privacy',
    '/policy/law',
    '/policy/copyright',
    '/policy/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: formatDate(new Date()),
  }));

  let postEntries: SitemapEntry[] = [];
  try {
    const posts = await getSortedPosts();
    postEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: formatDate(post.updated ?? post.date),
    }));
  } catch {
    // If the posts directory is missing, just return the static routes
  }

  return [...routes, ...postEntries];
}

