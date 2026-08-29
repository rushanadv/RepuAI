import React, { useState } from 'react';
import { 
  Star, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Terminal,
  Activity,
  Cpu,
  Layers
} from 'lucide-react';
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
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen pt-32 sm:pt-36 pb-20 flex flex-col justify-between items-center overflow-hidden bg-transparent">
      
      {/* 5. NOISE TEXTURE OVERLAY (First child inside Hero section div) */}
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

      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[450px] rounded-full pointer-events-none blur-[160px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.18), transparent 70%)' }}
      />

      {/* HERO MAIN HEADER */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-slate-300 uppercase tracking-widest text-[11px]">AUTONOMOUS REVIEW RESOLUTION</span>
          <span className="text-slate-600">/</span>
          <span className="text-violet-400 font-mono text-[11px]">v2.4 NEURAL KERNEL</span>
        </div>

        {/* Ultra-Large Display Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-[5.75rem] font-display font-extrabold text-white leading-[0.9] max-w-5xl">
          Never let a review <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-violet-300">
            cost you a customer.
          </span>
        </h1>

        {/* Strict 2-Line Editorial Copy */}
        <p className="mt-7 text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          RepuAI continuously monitors public customer feedback, isolates operational defects, 
          and synthesizes on-brand owner responses in under two seconds.
        </p>

        {/* Action Button Strip */}
        <div className="mt-9 flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full sm:w-auto">
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
            className="btn-primary group px-8 py-3.5 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer transition-all duration-300"
          >
            <span>Try Live Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          
          <a
            href="#how-it-works"
            onClick={(e) => handleScrollTo(e, '#how-it-works')}
            className="btn-secondary px-7 py-3.5 rounded-full font-medium text-slate-300 hover:text-white text-sm w-full sm:w-auto text-center"
          >
            How it Works
          </a>
        </div>

      </div>

      {/* OVERSIZED COMMAND-CENTER CANVAS (Layered 3D Perspective Workspace) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 mt-16 perspective-1200">
        <div className="hero-canvas studio-chassis rounded-2xl p-4 sm:p-6 overflow-hidden">
          
          {/* Top Hardware Bezel */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/[0.07]">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
              </div>
              <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
                repuai-node // live-triage.stream
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% Neural Sync</span>
              </span>
              <span className="text-slate-500 hidden md:inline">Latency: 1.4s</span>
            </div>
          </div>

          {/* 3-Column Layered Operational Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* Column 1: Incoming Negative Review Incident (4 cols) */}
            <div className="md:col-span-4 bg-black/50 rounded-xl p-4 border border-rose-500/25 flex flex-col justify-between shadow-inner">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold font-mono flex items-center justify-center">G</span>
                    <span className="text-xs font-bold text-slate-200">Rahul M.</span>
                  </div>
                  <div className="flex text-rose-500">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 text-slate-800" />
                    <Star className="w-3 h-3 text-slate-800" />
                    <Star className="w-3 h-3 text-slate-800" />
                    <Star className="w-3 h-3 text-slate-800" />
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic bg-black/30 p-2.5 rounded-lg border border-white/[0.04]">
                  "Ordered biryani at 7pm. It arrived at 9:15pm completely cold and the portion was half of what I expected for ₹350. Unacceptable."
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Google Reviews</span>
                <span className="text-rose-400 font-semibold">Flagged: Urgent Risk</span>
              </div>
            </div>

            {/* Column 2: Neural Classification Radar (3 cols) */}
            <div className="md:col-span-3 bg-black/40 rounded-xl p-4 border border-white/[0.07] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                  Extracted Operational Entities
                </span>
                <div className="space-y-1.5">
                  <div className="px-2.5 py-1.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300 flex items-center justify-between">
                    <span>⏱️ Delivery Delay</span>
                    <span className="text-rose-400 font-mono text-[10px] font-bold">98%</span>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300 flex items-center justify-between">
                    <span>🍕 Cold Food</span>
                    <span className="text-amber-400 font-mono text-[10px] font-bold">94%</span>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300 flex items-center justify-between">
                    <span>💰 Portion Value</span>
                    <span className="text-violet-400 font-mono text-[10px] font-bold">81%</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Sentiment Score:</span>
                <span className="text-rose-400 font-bold">1.8 / 10</span>
              </div>
            </div>

            {/* Column 3: Synthesized Empathetic Response (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-b from-violet-950/30 to-black/50 rounded-xl p-4 border border-violet-500/35 flex flex-col justify-between shadow-inner">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-300">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>Synthesized Owner Response</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-semibold">
                    Ready to Post
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal bg-black/60 p-3 rounded-lg border border-white/[0.06] italic">
                  "Hi Rahul, this is unacceptable and completely misses our standard. Waiting over two hours for cold food is something we take very seriously. I've personally spoken with our dispatch manager to ensure phone coverage and would like to refund your order immediately..."
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">Tone: Empathetic Owner</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> No 'inconvenience' clichés
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* TELEMETRY METRIC STRIP (Anchoring bottom of Hero) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-white/[0.08] flex flex-wrap justify-between items-center gap-6">
        <div className="flex flex-col">
          <span ref={stat1.ref} className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
            {(stat1.count / 1000000).toFixed(1)}M+
          </span>
          <span className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Reviews Analyzed</span>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-white/[0.08]" />

        <div className="flex flex-col">
          <span ref={stat2.ref} className="text-3xl sm:text-4xl font-extrabold text-violet-300 font-mono tracking-tight">
            {stat2.count}%
          </span>
          <span className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Retention Rate</span>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-white/[0.08]" />

        <div className="flex flex-col">
          <span ref={stat3.ref} className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono tracking-tight">
            {stat3.count}x
          </span>
          <span className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Turnaround Speed</span>
        </div>

        <div className="hidden sm:block h-8 w-[1px] bg-white/[0.08]" />

        <div className="flex flex-col">
          <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tracking-tight">
            &lt; 2s
          </span>
          <span className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">Neural Latency</span>
        </div>
      </div>

    </section>
  );
}
