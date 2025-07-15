import { remark } from 'remark';
import html from 'remark-html';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default async function markdownToHtml(
  markdown: string
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];

  const result = await remark()
    .use(() => tree => {
      const visit = (node: any) => {
        if (node.type === 'heading' && node.depth <= 4) {
          const text = node.children
            .filter((child: any) => child.type === 'text')
            .map((child: any) => child.value)
            .join('');
          const id = slugify(text);
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties.id = id;
          headings.push({ id, text, level: node.depth });
        }
        if (node.children) {
          node.children.forEach((child: any) => visit(child));
        }
      };
      visit(tree);
    })
    .use(html)
    .process(markdown);

  return { html: result.toString(), headings };
}
