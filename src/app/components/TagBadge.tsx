import Link from 'next/link';

interface Props {
  tag: string;
}

export default function TagBadge({ tag }: Props) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="bg-gray-200 px-2 py-1 rounded text-xs hover:underline cursor-pointer"
    >
      #{tag}
    </Link>
  );
}
