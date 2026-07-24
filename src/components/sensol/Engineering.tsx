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

const features = [
  {
    label: 'Adaptive Resistance',
    value: '0–100%',
    description: 'Precision-tuned resistance that adapts to your strength curve in real time.',
  },
  {
    label: 'Motion Range',
    value: '360°',
    description: 'Full-spectrum movement freedom for unrestricted training patterns.',
  },
  {
    label: 'Response Time',
    value: '<8ms',
    description: 'Near-instantaneous feedback loop between input and resistance adjustment.',
  },
  {
    label: 'Noise Level',
    value: '<25dB',
    description: 'Whisper-quiet operation that preserves the stillness of your space.',
  },
];

export function Engineering() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="engineering" ref={sectionRef} className="bg-[#F7F4F0] py-24 md:py-40">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Label */}
        <div
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-16 md:mb-24">
            03 — Engineering
          </p>
        </div>

        {/* Headline */}
        <div
          className={`max-w-3xl mb-20 md:mb-32 transition-all duration-1000 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide">
            Control begins
            <br />
            within.
          </h2>
          <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.8] mt-8 max-w-lg">
            Every component is engineered with intention. From the magnetic
            resistance system to the precision-machined carriage — each element
            serves the movement.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#D4CEC6]">
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className={`bg-[#F7F4F0] p-8 md:p-10 transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${400 + index * 150}ms` }}
            >
              <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-6">
                {feature.label}
              </p>
              <p className="text-[#1A1816] text-3xl md:text-4xl font-extralight mb-4">
                {feature.value}
              </p>
              <p className="text-[#8A8279] text-xs font-light leading-[1.8]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Full Width Image */}
        <div
          className={`mt-20 md:mt-32 overflow-hidden transition-all duration-1000 delay-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <img
            src="/studio-wide.jpeg"
            alt="Sensol Engineering"
            className="w-full aspect-[21/9] object-cover img-zoom"
          />
        </div>

        {/* Caption */}
        <div
          className={`mt-6 flex items-center justify-between transition-all duration-1000 delay-900 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase">
            The Sensol Studio — Where movement becomes design
          </p>
          <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase">
            Est. 2022
          </p>
        </div>
      </div>
    </section>
  );
}
