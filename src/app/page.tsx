import { Navigation } from '@/components/sensol/Navigation';
import { Hero } from '@/components/sensol/Hero';
import { Philosophy } from '@/components/sensol/Philosophy';
import { Marquee } from '@/components/sensol/Marquee';
import { Products } from '@/components/sensol/Products';
import { Engineering } from '@/components/sensol/Engineering';
import { Senzine } from '@/components/sensol/Senzine';
import { InTheWorld } from '@/components/sensol/InTheWorld';
import { Footer } from '@/components/sensol/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Philosophy />
      <Marquee />
      <Products />
      <Engineering />
      <Senzine />
      <InTheWorld />
      <Footer />
    </main>
  );
}
