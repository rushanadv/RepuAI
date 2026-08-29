import React from 'react';
import { Zap, Tag, Siren, BarChart3, Copy, CheckCircle2 } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 bg-[#0c0c16]/50 border-t border-white/[0.04] overflow-hidden fade-in-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Everything Your Team Needs to Master Reviews
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Intelligent automation designed specifically for businesses that take their reputation seriously.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BIG CARD 1: Instant Sentiment Analysis (Span 2) */}
          <div className="md:col-span-2 glow-card p-8 rounded-2xl border-white/[0.08] flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Instant Sentiment Analysis
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl">
                Know if a review is positive, negative, or neutral before you even finish reading it.
                Our model catches sarcasm, mixed sentiment, and polite complaints that look fine on the surface.
              </p>
            </div>

            {/* Visual Demo Pills */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span>😊 Positive (9/10)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span>😐 Neutral (5/10)</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <span>😤 Negative (2/10)</span>
              </div>
            </div>
          </div>

          {/* SMALL CARD 1: Smart Issue Tagging */}
          <div className="glow-card p-8 rounded-2xl border-white/[0.08] flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
                <Tag className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Smart Issue Tagging
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Auto-tags: Food Quality, Staff, Delivery, Pricing, Ambience, App Bug — no manual sorting required.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-violet-300 text-xs border border-white/5">🍕 Food Quality</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-violet-300 text-xs border border-white/5">⏱️ Delivery</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 text-violet-300 text-xs border border-white/5">💡 Pricing</span>
            </div>
          </div>

          {/* SMALL CARD 2: Urgency Flagging */}
          <div className="glow-card p-8 rounded-2xl border-white/[0.08] flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6">
                <Siren className="w-6 h-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Urgency Flagging
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                1-star, refund demands, and health complaints are instantly marked <span className="text-rose-400 font-semibold">HIGH PRIORITY</span> to save reputations in real time.
              </p>
            </div>
            <div className="mt-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                🔴 CRITICAL ESCALATION
              </span>
            </div>
          </div>

          {/* BIG CARD 2: Pattern Detection (Span 2) */}
          <div className="md:col-span-2 glow-card p-8 rounded-2xl border-white/[0.08] flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Pattern Detection Across All Reviews
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl">
                See what 100+ customers are actually complaining about. RepuAI clusters themes so you
                know to fix the kitchen or logistics, not just apologize one review at a time.
              </p>
            </div>

            {/* CSS Bar Chart Demo */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <span>Food Quality & Freshness</span>
                  <span className="text-cyan-400">78%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <span>Wait / Delivery Time</span>
                  <span className="text-violet-400">45%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-400 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                  <span>Staff Courtesy</span>
                  <span className="text-emerald-400">23%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARD 3: One-Click Copy */}
          <div className="md:col-span-3 glow-card p-8 rounded-2xl border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-all duration-300">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex-shrink-0 flex items-center justify-center">
                <Copy className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  One-Click Copy & Multi-Platform Publishing
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  Drafted responses are ready to paste directly into Google My Business, Zomato, Amazon, TripAdvisor, or Apple App Store with no re-formatting required.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Ready to Deploy
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
