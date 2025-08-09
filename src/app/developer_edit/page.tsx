import DeveloperEditor from '@/app/components/DeveloperEditor';
import BlogNavButtons from '../components/BlogNavButtons';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeveloperEditPage() {
  return (
    <div>
      <BlogNavButtons />
      <DeveloperEditor />
    </div>
  );
}
