import { NextRequest, NextResponse } from 'next/server';
import { isBasicAuthAuthorized } from '@/lib/apiAuth';

const getWorksPreviewSecret = () =>
  process.env.WORKS_PREVIEW_SECRET || process.env.REVALIDATE_SECRET || '';

export async function GET(req: NextRequest) {
  if (!isBasicAuthAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  const safeSlug = encodeURIComponent(slug);
  const secret = getWorksPreviewSecret();
  const query = secret ? `?secret=${encodeURIComponent(secret)}` : '';
  const baseUrl = `${req.nextUrl.origin}/works/preview/${safeSlug}${query}`;

  return NextResponse.json({ url: baseUrl, secretProtected: Boolean(secret) });
}

