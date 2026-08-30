import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { EASE } from '../lib/animations';

export default function CTASection() {
  const prefersReduced = useReducedMotion();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('PLEASE ENTER A VALID BUSINESS EMAIL.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const line1 = "Start Responding".split(" ");
  const line2 = "Smarter Today.".split(" ");

  return (
    <section className="relative min-h-[100svh] w-full bg-[var(--bg)] border-t border-[var(--border)] flex flex-col justify-center items-center px-6 sm:px-8 overflow-hidden py-24">
      
      {/* Giant Watermark 01 Behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold text-[clamp(200px,28vw,420px)] text-white/[0.018] select-none pointer-events-none z-0 leading-none">
        01
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Metadata */}
        <div className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] uppercase mb-8">
          // 03 — EDITORIAL FINALE
        </div>

        {/* Word-by-Word Reveal Headline */}
        <h2 className="text-[clamp(48px,7vw,100px)] font-display font-bold text-[var(--text-1)] tracking-[-0.04em] leading-[0.92] select-none">
          {/* Line 1 */}
          <div className="block">
            {line1.map((word, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.22em" }} className="align-bottom">
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: prefersReduced ? "0%" : "115%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: prefersReduced ? 0.01 : 0.7,
                    delay: prefersReduced ? 0 : i * 0.05,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 2 (Accent Gradient on Today.) */}
          <div className="block mt-2">
            {line2.map((word, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.22em" }} className="align-bottom">
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: prefersReduced ? "0%" : "115%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: prefersReduced ? 0.01 : 0.7,
                    delay: prefersReduced ? 0 : (line1.length + i) * 0.05,
                    ease: EASE,
                  }}
                  className={i === line2.length - 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-300" : ""}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </h2>

        {/* Subtext */}
        <p className="font-mono text-[11px] text-[var(--text-2)] tracking-wider uppercase mt-8">
          Join 500+ businesses. No credit card required.
        </p>

        {/* Email Capture & AnimatePresence Success */}
        <div className="mt-12 w-full max-w-md">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="founder@business.com"
                  required
                  className="w-full sm:w-[280px] bg-transparent border-0 border-b border-[var(--border)] focus:border-b-[var(--accent)] text-[var(--text-1)] placeholder-[var(--text-3)] py-3.5 px-1 text-sm font-sans focus:outline-none transition-colors"
                />

                <MagneticButton
                  onClick={handleSubmit}
                  className="bg-[var(--accent)] hover:bg-violet-600 text-white font-mono text-[11px] font-bold tracking-[0.06em] uppercase px-6 py-3.5 rounded-[4px] shadow-lg transition-colors whitespace-nowrap cursor-pointer w-full sm:w-auto"
                >
                  JOIN WAITLIST →
                </MagneticButton>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-4 rounded-[4px] border border-emerald-500/30 bg-emerald-500/[0.05] text-emerald-400 font-mono text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>PRIORITY ACCESS GRANTED. WE WILL BE IN TOUCH.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {errorMsg && (
            <p className="font-mono text-[10px] text-rose-400 mt-2 text-center">
              {errorMsg}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
