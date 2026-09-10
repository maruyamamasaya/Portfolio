import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isBasicAuthAuthorized, isValidRevalidateToken } from '@/lib/apiAuth';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPreviewPath = pathname.startsWith('/works/preview');
  if (isPreviewPath) {
    const previewSecret = req.nextUrl.searchParams.get('secret');
    const secret =
      process.env.WORKS_PREVIEW_SECRET ?? process.env.REVALIDATE_SECRET ?? '';
    if (previewSecret && secret && previewSecret === secret) {
      return NextResponse.next();
    }
  }

  const hasValidBasicAuth = isBasicAuthAuthorized(req);
  const secret = req.nextUrl.searchParams.get('secret');
  const hasValidToken =
    Boolean(secret) &&
    Boolean(process.env.REVALIDATE_SECRET) &&
    isValidRevalidateToken(secret ?? '');

  if (hasValidBasicAuth || hasValidToken) {
    return NextResponse.next();
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: [
    '/developer_edit',
    '/developer_edit/:path*',
    '/works/preview/:path*',
    '/api/posts',
    '/api/posts/:path*',
    '/api/works',
    '/api/works/:path*',
    '/api/revalidate',
    '/api/revalidate/:path*',
    '/api/works/preview-url',
  ],
};
