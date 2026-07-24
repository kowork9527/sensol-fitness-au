import { Navigation } from '@/components/sensol/Navigation';
import { Hero } from '@/components/sensol/Hero';
import { EngineeredMovement } from '@/components/sensol/EngineeredMovement';
import { PrecisionMovement } from '@/components/sensol/PrecisionMovement';
import { StrengthRedefined } from '@/components/sensol/StrengthRedefined';
import { Marquee } from '@/components/sensol/Marquee';
import { FutureOfTraining } from '@/components/sensol/FutureOfTraining';
import { ReformerShowcase } from '@/components/sensol/ReformerShowcase';
import { Senzine } from '@/components/sensol/Senzine';
import { ProductSelection } from '@/components/sensol/ProductSelection';
import { Footer } from '@/components/sensol/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F4F0]">
      <Navigation />
      <Hero />
      <EngineeredMovement />
      <PrecisionMovement />
      <StrengthRedefined />
      <Marquee />
      <FutureOfTraining />
      <ReformerShowcase />
      <Senzine />
      <ProductSelection />
      <Footer />
    </main>
  );
}
