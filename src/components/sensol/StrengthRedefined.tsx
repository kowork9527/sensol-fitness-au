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

export function StrengthRedefined() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#1A1816] py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-[#F7F4F0] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide">
            Strength, redefined.
          </h2>
          <p className="text-[#8A8279] text-sm font-light mt-6 max-w-lg mx-auto leading-[1.8]">
            A compact training system built for control, balance, and power.
          </p>
        </div>

        {/* Dual images side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] md:gap-4">
          <div
            className={`relative overflow-hidden group transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/site-strength-2.jpeg"
              alt="Sensol training system"
              className="w-full aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#1A1816]/0 group-hover:bg-[#1A1816]/10 transition-colors duration-700" />
          </div>
          <div
            className={`relative overflow-hidden group transition-all duration-1000 delay-400 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/reformer-product.jpeg"
              alt="Sensol reformer detail"
              className="w-full aspect-[3/4] object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-[#1A1816]/0 group-hover:bg-[#1A1816]/10 transition-colors duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
