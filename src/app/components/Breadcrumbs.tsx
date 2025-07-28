'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="w-4 h-4 text-gray-400 mx-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-sm text-gray-500 mb-2"
    >
      <ol className="inline-flex items-center">
        <li className="inline-flex items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {segments.map((seg, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          const isHiddenMobile =
            segments.length > 2 && index > 0 && index < segments.length - 1;

          return (
            <li
              key={index}
              className={`inline-flex items-center ${isHiddenMobile ? 'hidden sm:inline-flex' : ''}`}
            >
              <ArrowIcon />
              {isLast ? (
                <span aria-current="page" className="font-semibold accent-text">
                  {decodeURIComponent(seg)}
                </span>
              ) : (
                <Link href={href} className="hover:underline">
                  {decodeURIComponent(seg)}
                </Link>
              )}
            </li>
          );
        })}
        {segments.length > 2 && (
          <li className="inline-flex items-center sm:hidden">
            <ArrowIcon />
            <span>...</span>
          </li>
        )}
      </ol>
    </nav>
  );
}
