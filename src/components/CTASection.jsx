import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { fadeUp } from '../lib/animations';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const headlineRow1 = "Never lose another customer".split(" ");
  const headlineRow2 = "to silence.".split(" ");

  return (
    <section className="relative py-36 px-4 sm:px-6 overflow-hidden border-t border-white/[0.06] bg-[#050508]">
      
      {/* Breathing Ambient Backlighting */}
      <motion.div 
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] rounded-full pointer-events-none blur-[160px]"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, rgba(6, 182, 212, 0.07) 50%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono font-semibold text-slate-300 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>EARLY ACCESS INVITATION</span>
        </motion.div>

        {/* Word-by-Word Mask Reveal Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-[-0.04em] leading-[0.98] select-none">
          <span className="block mb-2">
            {headlineRow1.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>

          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-violet-300">
            {headlineRow2.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: (headlineRow1.length + i) * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h2>

        {/* Short Copy */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-normal"
        >
          Join forward-thinking founders and operators protecting customer goodwill on autopilot.
        </motion.p>

        {/* Email Capture Form & AnimatePresence Success Message */}
        <div className="mt-10 max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-2 items-stretch"
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
                  className="flex-1 bg-black/60 border border-white/[0.1] px-4 py-3.5 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all shadow-inner font-sans"
                />
                <MagneticButton
                  type="submit"
                  className="btn-primary px-6 py-3.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Early Access</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2.5 text-sm font-semibold shadow-inner"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>You're on the priority queue! We'll reach out shortly 🎉</span>
              </motion.div>
            )}
          </AnimatePresence>

          {errorMsg && (
            <p className="mt-2 text-xs text-rose-400 font-medium font-mono">{errorMsg}</p>
          )}

          <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>🔒 Enterprise encrypted</span>
            <span>•</span>
            <span>No credit card required</span>
          </div>
        </div>

      </div>
    </section>
  );
}
