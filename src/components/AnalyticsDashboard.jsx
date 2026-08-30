import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Star, 
  CheckCircle2, 
  BarChart2
} from 'lucide-react';
import { slideLeft, slideRight, getVariants } from '../lib/animations';
import GlowCard from './GlowCard';

export default function AnalyticsDashboard() {
  const prefersReduced = useReducedMotion();

  const urgentReviews = [
    {
      platform: 'G',
      platformBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      user: 'Rahul M.',
      stars: 1,
      snippet: 'Ordered biryani at 7pm. It arrived at 9:15pm completely cold and portion was half...',
    },
    {
      platform: 'Z',
      platformBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
      user: 'Kavya L.',
      stars: 1,
      snippet: 'Received a damaged product. The box was opened and one item was missing...',
    },
    {
      platform: 'A',
      platformBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      user: 'DevUser_22',
      stars: 1,
      snippet: 'App crashes every single time I try to open the payment screen for 3 days...',
    },
  ];

  const handleReplyClick = (e, snippet) => {
    e.preventDefault();
    const demoEl = document.querySelector('#demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="analytics" className="relative py-32 px-4 sm:px-6 bg-[#06060a] border-t border-white/[0.05] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={getVariants(slideLeft, prefersReduced)}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-semibold text-cyan-400 mb-6">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>OPERATIONAL TELEMETRY // REALTIME_ANALYTICS</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-[-0.04em] leading-[0.95]">
            Telemetry & root-cause <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-300">
              intelligence across locations.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            Real-time cluster tracking, risk score alerts, and continuous brand sentiment index.
          </p>
        </motion.div>

        {/* 2x2 Command Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* CARD 1: Top-left (slideLeft) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={getVariants(slideLeft, prefersReduced)}
            custom={0}
          >
            <GlowCard className="hairline-card p-7 rounded-2xl flex flex-col justify-between shadow-xl h-full">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Sentiment Distribution
                    </h3>
                    <span className="text-xs text-slate-400">Monthly Aggregation (842 Reviews)</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    +8.4% MoM
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Positive */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5 font-mono">
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Positive
                      </span>
                      <span className="text-white font-bold">58%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "58%" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.2, delay: prefersReduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-emerald-500 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Neutral */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5 font-mono">
                      <span className="text-amber-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Neutral
                      </span>
                      <span className="text-white font-bold">22%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "22%" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.2, delay: prefersReduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-amber-400 rounded-full" 
                      />
                    </div>
                  </div>

                  {/* Negative */}
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5 font-mono">
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Negative
                      </span>
                      <span className="text-white font-bold">20%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        whileInView={{ width: "20%" }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: prefersReduced ? 0.01 : 1.2, delay: prefersReduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-rose-500 rounded-full" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
                <span>Overall Brand Index: <strong className="text-emerald-400 font-mono font-bold">7.4 / 10</strong></span>
                <span className="text-slate-500 font-mono text-[11px]">Synced with Google & Zomato</span>
              </p>
            </GlowCard>
          </motion.div>


          {/* CARD 2: Top-right (slideRight) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={getVariants(slideRight, prefersReduced)}
            custom={0.1}
          >
            <GlowCard className="hairline-card p-7 rounded-2xl flex flex-col justify-between shadow-xl h-full">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Defect Clustering Rank
                    </h3>
                    <span className="text-xs text-slate-400">By Recurring Entity Frequency</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    Top 5 Issues
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded bg-rose-500/20 text-[10px] text-rose-300 font-mono font-bold flex items-center justify-center">01</span>
                      <span className="text-xs font-medium text-slate-200">Wait & Courier Latency</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-mono text-[11px] font-semibold border border-rose-500/20">
                      78 mentions
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded bg-amber-500/20 text-[10px] text-amber-300 font-mono font-bold flex items-center justify-center">02</span>
                      <span className="text-xs font-medium text-slate-200">Food Temperature & Consistency</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-mono text-[11px] font-semibold border border-orange-500/20">
                      45 mentions
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded bg-amber-500/20 text-[10px] text-amber-300 font-mono font-bold flex items-center justify-center">03</span>
                      <span className="text-xs font-medium text-slate-200">Front Desk & Staff Attitude</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[11px] font-semibold border border-amber-500/20">
                      32 mentions
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded bg-white/10 text-[10px] text-slate-300 font-mono font-bold flex items-center justify-center">04</span>
                      <span className="text-xs font-medium text-slate-200">Value vs. Price Ratio</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[11px] font-semibold">
                      28 mentions
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded bg-white/10 text-[10px] text-slate-300 font-mono font-bold flex items-center justify-center">05</span>
                      <span className="text-xs font-medium text-slate-200">Packaging Integrity</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[11px] font-semibold">
                      19 mentions
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-slate-400 text-right font-mono">
                Auto-clustered via embeddings
              </p>
            </GlowCard>
          </motion.div>


          {/* CARD 3: Bottom-left (slideLeft) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={getVariants(slideLeft, prefersReduced)}
            custom={0.2}
          >
            <GlowCard className="hairline-card p-7 rounded-2xl flex flex-col justify-between shadow-xl h-full">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      Critical Escalation Queue
                    </h3>
                    <span className="text-xs text-slate-400">Reviews requiring immediate founder resolution</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 font-mono font-bold border border-rose-500/30">
                    3 Open
                  </span>
                </div>

                <div className="space-y-2.5 mt-4">
                  {urgentReviews.map((rev, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-xl bg-black/40 border border-white/[0.05] hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-md ${rev.platformBg} border font-bold text-[11px] font-mono flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          {rev.platform}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-white">{rev.user}</span>
                            <span className="flex text-rose-500 text-xs">
                              <Star className="w-2.5 h-2.5 fill-current" />
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-1 max-w-xs font-normal">
                            "{rev.snippet}"
                          </p>
                        </div>
                      </div>

                      <a
                        href="#demo"
                        onClick={(e) => handleReplyClick(e, rev.snippet)}
                        className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 self-end sm:self-center flex-shrink-0 transition-colors"
                      >
                        <span>Draft Reply</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-slate-500 text-center font-mono">
                Auto-escalated based on severity & sentiment threshold
              </p>
            </GlowCard>
          </motion.div>


          {/* CARD 4: Bottom-right (slideRight) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={getVariants(slideRight, prefersReduced)}
            custom={0.3}
          >
            <GlowCard className="hairline-card p-7 rounded-2xl flex flex-col justify-between shadow-xl h-full">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Weekly Resolution Telemetry
                    </h3>
                    <span className="text-xs text-slate-400">Past 7 Days Snapshot</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Healthy
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Stat 1 */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">TOTAL REVIEWS</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-white font-mono">247</span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center font-mono">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
                      </span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">AVG STAR RATING</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-amber-400 font-mono">3.8</span>
                      <span className="text-xs font-semibold text-slate-500 font-mono">
                        Stable
                      </span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">AI DRAFTED</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-violet-300 font-mono">189</span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center font-mono">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +34%
                      </span>
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">URGENT RESOLVED</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-extrabold text-rose-400 font-mono">23</span>
                      <span className="text-xs font-semibold text-rose-400 font-mono">
                        100% SLA
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Neural Sync Active
                </span>
                <span className="font-mono text-[11px] text-slate-500">Updated 4m ago</span>
              </div>
            </GlowCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
