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
      className={`${meta.textColor} hover:underline ${sizeClass} mr-2 inline-flex items-center justify-center space-x-1 h-11 min-w-11 px-3`}
    >
      <span>{meta.icon}</span>
      <span>{label}</span>
    </Link>
  );
}
