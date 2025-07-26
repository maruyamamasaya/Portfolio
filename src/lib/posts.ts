import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  image?: string;
  category: string;
  tags?: string[];
  updated?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'blog');

export function getSortedPosts(): Post[] {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      image: data.image as string | undefined,
      category: data.category as string,
      tags: data.tags as string[] | undefined,
      updated: data.updated as string | undefined,
      content
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    image: data.image as string | undefined,
    category: data.category as string,
    tags: data.tags as string[] | undefined,
    updated: data.updated as string | undefined,
    content
  };
}

export function getAllTags(): string[] {
  const posts = getSortedPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

export function getTagCounts(): { tag: string; count: number }[] {
  const posts = getSortedPosts();
  const counts: Record<string, number> = {};
  posts.forEach(post => {
    post.tags?.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getSortedPosts().filter(post => post.tags?.includes(tag));
}

export function getPostsByTags(tags: string[]): Post[] {
  if (!tags.length) return getSortedPosts();
  return getSortedPosts().filter(post =>
    tags.every(t => post.tags?.includes(t))
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getSortedPosts().filter(post => post.category === category);
}

export function searchPosts(query: string, tags: string[] = []): Post[] {
  const q = query.toLowerCase();
  return getSortedPosts().filter(post => {
    const matchesQuery = !q
      ? true
      : (() => {
          const inTitle = post.title.toLowerCase().includes(q);
          const inContent = post.content.toLowerCase().includes(q);
          const inTags = post.tags?.some(tag => tag.toLowerCase().includes(q));
          const inCategory = post.category.toLowerCase().includes(q);
          return inTitle || inContent || inTags || inCategory;
        })();
    const matchesTags = tags.every(t => post.tags?.includes(t));
    return matchesQuery && matchesTags;
  });
}

export function getBacklinks(slug: string): Post[] {
  const posts = getSortedPosts();
  return posts.filter(post => post.content.includes(`${slug}.md`));
}
