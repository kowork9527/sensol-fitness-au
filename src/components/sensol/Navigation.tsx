'use client';

import { useState, useEffect } from 'react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#F7F4F0]/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-8 md:px-16">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="#" className="relative z-10">
            <span className="text-[#1A1816] text-xl md:text-2xl font-light tracking-brand-lg uppercase">
              Sensol
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <a
              href="#philosophy"
              className="link-underline text-[#1A1816] text-[11px] font-normal tracking-brand uppercase"
            >
              Philosophy
            </a>
            <a
              href="#products"
              className="link-underline text-[#1A1816] text-[11px] font-normal tracking-brand uppercase"
            >
              Products
            </a>
            <a
              href="#engineering"
              className="link-underline text-[#1A1816] text-[11px] font-normal tracking-brand uppercase"
            >
              Engineering
            </a>
            <a
              href="#senzine"
              className="link-underline text-[#1A1816] text-[11px] font-normal tracking-brand uppercase"
            >
              Senzine
            </a>
            <a
              href="#products"
              className="text-[11px] font-normal tracking-brand uppercase text-[#F7F4F0] bg-[#1A1816] px-6 py-3 hover:bg-[#2a2724] transition-colors duration-500"
            >
              Shop All
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1px] bg-[#1A1816] transition-all duration-500 ${
                menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-[#1A1816] transition-all duration-500 ${
                menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[#F7F4F0] transition-all duration-700 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {['Philosophy', 'Products', 'Engineering', 'Senzine'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-[#1A1816] text-sm tracking-brand uppercase font-light"
            >
              {item}
            </a>
          ))}
          <a
            href="#products"
            onClick={() => setMenuOpen(false)}
            className="text-[11px] font-normal tracking-brand uppercase text-[#F7F4F0] bg-[#1A1816] px-8 py-3 mt-4"
          >
            Shop All
          </a>
        </div>
      </div>
    </nav>
  );
}
