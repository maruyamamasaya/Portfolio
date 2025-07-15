import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

const postsDir = path.join(process.cwd(), 'blog');

export async function GET(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const safeName = path.basename(params.filename);
  const filePath = path.join(postsDir, safeName);
  const content = await fs.readFile(filePath, 'utf8');
  return NextResponse.json({ content });
}

export async function PUT(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const { content } = await req.json();
  const safeName = path.basename(params.filename);
  const filePath = path.join(postsDir, safeName);
  await fs.writeFile(filePath, content ?? '', 'utf8');
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { filename: string } }
) {
  const safeName = path.basename(params.filename);
  const filePath = path.join(postsDir, safeName);
  await fs.unlink(filePath);
  return NextResponse.json({ ok: true });
}
