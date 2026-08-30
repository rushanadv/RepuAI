import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 40);
    });
  }, [scrollY]);

  const navLinks = [
    { name: 'FEATURES', href: '#features' },
    { name: 'WORKFLOW', href: '#how-it-works' },
    { name: 'DEMO', href: '#demo' },
    { name: 'ANALYTICS', href: '#analytics' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const marqueeText = "SENTIMENT ANALYSIS — REVIEW INTELLIGENCE — PATTERN DETECTION — RESPONSE DRAFTING — ";

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(8, 8, 8, 0.92)" : "rgba(8, 8, 8, 0)",
        borderBottomColor: scrolled ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-[52px] px-6 sm:px-8 border-b border-transparent flex items-center justify-between pointer-events-auto"
    >
      {/* LEFT CLUSTER */}
      <div className="flex items-center gap-4 sm:gap-6 z-20">
        <a 
          href="#" 
          className="font-display font-bold text-[15px] tracking-[-0.02em] text-white hover:text-purple-300 transition-colors"
        >
          REPU<span className="text-[var(--accent)] font-extrabold ml-0.5">AI</span>
        </a>

        <div className="h-4 w-[1px] bg-[var(--border)] hidden sm:block" />

        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-[var(--text-2)] tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AI ACTIVE</span>
        </div>
      </div>

      {/* CENTER MARQUEE TEXT (Absolute Centered) */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 max-w-sm xl:max-w-md overflow-hidden pointer-events-none z-10 opacity-70">
        <div className="animate-marquee font-mono text-[9px] text-[var(--text-3)] whitespace-nowrap tracking-widest uppercase">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>

      {/* RIGHT CLUSTER */}
      <div className="flex items-center gap-4 sm:gap-5 z-20">
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="relative py-1 font-mono text-[10px] tracking-[0.1em] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-200 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left" />
            </a>
          ))}
        </nav>

        <div className="h-4 w-[1px] bg-[var(--border)] hidden md:block" />

        <motion.a
          href="#demo"
          onClick={(e) => handleScrollTo(e, '#demo')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-[var(--accent)] hover:bg-violet-600 text-white font-mono text-[11px] font-bold tracking-[0.05em] px-4 py-2 rounded-[4px] transition-colors shadow-sm whitespace-nowrap"
        >
          TRY DEMO →
        </motion.a>
      </div>
    </motion.header>
  );
}
