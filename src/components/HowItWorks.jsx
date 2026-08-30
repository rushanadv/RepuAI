import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/animations';

const VIEWPORT = { once: true, margin: "-90px" };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

const clipWipe = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: (i) => ({
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.85, delay: i * 0.12, ease: EASE }
  })
};

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
        
        {/* Section Top Label with Growing Left Border Accent */}
        <div className="relative pl-3 mb-16">
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-0 w-[2px] h-full bg-[var(--accent)]"
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] uppercase"
          >
            HOW IT WORKS — STAGE SEQUENCE
          </motion.p>
        </div>

        {/* Full-Width Stacked Film-Credit Style Rows */}
        <div className="border-t border-[var(--border)]">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              custom={idx}
              variants={clipWipe}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="py-8 sm:py-12 border-b border-[var(--border)] grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center group transition-colors hover:bg-white/[0.01] cursor-default"
            >
              {/* LEFT: Large Space Mono Step Number */}
              <div className="md:col-span-2 font-mono text-[clamp(40px,5vw,68px)] font-bold text-[var(--text-3)] leading-none select-none opacity-40 group-hover:opacity-90 group-hover:text-purple-400 transition-all duration-300">
                {step.num}
              </div>

              {/* CENTER: Display Type Step Title with Y-Float */}
              <div className="md:col-span-6 flex items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.6, delay: idx * 0.12 + 0.3, ease: EASE }}
                  className="text-[clamp(24px,3vw,38px)] font-display font-bold text-[var(--text-1)] tracking-[-0.02em] leading-tight"
                >
                  {step.title}
                </motion.span>
                <span className="font-mono text-base text-[var(--text-3)] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
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
