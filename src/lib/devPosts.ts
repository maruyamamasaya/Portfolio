import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface DevPost {
  slug: string;
  title: string;
  date: string;
  image?: string;
  tags?: string[];
  updated?: string;
  content: string;
}

const devPostsDirectory = path.join(process.cwd(), 'developers_blog');

export function getSortedDevPosts(): DevPost[] {
  const fileNames = fs.readdirSync(devPostsDirectory);
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(devPostsDirectory, fileName);
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

export function getDevPost(slug: string): DevPost {
  const fullPath = path.join(devPostsDirectory, `${slug}.md`);
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
