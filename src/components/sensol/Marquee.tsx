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

export function Marquee() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section ref={ref} className="bg-[#F7F4F0] py-14 md:py-20 overflow-hidden border-t border-b border-[#D4CEC6]">
      <div
        className={`transition-all duration-1000 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative">
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center mx-6 md:mx-12">
                <span className="text-[#1A1816] text-3xl md:text-5xl lg:text-6xl font-extralight tracking-[0.08em] uppercase">
                  Make it easy
                </span>
                <span className="text-[#D4CEC6] text-3xl md:text-5xl lg:text-6xl font-extralight mx-6 md:mx-10">
                  ·
                </span>
                <span className="text-[#B5ADA4] text-3xl md:text-5xl lg:text-6xl font-extralight tracking-[0.08em] italic">
                  Do it real
                </span>
                <span className="text-[#D4CEC6] text-3xl md:text-5xl lg:text-6xl font-extralight mx-6 md:mx-10">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
