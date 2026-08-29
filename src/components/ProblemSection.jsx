import React from 'react';
import { Clock, TrendingDown, MessageSquareOff, AlertOctagon, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 bg-[#09090d]/60 border-t border-white/[0.05] overflow-hidden fade-in-section">
      
      {/* Subtle ambient gradient backlighting */}
      <div 
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Asymmetric 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Editorial Header (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>THE OPERATIONAL BLINDSPOT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.05]">
              Unanswered reviews silently destroy your brand equity.
            </h2>

            <p className="mt-6 text-base text-slate-400 leading-relaxed">
              When reviews sit unattended or get generic bot replies, 84% of prospective customers assume management doesn't care. The cost compounds silently.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Average response delay:</span>
                <span className="text-rose-400 font-mono font-semibold">48+ Hours (Industry Avg)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Competitor poaching risk:</span>
                <span className="text-rose-400 font-mono font-semibold">High (Within 6 hours)</span>
              </div>
            </div>
          </div>

          {/* Right Layered Problem Artifacts (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Problem Card 1: Review Latency */}
            <div className="hairline-card p-6 rounded-2xl border-l-[3px] border-l-rose-500 group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Public Reviews Sit Unanswered for Days</h3>
                    <span className="text-xs text-slate-400">High Visibility Decay</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                  72h Latency
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                A single unanswered 1-star review on Google or Zomato remains public and ranking high. Every hour without a decisive response converts prospective buyers straight to your closest competitor.
              </p>
            </div>

            {/* Problem Card 2: Unconnected Recurring Complaints */}
            <div className="hairline-card p-6 rounded-2xl border-l-[3px] border-l-amber-500 group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Recurring Operational Defects Go Unnoticed</h3>
                    <span className="text-xs text-slate-400">Compounding Blindspot</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  30+ Mentions
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                When 30 different customers mention "cold delivery" across different channels, manual staff treat each as isolated noise. The root problem festers unnoticed until ratings permanently collapse.
              </p>
            </div>

            {/* Problem Card 3: Generic Robotic Responses */}
            <div className="hairline-card p-6 rounded-2xl border-l-[3px] border-l-indigo-500 group">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <MessageSquareOff className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Robotic Template Replies Escalate Frustration</h3>
                    <span className="text-xs text-slate-400">Brand Alienation</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  Zero Empathy
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Copy-pasting "We apologize for the inconvenience" feels cynical to an angry customer. It signals that leadership is on autopilot and will not take concrete action to rectify grievances.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
