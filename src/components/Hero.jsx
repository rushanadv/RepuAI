import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ConstellationCanvas from './ConstellationCanvas';
import DotBorderButton from './ui/DotBorderButton';
import { useCounter } from '../hooks/useCounter';
import { EASE } from '../lib/animations';

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [timeStr, setTimeStr] = useState("");

  // Parallax scroll transforms for cinematic text rise
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 500], [0, -80]);
  const subY = useTransform(scrollY, [0, 500], [0, -40]);
  const opacityOut = useTransform(scrollY, [0, 350], [1, 0]);

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
    <section className="relative min-h-[100svh] w-full bg-[var(--bg)] flex flex-col justify-center items-center overflow-hidden pt-20 pb-24">
      
      {/* JOB 1: CONSTELLATION CANVAS */}
      <ConstellationCanvas />

      {/* HERO GRID OVERLAY */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* RADIAL VIGNETTE */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(8,8,8,0.6) 100%)",
        }}
      />

      {/* RULER TICK MARKS */}
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

      {/* CORNER METADATA */}
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


      {/* FLOATING REVIEW CARDS (DESKTOP ONLY) */}
      {/* Card 1: Positive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { delay: 1.8, duration: 0.6 },
          scale: { delay: 1.8, duration: 0.6 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ borderLeft: "2px solid #22c55e" }}
        className="hidden lg:block absolute top-[22%] left-[5%] w-[220px] p-3.5 rounded-[8px] bg-white/[0.03] border border-white/[0.07] backdrop-blur-md pointer-events-none z-10 shadow-xl"
      >
        <div className="text-[11px] text-amber-400 mb-1">⭐⭐⭐⭐⭐</div>
        <p className="text-[11px] text-[var(--text-2)] line-clamp-2 leading-relaxed italic mb-1.5">
          "Amazing food, will come back!"
        </p>
        <span className="font-mono text-[9px] text-[var(--text-3)] block">— Priya S.</span>
      </motion.div>

      {/* Card 2: Negative */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: 2.0, duration: 0.6 },
          scale: { delay: 2.0, duration: 0.6 },
          y: { duration: 7, delay: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ borderLeft: "2px solid #ef4444" }}
        className="hidden lg:block absolute top-[18%] right-[5%] w-[220px] p-3.5 rounded-[8px] bg-white/[0.03] border border-white/[0.07] backdrop-blur-md pointer-events-none z-10 shadow-xl"
      >
        <div className="text-[11px] text-amber-400 mb-1">⭐</div>
        <p className="text-[11px] text-[var(--text-2)] line-clamp-2 leading-relaxed italic mb-1.5">
          "Waited 45 mins, cold food."
        </p>
        <span className="font-mono text-[9px] text-[var(--text-3)] block">— Rahul M.</span>
      </motion.div>

      {/* Card 3: Neutral */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { delay: 2.2, duration: 0.6 },
          scale: { delay: 2.2, duration: 0.6 },
          y: { duration: 6, delay: 0.5, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ borderLeft: "2px solid #f59e0b" }}
        className="hidden lg:block absolute bottom-[26%] left-[7%] w-[220px] p-3.5 rounded-[8px] bg-white/[0.03] border border-white/[0.07] backdrop-blur-md pointer-events-none z-10 shadow-xl"
      >
        <div className="text-[11px] text-amber-400 mb-1">⭐⭐⭐</div>
        <p className="text-[11px] text-[var(--text-2)] line-clamp-2 leading-relaxed italic mb-1.5">
          "Average, could be better."
        </p>
        <span className="font-mono text-[9px] text-[var(--text-3)] block">— Ankit R.</span>
      </motion.div>


      {/* ================= HERO CENTER CONTENT WITH PARALLAX ================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* PARALLAX HEADLINE BLOCK */}
        <motion.div style={{ y: headlineY, opacity: opacityOut }} className="flex flex-col items-center">
          
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

            {/* Line 2: "REVIEW" ACCENT WORD DRAMA WITH GLOW HALO */}
            <div className="block my-1 sm:my-2 relative inline-block">
              {/* Pulsing Glow Halo Behind "REVIEW" */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(124,58,237,0.3) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />

              {line2.map((word, i) => (
                <span key={i} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.22em" }} className="align-bottom">
                  <motion.span
                    style={{ 
                      display: "inline-block",
                      letterSpacing: "-0.05em",
                      textShadow: "0 0 80px rgba(124,58,237,0.6), 0 0 160px rgba(124,58,237,0.2)",
                      backgroundImage: "linear-gradient(135deg, #a855f7, #7c3aed, #6d28d9)",
                    }}
                    initial={{ y: prefersReduced ? "0%" : "115%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: prefersReduced ? 0.01 : 0.8,
                      delay: prefersReduced ? 0 : 0.4 + (line1.length + i) * 0.065,
                      ease: EASE,
                    }}
                    className="text-transparent bg-clip-text"
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

        </motion.div>

        {/* PARALLAX SUBHEADLINE & BUTTONS BLOCK */}
        <motion.div style={{ y: subY, opacity: opacityOut }} className="flex flex-col items-center">
          
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
            className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
          >
            {/* JOB 2: DOT BORDER BUTTON FOR PRIMARY CTA */}
            <div className="dbb-wrapper flex justify-center">
              <DotBorderButton onClick={(e) => handleScrollTo(e, '#demo')}>
                Analyze a Review
              </DotBorderButton>
            </div>

            {/* GHOST SECONDARY BUTTON WITH ANIMATED DOWN ARROW */}
            <a
              href="#how-it-works"
              onClick={(e) => handleScrollTo(e, '#how-it-works')}
              className="group text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.85)] px-7 py-3.5 text-sm tracking-[0.02em] font-medium transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>See How It Works</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </motion.div>

        </motion.div>


        {/* STATS ROW WITH INDIVIDUAL ACCENT COLORS */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[var(--border)] w-full max-w-3xl flex flex-wrap justify-between items-center gap-6">
          
          {/* Stat 1: Authoritative White (#f0f0f0) */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: 0, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col text-left"
          >
            <span ref={stat1.ref} style={{ color: "#f0f0f0", letterSpacing: "-0.04em" }} className="text-[clamp(36px,4vw,52px)] font-bold tracking-[-0.04em] leading-tight font-display">
              {(stat1.count / 1000000).toFixed(1)}M+
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#f0f0f0]" />
              <span>Reviews Analyzed</span>
            </span>
          </motion.div>

          <div className="h-8 w-[1px] bg-[var(--border)] hidden sm:block" />

          {/* Stat 2: Positive Green (#22c55e) */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col text-left"
          >
            <span ref={stat2.ref} style={{ color: "#22c55e", letterSpacing: "-0.04em" }} className="text-[clamp(36px,4vw,52px)] font-bold tracking-[-0.04em] leading-tight font-display">
              {stat2.count}%
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#22c55e]" />
              <span>Customer Retention</span>
            </span>
          </motion.div>

          <div className="h-8 w-[1px] bg-[var(--border)] hidden sm:block" />

          {/* Stat 3: Purple Accent (#7c3aed) */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col text-left"
          >
            <span ref={stat3.ref} style={{ color: "#7c3aed", letterSpacing: "-0.04em" }} className="text-[clamp(36px,4vw,52px)] font-bold tracking-[-0.04em] leading-tight font-display">
              {stat3.count}x
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#7c3aed]" />
              <span>Resolution Speed</span>
            </span>
          </motion.div>

          <div className="h-8 w-[1px] bg-[var(--border)] hidden sm:block" />

          {/* Stat 4: Cyan Technical (#06b6d4) */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col text-left"
          >
            <span style={{ color: "#06b6d4", letterSpacing: "-0.04em" }} className="text-[clamp(36px,4vw,52px)] font-bold tracking-[-0.04em] leading-tight font-display">
              &lt; 2s
            </span>
            <span className="font-mono text-[9px] text-[var(--text-2)] tracking-[0.1em] mt-1 uppercase flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#06b6d4]" />
              <span>Neural Latency</span>
            </span>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
