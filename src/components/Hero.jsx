import React, { useState } from 'react';
import { Star, ArrowRight, Sparkles } from 'lucide-react';
import { useCounter } from '../hooks/useCounter';

export default function Hero() {
  const [btnHovered, setBtnHovered] = useState(false);

  const stat1 = useCounter(2300000);
  const stat2 = useCounter(94);
  const stat3 = useCounter(10);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center items-center overflow-hidden bg-transparent">
      {/* 5. NOISE TEXTURE OVERLAY (First child inside Hero section) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ambient Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      {/* Large Glowing Ambient Circles */}
      <div 
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none blur-[90px]"
        style={{ background: 'rgba(124, 58, 237, 0.15)' }}
      />
      <div 
        className="absolute bottom-10 -right-20 w-[420px] h-[420px] rounded-full pointer-events-none blur-[90px]"
        style={{ background: 'rgba(6, 182, 212, 0.12)' }}
      />

      {/* FLOATING REVIEW CARDS (Hidden on small mobile screens to prevent clutter) */}
      {/* Card 1: Top Left */}
      <div 
        className="hidden lg:flex absolute top-32 left-8 xl:left-20 z-0 pointer-events-none glow-card p-3.5 shadow-2xl items-center gap-3 animate-float max-w-xs border-white/10"
        style={{ animationDuration: '5s' }}
      >
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
        <p className="text-xs text-slate-200 font-medium truncate">
          "Amazing food, will definitely come back!"
        </p>
      </div>

      {/* Card 2: Top Right */}
      <div 
        className="hidden lg:flex absolute top-40 right-8 xl:right-24 z-0 pointer-events-none glow-card p-3.5 shadow-2xl items-center gap-3 animate-float-slow max-w-xs"
        style={{ 
          borderColor: 'rgba(239, 68, 68, 0.35)', 
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.15)',
          animationDuration: '7s'
        }}
      >
        <div className="flex text-red-500">
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 text-slate-600" />
          <Star className="w-3.5 h-3.5 text-slate-600" />
          <Star className="w-3.5 h-3.5 text-slate-600" />
          <Star className="w-3.5 h-3.5 text-slate-600" />
        </div>
        <p className="text-xs text-red-200 font-medium truncate">
          "Terrible service, waited 45 minutes"
        </p>
      </div>

      {/* Card 3: Bottom Left */}
      <div 
        className="hidden lg:flex absolute bottom-28 left-12 xl:left-28 z-0 pointer-events-none glow-card p-3.5 shadow-2xl items-center gap-3 animate-float max-w-xs border-white/10"
        style={{ animationDuration: '6s', animationDelay: '1s' }}
      >
        <div className="flex text-amber-400">
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 text-slate-600" />
          <Star className="w-3.5 h-3.5 text-slate-600" />
        </div>
        <p className="text-xs text-slate-300 font-medium truncate">
          "Average experience, could be better"
        </p>
      </div>

      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glow-card border-violet-500/30 text-xs sm:text-sm font-medium text-violet-200 mb-8 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300">AI-Powered Review Intelligence</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl">
          Never Let a Review <br />
          <span className="gradient-text">Go Unanswered</span> <br />
          Again.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          RepuAI reads every review, detects what's broken in your business,
          and writes the perfect response — before the damage is done.
        </p>

        {/* CTA Button Row */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <a
            href="#demo"
            onClick={(e) => handleScrollTo(e, '#demo')}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={
              btnHovered
                ? { boxShadow: "0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(124, 58, 237, 0.2)" }
                : {}
            }
            className="btn-glow px-8 py-3.5 rounded-full font-semibold text-white text-base flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer shadow-lg shadow-violet-900/30 transition-all duration-300"
          >
            <span>Try Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleScrollTo(e, '#how-it-works')}
            className="px-8 py-3.5 rounded-full font-medium text-violet-300 border border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200 w-full sm:w-auto text-center"
          >
            See How it Works
          </a>
        </div>

        {/* Live Proof / Stats Row */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-3xl flex flex-wrap justify-center items-center gap-8 md:gap-14">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <span 
              ref={stat1.ref} 
              className="text-2xl sm:text-3xl font-extrabold gradient-text tracking-tight min-w-[90px]"
            >
              {(stat1.count / 1000000).toFixed(1)}M+
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-0.5">Reviews Analyzed</span>
          </div>

          <div className="hidden sm:block h-8 w-[1px] bg-white/10" />

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <span 
              ref={stat2.ref} 
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight min-w-[70px]"
            >
              {stat2.count}%
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-0.5">Response Satisfaction</span>
          </div>

          <div className="hidden sm:block h-8 w-[1px] bg-white/10" />

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <span 
              ref={stat3.ref} 
              className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-tight min-w-[60px]"
            >
              {stat3.count}x
            </span>
            <span className="text-xs sm:text-sm text-slate-400 mt-0.5">Faster Than Manual</span>
          </div>

        </div>

      </div>
    </section>
  );
}
