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
      className={`inline-flex items-center space-x-1 text-sm font-medium rounded-full px-3 py-1 ${meta.bgColor} ${meta.textColor} hover:opacity-80 transition-base`}
    >
      <span>{meta.icon}</span>
      <span>{tag}</span>
    </Link>
  );
}
