import { getTagCounts } from '@/lib/posts';
import TagButton from './TagButton';

export default async function TagList() {
  const tagCounts = await getTagCounts();
  const displayCounts = tagCounts.slice(0, 30);
  const max = displayCounts[0]?.count || 1;
  const getSizeClass = (count: number) => {
    const ratio = count / max;
    if (ratio > 0.66) return 'text-lg';
    if (ratio > 0.33) return 'text-base';
    return 'text-sm';
  };
  return (
    <div>
      <h3 className="font-bold mb-2">タグ一覧</h3>
      <div className="flex flex-wrap gap-2">
        {displayCounts.map(({ tag, count }) => (
          <TagButton key={tag} label={tag} sizeClass={getSizeClass(count)} />
        ))}
      </div>
    </div>
  );
}
