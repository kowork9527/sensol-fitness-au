'use client';

import { useEffect, useState } from 'react';

const SLIDES = [
  { image: '/banner-1.webp', label: 'A new language of training', heading: 'SENSOL', sub: 'Where strength meets precision, and movement becomes design.' },
  { image: '/banner-2.webp', label: 'Engineered movement', heading: 'PRECISION', sub: 'Adaptive resistance and fluid motion, tailored to your body.' },
  { image: '/banner-3.webp', label: 'Where strength meets pilates', heading: 'CONTROL', sub: 'Control begins within. Train with intention.' },
];

export function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images - crossfade */}
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[1.5s] ease-in-out" style={{ opacity: i === current ? 1 : 0 }}>
          <img
            src={s.image}
            alt={s.heading}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center">
        <p
          className={`text-white/60 text-[9px] md:text-[10px] tracking-[0.2em] uppercase mb-8 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {slide.label}
        </p>

        <h1
          className={`text-white text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extralight leading-[0.9] tracking-[0.08em] uppercase transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          key={`h-${current}`}
        >
          {slide.heading}
        </h1>

        <p
          className={`text-white/80 text-sm md:text-base font-light mt-6 max-w-md leading-relaxed tracking-wide transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          key={`p-${current}`}
        >
          {slide.sub}
        </p>

        <div
          className={`mt-12 transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#collection"
            className="inline-block text-[10px] tracking-[0.2em] uppercase text-[#1A1816] bg-[#F7F4F0] px-10 py-4 hover:bg-[#F7F4F0]/90 transition-colors duration-500"
          >
            Shop All
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-8 h-[1px] transition-all duration-500 ${
              i === current ? 'bg-white' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 right-10 flex flex-col items-center gap-2 transition-all duration-1000 delay-[1400ms] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-white/40 text-[8px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-white/30 relative overflow-hidden">
          <div className="w-full h-full bg-white animate-pulse origin-top" />
        </div>
      </div>
    </section>
  );
}
