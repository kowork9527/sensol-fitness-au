'use client';

import { useEffect, useState } from 'react';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/pilates-side.jpeg"
          alt="SENSOL — Intelligent Training"
          className={`w-full h-full object-cover transition-all duration-[2.5s] ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        />
        {/* Strong dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Top Content - Brand Statement */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        {/* Small label */}
        <p
          className={`text-white/60 text-[9px] md:text-[10px] tracking-brand-lg uppercase mb-8 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          A new language of training
        </p>

        {/* Main Headline */}
        <h1
          className={`text-white text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extralight leading-[0.9] tracking-[0.08em] uppercase transition-all duration-1200 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          SENSOL
        </h1>

        {/* Tagline */}
        <p
          className={`text-white/80 text-sm md:text-base font-light mt-6 max-w-md leading-relaxed tracking-wide transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Where strength meets precision,
          <br />
          and movement becomes design.
        </p>

        {/* CTA */}
        <div
          className={`mt-12 transition-all duration-1000 delay-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#collection"
            className="inline-block text-[10px] tracking-brand-lg uppercase text-[#1A1816] bg-[#F7F4F0] px-10 py-4 hover:bg-[#F7F4F0]/90 transition-colors duration-500"
          >
            Shop All
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-[1400ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="w-[1px] h-10 bg-white/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-white/50 animate-[scrollPulse_2.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(400%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </section>
  );
}