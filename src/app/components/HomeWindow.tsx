import HeroSection from './HeroSection';
import Profile from './Profile';
import ServicesSection from './ServicesSection';
import WorksSection from './WorksSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from './ScrollFadeIn';
import Card from './Card';
import RecommendedSlider from './RecommendedSlider';

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

      {/* おすすめ記事スライダーとブログ一覧 */}
      <div className="px-4 sm:px-8 grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2">
          <RecommendedSlider posts={posts} />
        </div>
        <div>
          <BlogNavButtons />
          <h2 className="text-2xl font-bold my-6">Blog</h2>
          <ul className="space-y-4">
            {posts.map((post, i) => (
              <ScrollFadeIn
                key={post.slug}
                delay={i * 100}
                as={Card}
                className="flex items-start space-x-4"
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="accent-text hover:underline"
                  >
                    {post.title}
                  </Link>
                  <span className="block text-sm text-gray-500">
                    {post.date}
                  </span>
                </div>
              </ScrollFadeIn>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
