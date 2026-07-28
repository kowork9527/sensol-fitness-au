'use client';

import { useEffect, useRef, useState } from 'react';

export function AppDownload() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#1A1816] overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-8 md:px-16 py-24 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left — Phone Mockup */}
          <div
            className={`flex justify-center transition-all duration-1000 ease-out ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative w-[280px] md:w-[320px]">
              {/* Phone Frame */}
              <div className="relative bg-[#2a2724] rounded-[40px] p-3 shadow-2xl">
                {/* Screen */}
                <div className="bg-[#1A1816] rounded-[28px] overflow-hidden aspect-[9/19.5] relative">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 pt-3 pb-2">
                    <span className="text-[10px] text-white/50 font-light">9:41</span>
                    <div className="w-20 h-5 bg-[#1A1816] rounded-full" />
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-2 border border-white/30 rounded-sm" />
                      <div className="w-1 h-1 bg-white/30 rounded-full" />
                    </div>
                  </div>

                  {/* App Content Mockup */}
                  <div className="px-5 pt-4">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-white text-[10px] font-light tracking-[0.15em] uppercase">Sensol</span>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border border-white/20" />
                        <div className="w-5 h-5 rounded-full border border-white/20" />
                      </div>
                    </div>

                    {/* Resistance Ring */}
                    <div className="flex flex-col items-center mb-6">
                      <div className="relative w-[160px] h-[160px]">
                        {/* Outer Ring */}
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                          <circle cx="80" cy="80" r="70" fill="none" stroke="#2a2724" strokeWidth="6" />
                          <circle cx="80" cy="80" r="70" fill="none" stroke="#8A8279" strokeWidth="6" strokeLinecap="round" strokeDasharray="330 440" />
                        </svg>
                        {/* Center Value */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-white text-3xl font-extralight">65</span>
                          <span className="text-[#8A8279] text-[8px] tracking-[0.2em] uppercase mt-1">Resistance</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Controls */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {[
                        { label: 'Mode', value: 'Pilates' },
                        { label: 'Time', value: '32:00' },
                        { label: 'Cal', value: '186' },
                      ].map((item) => (
                        <div key={item.label} className="bg-[#2a2724] rounded-lg px-2 py-2.5 text-center">
                          <p className="text-[7px] text-[#8A8279] tracking-[0.15em] uppercase mb-0.5">{item.label}</p>
                          <p className="text-white text-[11px] font-light">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Session Button */}
                    <div className="bg-[#8A8279] rounded-xl py-3 text-center">
                      <span className="text-[#1A1816] text-[9px] tracking-[0.2em] uppercase font-medium">Start Session</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-10 bg-[#8A8279]/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>

          {/* Right — Content */}
          <div
            className={`transition-all duration-1000 ease-out delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Label */}
            <p className="text-[#8A8279] text-[10px] font-normal tracking-[0.2em] uppercase mb-6">
              Sensol App
            </p>

            {/* Title */}
            <h2 className="text-[#F7F4F0] text-3xl md:text-4xl font-extralight tracking-[0.08em] leading-[1.2] mb-6">
              Your intelligent<br />training companion
            </h2>

            {/* Description */}
            <p className="text-[#8A8279] text-sm font-light leading-[1.8] mb-10 max-w-md">
              The Sensol App connects seamlessly to your reformer, providing real-time resistance control, guided workout programs, and performance tracking — all from your phone.
            </p>

            {/* Features */}
            <div className="space-y-5 mb-12">
              {[
                {
                  title: 'Real-time Resistance Control',
                  desc: 'Adjust resistance levels instantly during your session',
                },
                {
                  title: '100+ Guided Workouts',
                  desc: 'Expert-led pilates and strength programs for every level',
                },
                {
                  title: 'Performance Analytics',
                  desc: 'Track your progress with detailed session insights',
                },
              ].map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-[1px] h-10 bg-[#8A8279]/30 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[#F7F4F0] text-xs font-normal tracking-[0.05em] mb-1">
                      {feature.title}
                    </p>
                    <p className="text-[#8A8279]/70 text-[11px] font-light leading-[1.6]">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* App Store Button */}
              <a
                href="#"
                className="group flex items-center gap-3 border border-[#8A8279]/30 px-6 py-3.5 hover:border-[#8A8279]/60 transition-all duration-500"
              >
                <svg className="w-6 h-6 text-[#F7F4F0]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[#8A8279] text-[8px] tracking-[0.1em] uppercase leading-none mb-0.5">Download on the</p>
                  <p className="text-[#F7F4F0] text-sm font-light leading-tight">App Store</p>
                </div>
              </a>

              {/* Google Play Button */}
              <a
                href="#"
                className="group flex items-center gap-3 border border-[#8A8279]/30 px-6 py-3.5 hover:border-[#8A8279]/60 transition-all duration-500"
              >
                <svg className="w-5 h-5 text-[#F7F4F0]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div>
                  <p className="text-[#8A8279] text-[8px] tracking-[0.1em] uppercase leading-none mb-0.5">Get it on</p>
                  <p className="text-[#F7F4F0] text-sm font-light leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
