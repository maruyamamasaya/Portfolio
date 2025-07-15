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

function replaceInternalLinks(content: string): string {
  return content.replace(/\b([A-Za-z0-9_-]+)\.md\b/g, (_, slug) =>
    `[ここに記入すると](/blog/${slug})`
  );
}

export default async function markdownToHtml(
  markdown: string
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];

  const processed = replaceInternalLinks(markdown);

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
    .process(processed);

  return { html: result.toString(), headings };
}
