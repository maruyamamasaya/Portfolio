import fs from 'fs/promises';
import path from 'path';

export interface CategoryNode {
  name: string;
  path: string;
  files: string[];
  children: CategoryNode[];
}

const baseDir = path.join(process.cwd(), 'src', 'data', 'posts');

async function readDir(dirPath: string): Promise<CategoryNode> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const node: CategoryNode = {
    name: path.basename(dirPath),
    path: path.relative(baseDir, dirPath) || '.',
    files: [],
    children: [],
  };

  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      node.children.push(await readDir(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      node.files.push(entry.name.replace(/\.md$/, ''));
    }
  }

  return node;
}

export async function getCategoryTree(): Promise<CategoryNode> {
  return readDir(baseDir);
}
