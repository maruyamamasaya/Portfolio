import fs from 'fs';
import path from 'path';

export interface CategoryNode {
  name: string;
  path: string;
  files: string[];
  children: CategoryNode[];
}

const baseDir = path.join(process.cwd(), 'blog');

function readDir(dirPath: string): CategoryNode {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const node: CategoryNode = {
    name: path.basename(dirPath),
    path: path.relative(baseDir, dirPath) || '.',
    files: [],
    children: []
  };

  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      node.children.push(readDir(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      node.files.push(entry.name.replace(/\.md$/, ''));
    }
  }

  return node;
}

export function getCategoryTree(): CategoryNode {
  return readDir(baseDir);
}
