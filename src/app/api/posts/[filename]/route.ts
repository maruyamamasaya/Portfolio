import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { validateFilename } from '@/lib/validateFilename';
import { isBasicAuthAuthorized } from '@/lib/apiAuth';

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
  if (!isBasicAuthAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { content } = await req.json();
    const safeName = validateFilename(params.filename);
    if (!safeName) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    const filePath = path.join(postsDir, safeName);
    await fs.writeFile(filePath, content ?? '', 'utf8');
    return NextResponse.json({ ok: true });
  } catch (err) {
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
  if (!isBasicAuthAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const safeName = validateFilename(params.filename);
  if (!safeName) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }
  const filePath = path.join(postsDir, safeName);
  try {
    await fs.unlink(filePath);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 },
    );
  }
}
