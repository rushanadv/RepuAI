import React from 'react';
import { Inbox, Brain, AlertTriangle, PenTool, ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: Inbox,
      title: 'Reviews Come In',
      desc: 'Paste any review — from Google, Zomato, Amazon, or anywhere.',
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      step: '02',
      icon: Brain,
      title: 'AI Analyzes Instantly',
      desc: 'Sentiment, issue category, urgency score — all extracted in <2 seconds.',
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/10 border-violet-500/20'
    },
    {
      step: '03',
      icon: AlertTriangle,
      title: 'Urgent Ones Get Flagged',
      desc: 'Critical complaints are surfaced immediately so nothing falls through.',
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      step: '04',
      icon: PenTool,
      title: 'Response Gets Drafted',
      desc: 'A personalized, on-brand reply — ready to copy and post.',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20'
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 bg-transparent overflow-hidden fade-in-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            From Review to Perfect Response in Seconds
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A seamless automated pipeline converting chaotic customer feedback into brand-building moments.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative flex flex-col items-center text-center">
                {/* Step Card */}
                <div className="glow-card p-6 rounded-2xl w-full h-full flex flex-col items-center justify-start border-white/[0.08] relative group">
                  {/* Step Number Badge */}
                  <div className="w-10 h-10 rounded-full btn-glow flex items-center justify-center text-white font-bold text-sm shadow-md mb-5 group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${item.iconBg} border flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow Connector (Desktop Only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-slate-500 pointer-events-none">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
