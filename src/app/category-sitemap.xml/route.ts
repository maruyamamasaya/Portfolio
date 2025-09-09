import { categories } from '../../../../data/categories';
import { getPostsByCategory } from '@/lib/posts';

export async function GET() {
  const baseUrl = 'https://freehackapp.com';
  const items = await Promise.all(
    categories.map(async (cat) => {
      const posts = await getPostsByCategory(cat.slug);
      const lastmod = posts.length
        ? new Date(
            Math.max(
              ...posts.map((p) =>
                new Date(p.updated ?? p.date).getTime(),
              ),
            ),
          ).toISOString()
        : new Date().toISOString();
      return `<url><loc>${baseUrl}/categories/${cat.slug}</loc><lastmod>${lastmod}</lastmod></url>`;
    }),
  );
  const xml = `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>${items.join('')}</urlset>`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
