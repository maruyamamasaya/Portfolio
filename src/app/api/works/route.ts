import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { validateFilename } from '@/lib/validateFilename';
import { isBasicAuthAuthorized } from '@/lib/apiAuth';
import { recordAuditEvent } from '@/lib/audit';

const worksDir = path.join(process.cwd(), 'content', 'works');

export async function GET() {
  try {
    const files = await fs.readdir(worksDir);
    const mdFiles = files.filter((f) => f.endsWith('.md'));
    return NextResponse.json(mdFiles);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to read works' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!isBasicAuthAuthorized(req)) {
    recordAuditEvent({
      action: 'works.create',
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
        action: 'works.create',
        outcome: 'deny',
        status: 400,
        ip,
        reason: 'invalid_filename',
      });
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    const filePath = path.join(worksDir, safeName);
    await fs.writeFile(filePath, content ?? '', 'utf8');
    recordAuditEvent({
      action: 'works.create',
      outcome: 'success',
      status: 200,
      ip,
      filename: safeName,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    recordAuditEvent({
      action: 'works.create',
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
