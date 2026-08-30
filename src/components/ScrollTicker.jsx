import React from 'react';

export default function ScrollTicker() {
  const tickerText = "SENTIMENT ANALYSIS ✦ REVIEW INTELLIGENCE ✦ PATTERN DETECTION ✦ RESPONSE DRAFTING ✦ URGENCY FLAGGING ✦ ISSUE TAGGING ✦ REAL-TIME AI ✦ ONE-CLICK RESPONSE ✦ ";

  return (
    <div className="w-full h-[44px] bg-[var(--accent)] border-t border-b border-white/10 flex items-center overflow-hidden -my-[2px] -skew-y-[0.5deg] relative z-20 select-none">
      <div className="animate-ticker flex whitespace-nowrap font-mono text-[11px] font-bold text-white tracking-[0.1em] uppercase hover:[animation-play-state:paused]">
        <span>{tickerText}</span>
        <span>{tickerText}</span>
        <span>{tickerText}</span>
      </div>
    </div>
  );
}
