import Link from 'next/link';
import { Post } from '@/lib/posts';
import ArrowIcon from '@/app/components/ArrowIcon';

interface Props {
  prev?: Post;
  next?: Post;
}

export default function PrevNextLinks({ prev, next }: Props) {
  if (!prev && !next) return null;
  return (
    <div className="flex justify-between items-center my-8">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="accent-text hover:underline transition-base flex items-center"
        >
          <ArrowIcon color="blue" direction="left" className="mr-2" />
          {prev.title}
        </Link>
      ) : (
        <ArrowIcon color="gray" direction="left" />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="accent-text hover:underline transition-base flex items-center"
        >
          {next.title}
          <ArrowIcon color="yellow" direction="right" className="ml-2" />
        </Link>
      ) : (
        <ArrowIcon color="gray" direction="right" />
      )}
    </div>
  );
}
