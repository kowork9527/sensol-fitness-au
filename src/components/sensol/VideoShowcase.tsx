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

export function VideoShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section ref={ref} className="bg-[#1A1816] py-20 md:py-32">
      <div className="max-w-[1600px] mx-auto px-8 md:px-16">
        {/* Section Label */}
        <p
          className={`text-[#8A8279] text-[10px] tracking-brand-lg uppercase mb-4 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          See how Sensol works
        </p>

        {/* Headline */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-1000 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-[#F7F4F0] text-3xl md:text-4xl lg:text-5xl font-extralight leading-[1.15] tracking-wide">
            The first All-in-one
            <br />
            smart training reformer.
          </h2>
          <p className="text-[#8A8279] text-sm font-light mt-6 max-w-lg leading-[1.8]">
            See how Sensol works in real movement — simple, precise, and intuitive.
          </p>
        </div>

        {/* Video Container */}
        <div
          className={`relative overflow-hidden transition-all duration-1000 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Video */}
          <div className="relative aspect-[21/9] md:aspect-[21/9] bg-[#0d0d0b]">
            <video
              ref={videoRef}
              src="/sensol-showcase.mp4"
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
              onLoadedData={() => setVideoLoaded(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Video Overlay / Play Button - only show when not playing */}
            {(!isPlaying || !videoLoaded) && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={togglePlay}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-[#1A1816]/40 group-hover:bg-[#1A1816]/20 transition-colors duration-500" />

                {/* Play Button */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#F7F4F0]/60 flex items-center justify-center group-hover:border-[#F7F4F0] transition-all duration-500 group-hover:scale-105">
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-[#F7F4F0] ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-[#F7F4F0]/70 text-[10px] tracking-brand-lg uppercase group-hover:text-[#F7F4F0] transition-colors duration-500">
                    Play video
                  </span>
                </div>
              </div>
            )}

            {/* Controls bar - only show when playing */}
            {isPlaying && videoLoaded && (
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-[#1A1816]/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center justify-between">
                  <button
                    onClick={togglePlay}
                    className="text-[#F7F4F0]/80 hover:text-[#F7F4F0] transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {isPlaying ? (
                        <>
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </>
                      ) : (
                        <path d="M8 5v14l11-7z" />
                      )}
                    </svg>
                  </button>
                  <span className="text-[#F7F4F0]/50 text-[9px] tracking-brand uppercase">
                    Sensol RS02 — Full movement demonstration
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video caption */}
        <div
          className={`mt-6 flex items-center justify-between transition-all duration-1000 delay-600 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase">
            Sensol RS02 — Precision in motion
          </p>
          <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase">
            {isPlaying ? 'Playing' : 'Paused'}
          </p>
        </div>

        {/* Engineering Specs */}
        <div
          className={`mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-[#2a2724] transition-all duration-1000 delay-800 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-[#1A1816] p-8 md:p-10">
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-4">Motion Range</p>
            <p className="text-[#F7F4F0] text-3xl md:text-4xl font-extralight">360°</p>
            <p className="text-[#8A8279] text-xs font-light mt-3 leading-[1.8]">
              Full-spectrum movement freedom for unrestricted training.
            </p>
          </div>
          <div className="bg-[#1A1816] p-8 md:p-10">
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-4">Response Time</p>
            <p className="text-[#F7F4F0] text-3xl md:text-4xl font-extralight">&lt;8ms</p>
            <p className="text-[#8A8279] text-xs font-light mt-3 leading-[1.8]">
              Near-instantaneous feedback between input and resistance.
            </p>
          </div>
          <div className="bg-[#1A1816] p-8 md:p-10">
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-4">Resistance</p>
            <p className="text-[#F7F4F0] text-3xl md:text-4xl font-extralight">0–100%</p>
            <p className="text-[#8A8279] text-xs font-light mt-3 leading-[1.8]">
              Precision-tuned resistance that adapts to your strength curve.
            </p>
          </div>
          <div className="bg-[#1A1816] p-8 md:p-10">
            <p className="text-[#8A8279] text-[9px] tracking-brand-lg uppercase mb-4">Noise Level</p>
            <p className="text-[#F7F4F0] text-3xl md:text-4xl font-extralight">&lt;25dB</p>
            <p className="text-[#8A8279] text-xs font-light mt-3 leading-[1.8]">
              Whisper-quiet operation that preserves the stillness of your space.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}