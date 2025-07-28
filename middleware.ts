import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.includes('developer') ||
    pathname.startsWith('/api/dev-posts') ||
    pathname.startsWith('/api/posts') ||
    pathname.startsWith('/api/upload-image')
  ) {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = Buffer.from(authValue, 'base64')
        .toString()
        .split(':');
      const username = process.env.BASIC_AUTH_USERNAME ?? '';
      const password = process.env.BASIC_AUTH_PASSWORD ?? '';
      if (user === username && pwd === password) {
        return NextResponse.next();
      }
    }
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
