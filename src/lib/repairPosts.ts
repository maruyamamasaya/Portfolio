import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface RepairPost {
  slug: string;
  title: string;
  date: string;
  image?: string;
  tags?: string[];
  updated?: string;
  content: string;
}

const repairDirectory = path.join(process.cwd(), 'repair_blog');

export function getSortedRepairPosts(): RepairPost[] {
  const fileNames = fs
    .readdirSync(repairDirectory)
    .filter(file => file.endsWith('.md'));
  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(repairDirectory, fileName);
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

export function getRepairPost(slug: string): RepairPost {
  const fullPath = path.join(repairDirectory, `${slug}.md`);
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
