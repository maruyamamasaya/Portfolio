import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import WorksSection from './WorksSection';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import CTASection from './CTASection';

export default function HomeWindow() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
