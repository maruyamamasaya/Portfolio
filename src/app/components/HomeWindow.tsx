import HeroSection from './HeroSection';
import Profile from './Profile';
import ServicesSection from './ServicesSection';
import WorksSection from './WorksSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import ITSchoolSection from './ITSchoolSection';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import ScrollFadeIn from './ScrollFadeIn';
import HomePostCard from './HomePostCard';
import SearchBar from './SearchBar';
import CategoryRecommendations from './CategoryRecommendations';

type HomeWindowProps = {
  posts: Post[];
};

export default function HomeWindow({ posts }: HomeWindowProps) {
  const latestPosts = posts.slice(0, 6);
  return (
    <div className="space-y-12">
      {/* Heroセクション */}
      <HeroSection />

      {/* サービス・実績など */}
      <ServicesSection />
      <WorksSection />
      <TestimonialsSection />
      <FAQSection />
      {/* プロフィールセクション */}
      <section className="mt-4">
        <Profile />
      </section>
      <CTASection />
      <ITSchoolSection className="mt-24" />

      {/* 最新記事一覧 */}
      <section className="px-4 sm:px-6 md:px-10 w-full mx-auto space-y-4">
        <h2 className="text-xl font-bold text-center">最新記事</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestPosts.map((post, i) => (
            <ScrollFadeIn key={post.slug} as="li" delay={i * 100}>
              <HomePostCard post={post} />
            </ScrollFadeIn>
          ))}
        </ul>
        <div className="text-center">
          <Link href="/blog" className="accent-text hover:underline transition-base">
            すべての記事を見る
          </Link>
        </div>
      </section>
      <CategoryRecommendations />
      <div className="sm:hidden px-4">
        <SearchBar />
      </div>
    </div>
  );
}
