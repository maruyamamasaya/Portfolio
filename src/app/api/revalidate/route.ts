import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  extractRevalidateToken,
  isBasicAuthAuthorized,
  isValidRevalidateToken,
} from '@/lib/apiAuth';

/**
 * POST /api/revalidate
 *
 * This endpoint manually revalidates a blog post page. A secret token is
 * required to prevent arbitrary users from triggering a rebuild.
 */
export async function POST(req: NextRequest) {
  const token = await extractRevalidateToken(req);
  const isAuthorized =
    isBasicAuthAuthorized(req) || isValidRevalidateToken(token);
  if (!isAuthorized) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const body = await req.clone().json().catch(() => ({}));
  const paths = body.paths;
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
