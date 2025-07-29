import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { FileNotFoundError } from './errors';

export interface DevPost {
  slug: string;
  title: string;
  date: string;
  image?: string;
  category: string;
  tags?: string[];
  updated?: string;
  content: string;
}

const devPostsDirectory = path.join(process.cwd(), 'developers_blog');

export async function getSortedDevPosts(): Promise<DevPost[]> {
  const fileNames = (await fs.readdir(devPostsDirectory)).filter((file) =>
    file.endsWith('.md'),
  );
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(devPostsDirectory, fileName);
      try {
        await fs.access(fullPath);
      } catch {
        throw new FileNotFoundError(`Dev post not found: ${slug}`);
      }
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        image: data.image as string | undefined,
        category: (data.category as string | undefined) ?? '',
        tags: data.tags as string[] | undefined,
        updated: data.updated as string | undefined,
        content,
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getDevPost(slug: string): Promise<DevPost> {
  const fullPath = path.join(devPostsDirectory, `${slug}.md`);
  try {
    await fs.access(fullPath);
  } catch {
    throw new FileNotFoundError(`Dev post not found: ${slug}`);
  }
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    image: data.image as string | undefined,
    category: (data.category as string | undefined) ?? '',
    tags: data.tags as string[] | undefined,
    updated: data.updated as string | undefined,
    content,
  };
}
