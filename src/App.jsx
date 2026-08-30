import React from 'react';
import { useScroll, useSpring, motion } from "framer-motion";
import Navbar from './components/Navbar';
import SpotlightCursor from './components/SpotlightCursor';
import Hero from './components/Hero';
import ScrollTicker from './components/ScrollTicker';
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

  return (
    <div className="min-h-screen bg-[#080808] text-[#f0f0f0] font-['Space_Grotesk',sans-serif] flex flex-col relative selection:bg-purple-600/30 selection:text-white">
      {/* Scroll Progress Bar at very top */}
      <motion.div
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--accent)",
          transformOrigin: "0%",
          zIndex: 9999,
        }}
      />
      
      <Navbar />
      <main className="flex-1 relative">
        <SpotlightCursor />
        <Hero />
        <ScrollTicker />
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
