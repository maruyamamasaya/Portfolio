#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'src', 'app');

let hasError = false;

function traverse(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      traverse(fullPath);
    } else if (entry.isFile() && /\.[jt]sx?$/.test(entry.name)) {
      checkFile(fullPath);
    }
  }
}

function checkFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const pattern1 = /export\s+default\s+function\s+(\w+)/;
  let match = text.match(pattern1);
  if (match && !/^[A-Z]/.test(match[1])) {
    console.error(`${filePath}: default exported function '${match[1]}' should start with an uppercase letter`);
    hasError = true;
  }
  const pattern2 = /function\s+(\w+)\s*\([^)]*\)[\s\S]*?export\s+default\s+\1\s*;/m;
  match = text.match(pattern2);
  if (match && !/^[A-Z]/.test(match[1])) {
    console.error(`${filePath}: default export '${match[1]}' should start with an uppercase letter`);
    hasError = true;
  }
}

traverse(appDir);
if (hasError) {
  process.exit(1);
}
