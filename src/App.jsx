import React, { useEffect } from 'react';
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
    <div className="min-h-screen bg-[#080810] text-[#f1f5f9] flex flex-col font-['Inter',sans-serif]">
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
