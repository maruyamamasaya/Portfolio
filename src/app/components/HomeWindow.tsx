import HeroSection from './HeroSection';
import Profile from './Profile';
import ServicesSection from './ServicesSection';
import WorksSection from './WorksSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import ScrollFadeIn from './ScrollFadeIn';
import RecommendedSlider from './RecommendedSlider';
import HomePostCard from './HomePostCard';
import SearchBar from './SearchBar';

type HomeWindowProps = {
  posts: Post[];
};

export default function HomeWindow({ posts }: HomeWindowProps) {
  const recommendedPosts = posts.slice(0, 4);
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

      {/* おすすめ記事一覧 */}
      <section className="px-4 sm:px-6 md:px-10 w-full mx-auto space-y-4">
        <h2 className="text-xl font-bold text-center">おすすめ記事</h2>
        <div className="md:grid md:[grid-template-columns:2fr_1fr] md:gap-4">
          <RecommendedSlider posts={recommendedPosts} />
          <ul className="space-y-4 md:space-y-2">
            {recommendedPosts.map((post, i) => (
              <ScrollFadeIn key={post.slug} as="li" delay={i * 100}>
                <HomePostCard post={post} />
              </ScrollFadeIn>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <Link href="/blog" className="accent-text hover:underline transition-base">
            すべての記事を見る
          </Link>
        </div>
      </section>
      <div className="sm:hidden px-4">
        <SearchBar />
      </div>
    </div>
  );
}
