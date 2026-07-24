import { Navigation } from '@/components/sensol/Navigation';
import { Hero } from '@/components/sensol/Hero';
import { BrandStory } from '@/components/sensol/BrandStory';
import { Marquee } from '@/components/sensol/Marquee';
import { FutureOfTraining } from '@/components/sensol/FutureOfTraining';
import { VideoShowcase } from '@/components/sensol/VideoShowcase';
import { Senzine } from '@/components/sensol/Senzine';
import { ProductSelection } from '@/components/sensol/ProductSelection';
import { Footer } from '@/components/sensol/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F4F0]">
      <Navigation />
      <Hero />
      <BrandStory />
      <Marquee />
      <FutureOfTraining />
      <VideoShowcase />
      <Senzine />
      <ProductSelection />
      <Footer />
    </main>
  );
}