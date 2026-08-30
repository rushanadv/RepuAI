import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { slideLeft, containerVariants, itemVariants, getVariants } from '../lib/animations';

export default function ProblemSection() {
  const prefersReduced = useReducedMotion();

  const problems = [
    {
      title: "The 72-Hour Response Void",
      body: "Unanswered 1-star reviews linger on Google Maps and food delivery apps for days. Every passing hour costs potential new customers who silently choose competitors."
    },
    {
      title: "Generic Apology Fatigue",
      body: "Copy-pasting 'We apologize for any inconvenience' infuriates already upset customers. Generic robotic templates make your brand look careless and indifferent."
    },
    {
      title: "Unseen Operational Defects",
      body: "Individual store managers read reviews in isolation. No one connects the dots that 5 different locations experienced kitchen dispatch delays during dinner rushes."
    }
  ];

  return (
    <section className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN (60% -> 7 Cols): Giant 01 & Editorial Headline */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={getVariants(slideLeft, prefersReduced)}
            className="lg:col-span-7 relative"
          >
            <div className="font-mono text-[100px] sm:text-[130px] font-bold text-[var(--text-3)] leading-[0.8] select-none opacity-40 -ml-1 sm:-ml-2">
              01
            </div>

            <h2 className="text-[clamp(32px,4.5vw,56px)] font-display font-bold text-[var(--text-1)] tracking-[-0.03em] leading-[1.02] mt-4 max-w-xl">
              Reviews Are Killing Your Reputation.
            </h2>

            <p className="mt-6 text-sm text-[var(--text-2)] font-mono tracking-wide uppercase max-w-md">
              // SILENT CUSTOMER ATTRITION IN NUMBERS
            </p>
          </motion.div>

          {/* RIGHT COLUMN (40% -> 5 Cols): 3 Stacked Problem Statements with Stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 space-y-8 pt-4 lg:pt-8"
          >
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="pt-5 border-t border-[var(--border)]"
              >
                <h3 className="text-[14px] font-bold text-[var(--text-1)] mb-2 font-display">
                  {problem.title}
                </h3>
                <p className="text-[13px] text-[var(--text-2)] leading-[1.7] font-normal">
                  {problem.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
