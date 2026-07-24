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

export function EngineeredMovement() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#F7F4F0] py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative overflow-hidden transition-all duration-1000 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/site-engineered.jpeg"
              alt="Engineered movement"
              className="w-full aspect-[4/5] object-cover img-zoom"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1A1816]/30 to-transparent">
              <p className="text-[#F7F4F0]/70 text-[9px] tracking-brand-lg uppercase">
                Engineered movement
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="md:pl-8">
            <p
              className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-8 transition-all duration-1000 delay-200 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Adaptive resistance
            </p>
            <h2
              className={`text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide transition-all duration-1000 delay-300 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Designed
              <br />
              around you.
            </h2>
            <p
              className={`text-[#8A8279] text-sm md:text-base font-light leading-[1.9] mt-8 max-w-md transition-all duration-1000 delay-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Adaptive resistance and fluid motion, tailored to your body.
              Every Sensol system learns your movement patterns and adjusts
              in real time — creating a training experience that feels
              as natural as breath.
            </p>
            <div
              className={`mt-10 transition-all duration-1000 delay-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <a
                href="#collection"
                className="link-underline text-[10px] tracking-brand uppercase text-[#1A1816] hover:text-[#8A8279] transition-colors duration-500"
              >
                Discover the system →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
