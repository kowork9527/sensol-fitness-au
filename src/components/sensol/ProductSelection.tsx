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

const products = [
  {
    name: 'Sensol RS02',
    model: 'RS02',
    price: '$2,000',
    image: '/square-2.webp',
  },
  {
    name: 'Sensol RS02 PRO',
    model: 'RS02 PRO',
    price: '$2,400',
    image: '/square-3.webp',
  },
  {
    name: 'Sensol FLEX AIR',
    model: 'FLEX AIR',
    price: '$650',
    image: '/square-4.webp',
  },
];

export function ProductSelection() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="collection" ref={ref} className="bg-[#F7F4F0] py-20 md:py-32 border-t border-[#D4CEC6]">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <p className="text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-6">
              2026 Selection
            </p>
            <h2 className="text-[#1A1816] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide">
              Products
            </h2>
          </div>
          <a
            href="#"
            className="link-underline text-[#8A8279] text-[10px] tracking-brand uppercase mt-4 md:mt-0 hover:text-[#1A1816] transition-colors duration-500 self-start"
          >
            View all →
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] md:gap-8 bg-[#D4CEC6] md:bg-transparent">
          {products.map((product, index) => (
            <div
              key={product.model}
              className={`group cursor-pointer bg-[#F7F4F0] transition-all duration-1000 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 200}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square bg-[#EDEAE5]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                />
              </div>

              {/* Info */}
              <div className="py-6 md:py-8">
                <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-2">
                  sensol fitness
                </p>
                <div className="flex items-start justify-between">
                  <h3 className="text-[#1A1816] text-base font-light tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-[#1A1816] text-sm font-light">
                    {product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
