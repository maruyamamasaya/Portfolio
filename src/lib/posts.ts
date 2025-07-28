import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  image?: string;
  alt?: string;
  category: string;
  tags?: string[];
  updated?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'blog');

export async function getSortedPosts(): Promise<Post[]> {
  const fileNames = (await fs.readdir(postsDirectory)).filter((file) =>
    file.endsWith('.md'),
  );
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      try {
        await fs.access(fullPath);
      } catch {
        throw new Error(`Post not found: ${slug}`);
      }
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        image: data.image as string | undefined,
        alt: data.alt as string | undefined,
        category: data.category as string,
        tags: data.tags as string[] | undefined,
        updated: data.updated as string | undefined,
        content,
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    await fs.access(fullPath);
  } catch {
    throw new Error(`Post not found: ${slug}`);
  }
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    image: data.image as string | undefined,
    alt: data.alt as string | undefined,
    category: data.category as string,
    tags: data.tags as string[] | undefined,
    updated: data.updated as string | undefined,
    content,
  };
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getSortedPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

export async function getTagCounts(): Promise<
  { tag: string; count: number }[]
> {
  const posts = await getSortedPosts();
  const counts: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  return (await getSortedPosts()).filter((post) => post.tags?.includes(tag));
}

export async function getPostsByTags(tags: string[]): Promise<Post[]> {
  if (!tags.length) return getSortedPosts();
  return (await getSortedPosts()).filter((post) =>
    tags.every((t) => post.tags?.includes(t)),
  );
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return (await getSortedPosts()).filter((post) => post.category === category);
}

export async function searchPosts(
  query: string,
  tags: string[] = [],
): Promise<Post[]> {
  const q = query.toLowerCase();
  return (await getSortedPosts()).filter((post) => {
    const matchesQuery = !q
      ? true
      : (() => {
          const inTitle = post.title.toLowerCase().includes(q);
          const inContent = post.content.toLowerCase().includes(q);
          const inTags = post.tags?.some((tag) =>
            tag.toLowerCase().includes(q),
          );
          const inCategory = post.category.toLowerCase().includes(q);
          return inTitle || inContent || inTags || inCategory;
        })();
    const matchesTags = tags.every((t) => post.tags?.includes(t));
    return matchesQuery && matchesTags;
  });
}

export async function getBacklinks(slug: string): Promise<Post[]> {
  const posts = await getSortedPosts();
  return posts.filter((post) => post.content.includes(`${slug}.md`));
}
