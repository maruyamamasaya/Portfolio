import { categories as categoryData } from '../../data/categories';

export interface Category {
  name: string;
  href: string;
}

export function getCategories(): Category[] {
  return categoryData.map(cat => ({ name: cat.name, href: `/categories/${cat.slug}` }));
}
