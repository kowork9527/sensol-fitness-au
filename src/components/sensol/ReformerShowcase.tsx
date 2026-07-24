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

export function ReformerShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#1A1816] py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div className="order-2 md:order-1">
            <p
              className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-8 transition-all duration-1000 delay-200 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Smart training
            </p>
            <h2
              className={`text-[#F7F4F0] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide transition-all duration-1000 delay-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              The first All-in-one
              <br />
              smart training
              <br />
              reformer.
            </h2>
            <p
              className={`text-[#8A8279] text-sm md:text-base font-light leading-[1.9] mt-8 max-w-md transition-all duration-1000 delay-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              See how Sensol works in real movement — simple, precise,
              and intuitive. The intelligent reformer that adapts to every
              body, every session, every goal.
            </p>

            {/* Feature specs */}
            <div
              className={`mt-10 grid grid-cols-2 gap-6 border-t border-[#2a2724] pt-8 transition-all duration-1000 delay-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <p className="text-[#F7F4F0] text-2xl font-extralight">360°</p>
                <p className="text-[#8A8279] text-[9px] tracking-brand uppercase mt-1">Motion range</p>
              </div>
              <div>
                <p className="text-[#F7F4F0] text-2xl font-extralight">&lt;8ms</p>
                <p className="text-[#8A8279] text-[9px] tracking-brand uppercase mt-1">Response</p>
              </div>
              <div>
                <p className="text-[#F7F4F0] text-2xl font-extralight">0–100%</p>
                <p className="text-[#8A8279] text-[9px] tracking-brand uppercase mt-1">Resistance</p>
              </div>
              <div>
                <p className="text-[#F7F4F0] text-2xl font-extralight">&lt;25dB</p>
                <p className="text-[#8A8279] text-[9px] tracking-brand uppercase mt-1">Silence</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative overflow-hidden order-1 md:order-2 transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/site-reformer.jpeg"
              alt="Sensol smart training reformer"
              className="w-full aspect-[4/5] object-cover img-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
