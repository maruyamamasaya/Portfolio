import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const postsDir = path.join(process.cwd(), 'blog');

function validateFilename(name: unknown) {
  if (typeof name !== 'string') return null;
  const base = path.basename(name);
  if (base !== name || !base.endsWith('.md')) return null;
  return base;
}

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
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
  req: Request,
  { params }: { params: { filename: string } }
) {
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
    return NextResponse.json({ error: 'Failed to write file' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { filename: string } }
) {
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
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
