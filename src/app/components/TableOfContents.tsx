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
    <aside
      className="mb-6 rounded-lg p-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 dark:text-gray-100"
    >
      <h3 className="font-bold mb-2">目次</h3>
      <ul className="list-none m-0 p-0 space-y-1">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`${levels[h.level - 1] || levels[levels.length - 1]} py-1`}
          >
            <Link
              href={`#${h.id}`}
              className="accent-text hover:underline focus:underline"
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
