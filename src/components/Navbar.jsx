import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScrolled(latest > 60);
    });
  }, [scrollY]);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Workflow', href: '#how-it-works' },
    { name: 'Live Demo', href: '#demo' },
    { name: 'Analytics', href: '#analytics' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div 
        animate={{
          height: scrolled ? 58 : 68,
          backgroundColor: scrolled ? "rgba(8, 8, 16, 0.92)" : "rgba(11, 11, 18, 0.6)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          borderColor: scrolled ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="pointer-events-auto w-full max-w-4xl rounded-full border px-4 sm:px-6 flex items-center justify-between shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(124,58,237,0.1)]"
      >
        {/* Brand Logo */}
        <motion.a 
          href="#" 
          animate={{ scale: scrolled ? 0.92 : 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:border-violet-400/60 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <span className="text-base font-bold tracking-tight text-white flex items-center">
            Repu<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-cyan-300 ml-0.5 font-black">AI</span>
          </span>
        </motion.a>

        {/* Desktop Navigation Links with animated sliding underline */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] p-1 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="relative px-3.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors duration-200 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-gradient-to-r from-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left rounded-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>v2.4 Live</span>
          </div>
          
          <motion.a
            href="#demo"
            onClick={(e) => handleScrollTo(e, '#demo')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary group px-4 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Try Live Demo</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Expandable Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-4 right-4 bg-[#0b0b14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-auto md:hidden"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.08] mt-2">
            <a
              href="#demo"
              onClick={(e) => handleScrollTo(e, '#demo')}
              className="btn-primary w-full py-2.5 rounded-xl font-semibold text-white text-xs text-center block shadow-lg"
            >
              Try Live Demo →
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
