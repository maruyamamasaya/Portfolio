import { getSortedPosts } from '@/lib/posts';

const baseUrl = 'https://freehackapp.com';

const formatDate = (date: string | Date): string => {
  const parsed = new Date(date);
  return isNaN(parsed.getTime())
    ? new Date().toISOString().split('T')[0]
    : parsed.toISOString().split('T')[0];
};

export async function GET() {
  const posts = await getSortedPosts();

  const items = posts
    .map((post) => {
      const lastmod = formatDate(post.updated ?? post.date);
      return `<url>\n<loc>${baseUrl}/blog/${post.slug}</loc>\n<lastmod>${lastmod}</lastmod>\n</url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
