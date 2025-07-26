import Profile from './Profile';
import TagList from './TagList';

export default function LeftSidebar() {

  return (
    <div className="space-y-4">
      <div className="widget">
        <Profile />
      </div>
        <div className="widget">
          <TagList />
        </div>
    </div>
  );
}
