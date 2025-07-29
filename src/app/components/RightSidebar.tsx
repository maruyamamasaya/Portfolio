import RecentPosts from './RecentPosts';
import TagList from './TagList';
import CategoryList from './CategoryList';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
}
export default function RightSidebar({ posts }: Props) {
  return (
    <div className="space-y-4">
      <div className="widget">
        {/* 広告エリア */}
        <Link
          href="https://jimusuru.info/"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg shadow-md overflow-hidden transition-base"
        >
          <Image
            src="https://storage.googleapis.com/studio-design-asset-files/projects/BmqMl8R4OX/s-1280x670_v-fms_webp_3539cdc3-8ad9-4409-b61a-d7a7649a934c_middle.webp"
            alt="JIMUSURU公式サイトへの広告"
            width={640}
            height={360}
          className="w-full h-auto aspect-[16/9]"
        />
      </Link>
      </div>
      <div className="bg-gray-50 border rounded p-4 text-sm leading-relaxed space-y-2">
        <p>「事務を頼むならJIMUSURU」──</p>
        <p>
          小規模事業者やフリーランス向けに、信頼できる事務支援を提供する
          サービスです。
        </p>
        <p>当ブログ運営者もエンジニアとしてJIMUSURUに参画しています。</p>
      </div>
      <div className="widget">
        <RecentPosts posts={posts} />
      </div>
      <div className="widget">
        <CategoryList />
      </div>
      <div className="widget">
        <TagList />
      </div>
    </div>
  );
}
