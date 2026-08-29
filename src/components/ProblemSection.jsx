import React from 'react';
import { Clock, TrendingDown, MessageSquareOff } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: Clock,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-500/10 border-red-500/20',
      borderColor: 'border-l-red-500',
      title: 'Reviews Sit Unanswered for Days',
      description:
        'A 1-star review on Google or Zomato stays public. Every hour without a response is a customer lost to your competitor.',
    },
    {
      icon: TrendingDown,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      borderColor: 'border-l-amber-500',
      title: 'Recurring Problems Go Unnoticed',
      description:
        "When 30 customers mention 'cold food' and nobody connects the dots, the problem compounds silently until it's a PR crisis.",
    },
    {
      icon: MessageSquareOff,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-500/10 border-red-500/20',
      borderColor: 'border-l-red-500',
      title: 'Generic Replies Frustrate More',
      description:
        "Copy-pasted 'Sorry for the inconvenience' responses feel robotic and signal to customers that you don't actually care.",
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-[#0c0c16]/50 border-y border-white/[0.04] overflow-hidden fade-in-section">
      {/* Subtle radial ambient highlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(239, 68, 68, 0.06) 0%, rgba(124, 58, 237, 0.04) 100%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400 mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            The Problem
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Ignored Reviews Are Costing You Customers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Customer feedback is louder than ever. Traditional manual review management creates fatal blind spots.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((prob, index) => {
            const Icon = prob.icon;
            return (
              <div
                key={index}
                className={`glow-card p-7 rounded-2xl border-l-[5px] ${prob.borderColor} flex flex-col justify-between transition-all duration-300`}
              >
                <div>
                  <div className={`w-14 h-14 rounded-xl ${prob.iconBg} border flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${prob.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {prob.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    {prob.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
