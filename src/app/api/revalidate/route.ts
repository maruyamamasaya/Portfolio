import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate
 *
 * This endpoint manually revalidates a blog post page. A secret token is
 * required to prevent arbitrary users from triggering a rebuild.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const { slug } = await req.json();
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ message: 'Missing slug' }, { status: 400 });
  }

  try {
    revalidatePath(`/blog/${slug}`);
    return NextResponse.json({ revalidated: true, slug });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 },
    );
  }
}
