import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) {
      return NextResponse.json({ error: 'file required' }, { status: 400 });
    }
    const ALLOWED_TYPES = ['image/png', 'image/jpeg'];
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (!ALLOWED_TYPES.includes(file.type) || file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Invalid file type or size' },
        { status: 400 },
      );
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = path.basename(file.name);
    if (!filename) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }
    const filePath = path.join(process.cwd(), 'public', 'images', filename);
    await fs.writeFile(filePath, buffer);
    return NextResponse.json({ ok: true, filename });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 },
    );
  }
}
