import Link from 'next/link';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings || headings.length === 0) return null;
  const levels = ['pl-0 text-base', 'pl-4 text-sm', 'pl-8 text-xs'];
  return (
    <aside className="bg-gray-100 p-4 rounded-lg mb-6 dark:bg-gray-700 dark:text-gray-100">
      <h3 className="font-bold mb-2">目次</h3>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li
            key={h.id}
            className={levels[h.level - 1] || levels[levels.length - 1]}
          >
            <Link href={`#${h.id}`} className="accent-text hover:underline">
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
