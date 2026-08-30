import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Zap, 
  Tag, 
  Siren, 
  BarChart3, 
  Copy, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';
import { scaleIn, fadeUp, getVariants } from '../lib/animations';
import GlowCard from './GlowCard';

export default function FeaturesSection() {
  const prefersReduced = useReducedMotion();
  const [activeSentimentDemo, setActiveSentimentDemo] = useState('sarcasm');

  const sentimentDemos = {
    positive: {
      label: '😊 Genuine Praise',
      score: '9.6 / 10',
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      snippet: '"The butter chicken was unbelievable and our waiter Priya made us feel like family. 10/10!"',
      analysis: 'High advocacy probability (99%) • Suggested: Customer retention reward trigger'
    },
    sarcasm: {
      label: '😐 Sarcasm / Polite Passive Complaint',
      score: '3.8 / 10',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      snippet: '"Loved waiting 50 minutes for cold pasta. Truly a wonderful anniversary dinner."',
      analysis: 'High sarcasm probability (97%) • Hidden negative review isolated & escalated'
    },
    critical: {
      label: '😤 Severe Critical Hazard',
      score: '1.2 / 10',
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      snippet: '"Found foreign plastic inside the meal. Refused to refund on spot. Reporting to food safety."',
      analysis: 'Critical brand hazard • Instant founder & store manager SMS alert dispatched'
    }
  };

  return (
    <section id="features" className="relative py-32 px-4 sm:px-6 bg-[#050508] border-t border-white/[0.05] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] rounded-full pointer-events-none blur-[170px]"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={getVariants(fadeUp, prefersReduced)}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono font-semibold text-violet-400 mb-6">
            <Cpu className="w-3.5 h-3.5" />
            <span>INSTRUMENT SUITE // NEURAL_CAPABILITIES</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-[-0.04em] leading-[0.95]">
            Engineered as high-precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-violet-300">
              software instruments.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            Built specifically for multi-location operators, direct-to-consumer brands, and customer-first founders.
          </p>
        </motion.div>

        {/* Asymmetric Instrument Bento */}
        <div className="space-y-6">

          {/* ROW 1: 70% Large Instrument + 30% Small Instrument */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* BIG CARD 1 (70% -> 8 cols): Sarcasm & Semantic Dial */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={getVariants(scaleIn, prefersReduced)}
              custom={0}
              className="lg:col-span-8"
            >
              <GlowCard className="hairline-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between group shadow-xl h-full">
                <div>
                  <div className="flex items-center justify-between mb-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Zap className="w-4 h-4" />
                      <span className="font-bold">SEMANTIC_RADAR // SUB-SURFACE_TONE</span>
                    </div>
                    <span className="text-slate-500">Meta LLaMA 3.3 70B</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Sub-Surface Tone & Sarcasm Extraction
                  </h3>
                  <p className="text-sm text-slate-400 max-w-xl leading-relaxed font-normal">
                    Catches polite complaints, ironic phrasing, and hidden customer resentment that naive keyword filters miss entirely.
                  </p>

                  {/* Interactive Demo Toggles inside Instrument */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {Object.keys(sentimentDemos).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveSentimentDemo(key)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                          activeSentimentDemo === key
                            ? 'bg-violet-600/30 border border-violet-500/60 text-violet-200 shadow-md'
                            : 'bg-black/40 border border-white/[0.06] text-slate-400 hover:text-white'
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
                      <span className={`text-xs font-bold font-mono ${sentimentDemos[activeSentimentDemo].color}`}>
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
              </GlowCard>
            </motion.div>

            {/* SMALL CARD 1 (30% -> 4 cols): Smart Entity Taxonomy */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={getVariants(fadeUp, prefersReduced)}
              custom={1.5}
              className="lg:col-span-4"
            >
              <GlowCard className="hairline-card p-7 rounded-2xl flex flex-col justify-between group shadow-xl h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-400 mb-3">
                    <Tag className="w-4 h-4" />
                    <span className="font-bold">ENTITY_TAGGER</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Zero-Config Entity Tagging
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 font-normal">
                    Extracts root cause failure modes without brittle manual rules or regex scripts.
                  </p>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-white/[0.05]">
                    <span className="text-slate-300">🍕 Food Freshness</span>
                    <span className="text-emerald-400 text-[11px]">98% Confidence</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-white/[0.05]">
                    <span className="text-slate-300">⏱️ Courier Delay</span>
                    <span className="text-rose-400 text-[11px]">94% Confidence</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/50 border border-white/[0.05]">
                    <span className="text-slate-300">👨‍🍳 Staff Hospitality</span>
                    <span className="text-amber-400 text-[11px]">88% Confidence</span>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

          </div>

          {/* ROW 2: 30% Small Instrument + 70% Large Instrument */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* SMALL CARD 2 (30% -> 4 cols): Real-Time Urgency Triage */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={getVariants(fadeUp, prefersReduced)}
              custom={2.5}
              className="lg:col-span-4"
            >
              <GlowCard className="hairline-card p-7 rounded-2xl flex flex-col justify-between group shadow-xl h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-3">
                    <Siren className="w-4 h-4" />
                    <span className="font-bold">CRISIS_TRIAGE</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Automated Urgency Triage
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5 font-normal">
                    Differentiates routine feedback from catastrophic public escalations in real time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/25">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-bold text-rose-400 font-mono">PRIORITY ESCALATION</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    SLO guaranteed: alerted to leadership Slack & mobile under 10 seconds.
                  </p>
                </div>
              </GlowCard>
            </motion.div>

            {/* BIG CARD 2 (70% -> 8 cols): Macro Pattern Defect Analyzer */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={getVariants(scaleIn, prefersReduced)}
              custom={1}
              className="lg:col-span-8"
            >
              <GlowCard className="hairline-card p-7 sm:p-8 rounded-2xl flex flex-col justify-between group shadow-xl h-full">
                <div>
                  <div className="flex items-center justify-between mb-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-violet-400">
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-bold">MACRO_CLUSTERING // RECURRENCE_ANALYZER</span>
                    </div>
                    <span className="text-slate-500">Cross-Channel Synthesis</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Macro Pattern Detection Across 100+ Reviews
                  </h3>
                  <p className="text-sm text-slate-400 max-w-xl leading-relaxed font-normal">
                    Aggregates fragmented customer complaints into overarching operational themes so founders fix the kitchen line, not just write isolated apologies.
                  </p>
                </div>

                {/* Dynamic Bar Chart Display */}
                <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-3 font-mono">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Food Quality & Temperature Consistency</span>
                      <span className="text-cyan-400 font-bold">78%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "78%" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Wait & Delivery Duration</span>
                      <span className="text-violet-400 font-bold">45%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "45%" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.2, delay: prefersReduced ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-violet-500 rounded-full" 
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Staff Attentiveness & Hospitality</span>
                      <span className="text-emerald-400 font-bold">23%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "23%" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.2, delay: prefersReduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-emerald-500 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

          </div>

          {/* ROW 3: Full Width Multi-Channel Bridge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={getVariants(fadeUp, prefersReduced)}
            custom={2}
          >
            <GlowCard className="hairline-card p-6 sm:p-7 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 group shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Copy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-0.5">
                    Universal Multi-Platform Bridge
                  </h4>
                  <p className="text-xs text-slate-400 max-w-xl">
                    Outputs pre-formatted, character-constrained responses ready for immediate clipboard paste or direct webhook sync to Google, Zomato, Amazon, and App Stores.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Platform Compliant
                </span>
              </div>
            </GlowCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
