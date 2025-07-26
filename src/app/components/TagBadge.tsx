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
      className={`${meta.bgColor} ${meta.textColor} flex items-center space-x-1 px-2 py-1 rounded text-xs hover:underline cursor-pointer`}
    >
      <span>{meta.icon}</span>
      <span>{tag}</span>
    </Link>
  );
}
