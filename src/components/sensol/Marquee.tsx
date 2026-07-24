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

export function Marquee() {
  const { ref: sectionRef, inView } = useInView(0.3);

  return (
    <section ref={sectionRef} className="bg-[#F7F4F0] border-t border-b border-[#D4CEC6] py-16 md:py-24 overflow-hidden">
      <div
        className={`transition-all duration-1000 ${
          inView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Scrolling text */}
        <div className="relative">
          <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="mx-8 md:mx-16">
                <span className="text-[#1A1816] text-4xl md:text-6xl lg:text-7xl font-extralight tracking-wide">
                  Make it easy
                </span>
                <span className="text-[#D4CEC6] text-4xl md:text-6xl lg:text-7xl font-extralight mx-6 md:mx-10">
                  ·
                </span>
                <span className="text-[#8A8279] text-4xl md:text-6xl lg:text-7xl font-extralight tracking-wide italic">
                  Do it real
                </span>
                <span className="text-[#D4CEC6] text-4xl md:text-6xl lg:text-7xl font-extralight mx-6 md:mx-10">
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
