import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import MagneticButton from './MagneticButton';
import { useCounter } from '../hooks/useCounter';
import { EASE } from '../lib/animations';

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [timeStr, setTimeStr] = useState("");

  // Live GMT+5:30 Clock in Corner
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTimeStr(`${formatted} GMT+5:30`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stat1 = useCounter(2300000);
  const stat2 = useCounter(94);
  const stat3 = useCounter(10);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 52;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const line1 = "NEVER LET A".split(" ");
  const line2 = "REVIEW".split(" ");
  const line3 = "GO UNANSWERED".split(" ");

  return (
    <section className="relative min-h-[100svh] w-full bg-[var(--bg)] flex flex-col justify-center items-center overflow-hidden pt-20 pb-28">
      
      {/* STEP 1: ANIMATED CANVAS BACKGROUND */}
      <HeroCanvas />

      {/* STEP 4: RULER TICK MARKS */}
      <div className="absolute top-[52px] left-0 w-full h-[1px] ruler-ticks pointer-events-none z-10 opacity-40">
        <div className="relative w-full h-full">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
            <span
              key={num}
              style={{ left: `${num * 80}px` }}
              className="absolute -top-3.5 font-mono text-[7px] text-[var(--text-3)] select-none hidden sm:inline-block"
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* STEP 3: CORNER METADATA */}
      {/* Top Left */}
      <div className="absolute top-20 left-6 sm:left-8 font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase pointer-events-none z-10 hidden sm:block">
        <p>V 2.4.1</p>
        <p className="mt-0.5">REPUAI INTELLIGENCE</p>
      </div>

      {/* Top Right */}
      <div className="absolute top-20 right-6 sm:right-8 font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase pointer-events-none z-10 hidden sm:block">
        <p>{timeStr || "00:00:00 GMT+5:30"}</p>
        <p className="mt-0.5 text-right text-emerald-500/80">LATENCY: 1.4s</p>
      </div>

      {/* Bottom Left: Scroll Indicator */}
      <div className="absolute bottom-8 left-6 sm:left-8 font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase flex items-center gap-1.5 z-10">
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
        <span>SCROLL</span>
      </div>

      {/* Bottom Right: Copyright */}
      <div className="absolute bottom-8 right-6 sm:right-8 font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase pointer-events-none z-10">
        © 2026 REPUAI
      </div>

      {/* STEP 5: MAIN HEADLINE (Editorial Stacking) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] mb-6 uppercase"
        >
          AI-POWERED REVIEW INTELLIGENCE
        </motion.div>

        {/* Word-by-Word Mask Reveal Headline */}
        <h1 className="text-[clamp(52px,9vw,120px)] font-display font-bold text-[var(--text-1)] leading-[0.9] tracking-[-0.04em] select-none">
          {/* Line 1 */}
          <div className="block">
            {line1.map((word, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.22em" }} className="align-bottom">
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: prefersReduced ? "0%" : "115%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: prefersReduced ? 0.01 : 0.8,
                    delay: prefersReduced ? 0 : 0.4 + i * 0.065,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 2 (Accent Gradient) */}
          <div className="block my-1 sm:my-2">
            {line2.map((word, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.22em" }} className="align-bottom">
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: prefersReduced ? "0%" : "115%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: prefersReduced ? 0.01 : 0.8,
                    delay: prefersReduced ? 0 : 0.4 + (line1.length + i) * 0.065,
                    ease: EASE,
                  }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-300"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* Line 3 */}
          <div className="block">
            {line3.map((word, i) => (
              <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.22em" }} className="align-bottom">
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: prefersReduced ? "0%" : "115%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: prefersReduced ? 0.01 : 0.8,
                    delay: prefersReduced ? 0 : 0.4 + (line1.length + line2.length + i) * 0.065,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease: EASE }}
          className="mt-8 text-base text-[var(--text-2)] max-w-lg mx-auto font-normal leading-[1.6]"
        >
          RepuAI reads every review, detects what's broken, and drafts the perfect response.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: EASE }}
          className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center w-full sm:w-auto"
        >
          <MagneticButton
            onClick={(e) => handleScrollTo(e, '#demo')}
            className="bg-[var(--accent)] hover:bg-violet-600 text-white px-7 py-3.5 rounded-[6px] font-semibold text-sm tracking-[0.02em] shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <span>Analyze a Review →</span>
          </MagneticButton>

          <a
            href="#how-it-works"
            onClick={(e) => handleScrollTo(e, '#how-it-works')}
            className="border border-[var(--border)] hover:border-[var(--text-3)] text-[var(--text-2)] hover:text-[var(--text-1)] px-7 py-3.5 rounded-[6px] text-sm tracking-[0.02em] transition-colors w-full sm:w-auto text-center font-medium"
          >
            See How It Works
          </a>
        </motion.div>

        {/* STEP 6: STATS ROW */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[var(--border)] w-full max-w-3xl flex flex-wrap justify-between items-center gap-6">
          <div className="flex flex-col text-left">
            <span ref={stat1.ref} className="text-[clamp(26px,2.5vw,36px)] font-bold text-[var(--text-1)] tracking-[-0.03em] leading-tight font-display">
              {(stat1.count / 1000000).toFixed(1)}M+
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase">
              Reviews Analyzed
            </span>
          </div>

          <div className="h-8 w-[1px] bg-[var(--border)] hidden sm:block" />

          <div className="flex flex-col text-left">
            <span ref={stat2.ref} className="text-[clamp(26px,2.5vw,36px)] font-bold text-violet-300 tracking-[-0.03em] leading-tight font-display">
              {stat2.count}%
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase">
              Customer Retention
            </span>
          </div>

          <div className="h-8 w-[1px] bg-[var(--border)] hidden sm:block" />

          <div className="flex flex-col text-left">
            <span ref={stat3.ref} className="text-[clamp(26px,2.5vw,36px)] font-bold text-cyan-300 tracking-[-0.03em] leading-tight font-display">
              {stat3.count}x
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase">
              Resolution Speed
            </span>
          </div>

          <div className="h-8 w-[1px] bg-[var(--border)] hidden sm:block" />

          <div className="flex flex-col text-left">
            <span className="text-[clamp(26px,2.5vw,36px)] font-bold text-emerald-400 tracking-[-0.03em] leading-tight font-display">
              &lt; 2s
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase">
              Neural Latency
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
