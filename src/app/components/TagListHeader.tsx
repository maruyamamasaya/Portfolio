'use client';
import { usePathname } from 'next/navigation';
import TagListClient from './TagListClient';

interface Props {
  tagCounts: { tag: string; count: number }[];
}

export default function TagListHeader({ tagCounts }: Props) {
  const pathname = usePathname();
  const show = pathname === '/';
  if (!show) return null;
  return (
    <div className="bg-white dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto p-2">
        <TagListClient tagCounts={tagCounts} />
      </div>
    </div>
  );
}
