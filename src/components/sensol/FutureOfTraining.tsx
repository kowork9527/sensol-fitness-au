'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

function useInView<T extends HTMLElement>(threshold = 0.15): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function FutureOfTraining() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#F7F4F0] py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Label */}
        <p
          className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-12 md:mb-16 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Where strength meets pilates
        </p>

        {/* Full-width image */}
        <div
          className={`relative overflow-hidden mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <img
            src="/australia-home.jpeg"
            alt="The future of modern training"
            className="w-full aspect-[21/9] object-cover img-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/30 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <p className="text-[#F7F4F0]/50 text-[9px] tracking-brand-lg uppercase">
              Designed for modern living
            </p>
          </div>
        </div>

        {/* Headline */}
        <div
          className={`text-center transition-all duration-1000 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide">
            The Future Of
            <br />
            Modern Training.
          </h2>
          <div className="mt-10">
            <a
              href="#collection"
              className="inline-block text-[10px] tracking-brand-lg uppercase text-[#F7F4F0] bg-[#1A1816] px-10 py-4 hover:bg-[#2a2724] transition-colors duration-500"
            >
              Shop All
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
