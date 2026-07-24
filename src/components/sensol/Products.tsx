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

const products = [
  {
    name: 'Sensol RS02',
    model: 'RS02',
    price: '$2,000',
    description: 'The foundation of intelligent training. Built for control, balance, and power.',
    image: '/detail-texture.jpeg',
  },
  {
    name: 'Sensol RS02 PRO',
    model: 'RS02 PRO',
    price: '$2,400',
    description: 'Advanced resistance system with expanded range of motion and precision tuning.',
    image: '/studio-wide.jpeg',
  },
  {
    name: 'Sensol FLEX AIR',
    model: 'FLEX AIR',
    price: '$650',
    description: 'Portable precision. Adaptive resistance in a compact form factor.',
    image: '/flat-lay.jpeg',
  },
];

export function Products() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="products" ref={sectionRef} className="bg-[#1A1816] py-24 md:py-40">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Header */}
        <div
          className={`mb-16 md:mb-24 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-8">
            02 — Collection
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-[#F7F4F0] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide">
              Strength, redefined.
            </h2>
            <a
              href="#"
              className="link-underline text-[#F7F4F0]/60 text-[11px] tracking-brand uppercase hover:text-[#F7F4F0] transition-colors duration-500 self-start md:self-auto"
            >
              View All Products →
            </a>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#2a2724]">
          {products.map((product, index) => (
            <div
              key={product.model}
              className={`bg-[#1A1816] group cursor-pointer transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${300 + index * 200}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#1A1816]/0 group-hover:bg-[#1A1816]/20 transition-colors duration-700" />
              </div>

              {/* Info */}
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-2">
                      {product.model}
                    </p>
                    <h3 className="text-[#F7F4F0] text-lg font-light tracking-wide">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-[#F7F4F0]/60 text-sm font-light">
                    {product.price}
                  </p>
                </div>
                <p className="text-[#8A8279] text-xs font-light leading-[1.8] mb-8">
                  {product.description}
                </p>
                <div className="link-underline text-[#F7F4F0]/50 text-[10px] tracking-brand uppercase group-hover:text-[#F7F4F0]/80 transition-colors duration-500">
                  Discover →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
