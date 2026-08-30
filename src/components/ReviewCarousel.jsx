import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { sampleReviews } from '../data/sampleReviews';
import { EASE } from '../lib/animations';

export default function ReviewCarousel() {
  const prefersReduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Flatten and normalize sample reviews into a curated set of 6 reviews
  const allReviews = [
    {
      author: "Rahul M.",
      platform: "GOOGLE",
      stars: "⭐",
      rating: 1,
      text: "Ordered biryani at 7pm. It arrived at 9:15pm completely cold and the portion was half of what I expected for ₹350. Unacceptable service.",
      color: "border-l-[#ef4444]"
    },
    {
      author: "Priya Sharma",
      platform: "ZOMATO",
      stars: "⭐⭐⭐⭐⭐",
      rating: 5,
      text: "The special thali and butter chicken were incredible! Fast delivery and great packaging. Will definitely order again this weekend.",
      color: "border-l-[#22c55e]"
    },
    {
      author: "Amit Patel",
      platform: "AMAZON",
      stars: "⭐⭐⭐",
      rating: 3,
      text: "Product works as described but delivery took 6 days instead of 2. Customer support was slow to update tracking details.",
      color: "border-l-[#f59e0b]"
    },
    {
      author: "Kavya L.",
      platform: "ZOMATO",
      stars: "⭐",
      rating: 1,
      text: "Received a damaged package. The outer seal was broken and one dessert item was completely missing. Chat bot was useless.",
      color: "border-l-[#ef4444]"
    },
    {
      author: "DevUser_22",
      platform: "APP STORE",
      stars: "⭐⭐⭐",
      rating: 3,
      text: "App has great UI and potential, but crashes intermittently on checkout. Please fix the iOS 18 payment gateway bug.",
      color: "border-l-[#f59e0b]"
    },
    {
      author: "Sneha Reddy",
      platform: "GOOGLE",
      stars: "⭐⭐⭐⭐⭐",
      rating: 5,
      text: "Wonderful hospitality and clean ambiance. Staff remembered our anniversary and gave complimentary dessert. 10/10 experience!",
      color: "border-l-[#22c55e]"
    }
  ];

  // Auto-advance every 3.5s unless hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allReviews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, allReviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allReviews.length);
  };

  // Helper to get relative indices (prev, active, next)
  const getReview = (offset) => {
    const idx = (currentIndex + offset + allReviews.length) % allReviews.length;
    return allReviews[idx];
  };

  return (
    <section 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-auto min-h-[480px] bg-[#0a0a0a] border-t border-b border-white/[0.06] py-16 px-6 sm:px-8 flex flex-col justify-between overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-between h-full relative z-10">
        
        {/* Section Top Label */}
        <div className="flex items-center justify-between mb-10">
          <div className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] uppercase">
            // REAL REVIEWS — LIVE CAPTURE FEED
          </div>
          <span className="font-mono text-[9px] text-[var(--text-3)] hidden sm:inline uppercase">
            AUTO-STREAM // 3.5S CYCLE
          </span>
        </div>

        {/* Carousel Visual Frame */}
        <div className="relative w-full flex items-center justify-center my-4 min-h-[220px]">
          
          {/* Previous Card (Left Peek) */}
          <div className="hidden lg:block absolute left-0 w-[30%] opacity-40 scale-90 pointer-events-none transition-all duration-500">
            <div className={`p-5 bg-white/[0.02] border border-white/[0.06] border-l-2 ${getReview(-1).color} rounded-[6px]`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-amber-400">{getReview(-1).stars}</span>
                <span className="font-mono text-[9px] text-[var(--text-3)] tracking-widest">{getReview(-1).platform}</span>
              </div>
              <p className="text-[12px] text-[var(--text-2)] line-clamp-2 leading-relaxed italic mb-2">
                "{getReview(-1).text}"
              </p>
              <span className="font-mono text-[9px] text-[var(--text-3)]">— {getReview(-1).author}</span>
            </div>
          </div>

          {/* Active Center Card with AnimatePresence */}
          <div className="w-full lg:w-[48%] relative z-20">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: prefersReduced ? 0 : 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: prefersReduced ? 0 : -80, scale: 0.95 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={`p-7 bg-[#0d0d0d] border border-white/[0.1] border-l-2 ${getReview(0).color} rounded-[6px] shadow-2xl relative`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-amber-400">{getReview(0).stars}</span>
                    <span className="font-mono text-[10px] text-slate-400 font-bold ml-1">
                      {getReview(0).rating === 5 ? 'EXCELLENT' : getReview(0).rating === 3 ? 'MODERATE' : 'CRITICAL'}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-purple-400 tracking-[0.15em] border border-purple-500/20 px-2 py-0.5 rounded-[3px] bg-purple-500/10 uppercase">
                    {getReview(0).platform}
                  </span>
                </div>

                <p className="text-[14px] text-[var(--text-1)] leading-relaxed italic font-display mb-5 font-normal">
                  "{getReview(0).text}"
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[10px] text-[var(--text-2)]">
                  <span>— {getReview(0).author}</span>
                  <span className="text-[var(--text-3)]">INGESTED // AUTO-PARSED</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Card (Right Peek) */}
          <div className="hidden lg:block absolute right-0 w-[30%] opacity-40 scale-90 pointer-events-none transition-all duration-500">
            <div className={`p-5 bg-white/[0.02] border border-white/[0.06] border-l-2 ${getReview(1).color} rounded-[6px]`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-amber-400">{getReview(1).stars}</span>
                <span className="font-mono text-[9px] text-[var(--text-3)] tracking-widest">{getReview(1).platform}</span>
              </div>
              <p className="text-[12px] text-[var(--text-2)] line-clamp-2 leading-relaxed italic mb-2">
                "{getReview(1).text}"
              </p>
              <span className="font-mono text-[9px] text-[var(--text-3)]">— {getReview(1).author}</span>
            </div>
          </div>

          {/* Minimal Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Review"
            className="absolute left-2 lg:-left-4 z-30 font-display text-2xl text-[var(--text-2)] hover:text-white transition-all cursor-pointer p-2 hover:-translate-x-1"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Review"
            className="absolute right-2 lg:-right-4 z-30 font-display text-2xl text-[var(--text-2)] hover:text-white transition-all cursor-pointer p-2 hover:translate-x-1"
          >
            ›
          </button>

        </div>

        {/* Bottom Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {allReviews.map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Jump to review ${dotIdx + 1}`}
                className="cursor-pointer transition-all duration-300"
              >
                <motion.div
                  animate={{
                    width: isActive ? 22 : 5,
                    backgroundColor: isActive ? "#7c3aed" : "rgba(255,255,255,0.2)"
                  }}
                  className="h-1 rounded-full"
                />
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
