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

export function InTheWorld() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section ref={sectionRef} className="bg-[#1A1816] py-24 md:py-40">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Label */}
        <div
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-16 md:mb-24">
            05 — Sensol in the World
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6">
          {/* Large Image */}
          <div
            className={`md:col-span-7 relative overflow-hidden transition-all duration-1000 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/hero-studio.jpeg"
              alt="Sensol in spaces"
              className="w-full aspect-[16/10] object-cover img-zoom"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[#1A1816]/60 to-transparent">
              <p className="text-[#F7F4F0]/60 text-[9px] tracking-brand-lg uppercase">
                Private Studio — New York
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Text */}
            <div
              className={`flex-1 flex flex-col justify-center transition-all duration-1000 delay-400 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-[#F7F4F0] text-2xl md:text-3xl lg:text-4xl font-extralight leading-[1.2] tracking-wide mb-6">
                Across spaces, cities,
                <br />
                and routines.
              </h2>
              <p className="text-[#8A8279] text-sm font-light leading-[1.8] max-w-sm">
                Sensol becomes part of how people move, train, and live.
                From private studios to wellness sanctuaries, each space
                tells a different story of movement.
              </p>
            </div>

            {/* Small Image */}
            <div
              className={`relative overflow-hidden transition-all duration-1000 delay-600 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src="/detail-texture.jpeg"
                alt="Sensol detail"
                className="w-full aspect-[4/3] object-cover img-zoom"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1A1816]/60 to-transparent">
                <p className="text-[#F7F4F0]/60 text-[9px] tracking-brand-lg uppercase">
                  Wellness Center — Tokyo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div
          className={`mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#2a2724] transition-all duration-1000 delay-800 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {['New York', 'Tokyo', 'London', 'Shanghai'].map((city) => (
            <div key={city} className="bg-[#1A1816] p-6 md:p-8 text-center">
              <p className="text-[#F7F4F0] text-sm font-light tracking-brand-sm">{city}</p>
              <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mt-2">
                Studio Partner
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
