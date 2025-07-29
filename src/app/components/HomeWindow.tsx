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
import PostCard from './PostCard';

type HomeWindowProps = {
  posts: Post[];
};

export default function HomeWindow({ posts }: HomeWindowProps) {
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
      <section className="px-4 sm:px-8 max-w-screen-md mx-auto space-y-4">
        <h2 className="text-xl font-bold text-center">おすすめ記事</h2>
        <RecommendedSlider posts={posts} />
        <ul className="space-y-4">
          {posts.slice(0, 6).map((post, i) => (
            <ScrollFadeIn key={post.slug} as="li" delay={i * 100}>
              <PostCard post={post} />
            </ScrollFadeIn>
          ))}
        </ul>
        <div className="text-center">
          <Link href="/blog" className="accent-text hover:underline transition-base">
            すべての記事を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
