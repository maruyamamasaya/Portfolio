import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'file required' }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = path.basename(file.name);
  const filePath = path.join(process.cwd(), 'public', 'images', filename);
  await fs.writeFile(filePath, buffer);
  return NextResponse.json({ ok: true, filename });
}
