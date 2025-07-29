export default function getExcerpt(content: string, length = 120) {
  const plain = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/[>#*_]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  return plain.slice(0, length);
}
