import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  image: string;
  title: string;
  short: string;
  description: string;
  href: string;
}

export default function CourseCard({
  image,
  title,
  short,
  description,
  href,
}: CourseCardProps) {
  return (
    <li className="js-anime js-on bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="w-full h-auto"
        loading="lazy"
      />
      <div className="textArea p-4 flex flex-col flex-1">
        <h4 className="text-lg font-bold text-[#333] mb-2">
          {title}
          <span className="short ml-2 text-sm font-medium text-[#005bac]">
            {short}
          </span>
        </h4>
        <p className="text-sm text-[#333] flex-1">{description}</p>
        <Link
          href={href}
          className="mt-4 inline-block text-sm font-semibold text-[#005bac] hover:underline"
        >
          詳しく見る
        </Link>
      </div>
    </li>
  );
}

