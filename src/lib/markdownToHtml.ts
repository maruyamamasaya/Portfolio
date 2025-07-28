import { unified, type Plugin, type Processor } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';
import { Root } from 'mdast';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

function replaceInternalLinks(content: string): string {
  return content.replace(/\b([A-Za-z0-9_-]+)\.md\b/g, (_, slug) =>
    `[${slug}](/blog/${slug})`
  );
}

function convertMarkdownTables(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const next = lines[i + 1];
    const isHeader = /^\|.*\|$/.test(line.trim());
    const isDelimiter = next && /^\|?\s*[:-]+\s*(\|\s*[:-]+\s*)+\|?$/.test(next.trim());

    if (isHeader && isDelimiter) {
      const headers = line.trim().slice(1, -1).split('|').map(h => h.trim());
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
        const cells = lines[i].trim().slice(1, -1).split('|').map(c => c.trim());
        rows.push(cells);
        i++;
      }
      i--; // adjust for outer loop
      let html = '<table><thead><tr>';
      html += headers.map(h => `<th>${h}</th>`).join('');
      html += '</tr></thead>';
      if (rows.length) {
        html += '<tbody>';
        rows.forEach(r => {
          html += '<tr>' + r.map(c => `<td>${c}</td>`).join('') + '</tr>';
        });
        html += '</tbody>';
      }
      html += '</table>';
      result.push(html);
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}

function formatBold(content: string): string {
  return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

// MDAST（Markdownの抽象構文木）に対するプラグイン
function headingsPlugin(headings: Heading[]): Plugin<[], Root> {
  return () => (tree: Root) => {
    const visit = (node: any) => {
      if (node.type === 'heading' && node.depth <= 3) {
        const text = node.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.value)
          .join('');
        const existingId = node.data?.hProperties?.id as string | undefined;
        const id = existingId || slugify(text);
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        if (!existingId) {
          node.data.hProperties.id = id;
        }
        headings.push({ id, text, level: node.depth });
      }
      if (node.children) {
        node.children.forEach((child: any) => visit(child));
      }
    };
    visit(tree);
  };
}

export default async function markdownToHtml(
  markdown: string
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];

  const processed = formatBold(
    convertMarkdownTables(replaceInternalLinks(markdown))
  );

  const processor: Processor = unified()
    .use(parse)
    .use(headingsPlugin(headings))
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify);

  const result = await processor.process(processed);

  return { html: result.toString(), headings };
}
