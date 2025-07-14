import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Category {
  name: string;
  href: string;
}

const categoriesPath = path.join(process.cwd(), 'docs/categories.md');

export function getCategories(): Category[] {
  const fileContents = fs.readFileSync(categoriesPath, 'utf8');
  const { data } = matter(fileContents);
  const categories = data.categories as { name: string; href: string }[] | undefined;
  if (!categories) return [];
  return categories;
}
