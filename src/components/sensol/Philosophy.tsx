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

export function Philosophy() {
  const { ref: sectionRef, inView } = useInView(0.15);

  return (
    <section id="philosophy" ref={sectionRef} className="bg-[#F7F4F0] py-24 md:py-40">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Label */}
        <div
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-16 md:mb-24">
            01 — Philosophy
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <h2
              className={`text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide transition-all duration-1000 delay-200 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Designed around
              <br />
              the human form.
            </h2>
            <div
              className={`mt-10 md:mt-12 space-y-6 transition-all duration-1000 delay-400 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.8] max-w-md">
                Sensol is redefining the role of fitness in modern living.
                We design intelligent training systems that merge performance,
                technology, and spatial aesthetics — building a new vision
                of the future fitness lifestyle.
              </p>
              <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.8] max-w-md">
                Each machine is engineered with adaptive resistance and fluid
                motion, tailored to your body. Control begins within — train
                with intention.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`mt-14 md:mt-20 grid grid-cols-3 gap-8 border-t border-[#D4CEC6] pt-10 transition-all duration-1000 delay-600 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <p className="text-[#1A1816] text-2xl md:text-3xl font-extralight">2022</p>
                <p className="text-[#8A8279] text-[10px] tracking-brand uppercase mt-2">Founded</p>
              </div>
              <div>
                <p className="text-[#1A1816] text-2xl md:text-3xl font-extralight">7</p>
                <p className="text-[#8A8279] text-[10px] tracking-brand uppercase mt-2">Products</p>
              </div>
              <div>
                <p className="text-[#1A1816] text-2xl md:text-3xl font-extralight">∞</p>
                <p className="text-[#8A8279] text-[10px] tracking-brand uppercase mt-2">Precision</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={`relative overflow-hidden transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/pilates-movement.jpeg"
              alt="Precision movement"
              className="w-full aspect-[4/5] object-cover img-zoom"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[#F7F4F0]/60 text-[9px] tracking-brand-lg uppercase">
                Engineered Movement
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
