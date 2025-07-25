import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import WorksSection from './WorksSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';
import Link from 'next/link';
import { Post } from '@/lib/posts';
import BlogNavButtons from '../components/BlogNavButtons';
import ScrollFadeIn from './ScrollFadeIn';
import Card from './Card';

type HomeWindowProps = {
  posts: Post[];
};

export default function HomeWindow({ posts }: HomeWindowProps) {
  return (
    <div className="space-y-12">
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />

      <div className="px-4 sm:px-8">
        <BlogNavButtons />
        <h2 className="text-2xl font-bold my-6">Blog</h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <ScrollFadeIn key={post.slug} as={Card} className="flex items-start space-x-4">
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                  {post.title}
                </Link>
                <span className="block text-sm text-gray-500">{post.date}</span>
              </div>
            </ScrollFadeIn>
          ))}
        </ul>
      </div>
    </div>
  );
}
