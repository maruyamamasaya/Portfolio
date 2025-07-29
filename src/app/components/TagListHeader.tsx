'use client';
import { usePathname } from 'next/navigation';
import TagListClient from './TagListClient';

interface Props {
  tagCounts: { tag: string; count: number }[];
}

export default function TagListHeader({ tagCounts }: Props) {
  const pathname = usePathname();
  const show = pathname === '/' || pathname.startsWith('/blog');
  if (!show) return null;
  return <TagListClient tagCounts={tagCounts} />;
}
