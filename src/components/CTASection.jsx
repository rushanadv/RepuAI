import React, { useState } from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section 
      className="relative py-24 px-4 sm:px-6 overflow-hidden fade-in-section border-y border-white/[0.06]"
      style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.20) 0%, rgba(6, 182, 212, 0.10) 100%)'
      }}
    >
      {/* Background glow decoration */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-violet-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>Instant Onboarding</span>
        </div>

        {/* Headline & Subtext */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Start Responding Smarter Today
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
          Join 500+ business owners who never miss or mishandle a customer review.
        </p>

        {/* Email Capture Form */}
        <div className="mt-8 max-w-md mx-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 items-stretch">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="your@business.com"
                required
                className="flex-1 glow-card px-4 py-3.5 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all border-white/10"
              />
              <button
                type="submit"
                className="btn-glow px-6 py-3.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Early Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2.5 text-sm font-semibold shadow-inner animate-fade-in-up">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>You're on the waitlist! We'll be in touch 🎉</span>
            </div>
          )}

          {errorMsg && (
            <p className="mt-2 text-xs text-rose-400 font-medium">{errorMsg}</p>
          )}

          <p className="mt-4 text-xs text-slate-400">
            🔒 No spam. 14-day free trial when we launch. Unsubscribe anytime.
          </p>
        </div>

      </div>
    </section>
  );
}
