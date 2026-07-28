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

export function BrandStory() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section ref={ref} className="bg-[#F7F4F0] py-24 md:py-40">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Number */}
        <p
          className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-16 md:mb-20 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          01 — The Philosophy
        </p>

        {/* Main Grid: Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Text Column */}
          <div className="flex flex-col justify-center">
            <h2
              className={`text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.12] tracking-wide transition-all duration-1000 delay-200 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Designed around
              <br />
              the human form.
            </h2>

            <div
              className={`mt-10 space-y-6 transition-all duration-1000 delay-400 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.9]">
                Sensol is redefining the role of fitness in modern living. 
                Founded in 2022, we design intelligent training systems that 
                merge performance, technology, and spatial aesthetics — 
                building a new vision of the future fitness lifestyle.
              </p>
              <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.9]">
                Our machines are not merely equipment. They are engineered 
                instruments — each component machined to precision, each 
                resistance curve calibrated for the human body. The result 
                is a training experience that feels less like a workout and 
                more like a practice in control.
              </p>
              <p className="text-[#8A8279] text-sm md:text-base font-light leading-[1.9]">
                We believe that strength is not about how much you can lift, 
                but how precisely you can move. Every Sensol system is built 
                to help you discover that precision — in your own space, at 
                your own pace, on your own terms.
              </p>
            </div>

            {/* Key Values */}
            <div
              className={`mt-12 grid grid-cols-3 gap-8 border-t border-[#D4CEC6] pt-10 transition-all duration-1000 delay-600 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <p className="text-[#1A1816] text-xl md:text-2xl font-extralight">2022</p>
                <p className="text-[#8A8279] text-[9px] tracking-brand uppercase mt-2">Founded</p>
              </div>
              <div>
                <p className="text-[#1A1816] text-xl md:text-2xl font-extralight">7</p>
                <p className="text-[#8A8279] text-[9px] tracking-brand uppercase mt-2">Products</p>
              </div>
              <div>
                <p className="text-[#1A1816] text-xl md:text-2xl font-extralight">∞</p>
                <p className="text-[#8A8279] text-[9px] tracking-brand uppercase mt-2">Possibilities</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative overflow-hidden transition-all duration-1000 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <img
              src="/section-1.webp"
              alt="Sensol precision engineering"
              className="w-full aspect-[3/2] md:aspect-[16/10] object-cover img-zoom"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#1A1816]/30 to-transparent">
              <p className="text-[#F7F4F0]/70 text-[9px] tracking-brand-lg uppercase">
                Engineered movement
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Feature Row — 3 meaningful features, not just images */}
        <div
          className={`mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#D4CEC6] transition-all duration-1000 delay-800 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-[#F7F4F0] p-8 md:p-12">
            <p className="text-[#1A1816] text-[10px] tracking-brand-lg uppercase mb-4">01</p>
            <h3 className="text-[#1A1816] text-xl font-light tracking-wide mb-4">
              Adaptive Resistance
            </h3>
            <p className="text-[#8A8279] text-sm font-light leading-[1.9]">
              Our magnetic resistance system responds in real time to your 
              movement patterns — adjusting tension mid-rep for a fluid, 
              natural feel that traditional cable systems cannot replicate.
            </p>
          </div>
          <div className="bg-[#F7F4F0] p-8 md:p-12">
            <p className="text-[#1A1816] text-[10px] tracking-brand-lg uppercase mb-4">02</p>
            <h3 className="text-[#1A1816] text-xl font-light tracking-wide mb-4">
              Spatial Design
            </h3>
            <p className="text-[#8A8279] text-sm font-light leading-[1.9]">
              Every Sensol machine is designed to live in your space — not 
              dominate it. Clean lines, premium materials, and a footprint 
              that respects the architecture of your home or studio.
            </p>
          </div>
          <div className="bg-[#F7F4F0] p-8 md:p-12">
            <p className="text-[#1A1816] text-[10px] tracking-brand-lg uppercase mb-4">03</p>
            <h3 className="text-[#1A1816] text-xl font-light tracking-wide mb-4">
              Intelligent Motion
            </h3>
            <p className="text-[#8A8279] text-sm font-light leading-[1.9]">
              From 360-degree range of motion to whisper-quiet operation 
              at under 25dB, every technical detail serves one purpose: 
              to let you focus entirely on the movement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}