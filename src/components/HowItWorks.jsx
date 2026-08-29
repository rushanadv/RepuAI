import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Brain, 
  AlertTriangle, 
  PenTool, 
  CheckCircle2, 
  Sparkles,
  Radio,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      code: '01',
      title: 'Universal Telemetry Ingestion',
      category: 'Real-Time Edge Webhooks',
      desc: 'Connects directly to Google My Business, Zomato, Amazon, TripAdvisor, and Apple App Store. Reviews are captured the millisecond they are published.',
      icon: Inbox,
      tag: '0ms Queue Latency'
    },
    {
      id: 1,
      code: '02',
      title: 'Neural Defect & Sentiment Diagnostics',
      category: 'Semantic Parsing Engine',
      desc: 'LLaMA 3.3 and Nemotron models parse underlying emotional polarity, uncover sarcastic complaints, and cluster operational failure modes.',
      icon: Brain,
      tag: '550B Token Matrix'
    },
    {
      id: 2,
      code: '03',
      title: 'Automated Crisis Triage',
      category: 'Severity Escalation Matrix',
      desc: 'High-risk 1-star ratings, health/safety complaints, and chargeback threats are immediately flagged with diagnostic urgency scores.',
      icon: AlertTriangle,
      tag: 'SLO: 10s Alert'
    },
    {
      id: 3,
      code: '04',
      title: 'Contextual Owner Synthesis',
      category: 'Neural Response Generation',
      desc: 'Synthesizes an empathetic, owner-grade resolution addressing specific customer details without robotic corporate clichés or apologies.',
      icon: PenTool,
      tag: '1-Click Multi-Publish'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section id="how-it-works" className="relative py-32 px-4 sm:px-6 bg-[#050508] overflow-hidden fade-in-section border-t border-white/[0.05]">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none blur-[160px]"
        style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.09) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-semibold text-indigo-400 mb-6">
            <Radio className="w-3.5 h-3.5" />
            <span>ARCHITECTURE // PIPELINE_EXECUTION</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-[-0.04em] leading-[0.95]">
            Four autonomous beats. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-300">
              Zero manual friction.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            From raw customer complaint to published brand resolution in under two seconds.
          </p>
        </div>

        {/* 2-Column Monolithic Timeline Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Timeline Rail (5 Cols) */}
          <div className="lg:col-span-5 relative pl-6 space-y-4">
            
            {/* Vertical Timeline Track Line */}
            <div className="absolute left-2 top-3 bottom-3 w-[1px] bg-white/[0.1]" />

            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-400 border ${
                    isSelected
                      ? 'bg-white/[0.04] border-indigo-500/40 shadow-xl shadow-indigo-950/40'
                      : 'bg-black/30 border-white/[0.04] hover:bg-white/[0.02] hover:border-white/[0.08]'
                  }`}
                >
                  {/* Glowing Laser Node */}
                  <div 
                    className={`absolute -left-[23px] top-6 w-3 h-3 rounded-full transition-all duration-300 ${
                      isSelected 
                        ? 'bg-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.9)] scale-125 ring-4 ring-indigo-500/20' 
                        : 'bg-slate-700'
                    }`} 
                  />

                  <div className="flex items-center justify-between mb-1.5 font-mono text-[11px]">
                    <span className={isSelected ? 'text-indigo-400 font-bold' : 'text-slate-500'}>
                      PHASE {step.code} // {step.category.toUpperCase()}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-slate-500'
                    }`}>
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Holographic Dynamic Visualizer Deck (7 Cols) */}
          <div className="lg:col-span-7 studio-chassis rounded-2xl p-6 sm:p-8 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Inspector Metadata Bar */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08] font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-slate-200">
                  LIVE PIPELINE RADAR // STAGE {steps[activeStep].code}
                </span>
              </div>
              <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                ● Synchronized
              </span>
            </div>

            {/* STAGE 0 PREVIEW: Universal Telemetry Ingestion */}
            {activeStep === 0 && (
              <div className="space-y-3.5 animate-fade-in-up">
                <div className="p-4 bg-black/60 rounded-xl border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold font-mono text-xs flex items-center justify-center">G</span>
                    <div>
                      <p className="text-xs font-bold text-white">Google Reviews Webhook Stream</p>
                      <p className="text-[11px] font-mono text-slate-400">Captured 800ms ago • 1-Star Incident</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Ingested</span>
                </div>

                <div className="p-4 bg-black/60 rounded-xl border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 font-bold font-mono text-xs flex items-center justify-center">Z</span>
                    <div>
                      <p className="text-xs font-bold text-white">Zomato / Swiggy Multi-Outlet Feed</p>
                      <p className="text-[11px] font-mono text-slate-400">Real-time socket connection active</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Ingested</span>
                </div>

                <div className="p-4 bg-black/60 rounded-xl border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center">A</span>
                    <div>
                      <p className="text-xs font-bold text-white">Amazon Marketplace Feedback</p>
                      <p className="text-[11px] font-mono text-slate-400">Merchant SKU order link verified</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Ingested</span>
                </div>
              </div>
            )}

            {/* STAGE 1 PREVIEW: Neural Diagnostics */}
            {activeStep === 1 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-5 bg-black/60 rounded-xl border border-indigo-500/25">
                  <div className="flex items-center justify-between mb-3 font-mono text-xs">
                    <span className="text-indigo-300">Semantic Sentiment Breakdown</span>
                    <span className="text-rose-400 font-bold">Negative (1.8 / 10)</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-5">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '18%' }} />
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
                    Extracted Defect Entities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-md bg-violet-500/15 text-violet-300 text-xs border border-violet-500/25 font-mono">
                      ⏱️ Courier Delay (98% conf)
                    </span>
                    <span className="px-3 py-1 rounded-md bg-violet-500/15 text-violet-300 text-xs border border-violet-500/25 font-mono">
                      🍕 Food Temp Decay (94% conf)
                    </span>
                    <span className="px-3 py-1 rounded-md bg-violet-500/15 text-violet-300 text-xs border border-violet-500/25 font-mono">
                      📞 Phone Unanswered (81% conf)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2 PREVIEW: Automated Triage */}
            {activeStep === 2 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-5 bg-rose-500/10 rounded-xl border border-rose-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      CRITICAL PRIORITY ROUTING TRIGGERED
                    </span>
                    <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2.5 py-0.5 rounded font-bold">
                      SLO: 10s
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed mb-4">
                    Customer endured a 2h 15m wait for cold food with zero phone support. High risk of viral escalation and customer churn.
                  </p>
                  <div className="p-2.5 bg-black/40 rounded-lg border border-white/[0.04] text-[11px] font-mono text-rose-300">
                    Dispatching alert to: Store General Manager & Kitchen Dispatch Desk
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3 PREVIEW: Contextual Synthesis */}
            {activeStep === 3 && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="p-5 bg-gradient-to-b from-indigo-950/30 to-black/60 rounded-xl border border-indigo-500/35">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      SYNTHESIZED OWNER RESOLUTION
                    </span>
                    <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                      Zero Generic Clichés
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 italic leading-relaxed bg-black/60 p-3.5 rounded-lg border border-white/[0.06]">
                    "Hi Rahul, this is unacceptable and completely misses our standard. Waiting over two hours for cold food is something we take very seriously. I've personally spoken with our dispatch manager to ensure phone coverage and would like to refund your order immediately..."
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>1-Click Multi-Channel Sync</span>
                    <span className="text-emerald-400 font-semibold">100% Quality Score</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Stepper Progress Indicator */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Full automated latency: <strong className="text-white">1.4s</strong></span>
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
