import Link from 'next/link';
import Image from 'next/image';
import TableOfContents from './TableOfContents';
import { ReactNode } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface Props {
  title: string;
  date: string;
  updated?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  headings?: Heading[];
  children: ReactNode;
}

export default function PostLayout({
  title,
  date,
  updated,
  tags,
  image,
  imageAlt,
  headings,
  children,
}: Props) {
  return (
    <article className="prose prose-light dark:prose-dark main-content">
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? title}
          width={800}
          height={400}
          className="mb-4"
        />
      )}
      {headings && headings.length > 0 && (
        <TableOfContents headings={headings} />
      )}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {date}
        {updated && ` (更新: ${updated})`}
      </p>
      {tags && (
        <ul className="flex space-x-2 text-xs mb-2">
          {tags.map((tag) => (
            <li key={tag} className="bg-gray-200 px-2 py-1 rounded">
              <Link href={`/tags/${encodeURIComponent(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      )}
      {children}
    </article>
  );
}
