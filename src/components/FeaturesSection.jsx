import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GlowCard from './GlowCard';
import { EASE } from '../lib/animations';

export default function FeaturesSection() {
  const prefersReduced = useReducedMotion();

  // Dynamic typing tag cloud for Panel B
  const allTags = [
    { label: "🍕 Cold Food", confidence: "98%" },
    { label: "⏱️ Delivery Delay", confidence: "94%" },
    { label: "👨‍🍳 Staff Hospitality", confidence: "88%" },
    { label: "💰 Value Ratio", confidence: "82%" },
    { label: "📦 Damaged Package", confidence: "91%" },
  ];

  const [visibleTags, setVisibleTags] = useState(allTags.slice(0, 3));

  useEffect(() => {
    let index = 3;
    const interval = setInterval(() => {
      setVisibleTags((prev) => {
        const next = [...prev];
        next.push(allTags[index % allTags.length]);
        if (next.length > 4) next.shift();
        return next;
      });
      index++;
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const scrollingReviews = [
    {
      badge: "POSITIVE",
      color: "border-l-emerald-500 text-emerald-400",
      text: "The truffle pasta was exceptional and service was remarkably fast."
    },
    {
      badge: "SARCASM / NEGATIVE",
      color: "border-l-amber-500 text-amber-400",
      text: "Loved waiting 50 minutes for cold soup. Truly a memorable night."
    },
    {
      badge: "HIGH RISK",
      color: "border-l-rose-500 text-rose-400",
      text: "Found broken glass in the salad. Manager refused to speak with us."
    },
    // duplicated for seamless infinite scroll
    {
      badge: "POSITIVE",
      color: "border-l-emerald-500 text-emerald-400",
      text: "The truffle pasta was exceptional and service was remarkably fast."
    },
    {
      badge: "SARCASM / NEGATIVE",
      color: "border-l-amber-500 text-amber-400",
      text: "Loved waiting 50 minutes for cold soup. Truly a memorable night."
    },
    {
      badge: "HIGH RISK",
      color: "border-l-rose-500 text-rose-400",
      text: "Found broken glass in the salad. Manager refused to speak with us."
    },
  ];

  return (
    <section id="features" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Top Label */}
        <div className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] uppercase mb-16">
          // CAPABILITY MATRIX — 04 CORE ENGINES
        </div>

        {/* Asymmetric Hairline Grid */}
        <div className="bg-[var(--border)] p-[1px] rounded-[6px] grid grid-cols-1 lg:grid-cols-12 gap-[1px]">
          
          {/* ================= PANEL A: Large Left (7 Cols, 2 Rows) ================= */}
          <div className="lg:col-span-7 bg-[var(--bg-2)] flex flex-col justify-between overflow-hidden">
            <GlowCard className="p-8 sm:p-12 h-full flex flex-col justify-between">
              <div>
                <span className="font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-3">
                  01 // REALTIME_SEMANTIC_RADAR
                </span>

                <h3 className="text-[clamp(24px,2.5vw,36px)] font-display font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight mb-4">
                  Instant Sentiment Analysis
                </h3>

                <p className="text-[14px] text-[var(--text-2)] leading-relaxed max-w-md font-normal mb-8">
                  Deconstructs emotional polarity and sub-surface sarcasm beneath polite customer remarks in single-digit milliseconds.
                </p>
              </div>

              {/* LIVE DEMO: Upward Scrolling Review Stream */}
              <div className="mt-4 pt-6 border-t border-[var(--border)]">
                <span className="font-mono text-[9px] text-[var(--text-3)] tracking-wider uppercase block mb-3">
                  LIVE INGESTION BUFFER
                </span>
                
                <div className="h-[160px] overflow-hidden relative">
                  <div className="animate-scroll-up space-y-2.5">
                    {scrollingReviews.map((rev, i) => (
                      <div
                        key={i}
                        className={`p-3 bg-black/40 border border-white/[0.04] border-l-2 ${rev.color} rounded-[4px]`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[9px] font-bold tracking-wider uppercase">
                            {rev.badge}
                          </span>
                          <span className="font-mono text-[8px] text-[var(--text-3)]">INGESTED 1.2s AGO</span>
                        </div>
                        <p className="text-[12px] text-slate-300 line-clamp-1 italic">
                          "{rev.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>

          {/* ================= RIGHT COLUMN (5 Cols, 2 Rows Stacked) ================= */}
          <div className="lg:col-span-5 grid grid-rows-2 gap-[1px] bg-[var(--border)]">
            
            {/* PANEL B: Top Right (Smart Issue Tagging) */}
            <div className="bg-[var(--bg-2)] overflow-hidden">
              <GlowCard className="p-8 sm:p-10 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-2">
                    02 // ZERO_CONFIG_TAXONOMY
                  </span>

                  <h3 className="text-[20px] sm:text-[22px] font-display font-bold text-[var(--text-1)] mb-2">
                    Smart Issue Tagging
                  </h3>

                  <p className="text-[12px] text-[var(--text-2)] leading-relaxed font-normal mb-5">
                    Clusters recurring failure modes without rigid manual keyword maintenance.
                  </p>
                </div>

                {/* Dynamic Typing Tag Visual */}
                <div className="space-y-1.5 font-mono text-[11px]">
                  {visibleTags.map((tag, i) => (
                    <motion.div
                      key={tag.label + i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-between p-2 rounded-[4px] bg-black/40 border border-[var(--border)]"
                    >
                      <span className="text-slate-200">{tag.label}</span>
                      <span className="text-purple-400 text-[10px]">{tag.confidence}</span>
                    </motion.div>
                  ))}
                </div>
              </GlowCard>
            </div>

            {/* PANEL C: Bottom Right (Urgency Flagging) */}
            <div className="bg-[var(--bg-2)] overflow-hidden">
              <GlowCard className="p-8 sm:p-10 h-full flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-2">
                    03 // ESCALATION_SLO
                  </span>

                  <h3 className="text-[20px] sm:text-[22px] font-display font-bold text-[var(--text-1)] mb-2">
                    Urgency Flagging
                  </h3>

                  <p className="text-[12px] text-[var(--text-2)] leading-relaxed font-normal mb-5">
                    Isolates critical brand damage before reviews compound publicly.
                  </p>
                </div>

                {/* Minimal Alert UI */}
                <div className="p-3.5 rounded-[4px] border border-rose-500/30 bg-rose-500/[0.04]">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-rose-300 font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    <span>HIGH PRIORITY — Refund demand detected</span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">
                    Leadership SMS alert triggered in 1.4s
                  </p>
                </div>
              </GlowCard>
            </div>

          </div>

          {/* ================= PANEL D: Full Width Bottom (Pattern Detection) ================= */}
          <div className="lg:col-span-12 bg-[var(--bg-2)] overflow-hidden">
            <GlowCard className="p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-5">
                  <span className="font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-2">
                    04 // MACRO_CLUSTERING
                  </span>

                  <h3 className="text-[clamp(22px,2vw,30px)] font-display font-bold text-[var(--text-1)] tracking-[-0.02em] mb-3">
                    Pattern Detection Across 100+ Reviews
                  </h3>

                  <p className="text-[13px] text-[var(--text-2)] leading-relaxed font-normal max-w-sm">
                    Surfaces root-cause operational blindspots so founders fix the kitchen line rather than repeatedly issuing isolated apologies.
                  </p>
                </div>

                {/* Horizontal Minimal Hairline Bar Chart */}
                <div className="lg:col-span-7 space-y-4 font-mono text-[11px]">
                  
                  {/* Row 1 */}
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1.5">
                      <span>Kitchen Dispatch Delay</span>
                      <span className="text-purple-400 font-bold">78%</span>
                    </div>
                    <div className="w-full h-[2px] bg-white/[0.06]">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "78%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.1, ease: EASE }}
                        className="h-full bg-[var(--accent)]"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1.5">
                      <span>Food Temperature Consistency</span>
                      <span className="text-purple-400 font-bold">45%</span>
                    </div>
                    <div className="w-full h-[2px] bg-white/[0.06]">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "45%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.1, delay: prefersReduced ? 0 : 0.1, ease: EASE }}
                        className="h-full bg-violet-400"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1.5">
                      <span>Front Desk Service & Hospitality</span>
                      <span className="text-purple-400 font-bold">23%</span>
                    </div>
                    <div className="w-full h-[2px] bg-white/[0.06]">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "23%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.1, delay: prefersReduced ? 0 : 0.2, ease: EASE }}
                        className="h-full bg-cyan-400"
                      />
                    </div>
                  </div>

                </div>

              </div>
            </GlowCard>
          </div>

        </div>

      </div>
    </section>
  );
}
