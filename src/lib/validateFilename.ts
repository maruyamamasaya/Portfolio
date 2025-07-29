import path from 'path';

export function validateFilename(name: unknown): string | null {
  if (typeof name !== 'string') return null;
  const base = path.basename(name);
  if (base !== name || !base.endsWith('.md')) return null;
  return base;
}
