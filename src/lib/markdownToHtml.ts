import { unified } from 'unified';
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

async function replaceInternalLinks(content: string): Promise<string> {
  const replaced = content.replace(
    /\b([A-Za-z0-9_-]+)\.md\b/g,
    (_, slug) => `[${slug}](/blog/${slug})`,
  );

  const regex = /\[\[([A-Za-z0-9_-]+)\]\]/g;
  const matches = Array.from(replaced.matchAll(regex));
  let getPostFn: ((slug: string) => Promise<any>) | null = null;
  if (typeof window === 'undefined' && matches.length) {
    try {
      const mod = await import('./posts');
      getPostFn = mod.getPost;
    } catch {
      getPostFn = null;
    }
  }
  const cards = await Promise.all(
    matches.map(async (m) => {
      const slug = m[1];
      if (getPostFn) {
        try {
          const post = await getPostFn(slug);
          const img = post.image ?? '/images/img1.svg';
          const alt = post.alt ?? post.title;
          return `<a href="/blog/${slug}" class="blog-card block no-underline" style="max-width: 400px;"><img src="${img}" alt="${alt}" style="width: 100%; height: auto;" /><span>${post.title}</span></a>`;
        } catch {
          /* ignore */
        }
      }
      return `<a href="/blog/${slug}">${slug}</a>`;
    }),
  );

  let i = 0;
  return replaced.replace(regex, () => cards[i++]);
}

function convertMarkdownTables(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const next = lines[i + 1];
    const isHeader = /^\|.*\|$/.test(line.trim());
    const isDelimiter =
      next && /^\|?\s*[:-]+\s*(\|\s*[:-]+\s*)+\|?$/.test(next.trim());

    if (isHeader && isDelimiter) {
      const headers = line
        .trim()
        .slice(1, -1)
        .split('|')
        .map((h) => h.trim());
      const rows: string[][] = [];
      i += 2;
      while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) {
        const cells = lines[i]
          .trim()
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        rows.push(cells);
        i++;
      }
      i--; // adjust for outer loop
      let html = '<table><thead><tr>';
      html += headers.map((h) => `<th>${h}</th>`).join('');
      html += '</tr></thead>';
      if (rows.length) {
        html += '<tbody>';
        rows.forEach((r) => {
          html += '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>';
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

function convertChatBlocks(content: string): string {
  const regex =
    /^:::chat\s+(user0[1-9]|user10)\s+(Calm|Happy|Serious|Troubled|Surprised|Sad)\s+(left|right)[ \t]*\r?\n([\s\S]*?)\r?\n:::[ \t]*(?=\r?\n|$)/gm;

  return content.replace(
    regex,
    (
      _,
      user: string,
      emotion: string,
      pos: string,
      text: string,
    ) => {
      const icon = `/images/${user}${emotion}.png`;
      const body = text.trim().replace(/\n/g, '<br />');
      return `<div class="chat ${user} ${emotion} ${pos}"><img src="${icon}" alt="${user} ${emotion}" class="chat-icon w-20 h-20 rounded-full" width="80" height="80"/><div class="chat-bubble">${body}</div></div>`;
    },
  );
}

// Collect headings from the markdown AST
function collectHeadings(tree: Root, headings: Heading[]): void {
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
}

export default async function markdownToHtml(
  markdown: string,
): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];

  const replaced = await replaceInternalLinks(markdown);
  const processed = formatBold(convertMarkdownTables(convertChatBlocks(replaced)));

  const parser = unified().use(parse);
  const tree = parser.parse(processed);
  collectHeadings(tree, headings);

  const processor = unified()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true });

  const transformed = await processor.run(tree);
  const html = processor.stringify(transformed);

  return { html, headings };
}
