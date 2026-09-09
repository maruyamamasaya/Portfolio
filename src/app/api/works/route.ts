import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { validateFilename } from '@/lib/validateFilename';

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

export async function POST(req: Request) {
  try {
    const { filename, content } = await req.json();
    const safeName = validateFilename(filename);
    if (!safeName) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    const filePath = path.join(worksDir, safeName);
    await fs.writeFile(filePath, content ?? '', 'utf8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to write file' },
      { status: 500 },
    );
  }
}
