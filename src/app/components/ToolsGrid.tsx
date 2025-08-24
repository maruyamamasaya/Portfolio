'use client';
import Image from 'next/image';
import Link from 'next/link';

const tools = [
  {
    name: 'React',
    icon: '/images/React.png',
  },
  {
    name: 'Next.js',
    icon: '/images/Nextjs.png',
  },
  {
    name: 'TypeScript',
    icon: '/images/TypeScript.png',
  },
  {
    name: 'Tailwind CSS',
    icon: '/images/TailwindCSS.png',
  },
  {
    name: 'Figma',
    icon: '/images/Figma.png',
  },
];

export default function ToolsGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        利用ツール
      </h2>
      <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={`/tags/${encodeURIComponent(tool.name)}`}
            className="flex flex-col items-center rounded-lg p-4 w-full shadow bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-105 transition-base hover:opacity-80"
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              width={80}
              height={80}
              className="w-20 h-20 object-contain mb-2"
            />
            <p className="text-sm text-center">{tool.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
