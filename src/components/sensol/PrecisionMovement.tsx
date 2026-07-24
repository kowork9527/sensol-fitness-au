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

export function PrecisionMovement() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#F7F4F0] pb-20 md:pb-32">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Dual image layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] md:gap-4">
          {/* Left image */}
          <div
            className={`relative overflow-hidden transition-all duration-1000 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/pilates-side.jpeg"
              alt="Precision movement — controlled training"
              className="w-full aspect-[4/5] object-cover img-zoom"
            />
          </div>

          {/* Right image */}
          <div
            className={`relative overflow-hidden transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/site-control.jpeg"
              alt="Control begins within"
              className="w-full aspect-[4/5] object-cover img-zoom"
            />
          </div>
        </div>

        {/* Text overlay below images */}
        <div className="mt-12 md:mt-16 text-center">
          <p
            className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-6 transition-all duration-1000 delay-400 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Precision movement
          </p>
          <h2
            className={`text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide transition-all duration-1000 delay-500 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Control begins within.
          </h2>
          <p
            className={`text-[#8A8279] text-sm font-light mt-6 max-w-lg mx-auto leading-[1.8] transition-all duration-1000 delay-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Train with intention. Every movement is measured, every resistance
            calibrated. This is fitness as meditation.
          </p>
          <div
            className={`mt-10 transition-all duration-1000 delay-900 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="#collection"
              className="inline-block text-[10px] tracking-brand-lg uppercase text-[#1A1816] bg-[#1A1816] text-[#F7F4F0] px-10 py-4 hover:bg-[#2a2724] transition-colors duration-500"
            >
              Shop all
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
