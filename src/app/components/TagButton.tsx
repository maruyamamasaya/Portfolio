import Link from 'next/link';
import { tagMeta, defaultTagMeta } from '@/lib/tagMeta';

interface Props {
  label: string;
  sizeClass?: string;
}

export default function TagButton({ label, sizeClass = 'text-sm' }: Props) {
  const meta = tagMeta[label] || defaultTagMeta;
  return (
    <Link
      href={`/tags/${encodeURIComponent(label)}`}
      className={`${meta.textColor} hover:underline ${sizeClass} mr-2 flex items-center space-x-1`}
    >
      <span>{meta.icon}</span>
      <span>{label}</span>
    </Link>
  );
}
