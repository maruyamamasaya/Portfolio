import RecentPosts from './RecentPosts';
import TagList from './TagList';
import SocialLinks from './SocialLinks';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
}

export default function RightSidebar({ posts }: Props) {
  return (
    <div className="space-y-4">
      <div className="widget">
        {/* 広告エリア */}
        <div className="bg-gray-200 text-center py-8">Ad Space</div>
      </div>
      <div className="widget">
        <RecentPosts posts={posts} />
      </div>
      <div className="widget">
        <TagList />
      </div>
      <div className="widget">
        <SocialLinks />
      </div>
    </div>
  );
}
