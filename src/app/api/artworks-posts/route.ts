import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const postsDir = path.join(process.cwd(), 'artworks_blog');

export async function GET() {
  const files = await fs.readdir(postsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  return NextResponse.json(mdFiles);
}

export async function POST(req: Request) {
  const { filename, content } = await req.json();
  if (!filename) {
    return NextResponse.json({ error: 'filename required' }, { status: 400 });
  }
  const safeName = path.basename(filename);
  const filePath = path.join(postsDir, safeName);
  await fs.writeFile(filePath, content ?? '', 'utf8');
  return NextResponse.json({ ok: true });
}
