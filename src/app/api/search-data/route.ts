import { NextResponse } from 'next/server';
import { getSortedPosts } from '@/lib/posts';

export async function GET() {
  const posts = getSortedPosts();
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean))) as string[];
  const tags = Array.from(new Set(posts.flatMap(p => p.tags ?? [])));
  const meta = posts.map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    tags: p.tags
  }));
  return NextResponse.json({ posts: meta, categories, tags });
}
