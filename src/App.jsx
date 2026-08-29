import React, { useEffect } from 'react';
import { useScroll, useSpring, motion } from "framer-motion";
import Navbar from './components/Navbar';
import SpotlightEffect from './components/SpotlightEffect';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import FeaturesSection from './components/FeaturesSection';
import DemoSection from './components/DemoSection';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#080810] text-[#f1f5f9] flex flex-col font-['Inter',sans-serif] relative selection:bg-purple-500/30 selection:text-white">
      {/* 13. Top Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
          transformOrigin: "0%",
          zIndex: 9999,
        }}
      />
      
      <Navbar />
      <main className="flex-1 relative">
        <SpotlightEffect />
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <FeaturesSection />
        <DemoSection />
        <AnalyticsDashboard />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
