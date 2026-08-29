import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Star, 
  CheckCircle2, 
  AlertTriangle,
  Minus
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const urgentReviews = [
    {
      platform: 'G',
      platformBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      user: 'Rahul M.',
      stars: 1,
      snippet: 'Ordered biryani at 7pm. It arrived at 9:15pm completely cold and portion was half...',
    },
    {
      platform: 'Z',
      platformBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      user: 'Kavya L.',
      stars: 1,
      snippet: 'Received a damaged product. The box was opened and one item was missing...',
    },
    {
      platform: 'A',
      platformBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      user: 'DevUser_22',
      stars: 1,
      snippet: 'App crashes every single time I try to open the payment screen for 3 days...',
    },
  ];

  const handleReplyClick = (e, snippet) => {
    e.preventDefault();
    const demoEl = document.querySelector('#demo');
    if (demoEl) {
      demoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="analytics" className="relative py-24 px-4 sm:px-6 bg-[#0c0c16]/50 border-t border-white/[0.04] overflow-hidden fade-in-section">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400 mb-3">
            Insights
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            See What's Trending Across Your Reviews
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Real-time reputation intelligence and automated operational trend tracking.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* CARD 1: Sentiment Breakdown */}
          <div className="glow-card p-7 rounded-2xl border-white/[0.08]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">
                Sentiment Overview — This Month
              </h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                842 Total
              </span>
            </div>

            <div className="space-y-5">
              {/* Positive */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Positive
                  </span>
                  <span className="text-white font-bold">58%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '58%' }}></div>
                </div>
              </div>

              {/* Neutral */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Neutral
                  </span>
                  <span className="text-white font-bold">22%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: '22%' }}></div>
                </div>
              </div>

              {/* Negative */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span> Negative
                  </span>
                  <span className="text-white font-bold">20%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>

            <p className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
              <span>Overall Sentiment Score: <strong className="text-emerald-400 font-bold">7.4/10</strong></span>
              <span className="text-emerald-400 flex items-center gap-0.5 font-medium">+8% from last month</span>
            </p>
          </div>


          {/* CARD 2: Top Issues */}
          <div className="glow-card p-7 rounded-2xl border-white/[0.08]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">
                Most Mentioned Issues
              </h3>
              <span className="text-xs text-slate-400">By Frequency</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs text-slate-300 font-bold flex items-center justify-center">1</span>
                  <span className="text-sm font-medium text-slate-200">Wait / Delivery Time</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  78 mentions
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs text-slate-300 font-bold flex items-center justify-center">2</span>
                  <span className="text-sm font-medium text-slate-200">Food Temperature / Quality</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold">
                  45 mentions
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs text-slate-300 font-bold flex items-center justify-center">3</span>
                  <span className="text-sm font-medium text-slate-200">Staff Attitude</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  32 mentions
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs text-slate-300 font-bold flex items-center justify-center">4</span>
                  <span className="text-sm font-medium text-slate-200">Pricing / Value</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold">
                  28 mentions
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 text-xs text-slate-300 font-bold flex items-center justify-center">5</span>
                  <span className="text-sm font-medium text-slate-200">Packaging</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-semibold">
                  19 mentions
                </span>
              </div>
            </div>
          </div>


          {/* CARD 3: Urgent Reviews */}
          <div className="glow-card p-7 rounded-2xl border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  Needs Immediate Response
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">
                  3 Critical
                </span>
              </div>

              <div className="space-y-3 mt-4">
                {urgentReviews.map((rev, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-lg ${rev.platformBg} border font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        {rev.platform}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{rev.user}</span>
                          <span className="flex text-rose-500 text-xs">
                            <Star className="w-3 h-3 fill-current" />
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-1 max-w-xs sm:max-w-sm">
                          "{rev.snippet}"
                        </p>
                      </div>
                    </div>

                    <a
                      href="#demo"
                      onClick={(e) => handleReplyClick(e, rev.snippet)}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-end sm:self-center flex-shrink-0 transition-colors"
                    >
                      <span>Reply Now</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-slate-400 text-center">
              Auto-escalated based on severity & sentiment threshold
            </p>
          </div>


          {/* CARD 4: Stats Summary */}
          <div className="glow-card p-7 rounded-2xl border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">
                  This Week's Stats
                </h3>
                <span className="text-xs text-slate-400">Past 7 Days</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Stat 1 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xs text-slate-400 block mb-1">Total Reviews</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-white">247</span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +12%
                    </span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xs text-slate-400 block mb-1">Avg Rating</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-amber-400">3.8 ⭐</span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center">
                      <Minus className="w-3 h-3 mr-0.5" /> 0.0
                    </span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xs text-slate-400 block mb-1">Responses Drafted</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-cyan-400">189</span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" /> +34%
                    </span>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-xs text-slate-400 block mb-1">Urgent Flagged</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-rose-400">23</span>
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3" /> Critical
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" /> 100% Sync Accuracy
              </span>
              <span>Updated 4 mins ago</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
