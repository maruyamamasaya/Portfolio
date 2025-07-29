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
      className={`inline-flex items-center space-x-1 font-medium rounded-full px-3 py-1 ${sizeClass} ${meta.bgColor} ${meta.textColor} hover:opacity-80 transition-base`}
    >
      <span>{meta.icon}</span>
      <span>{label}</span>
    </Link>
  );
}
