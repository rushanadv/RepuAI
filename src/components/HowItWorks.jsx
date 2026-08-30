import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Inbox, 
  Brain, 
  AlertTriangle, 
  PenTool, 
  Radio, 
  ChevronRight
} from 'lucide-react';
import { slideLeft, getVariants } from '../lib/animations';
import GlowCard from './GlowCard';

export default function HowItWorks() {
  const prefersReduced = useReducedMotion();

  const steps = [
    {
      id: 0,
      code: '01',
      title: 'Universal Ingestion',
      category: 'Real-Time Edge Webhooks',
      desc: 'Captured via Google, Zomato, Amazon & App Store webhooks the millisecond a review is published.',
      icon: Inbox,
      iconColor: 'text-cyan-400',
      tag: '0ms Queue Latency'
    },
    {
      id: 1,
      code: '02',
      title: 'Neural Diagnostics',
      category: 'Semantic Parsing',
      desc: 'Meta LLaMA 3.3 and Nemotron engines parse sarcasm, tone, and cluster operational failure modes.',
      icon: Brain,
      iconColor: 'text-violet-400',
      tag: '550B Token Matrix'
    },
    {
      id: 2,
      code: '03',
      title: 'Crisis Triage',
      category: 'Severity Escalation',
      desc: 'High-risk 1-star ratings and chargeback threats trigger instant priority routing to store leadership.',
      icon: AlertTriangle,
      iconColor: 'text-rose-400',
      tag: 'SLO: 10s Alert'
    },
    {
      id: 3,
      code: '04',
      title: 'Owner Synthesis',
      category: 'Contextual Generation',
      desc: 'Synthesizes empathetic, owner-grade resolutions addressing specific customer details without robotic clichés.',
      icon: PenTool,
      iconColor: 'text-emerald-400',
      tag: '1-Click Multi-Publish'
    },
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-4 sm:px-6 bg-[#050508] overflow-hidden border-t border-white/[0.05]">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none blur-[160px]"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.09) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={getVariants(slideLeft, prefersReduced)}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono font-semibold text-violet-400 mb-6">
            <Radio className="w-3.5 h-3.5" />
            <span>ARCHITECTURE // HORIZONTAL_PIPELINE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-[-0.04em] leading-[0.95]">
            Four autonomous beats. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-violet-300">
              Zero manual friction.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            From raw customer complaint to published brand resolution in under two seconds.
          </p>
        </motion.div>

        {/* Horizontal Scroll Reveal Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative items-stretch">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: prefersReduced ? 0 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: prefersReduced ? 0.01 : 0.7, delay: prefersReduced ? 0 : idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="h-full relative"
              >
                <GlowCard className="hairline-card p-6 rounded-2xl h-full flex flex-col justify-between group shadow-xl">
                  <div>
                    {/* Top Row: Wiggle Badge & Step Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <motion.span 
                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
                        className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-mono font-bold text-white flex items-center justify-center cursor-pointer shadow-inner"
                      >
                        {step.code}
                      </motion.span>
                      
                      <div className={`w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center ${step.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      {step.category}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2.5">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-violet-400">{step.tag}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:translate-x-1 group-hover:text-violet-400 transition-all" />
                  </div>
                </GlowCard>

                {/* Connecting Laser Arrow (Visible between cards on desktop) */}
                {idx < 3 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: prefersReduced ? 0.01 : 0.6, delay: prefersReduced ? 0 : 0.1 + idx * 0.12, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                    className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-[1.5px] bg-gradient-to-r from-violet-500 to-cyan-400 z-20 pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
