import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, ChevronRight, Activity } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto w-full max-w-4xl transition-all duration-500 ease-out rounded-full border ${
          scrolled 
            ? 'bg-[#08080c]/85 backdrop-blur-2xl border-white/[0.12] py-2 px-3 sm:px-4 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(99,102,241,0.08)]' 
            : 'bg-[#0b0b10]/70 backdrop-blur-xl border-white/[0.08] py-2.5 px-4 sm:px-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:border-indigo-400/60 group-hover:scale-105 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="text-base font-bold tracking-tight text-white flex items-center">
              Repu<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-cyan-300 ml-0.5 font-black">AI</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] p-1 rounded-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-3.5 py-1 rounded-full text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>v2.4 Live</span>
            </div>
            
            <a
              href="#demo"
              onClick={(e) => handleScrollTo(e, '#demo')}
              className="btn-primary group px-4 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Try Live Demo</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
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

        </div>

        {/* Mobile Expandable Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 px-2 border-t border-white/[0.08] mt-3 space-y-2 animate-fade-in-up">
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
            <div className="pt-2">
              <a
                href="#demo"
                onClick={(e) => handleScrollTo(e, '#demo')}
                className="btn-primary w-full py-2.5 rounded-xl font-semibold text-white text-xs text-center block shadow-lg"
              >
                Try Live Demo →
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
