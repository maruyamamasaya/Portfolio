import { getTagCounts } from '@/lib/posts';
import TagButton from './TagButton';

export default function TagList() {
  const tagCounts = getTagCounts();
  const max = tagCounts[0]?.count || 1;
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
        {tagCounts.map(({ tag, count }) => (
          <TagButton key={tag} label={tag} sizeClass={getSizeClass(count)} />
        ))}
      </div>
    </div>
  );
}
