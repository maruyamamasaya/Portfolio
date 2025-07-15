import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const { paths } = await req.json();
  if (!Array.isArray(paths)) {
    return NextResponse.json({ error: 'paths required' }, { status: 400 });
  }
  for (const p of paths) {
    if (typeof p === 'string') {
      revalidatePath(p);
    }
  }
  return NextResponse.json({ revalidated: true });
}
