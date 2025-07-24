import Link from 'next/link';

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings || headings.length === 0) return null;
  const indent = ['','ml-2','ml-4','ml-6'];
  return (
    <div>
      <h3 className="font-bold mb-2">目次</h3>
      <ul className="text-sm space-y-1">
        {headings.map(h => (
          <li key={h.id} className={indent[h.level - 1] || indent[indent.length - 1]}>
            <Link href={`#${h.id}`} className="text-primary hover:underline">
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
