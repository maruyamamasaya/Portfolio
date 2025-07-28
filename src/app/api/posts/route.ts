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

export async function POST(req: Request) {
  try {
    const { filename, content } = await req.json();
    const safeName = validateFilename(filename);
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
