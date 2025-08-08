import DeveloperEditor from '@/app/components/DeveloperEditor';
import BlogNavButtons from '../components/BlogNavButtons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
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
