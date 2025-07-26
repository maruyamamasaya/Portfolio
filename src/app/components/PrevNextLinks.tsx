import Link from 'next/link';
import { Post } from '@/lib/posts';

interface Props {
  prev?: Post;
  next?: Post;
}

export default function PrevNextLinks({ prev, next }: Props) {
  if (!prev && !next) return null;
  return (
    <div className="flex justify-between my-8">
      {prev ? (
        <Link href={`/blog/${prev.slug}`} className="accent-text hover:underline">
          &larr; {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={`/blog/${next.slug}`} className="accent-text hover:underline">
          {next.title} &rarr;
        </Link>
      )}
    </div>
  );
}
