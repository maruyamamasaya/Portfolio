import RecentPosts from './RecentPosts';
import TagList from './TagList';
import SocialLinks from './SocialLinks';
import TodayMessage from './TodayMessage';
import TableOfContents, { Heading } from './TableOfContents';
import { Post } from '@/lib/posts';

interface Props {
  posts: Post[];
  headings?: Heading[];
}
export default function RightSidebar({ posts, headings }: Props) {
  return (
    <div className="space-y-4">
      {headings && headings.length > 0 && (
        <div className="widget">
          <TableOfContents headings={headings} />
        </div>
      )}
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
      <div className="widget">
        <TodayMessage />
      </div>
    </div>
  );
}
