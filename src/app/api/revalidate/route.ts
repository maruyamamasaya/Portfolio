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

  const { paths } = await req.json();
  if (!Array.isArray(paths) || paths.some((p) => typeof p !== 'string')) {
    return NextResponse.json({ message: 'Missing paths' }, { status: 400 });
  }

  try {
    paths.forEach((p) => revalidatePath(p));
    return NextResponse.json({ revalidated: true, paths });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 },
    );
  }
}
