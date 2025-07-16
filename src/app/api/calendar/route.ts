import { NextRequest, NextResponse } from 'next/server';
import { getSortedDevPosts } from '@/lib/devPosts';

function format(date: Date) {
  return date.toISOString().split('T')[0];
}

export async function GET(req: NextRequest) {
  const year = parseInt(req.nextUrl.searchParams.get('year') || '');
  const month = parseInt(req.nextUrl.searchParams.get('month') || '');

  if (Number.isNaN(year) || Number.isNaN(month)) {
    return NextResponse.json({ error: 'Invalid year or month' }, { status: 400 });
  }

  const posts = getSortedDevPosts();
  const days = [] as { date: string; posts: typeof posts }[];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const dayStr = format(date);
    const dayPosts = posts.filter(p => p.date === dayStr);
    days.push({ date: dayStr, posts: dayPosts });
    date.setDate(date.getDate() + 1);
  }

  return NextResponse.json(days);
}
