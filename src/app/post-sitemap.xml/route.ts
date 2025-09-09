import { getSortedPosts } from '@/lib/posts';

export async function GET() {
  const baseUrl = 'https://freehackapp.com';
  const posts = await getSortedPosts();
  const items = posts
    .map((post) => {
      const lastmod = new Date(post.updated ?? post.date).toISOString();
      return `<url><loc>${baseUrl}/blog/${post.slug}</loc><lastmod>${lastmod}</lastmod></url>`;
    })
    .join('');
  const xml = `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>${items}</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
