import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Brain, 
  AlertTriangle, 
  PenTool, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  Layers,
  Radio,
  FileCheck2
} from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      step: '01',
      title: 'Universal Ingestion',
      subtitle: 'All channels connected in real time',
      desc: 'Seamlessly aggregates incoming customer reviews across Google Business, Zomato, Amazon, TripAdvisor, and Apple App Store the moment they land.',
      icon: Inbox,
      iconColor: 'text-cyan-400',
      badgeColor: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    },
    {
      id: 1,
      step: '02',
      title: 'Neural Diagnostics',
      subtitle: 'Sub-second semantic parsing',
      desc: 'LLaMA 3.3 and Nemotron engines isolate sentiment polarity, detect subtle sarcasm, and auto-tag operational failure modes (pricing, food temp, staff).',
      icon: Brain,
      iconColor: 'text-indigo-400',
      badgeColor: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300',
    },
    {
      id: 2,
      step: '03',
      title: 'Triage & Escalation',
      subtitle: 'Zero critical blindspots',
      desc: '1-star ratings, legal/health hazards, and refund demands trigger immediate high-priority escalation with diagnostic urgency rationale.',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      badgeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    },
    {
      id: 3,
      step: '04',
      title: 'Contextual Synthesis',
      subtitle: 'Tailored resolution drafted',
      desc: 'Synthesizes a tailored, deeply empathetic, owner-grade resolution addressing specific customer details without robotic corporate clichés.',
      icon: PenTool,
      iconColor: 'text-emerald-400',
      badgeColor: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    },
  ];

  // Auto-advance step every 5 seconds if user is idle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="how-it-works" className="relative py-28 px-4 sm:px-6 bg-[#060609] overflow-hidden fade-in-section border-t border-white/[0.05]">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/3 -right-20 w-[500px] h-[350px] rounded-full pointer-events-none blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4">
            <Radio className="w-3.5 h-3.5" />
            <span>PIPELINE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.05]">
            From raw complaint to published resolution in four automated beats.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">
            A continuous closed-loop intelligence system converting volatile feedback into brand loyalty.
          </p>
        </div>

        {/* Interactive Sticky-Scroll & Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 4 Milestone Step Selectors (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((item, index) => {
              const isSelected = activeStep === index;
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveStep(index)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white/[0.04] border-indigo-500/40 shadow-xl shadow-indigo-950/30'
                      : 'bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${item.badgeColor}`}>
                        {item.step}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <Icon className={`w-4 h-4 ${isSelected ? item.iconColor : 'text-slate-600'}`} />
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed pl-8">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage Preview Screen (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0b0b12] border border-white/[0.1] rounded-2xl p-6 sm:p-8 shadow-2xl min-h-[420px] flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Stage Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.07]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">
                  STAGE {steps[activeStep].step} // {steps[activeStep].title.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">Live Simulation</span>
            </div>

            {/* STAGE 0 PREVIEW: INGESTION */}
            {activeStep === 0 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">G</span>
                    <div>
                      <p className="text-xs font-bold text-slate-200">Google My Business Webhook</p>
                      <p className="text-[11px] text-slate-400">Received 1.2s ago • 1-Star Review</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">Synced</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center">Z</span>
                    <div>
                      <p className="text-xs font-bold text-slate-200">Zomato / Swiggy Store Sync</p>
                      <p className="text-[11px] text-slate-400">Listening to live stream • 4 Outlets</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">Listening</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">A</span>
                    <div>
                      <p className="text-xs font-bold text-slate-200">Amazon Marketplace Reviews</p>
                      <p className="text-[11px] text-slate-400">Order feedback webhook active</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">Active</span>
                </div>
              </div>
            )}

            {/* STAGE 1 PREVIEW: NEURAL DIAGNOSTICS */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-4 rounded-xl bg-black/40 border border-indigo-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-indigo-300">Semantic Sentiment Breakdown</span>
                    <span className="text-xs font-bold text-rose-400">Negative (2/10)</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '20%' }} />
                  </div>

                  <span className="text-[11px] font-semibold text-slate-400 block mb-2">Extracted Feature Entities:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-violet-500/15 text-violet-300 text-xs border border-violet-500/25">
                      ⏱️ Wait Time (High Confidence)
                    </span>
                    <span className="px-2.5 py-1 rounded bg-violet-500/15 text-violet-300 text-xs border border-violet-500/25">
                      🍕 Temperature Decay
                    </span>
                    <span className="px-2.5 py-1 rounded bg-violet-500/15 text-violet-300 text-xs border border-violet-500/25">
                      📞 Phone Unresponsive
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2 PREVIEW: TRIAGE & ESCALATION */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      CRITICAL PRIORITY ESCALATION
                    </span>
                    <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold">
                      SLO: 15 Mins
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    Customer experienced a 2h 15m delay, received cold items, and reached an unanswered phone line. High poach risk.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-rose-300 font-mono">
                    <span>Routing: Store Manager & Kitchen Lead</span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3 PREVIEW: SYNTHESIS */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-950/20 to-black/40 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      SYNTHESIZED OWNER RESPONSE
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                      Zero Generic Fluff
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 italic leading-relaxed bg-black/40 p-3 rounded-lg border border-white/[0.05]">
                    "Hi Rahul, this is unacceptable and completely misses our standard. Waiting over two hours for cold food is something we take very seriously. I've personally spoken to our dispatch desk to ensure phone coverage. Please allow us to issue a full refund immediately..."
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Ready for 1-click clipboard paste</span>
                    <span className="text-emerald-400 font-semibold">100% Quality Score</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Stepper Progress Indicator */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>Automated cycle: <strong>1.4 seconds end-to-end</strong></span>
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeStep === i ? 'w-6 bg-indigo-400' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
