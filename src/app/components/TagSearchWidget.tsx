import Link from 'next/link';
import Image from 'next/image';

const tags = [
  { name: 'AWS', icon: '/images/AWS.png' },
  { name: 'GitHub', icon: '/images/GitHub.png' },
  { name: 'React', icon: '/images/React.png' },
  { name: 'Next.js', icon: '/images/Nextjs.png' },
  { name: 'Docker', icon: '/images/Docker.png' },
];

export default function TagSearchWidget() {
  return (
    <div className="widget">
      <h3 className="text-lg font-bold mb-2">タグ検索</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${encodeURIComponent(tag.name)}`}
            className="block"
          >
            <Image
              src={tag.icon}
              alt={tag.name}
              width={60}
              height={60}
              className="w-[60px] h-[60px] object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

