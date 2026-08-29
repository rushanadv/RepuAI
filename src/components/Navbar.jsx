import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Demo', href: '#demo' },
    { name: 'Analytics', href: '#analytics' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#08080f]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40' 
        : 'bg-[#08080f]/75 backdrop-blur-lg border-b border-white/[0.06]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:border-violet-500/60 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center">
            Repu<span className="gradient-text font-black ml-0.5">AI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Right CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#demo"
            onClick={(e) => handleScrollTo(e, '#demo')}
            className="btn-glow px-5 py-2.5 rounded-full text-sm font-semibold text-white flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Try Live Demo</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08080f]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 transition-all">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10">
            <a
              href="#demo"
              onClick={(e) => handleScrollTo(e, '#demo')}
              className="btn-glow w-full block text-center py-3 rounded-xl font-semibold text-white text-sm"
            >
              Try Live Demo →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
