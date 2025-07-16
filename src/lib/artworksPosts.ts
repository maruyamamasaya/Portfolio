import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  image?: string;
  tags?: string[];
  updated?: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'artworks_blog');

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

export function getPostsByTag(tag: string): Post[] {
  return getSortedPosts().filter(post => post.tags?.includes(tag));
}

export function getBacklinks(slug: string): Post[] {
  const posts = getSortedPosts();
  return posts.filter(post => post.content.includes(`${slug}.md`));
}
