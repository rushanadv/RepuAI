import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, getVariants, EASE } from '../lib/animations';

export default function AnalyticsDashboard() {
  const prefersReduced = useReducedMotion();

  const urgentReviews = [
    {
      platform: 'G',
      user: 'Rahul M.',
      snippet: 'Ordered biryani at 7pm. Arrived at 9:15pm completely cold. Portion was half.'
    },
    {
      platform: 'Z',
      user: 'Kavya L.',
      snippet: 'Received opened box with missing item. No response from support.'
    },
    {
      platform: 'A',
      user: 'DevUser_22',
      snippet: 'App crashes on payment screen for 3 days straight.'
    }
  ];

  const handleReplyClick = (e) => {
    e.preventDefault();
    const demoEl = document.querySelector('#demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const topDefects = [
    { num: "01", name: "Courier & Kitchen Dispatch Latency", count: "78 MENTIONS" },
    { num: "02", name: "Food Temperature & Consistency", count: "45 MENTIONS" },
    { num: "03", name: "Front Desk Hospitality", count: "32 MENTIONS" },
    { num: "04", name: "Portion Size vs. Pricing", count: "28 MENTIONS" },
    { num: "05", name: "Damaged Package Seal", count: "19 MENTIONS" },
  ];

  return (
    <section id="analytics" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section Label */}
        <div className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] uppercase mb-16">
          // 02 — INSIGHTS & TELEMETRY
        </div>

        {/* ================= PART 1: Full-Width Sentiment Breakdown ================= */}
        <div className="mb-24">
          <span className="font-mono text-[11px] text-[var(--text-2)] tracking-[0.1em] uppercase block mb-10">
            SENTIMENT BREAKDOWN // 842 REVIEWS ANALYZED THIS MONTH
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-end">
            
            {/* POSITIVE */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                  POSITIVE
                </span>
                <span className="font-display text-[48px] font-bold text-[var(--text-1)] tracking-[-0.03em] leading-none">
                  58%
                </span>
              </div>
              <div className="w-full h-[2px] bg-white/[0.06]">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "58%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReduced ? 0.01 : 1.2, ease: EASE }}
                  className="h-full bg-emerald-400"
                />
              </div>
            </div>

            {/* NEUTRAL */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  NEUTRAL
                </span>
                <span className="font-display text-[48px] font-bold text-[var(--text-1)] tracking-[-0.03em] leading-none">
                  22%
                </span>
              </div>
              <div className="w-full h-[2px] bg-white/[0.06]">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "22%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReduced ? 0.01 : 1.2, delay: prefersReduced ? 0 : 0.15, ease: EASE }}
                  className="h-full bg-amber-400"
                />
              </div>
            </div>

            {/* NEGATIVE */}
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[11px] text-rose-400 font-bold uppercase tracking-wider">
                  NEGATIVE
                </span>
                <span className="font-display text-[48px] font-bold text-[var(--text-1)] tracking-[-0.03em] leading-none">
                  20%
                </span>
              </div>
              <div className="w-full h-[2px] bg-white/[0.06]">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "20%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: prefersReduced ? 0.01 : 1.2, delay: prefersReduced ? 0 : 0.3, ease: EASE }}
                  className="h-full bg-rose-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ================= PART 2: 2-Column Split (Defect Ranking & Urgent Queue) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start border-t border-[var(--border)] pt-16">
          
          {/* LEFT (7 Cols): Numbered 01-05 Defect Ranking */}
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.15em] uppercase block mb-8">
              DEFECT CLUSTERING RANK // TOP OCCURRENCES
            </span>

            <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
              {topDefects.map((item) => (
                <div key={item.num} className="py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[12px] text-[var(--text-3)] font-bold group-hover:text-purple-400 transition-colors">
                      {item.num}
                    </span>
                    <span className="text-[14px] font-bold text-[var(--text-1)] font-display">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-3)]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT (5 Cols): Needs Attention Urgent Queue */}
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-rose-400 tracking-[0.15em] uppercase flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              NEEDS ATTENTION // CRITICAL ESCALATIONS
            </span>

            <div className="space-y-4">
              {urgentReviews.map((rev, i) => (
                <div 
                  key={i}
                  className="p-4 border border-[var(--border)] rounded-[4px] bg-black/40 flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-[3px] bg-white/[0.06] border border-[var(--border)] font-mono text-[10px] font-bold flex items-center justify-center text-slate-200">
                        {rev.platform}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-slate-300">
                        {rev.user}
                      </span>
                    </div>

                    <a
                      href="#demo"
                      onClick={handleReplyClick}
                      className="font-mono text-[10px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors group"
                    >
                      <span>REPLY NOW</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                        →
                      </span>
                    </a>
                  </div>

                  <p className="text-[12px] text-[var(--text-2)] leading-relaxed italic line-clamp-2">
                    "{rev.snippet}"
                  </p>
                </div>
              ))}
            </div>

            <p className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wider mt-4">
              Auto-escalated based on polarity threshold &lt; 2.0
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
