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

export function Senzine() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#F7F4F0] py-20 md:py-32 border-t border-[#D4CEC6]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Large Image */}
          <div
            className={`md:col-span-7 relative overflow-hidden transition-all duration-1000 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/section-2.webp"
              alt="SENZINE Publication"
              className="w-full aspect-[16/10] object-cover img-zoom"
            />
          </div>

          {/* Text */}
          <div className="md:col-span-5 md:pl-8">
            <p
              className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-6 transition-all duration-1000 delay-200 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Internal Publication
            </p>
            <h2
              className={`text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide transition-all duration-1000 delay-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              SENZINE
            </h2>
            <div
              className={`mt-8 space-y-5 transition-all duration-1000 delay-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-[#8A8279] text-sm font-light leading-[1.9] max-w-sm">
                Senzine is Sensol&apos;s internal publication, distilling a single
                idea — control, resistance, stillness — into a tactile experience,
                designed to be felt as much as it is read.
              </p>
              <p className="text-[#8A8279] text-sm font-light leading-[1.9] max-w-sm">
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
                className="inline-block text-[10px] tracking-brand-lg uppercase text-[#F7F4F0] bg-[#1A1816] px-10 py-4 hover:bg-[#2a2724] transition-colors duration-500"
              >
                Join us
              </a>
            </div>
          </div>
        </div>

        {/* Secondary image row */}
        <div
          className={`mt-8 grid grid-cols-2 gap-[2px] md:gap-4 transition-all duration-1000 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative overflow-hidden">
            <img
              src="/editorial-1.webp"
              alt="SENZINE detail"
              className="w-full aspect-[16/9] object-cover img-zoom"
            />
          </div>
          <div className="relative overflow-hidden">
            <img
              src="/editorial-2.webp"
              alt="Precision engineering detail"
              className="w-full aspect-[16/9] object-cover img-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
