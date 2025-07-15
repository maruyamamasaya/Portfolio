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

export default async function markdownToHtml(
  markdown: string
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];

  const processed = convertMarkdownTables(replaceInternalLinks(markdown));

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
