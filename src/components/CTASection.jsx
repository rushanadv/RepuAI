import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 overflow-hidden fade-in-section border-t border-white/[0.06] bg-[#050508]">
      
      {/* Restrained cinematic ambient backlighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full pointer-events-none blur-[150px]"
        style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(6, 182, 212, 0.05) 50%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-slate-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>EARLY ACCESS INVITATION</span>
        </div>

        {/* Cinematic Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[0.98]">
          Never lose another customer <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-300">
            to silence.
          </span>
        </h2>

        {/* Short Copy */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          Join forward-thinking founders and operators protecting customer goodwill on autopilot.
        </p>

        {/* Email Capture Form */}
        <div className="mt-10 max-w-md mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="founder@business.com"
                required
                className="flex-1 bg-black/60 border border-white/[0.1] px-4 py-3.5 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2.5 text-sm font-semibold shadow-inner animate-fade-in-up">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>You're on the priority queue! We'll reach out shortly 🎉</span>
            </div>
          )}

          {errorMsg && (
            <p className="mt-2 text-xs text-rose-400 font-medium">{errorMsg}</p>
          )}

          <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
            <span>🔒 Enterprise encrypted</span>
            <span>•</span>
            <span>No credit card required</span>
          </div>
        </div>

      </div>
    </section>
  );
}
