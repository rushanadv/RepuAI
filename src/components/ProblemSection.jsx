import React from 'react';
import { Clock, TrendingDown, MessageSquareOff, ShieldAlert, AlertTriangle, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="relative py-32 px-4 sm:px-6 bg-[#07070b] border-t border-white/[0.05] overflow-hidden fade-in-section">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[550px] h-[350px] rounded-full pointer-events-none blur-[160px]"
        style={{ background: 'radial-gradient(circle, rgba(244, 63, 94, 0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Editorial Anchor (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono font-semibold text-rose-400 mb-6">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>THE SILENT ATTRITION MODEL</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-[-0.04em] leading-[0.95]">
              Silence is the loudest message you can send.
            </h2>

            <p className="mt-6 text-base text-slate-400 leading-relaxed font-normal">
              When a negative review goes unanswered on Google or Zomato, 84% of prospective diners and buyers conclude management is indifferent. Competitor poaching risk spikes 4.2x within six hours.
            </p>

            {/* Micro Arithmetic Breakdown */}
            <div className="mt-8 p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <span className="text-slate-400">Industry Avg Response Delay:</span>
                <span className="text-rose-400 font-bold">48 - 72 Hours</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.05]">
                <span className="text-slate-400">Prospective Views / 48h:</span>
                <span className="text-slate-200">~140 Potential Buyers</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Revenue Impact:</span>
                <span className="text-rose-400 font-bold">-₹42,000 / Review</span>
              </div>
            </div>
          </div>

          {/* Right: Comparative Incident Pathway (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pathway 1: The Traditional Unattended Decay */}
            <div className="hairline-card p-6 sm:p-7 rounded-2xl border-l-[3px] border-l-rose-500/80 bg-[#0c0c14]/80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                    PATHWAY A // TRADITIONAL UNATTENDED DECAY
                  </span>
                </div>
                <span className="text-[11px] font-mono text-rose-400/80">Permanent Churn</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">T+0h</span>
                  <p className="text-slate-300 font-sans font-normal">
                    Customer posts 1-star review: <em className="text-slate-200">"Food was completely cold, 2-hour wait."</em>
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">T+24h</span>
                  <p className="text-slate-300 font-sans font-normal">
                    Staff doesn't check notifications. 80+ local prospects search for dining options, see the unanswered complaint, and pick a competitor.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0">T+72h</span>
                  <p className="text-slate-300 font-sans font-normal">
                    Copy-pasted generic reply is posted: <em className="text-slate-400">"Sorry for the inconvenience."</em> Aggravates customer further.
                  </p>
                </div>
              </div>
            </div>

            {/* Pathway 2: The RepuAI Autonomous Resolution Intercept */}
            <div className="hairline-card p-6 sm:p-7 rounded-2xl border-l-[3px] border-l-emerald-500 bg-gradient-to-b from-indigo-950/20 to-black/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    PATHWAY B // REPUAI AUTONOMOUS RESOLUTION INTERCEPT
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">94% Retention</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/50 border border-white/[0.06] flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">T+0.0s</span>
                  <p className="text-slate-300 font-sans font-normal">
                    Webhook intercepts incoming review instantly via Google My Business / Zomato API.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-white/[0.06] flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">T+1.4s</span>
                  <p className="text-slate-300 font-sans font-normal">
                    Neural engine isolates root defect (Cold Food + Courier Latency), calculates severity score (1.8/10), and triggers immediate team triage.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-white/[0.06] flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0">T+30s</span>
                  <p className="text-slate-300 font-sans font-normal">
                    A personalized, highly empathetic, owner-grade resolution is drafted and published. Customer returns following weekend.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
