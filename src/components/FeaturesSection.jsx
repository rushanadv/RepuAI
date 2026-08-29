import React, { useState } from 'react';
import { 
  Zap, 
  Tag, 
  Siren, 
  BarChart3, 
  Copy, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Cpu, 
  Share2,
  ArrowUpRight
} from 'lucide-react';

export default function FeaturesSection() {
  const [activeSentimentDemo, setActiveSentimentDemo] = useState('sarcasm');

  const sentimentDemos = {
    positive: {
      label: '😊 Positive',
      score: '9.5 / 10',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      snippet: '"The butter chicken was unbelievable and our waiter Priya made us feel like family. 10/10!"',
      analysis: 'Genuine praise detected • Brand advocate retention recommended'
    },
    sarcasm: {
      label: '😐 Sarcastic / Passive Complaint',
      score: '3.8 / 10',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      snippet: '"Loved waiting 50 minutes for cold pasta. Truly a wonderful anniversary dinner."',
      analysis: 'High sarcasm probability (97%) • Hidden negative review isolated'
    },
    critical: {
      label: '😤 Severe Critical',
      score: '1.2 / 10',
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      snippet: '"Found foreign plastic inside the meal. Refused to refund us on spot. Reporting to food safety."',
      analysis: 'Critical brand hazard • Instant manager escalation triggered'
    }
  };

  return (
    <section id="features" className="relative py-28 px-4 sm:px-6 bg-[#08080c] border-t border-white/[0.05] overflow-hidden fade-in-section">
      
      {/* Ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>FEATURE SUITE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.05]">
            Engineered for businesses that treat reputation as revenue.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">
            A comprehensive bento architecture tailored for multi-location businesses, online stores, and customer-first teams.
          </p>
        </div>

        {/* Asymmetric Bento Composition */}
        <div className="space-y-6">

          {/* ROW 1: 65% Large Feature + 35% Small Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* BIG CARD 1 (65% -> 8 cols): Deep Multi-Modal Sentiment & Sarcasm Catch */}
            <div className="lg:col-span-8 hairline-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.06]">
                    Model: Meta LLaMA 3.3 70B
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Sub-Surface Sentiment & Sarcasm Classification
                </h3>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                  Traditional keyword filters fail when customers use polite or sarcastic phrasing. Our neural pipeline evaluates tone, context, and latent sentiment polarity.
                </p>

                {/* Interactive Demo Toggles inside Card */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {Object.keys(sentimentDemos).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveSentimentDemo(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeSentimentDemo === key
                          ? 'bg-indigo-600/30 border border-indigo-500/60 text-indigo-200'
                          : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      {key.toUpperCase()} DEMO
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Live Result Box */}
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <div className={`p-4 rounded-xl ${sentimentDemos[activeSentimentDemo].bg} border ${sentimentDemos[activeSentimentDemo].border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold ${sentimentDemos[activeSentimentDemo].color}`}>
                      {sentimentDemos[activeSentimentDemo].label}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      Score: {sentimentDemos[activeSentimentDemo].score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 italic mb-2">
                    {sentimentDemos[activeSentimentDemo].snippet}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    ✓ {sentimentDemos[activeSentimentDemo].analysis}
                  </p>
                </div>
              </div>
            </div>

            {/* SMALL CARD 1 (35% -> 4 cols): Smart Issue Taxonomy */}
            <div className="lg:col-span-4 hairline-card p-7 rounded-2xl flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Zero-Config Issue Tagging
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Extracts root cause entities without manual rule-writing or rigid boolean logic.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/[0.05] text-xs">
                  <span className="text-slate-300">🍕 Food Freshness</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Auto-tagged</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/[0.05] text-xs">
                  <span className="text-slate-300">⏱️ Delivery Latency</span>
                  <span className="text-rose-400 font-mono text-[11px]">Auto-tagged</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/[0.05] text-xs">
                  <span className="text-slate-300">👨‍🍳 Staff Courtesy</span>
                  <span className="text-amber-400 font-mono text-[11px]">Auto-tagged</span>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 2: 35% Small Feature + 65% Large Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* SMALL CARD 2 (35% -> 4 cols): Real-Time Urgency Escalation */}
            <div className="lg:col-span-4 hairline-card p-7 rounded-2xl flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                  <Siren className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Automated Urgency Triage
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Separates mundane feedback from reputation emergencies with instant threshold triggers.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-rose-400">HIGH PRIORITY ESCALATION</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  SLO guaranteed: flagged to management Slack/SMS under 10 seconds.
                </p>
              </div>
            </div>

            {/* BIG CARD 2 (65% -> 8 cols): Cross-Platform Pattern & Clustering Bar Chart */}
            <div className="lg:col-span-8 hairline-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    Macro Intelligence
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Macro Pattern Detection Across 100+ Reviews
                </h3>
                <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                  RepuAI aggregates individual review signals into overarching operational trends so founders fix the kitchen or shipping line, not just write isolated apologies.
                </p>
              </div>

              {/* Dynamic CSS Bar Chart Display */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span>Food Quality & Temperature Consistency</span>
                    <span className="text-cyan-400 font-mono font-bold">78%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span>Wait / Delivery Duration</span>
                    <span className="text-indigo-400 font-mono font-bold">45%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-medium">
                    <span>Staff Attentiveness & Hospitality</span>
                    <span className="text-emerald-400 font-mono font-bold">23%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '23%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ROW 3: Full Width Banner Feature (One-Click Multi-Channel Publish) */}
          <div className="hairline-card p-6 sm:p-7 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 group">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Copy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-0.5">
                  One-Click Copy & Multi-Platform Bridge
                </h4>
                <p className="text-xs text-slate-400 max-w-xl">
                  Outputs pre-formatted, character-constrained responses ready for immediate clipboard paste or direct webhook sync to Google, Zomato, Amazon, and App Stores.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Platform Compliant
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
