import HomeWindow from '@/app/components/HomeWindow';
import TutorHeroSection from '@/app/components/TutorHeroSection';
import { getSortedPosts } from '@/lib/posts';

export const metadata = {
  title: '家庭教師型パソコンスクール',
};

export default async function TutorServicePage() {
  const posts = await getSortedPosts();
  return (
    <HomeWindow
      posts={posts}
      hero={<TutorHeroSection />}
      ctaProps={{
        title: '家庭教師のお問い合わせはこちら',
        href: '/contact/tutor',
        label: 'お問い合わせ',
        showBusinessLinks: false,
      }}
    />
  );
}
