import React, { useState } from 'react';
import { 
  Star, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  MessageSquareCode,
  Layers,
  Flame
} from 'lucide-react';
import { useCounter } from '../hooks/useCounter';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('triage');

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
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-between items-center overflow-hidden bg-transparent">
      
      {/* Noise Texture Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Subtle Background Lighting & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full pointer-events-none blur-[140px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15), transparent 70%)' }}
      />

      {/* HERO MAIN HEADER */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-slate-300 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="tracking-wide">AI-Powered Review Response Agent</span>
          <span className="text-slate-500 font-normal">|</span>
          <span className="text-indigo-400 font-mono text-[11px]">LLaMA 3.3 & Nemotron</span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] text-white leading-[0.95] max-w-4xl">
          Never let a review <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-300">
            cost you a customer.
          </span>
        </h1>

        {/* Understated 2-Line Supporting Copy */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
          RepuAI reads every incoming review, isolates operational failure points, 
          and publishes high-empathy brand responses in under two seconds.
        </p>

        {/* Tactile Primary & Understated Secondary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full sm:w-auto">
          <a
            href="#demo"
            onClick={(e) => handleScrollTo(e, '#demo')}
            className="btn-primary group px-7 py-3 rounded-full font-semibold text-white text-sm flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
          >
            <span>Launch Live Demo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          
          <a
            href="#how-it-works"
            onClick={(e) => handleScrollTo(e, '#how-it-works')}
            className="btn-secondary px-6 py-3 rounded-full font-medium text-slate-300 hover:text-white text-sm w-full sm:w-auto text-center"
          >
            Explore Workflow
          </a>
        </div>

      </div>

      {/* CENTRAL PHYSICAL PRODUCT SHOWCASE CANVAS (Layered 3D Perspective Interface) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 mt-14 perspective-1000">
        <div className="hero-canvas rounded-2xl bg-[#0b0b11]/90 border border-white/[0.12] p-4 sm:p-6 overflow-hidden">
          
          {/* Mock Window Topbar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-slate-400 ml-2">repuai-kernel // live-triage.stream</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                ● 100% Neural Sync
              </span>
              <span className="text-[11px] font-mono text-slate-500">Latency: 1.4s</span>
            </div>
          </div>

          {/* 3-Column Layered Interactive Product Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            
            {/* Column 1: Incoming Negative Review Card (4 cols) */}
            <div className="md:col-span-4 bg-black/40 rounded-xl p-4 border border-rose-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold flex items-center justify-center">G</span>
                    <span className="text-xs font-bold text-slate-200">Rahul M.</span>
                  </div>
                  <div className="flex text-rose-500">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 text-slate-700" />
                    <Star className="w-3 h-3 text-slate-700" />
                    <Star className="w-3 h-3 text-slate-700" />
                    <Star className="w-3 h-3 text-slate-700" />
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Ordered biryani at 7pm. It arrived at 9:15pm completely cold and the portion was half of what I expected for ₹350..."
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Google My Business</span>
                <span className="text-rose-400 font-semibold">Flagged: High Risk</span>
              </div>
            </div>

            {/* Column 2: Neural Diagnostics & Categorization (3 cols) */}
            <div className="md:col-span-3 bg-white/[0.02] rounded-xl p-4 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                  Diagnosed Issues
                </span>
                <div className="space-y-1.5">
                  <div className="px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[11px] font-medium text-rose-300 flex items-center justify-between">
                    <span>⏱️ Delivery Latency</span>
                    <span className="text-rose-400 font-mono text-[10px]">98%</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium text-amber-300 flex items-center justify-between">
                    <span>🍕 Food Temp</span>
                    <span className="text-amber-400 font-mono text-[10px]">94%</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-[11px] font-medium text-violet-300 flex items-center justify-between">
                    <span>💰 Portion Value</span>
                    <span className="text-violet-400 font-mono text-[10px]">81%</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Sentiment Score:</span>
                <span className="text-rose-400 font-bold font-mono">1.8 / 10</span>
              </div>
            </div>

            {/* Column 3: Synthesized Empathetic Response (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-b from-indigo-950/20 to-black/40 rounded-xl p-4 border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Synthesized Response</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-semibold">
                    Ready to post
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal bg-black/40 p-2.5 rounded-lg border border-white/[0.04]">
                  "Hi Rahul, this is unacceptable and completely misses our quality bar. Waiting over two hours for cold food is something we take very seriously. I’ve personally flagged this with our kitchen team and would like to refund this immediately..."
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Tone: Empathetic Owner</span>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> No 'inconvenience' clichés
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* KPI METRIC STRIP (Bottom of Hero) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 mt-14 pt-8 border-t border-white/[0.07] flex flex-wrap justify-between items-center gap-6">
        <div className="flex flex-col">
          <span ref={stat1.ref} className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            {(stat1.count / 1000000).toFixed(1)}M+
          </span>
          <span className="text-xs text-slate-400">Reviews Analyzed</span>
        </div>

        <div className="hidden sm:block h-7 w-[1px] bg-white/[0.08]" />

        <div className="flex flex-col">
          <span ref={stat2.ref} className="text-2xl sm:text-3xl font-extrabold text-indigo-300 tracking-tight font-mono">
            {stat2.count}%
          </span>
          <span className="text-xs text-slate-400">Customer Retention</span>
        </div>

        <div className="hidden sm:block h-7 w-[1px] bg-white/[0.08]" />

        <div className="flex flex-col">
          <span ref={stat3.ref} className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight font-mono">
            {stat3.count}x
          </span>
          <span className="text-xs text-slate-400">Faster Resolution Cycle</span>
        </div>

        <div className="hidden sm:block h-7 w-[1px] bg-white/[0.08]" />

        <div className="flex flex-col">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight font-mono">
            &lt; 2s
          </span>
          <span className="text-xs text-slate-400">Average Turnaround</span>
        </div>
      </div>

    </section>
  );
}
