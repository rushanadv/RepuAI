import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#040407] border-t border-white/[0.06] pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.05]">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 max-w-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Repu<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300 ml-0.5 font-black">AI</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              The autonomous review response & operational defect intelligence platform for customer-centric businesses.
            </p>

            <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>All Systems Operational • 99.98% SLA</span>
            </div>
          </div>

          {/* Links Grid (7 cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Architecture */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Architecture
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Feature Suite</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Pipeline Flow</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Live Workspace</a></li>
                <li><a href="#analytics" className="hover:text-white transition-colors">Telemetry Engine</a></li>
              </ul>
            </div>

            {/* Channels */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Channels
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                  <span>Google Reviews</span>
                </li>
                <li className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                  <span>Zomato & Swiggy</span>
                </li>
                <li className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                  <span>Amazon Store</span>
                </li>
                <li className="flex items-center gap-1 hover:text-white cursor-pointer transition-colors">
                  <span>Apple App Store</span>
                </li>
              </ul>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mb-4">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">Security & SOC2</li>
                <li className="hover:text-white cursor-pointer transition-colors">API Documentation</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 RepuAI Technologies Inc. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Designed with precision by Team RepuAI
          </p>
        </div>

      </div>
    </footer>
  );
}
