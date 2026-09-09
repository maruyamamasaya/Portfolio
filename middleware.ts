import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

  const basicAuth = req.headers.get('authorization');
  const username = process.env.BASIC_AUTH_USERNAME ?? '';
  const password = process.env.BASIC_AUTH_PASSWORD ?? '';

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    if (user === username && pwd === password) {
      return NextResponse.next();
    }
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: ['/developer_edit', '/developer_edit/:path*', '/works/preview/:path*'],
};
