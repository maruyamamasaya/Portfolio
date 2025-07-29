import { getTagCounts } from '@/lib/posts';
import TagListClient from './TagListClient';

export default async function TagListWrapper() {
  const tagCounts = await getTagCounts();
  const displayCounts = tagCounts.slice(0, 30);
  return <TagListClient tagCounts={displayCounts} />;
}
