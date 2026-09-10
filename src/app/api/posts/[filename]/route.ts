import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { validateFilename } from '@/lib/validateFilename';
import { isBasicAuthAuthorized } from '@/lib/apiAuth';
import { recordAuditEvent } from '@/lib/audit';

const postsDir = path.join(process.cwd(), 'blog');

export async function GET(
  req: Request,
  { params }: { params: { filename: string } },
) {
  const safeName = validateFilename(params.filename);
  if (!safeName) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }
  const filePath = path.join(postsDir, safeName);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ content });
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { filename: string } },
) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!isBasicAuthAuthorized(req)) {
    recordAuditEvent({
      action: 'posts.update',
      outcome: 'deny',
      status: 401,
      ip,
      filename: params.filename,
      reason: 'unauthorized',
    });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { content } = await req.json();
    const safeName = validateFilename(params.filename);
    if (!safeName) {
      recordAuditEvent({
        action: 'posts.update',
        outcome: 'deny',
        status: 400,
        ip,
        filename: params.filename,
        reason: 'invalid_filename',
      });
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    const filePath = path.join(postsDir, safeName);
    await fs.writeFile(filePath, content ?? '', 'utf8');
    recordAuditEvent({
      action: 'posts.update',
      outcome: 'success',
      status: 200,
      ip,
      filename: safeName,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    recordAuditEvent({
      action: 'posts.update',
      outcome: 'error',
      status: 500,
      ip,
      filename: params.filename,
      reason: err instanceof Error ? err.message : 'unexpected_error',
    });
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { filename: string } },
) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  if (!isBasicAuthAuthorized(req)) {
    recordAuditEvent({
      action: 'posts.delete',
      outcome: 'deny',
      status: 401,
      ip,
      filename: params.filename,
      reason: 'unauthorized',
    });
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const safeName = validateFilename(params.filename);
  if (!safeName) {
    recordAuditEvent({
      action: 'posts.delete',
      outcome: 'deny',
      status: 400,
      ip,
      filename: params.filename,
      reason: 'invalid_filename',
    });
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }
  const filePath = path.join(postsDir, safeName);
  try {
    await fs.unlink(filePath);
    recordAuditEvent({
      action: 'posts.delete',
      outcome: 'success',
      status: 200,
      ip,
      filename: safeName,
    });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      recordAuditEvent({
        action: 'posts.delete',
        outcome: 'deny',
        status: 404,
        ip,
        filename: safeName,
        reason: 'not_found',
      });
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    recordAuditEvent({
      action: 'posts.delete',
      outcome: 'error',
      status: 500,
      ip,
      filename: safeName,
      reason: err?.message ?? 'unexpected_error',
    });
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 },
    );
  }
}
