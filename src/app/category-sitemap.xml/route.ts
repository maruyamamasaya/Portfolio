import { getCategories } from '@/lib/categories';

const baseUrl = 'https://freehackapp.com';

const formatDate = (date: string | Date): string => {
  const parsed = new Date(date);
  return isNaN(parsed.getTime())
    ? new Date().toISOString().split('T')[0]
    : parsed.toISOString().split('T')[0];
};

export async function GET() {
  const categories = getCategories();
  const now = formatDate(new Date());

  const items = categories
    .map((cat) => `<url>\n<loc>${baseUrl}${cat.href}</loc>\n<lastmod>${now}</lastmod>\n</url>`)
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
