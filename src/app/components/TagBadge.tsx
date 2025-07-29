import Link from 'next/link';
import { tagMeta, defaultTagMeta } from '@/lib/tagMeta';

interface Props {
  tag: string;
}

export default function TagBadge({ tag }: Props) {
  const meta = tagMeta[tag] || defaultTagMeta;
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={`tag flex items-center space-x-1 px-3 py-2 rounded text-base bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-100 hover:underline hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-base ${meta.bgColor} ${meta.textColor}`}
    >
      <span>{meta.icon}</span>
      <span>{tag}</span>
    </Link>
  );
}
