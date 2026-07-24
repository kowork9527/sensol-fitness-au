'use client';

import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-studio.jpeg"
          alt="Sensol Studio"
          className={`w-full h-full object-cover transition-all duration-[2s] ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1816]/30 via-[#1A1816]/10 to-[#1A1816]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-24 md:pb-32 px-8 md:px-16">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Tagline */}
          <p
            className={`text-[#F7F4F0]/70 text-[10px] md:text-[11px] tracking-brand-lg uppercase mb-6 md:mb-8 transition-all duration-1000 delay-500 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            A New Language of Training
          </p>

          {/* Main Headline */}
          <h1
            className={`text-[#F7F4F0] text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[1.05] tracking-wide max-w-4xl transition-all duration-1000 delay-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Where strength
            <br />
            meets precision.
          </h1>

          {/* Subtitle */}
          <p
            className={`text-[#F7F4F0]/60 text-sm md:text-base font-light mt-8 md:mt-10 max-w-lg leading-relaxed transition-all duration-1000 delay-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Intelligent training systems that merge performance,
            technology, and spatial aesthetics.
          </p>

          {/* CTA */}
          <div
            className={`mt-10 md:mt-12 flex items-center gap-8 transition-all duration-1000 delay-[1200ms] ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#products"
              className="text-[11px] tracking-brand uppercase text-[#1A1816] bg-[#F7F4F0] px-8 py-4 hover:bg-[#F7F4F0]/90 transition-colors duration-500"
            >
              Explore Collection
            </a>
            <a
              href="#philosophy"
              className="link-underline text-[11px] tracking-brand uppercase text-[#F7F4F0]/80 hover:text-[#F7F4F0] transition-colors duration-500"
            >
              Our Philosophy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-[1500ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[#F7F4F0]/40 text-[9px] tracking-brand-lg uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-[#F7F4F0]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F7F4F0]/60 animate-[scrollDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
