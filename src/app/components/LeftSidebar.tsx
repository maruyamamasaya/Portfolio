import Profile from './Profile';
import TagList from './TagList';
import CategoryList from './CategoryList';

export default function LeftSidebar() {
  return (
    <div className="space-y-4">
      <div className="widget">
        <Profile />
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
