import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { clipWipe, getVariants } from '../lib/animations';

export default function HowItWorks() {
  const prefersReduced = useReducedMotion();

  const steps = [
    {
      num: "01",
      title: "Universal Ingestion",
      desc: "Captures public feedback via webhooks the millisecond a review appears on Google, Zomato, or App Store."
    },
    {
      num: "02",
      title: "Neural Diagnostics",
      desc: "Meta LLaMA 3.3 and Nemotron engines parse sub-surface sarcasm, sentiment polarity, and operational defects."
    },
    {
      num: "03",
      title: "Crisis Triage",
      desc: "High-risk 1-star escalations and refund demands trigger immediate SMS and Slack notifications to leadership."
    },
    {
      num: "04",
      title: "Owner Synthesis",
      desc: "Drafts empathetic, context-aware responses addressing specific details without robotic 'inconvenience' clichés."
    }
  ];

  return (
    <section id="how-it-works" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Top Label */}
        <div className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] uppercase mb-16">
          // HOW IT WORKS — STAGE SEQUENCE
        </div>

        {/* Full-Width Stacked Film-Credit Style Rows */}
        <div className="border-t border-[var(--border)]">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={getVariants(clipWipe, prefersReduced)}
              custom={idx}
              className="py-8 sm:py-12 border-b border-[var(--border)] grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center group transition-colors hover:bg-white/[0.01]"
            >
              {/* LEFT: Large Space Mono Step Number */}
              <div className="md:col-span-2 font-mono text-[clamp(40px,5vw,68px)] font-bold text-[var(--text-3)] leading-none select-none group-hover:text-purple-400/60 transition-colors">
                {step.num}
              </div>

              {/* CENTER: Display Type Step Title */}
              <div className="md:col-span-6">
                <h3 className="text-[clamp(24px,3vw,38px)] font-display font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight">
                  {step.title}
                </h3>
              </div>

              {/* RIGHT: Step Description */}
              <div className="md:col-span-4">
                <p className="text-[13px] text-[var(--text-2)] leading-[1.7] max-w-xs font-normal">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
