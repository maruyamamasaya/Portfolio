import Link from 'next/link';

interface Props {
  tags: string[];
}

export default function TagMarquee({ tags }: Props) {
  const doubled = [...tags, ...tags];
  return (
    <div className="overflow-hidden mb-2">
      <ul className="flex space-x-2 animate-marquee">
        {doubled.map((tag, idx) => (
          <li key={`${tag}-${idx}`} className="flex-shrink-0">
            <Link
              href={`/tags/${encodeURIComponent(tag)}`}
              className="bg-gray-200 px-2 py-1 rounded whitespace-nowrap inline-block"
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
