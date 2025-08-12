import dynamic from 'next/dynamic';
import BlogNavButtons from '../components/BlogNavButtons';

const DeveloperEditor = dynamic(
  () => import('@/app/components/DeveloperEditor'),
  { ssr: false },
);

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
