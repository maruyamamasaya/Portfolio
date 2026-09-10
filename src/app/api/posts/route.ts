import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { validateFilename } from '@/lib/validateFilename';
import { isBasicAuthAuthorized } from '@/lib/apiAuth';
import { recordAuditEvent } from '@/lib/audit';

const postsDir = path.join(process.cwd(), 'blog');

export async function GET() {
  try {
    const files = await fs.readdir(postsDir);
    const mdFiles = files.filter((f) => f.endsWith('.md'));
    return NextResponse.json(mdFiles);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to read posts' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!isBasicAuthAuthorized(req)) {
    recordAuditEvent({
      action: 'posts.create',
      outcome: 'deny',
      status: 401,
      ip,
      reason: 'unauthorized',
    });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { filename, content } = await req.json();
    const safeName = validateFilename(filename);
    if (!safeName) {
      recordAuditEvent({
        action: 'posts.create',
        outcome: 'deny',
        status: 400,
        ip,
        reason: 'invalid_filename',
      });
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    const filePath = path.join(postsDir, safeName);
    await fs.writeFile(filePath, content ?? '', 'utf8');
    recordAuditEvent({
      action: 'posts.create',
      outcome: 'success',
      status: 200,
      ip,
      filename: safeName,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    recordAuditEvent({
      action: 'posts.create',
      outcome: 'error',
      status: 500,
      ip,
      reason: err instanceof Error ? err.message : 'unexpected_error',
    });
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 },
    );
  }
}
