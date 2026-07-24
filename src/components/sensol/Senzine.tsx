'use client';

import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
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

export function Senzine() {
  const { ref: sectionRef, inView } = useInView(0.15);

  return (
    <section id="senzine" ref={sectionRef} className="bg-[#F7F4F0] border-t border-[#D4CEC6] py-24 md:py-40">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Label */}
        <div
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-16 md:mb-24">
            04 — Senzine
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Image */}
          <div
            className={`relative overflow-hidden transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/flat-lay.jpeg"
              alt="SENZINE Publication"
              className="w-full aspect-square object-cover img-zoom"
            />
          </div>

          {/* Right: Text */}
          <div>
            <h2
              className={`text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide transition-all duration-1000 delay-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              SENZINE
            </h2>
            <p
              className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mt-4 mb-8 transition-all duration-1000 delay-400 ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Internal Publication
            </p>
            <div
              className={`space-y-6 transition-all duration-1000 delay-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.8] max-w-md">
                Senzine is Sensol&apos;s internal publication, distilling a single
                idea — control, resistance, stillness — into a tactile experience,
                designed to be felt as much as it is read.
              </p>
              <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.8] max-w-md">
                Released in quiet intervals, each issue carries a fragment of
                movement, a trace of scent, and a moment of attention.
              </p>
            </div>
            <div
              className={`mt-10 transition-all duration-1000 delay-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a
                href="#"
                className="inline-block text-[11px] tracking-brand uppercase text-[#F7F4F0] bg-[#1A1816] px-8 py-4 hover:bg-[#2a2724] transition-colors duration-500"
              >
                Join Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
