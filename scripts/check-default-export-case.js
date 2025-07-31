const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, fileList);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      fileList.push(full);
    }
  }
  return fileList;
}

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const patterns = [
    /export\s+default\s+(?:async\s+)?function\s+([a-z][A-Za-z0-9_]*)/g,
    /export\s+default\s+([a-z][A-Za-z0-9_]*)\s*(?:;|$)/g,
  ];
  let error = false;
  for (const regex of patterns) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      console.error(`${file}: default export '${match[1]}' should be PascalCase`);
      error = true;
    }
  }
  return error;
}

const files = walk(path.join(__dirname, '..', 'src'));
let hasError = false;
for (const file of files) {
  if (checkFile(file)) {
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}
