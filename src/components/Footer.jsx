import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05050a] border-t border-white/[0.06] pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          
          {/* Brand Info */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Sparkles className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Repu<span className="gradient-text font-black ml-0.5">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI that listens so your customers feel heard. The automated reputation layer for modern businesses.
            </p>
          </div>

          {/* 3 Column Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto">
            
            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#demo" className="hover:text-white transition-colors">Live Demo</a></li>
                <li><a href="#analytics" className="hover:text-white transition-colors">Analytics</a></li>
              </ul>
            </div>

            {/* Integrations */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Integrations
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><span className="hover:text-white cursor-pointer transition-colors">Google Reviews</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Zomato / Swiggy</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Amazon Store</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">App Store / Play</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Security</span></li>
                <li><span className="hover:text-white cursor-pointer transition-colors">Status</span></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 RepuAI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <span className="text-rose-500">❤️</span> by Team RepuAI
          </p>
        </div>

      </div>
    </footer>
  );
}
