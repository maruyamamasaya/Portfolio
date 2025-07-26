import Link from 'next/link';

interface Props {
  label: string;
  sizeClass?: string;
}

export default function TagButton({ label, sizeClass = 'text-sm' }: Props) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(label)}`}
      className={`text-primary hover:underline ${sizeClass} mr-2`}
    >
      {label}
    </Link>
  );
}
