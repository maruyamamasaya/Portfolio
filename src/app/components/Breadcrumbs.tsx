"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="text-sm mb-2">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/">Home</Link>
        </li>
        {segments.map((seg, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">&gt;</span>
              <Link href={href}>{decodeURIComponent(seg)}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
