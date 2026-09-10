import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  extractRevalidateToken,
  isBasicAuthAuthorized,
  isValidRevalidateToken,
} from '@/lib/apiAuth';
import { recordAuditEvent } from '@/lib/audit';

/**
 * POST /api/revalidate
 *
 * This endpoint manually revalidates a blog post page. A secret token is
 * required to prevent arbitrary users from triggering a rebuild.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const token = await extractRevalidateToken(req);
  const isAuthorized =
    isBasicAuthAuthorized(req) || isValidRevalidateToken(token);
  if (!isAuthorized) {
    recordAuditEvent({
      action: 'cache.revalidate',
      outcome: 'deny',
      status: 401,
      ip,
      reason: 'unauthorized',
    });
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const body = await req.clone().json().catch(() => ({}));
  const paths = body.paths;
  if (!Array.isArray(paths) || paths.some((p) => typeof p !== 'string')) {
    recordAuditEvent({
      action: 'cache.revalidate',
      outcome: 'deny',
      status: 400,
      ip,
      reason: 'invalid_paths',
    });
    return NextResponse.json({ message: 'Missing paths' }, { status: 400 });
  }

  try {
    paths.forEach((p) => revalidatePath(p));
    recordAuditEvent({
      action: 'cache.revalidate',
      outcome: 'success',
      status: 200,
      ip,
      paths,
    });
    return NextResponse.json({ revalidated: true, paths });
  } catch (err) {
    recordAuditEvent({
      action: 'cache.revalidate',
      outcome: 'error',
      status: 500,
      ip,
      paths,
      reason: err instanceof Error ? err.message : 'unexpected_error',
    });
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 },
    );
  }
}
