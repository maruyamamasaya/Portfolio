const fs = require('node:fs');

const [csvInputPath, jsonInputPath] = [
  process.argv[2] || 'data/image-assets-replacements.template.csv',
  process.argv[3] || 'data/image-assets.json',
];

const csvRaw = fs.readFileSync(csvInputPath, 'utf8');
const lines = csvRaw
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

if (lines.length <= 1) {
  throw new Error(`CSV has no data rows: ${csvInputPath}`);
}

const parseCsvLine = (line) => {
  // Minimal parser for quoted CSV with commas/newlines in values not expected.
  const cells = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      cells.push(current);
      current = '';
      continue;
    }
    current += ch;
  }
  cells.push(current);

  return cells.map((cell) => (cell.startsWith('"') && cell.endsWith('"') ? cell.slice(1, -1) : cell));
};

const rows = lines.slice(1).map(parseCsvLine);
const header = parseCsvLine(lines[0]);
const headerIndex = Object.fromEntries(header.map((name, i) => [name, i]));

const updates = rows.reduce((acc, row) => {
  const path = row[headerIndex.path] || '';
  const replacementUrl = row[headerIndex.replacementUrl] || '';
  const trimmed = (replacementUrl || '').trim();
  if (!path) return acc;
  if (!trimmed) return acc;
  acc[path] = trimmed;
  return acc;
}, {});

if (Object.keys(updates).length === 0) {
  console.log('No non-empty replacementUrl found. data/image-assets.json was not changed.');
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(jsonInputPath, 'utf8'));
let changed = 0;

Object.entries(updates).forEach(([path, replacementUrl]) => {
  if (!Object.prototype.hasOwnProperty.call(data, path)) {
    console.warn(`Skip: key not found in JSON: ${path}`);
    return;
  }
  if (data[path].replacementUrl === replacementUrl) return;
  data[path].replacementUrl = replacementUrl;
  changed += 1;
});

if (changed === 0) {
  console.log('No rows changed (all URLs already set or keys not found).');
  process.exit(0);
}

const pretty = `${JSON.stringify(data, null, 2)}\n`;
fs.writeFileSync(jsonInputPath, pretty, 'utf8');
console.log(`Updated ${changed} replacementUrl entries in ${jsonInputPath}.`);
