import HomeWindow from '@/app/components/HomeWindow';
import BusinessHeroSection from '@/app/components/BusinessHeroSection';
import { getSortedPosts } from '@/lib/posts';

export const metadata = {
  title: 'テクニカル法人サポート',
};

export default async function BusinessServicePage() {
  const posts = await getSortedPosts();
  return (
    <HomeWindow
      posts={posts}
      hero={<BusinessHeroSection />}
      ctaProps={{
        title: '法人向けお問い合わせはこちら',
        href: '/contact/business',
        label: 'お問い合わせ',
        showBusinessLinks: true,
      }}
      showITSchoolSection={false}
    />
  );
}
