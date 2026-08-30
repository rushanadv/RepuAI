import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/animations';

const VIEWPORT = { once: true, margin: "-90px" };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

export default function Footer() {
  const prefersReduced = useReducedMotion();

  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)] pt-16 pb-10 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP ROW */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="flex flex-col md:flex-row justify-between items-start gap-12"
        >
          {/* Brand Left */}
          <motion.div variants={fadeUp} className="max-w-sm">
            <h3 className="text-[32px] font-display font-bold tracking-[-0.03em] text-[var(--text-1)] mb-2">
              REPU<span className="text-[var(--accent)]">AI</span>
            </h3>
            <p className="text-[12px] text-[var(--text-2)] leading-relaxed font-normal">
              AI that listens so customers feel heard.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>NODE CLUSTER STATUS: OPERATIONAL</span>
            </div>
          </motion.div>

          {/* 3 Columns Links Right */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 font-mono text-[10px] tracking-[0.1em] uppercase">
            
            {/* Col 1 */}
            <motion.div variants={fadeUp}>
              <span className="text-[var(--text-3)] block mb-4">
                ARCHITECTURE
              </span>
              <ul className="space-y-2.5 text-[var(--text-2)]">
                <li><a href="#features" className="hover:text-[var(--text-1)] transition-colors">CAPABILITIES</a></li>
                <li><a href="#how-it-works" className="hover:text-[var(--text-1)] transition-colors">SEQUENCE</a></li>
                <li><a href="#demo" className="hover:text-[var(--text-1)] transition-colors">LIVE STUDIO</a></li>
              </ul>
            </motion.div>

            {/* Col 2 */}
            <motion.div variants={fadeUp}>
              <span className="text-[var(--text-3)] block mb-4">
                CHANNELS
              </span>
              <ul className="space-y-2.5 text-[var(--text-2)]">
                <li className="hover:text-[var(--text-1)] cursor-pointer transition-colors">GOOGLE REVIEWS</li>
                <li className="hover:text-[var(--text-1)] cursor-pointer transition-colors">ZOMATO / SWIGGY</li>
                <li className="hover:text-[var(--text-1)] cursor-pointer transition-colors">AMAZON STORE</li>
              </ul>
            </motion.div>

            {/* Col 3 */}
            <motion.div variants={fadeUp}>
              <span className="text-[var(--text-3)] block mb-4">
                PLATFORM
              </span>
              <ul className="space-y-2.5 text-[var(--text-2)]">
                <li className="hover:text-[var(--text-1)] cursor-pointer transition-colors">SECURITY (SOC2)</li>
                <li className="hover:text-[var(--text-1)] cursor-pointer transition-colors">API SPECS</li>
                <li className="hover:text-[var(--text-1)] cursor-pointer transition-colors">PRIVACY TERMS</li>
              </ul>
            </motion.div>

          </div>
        </motion.div>

        {/* BOTTOM ROW */}
        <div className="mt-16 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase">
          <p>© 2026 REPUAI TECHNOLOGIES INC.</p>
          <p>AWWWARDS RECONSTRUCTION // STUDIO GRADE</p>
        </div>

      </div>
    </footer>
  );
}
