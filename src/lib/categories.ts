import { categories as categoryData } from '../../data/categories';

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface CategoryLink {
  name: string;
  href: string;
  icon: string;
}

export function getCategories(): CategoryLink[] {
  return categoryData.map((cat) => ({
    name: cat.name,
    href: `/categories/${cat.slug}`,
    icon: cat.icon,
  }));
}

export function getCategory(slug: string): Category | undefined {
  return categoryData.find((cat) => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categoryData.map((cat) => cat.slug);
}
