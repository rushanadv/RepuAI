import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Star, 
  MessageSquare, 
  AlertCircle, 
  Copy, 
  Check, 
  RotateCw, 
  Loader2, 
  ArrowRight
} from 'lucide-react';
import { sampleReviews } from '../data/sampleReviews';

export default function DemoSection() {
  const [selectedCategory, setSelectedCategory] = useState('restaurant');
  const [selectedReviewText, setSelectedReviewText] = useState(sampleReviews.restaurant[0].text);
  const [reviewInput, setReviewInput] = useState(sampleReviews.restaurant[0].text);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationWarning, setValidationWarning] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Streaming state variables
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const streamEndRef = useRef(null);

  // Auto-scroll streaming container to bottom as new text streams in
  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollTop = streamEndRef.current.scrollHeight;
    }
  }, [streamingText]);

  const categories = [
    { id: 'restaurant', label: '🍽️ Restaurant' },
    { id: 'ecommerce', label: '🛍️ E-commerce' },
    { id: 'hotel', label: '🏨 Hotel' },
    { id: 'app', label: '📱 App' },
  ];

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const firstReview = sampleReviews[catId][0]?.text || '';
    setSelectedReviewText(firstReview);
    setReviewInput(firstReview);
    setValidationWarning('');
  };

  const handleSelectSample = (text) => {
    setSelectedReviewText(text);
    setReviewInput(text);
    setValidationWarning('');
  };

  const analyzeReview = async (reviewText) => {
    const apiKey = import.meta.env.VITE_OPENROUTER_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key is missing. Please set VITE_OPENROUTER_KEY in your .env file.");
    }

    setStreamingText("");
    setIsStreaming(true);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://repuai.com",
        "X-Title": "RepuAI"
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-ultra-550b-a55b:free",
        stream: true,
        messages: [
          {
            role: "system",
            content: `You are RepuAI, an expert review analysis engine. Analyze the customer review and return ONLY a valid raw JSON object. No markdown. No code fences. No extra text. No preamble. Start your response with { and end with }. The object must have exactly these fields:
{
  "sentiment": "positive" or "neutral" or "negative",
  "sentimentScore": integer 1-10,
  "issues": array of 1-3 short strings under 4 words each,
  "urgency": "high" or "medium" or "low",
  "urgencyReason": string under 12 words,
  "draftedResponse": string — professional warm empathetic business owner response, 3-4 sentences, specific to the review, never uses the word inconvenience
}`
          },
          {
            role: "user",
            content: `Analyze this customer review: "${reviewText}"`
          }
        ],
        max_tokens: 700,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`API error ${response.status}: ${errText}`);
    }

    // Parse the SSE stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let fullText = "";
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // keep incomplete last line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") break;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            fullText += content;
            setStreamingText(fullText); // live update as it streams
          }
        } catch {
          // skip malformed chunks
        }
      }
    }

    setIsStreaming(false);

    // Clean and parse the final JSON
    const cleaned = fullText
      .replace(/```json/gi, "")
      .replace(/```/gi, "")
      .trim();

    // Extract JSON object if model added preamble text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No valid JSON in response");

    return JSON.parse(jsonMatch[0]);
  };

  const handleAnalyze = async () => {
    const textToAnalyze = reviewInput.trim();
    if (!textToAnalyze) {
      setValidationWarning('Please select or paste a review first.');
      return;
    }

    setValidationWarning('');
    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeReview(textToAnalyze);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err.message || "Couldn't connect to AI. Check your API key or try again.");
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  };

  const handleCopy = () => {
    if (analysisResult?.draftedResponse) {
      navigator.clipboard.writeText(analysisResult.draftedResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getIssueEmoji = (issue) => {
    const lower = issue.toLowerCase();
    if (lower.includes('food') || lower.includes('taste') || lower.includes('flavor')) return '🍕';
    if (lower.includes('wait') || lower.includes('time') || lower.includes('delay') || lower.includes('shipping') || lower.includes('delivery')) return '⏱️';
    if (lower.includes('staff') || lower.includes('service') || lower.includes('waiter') || lower.includes('attitude') || lower.includes('support')) return '👨‍🍳';
    if (lower.includes('price') || lower.includes('cost') || lower.includes('expensive') || lower.includes('charge') || lower.includes('refund')) return '💰';
    if (lower.includes('clean') || lower.includes('mold') || lower.includes('hygiene') || lower.includes('room') || lower.includes('ac')) return '🏨';
    if (lower.includes('app') || lower.includes('bug') || lower.includes('crash') || lower.includes('server') || lower.includes('ui')) return '💻';
    if (lower.includes('pack') || lower.includes('box') || lower.includes('damaged') || lower.includes('item')) return '📦';
    return '🏷️';
  };

  return (
    <section id="demo" className="relative py-24 px-4 sm:px-6 bg-transparent overflow-hidden fade-in-section">
      {/* Background glow decoration */}
      <div 
        className="absolute top-1/3 -right-24 w-96 h-96 rounded-full pointer-events-none blur-[100px]"
        style={{ background: 'rgba(124, 58, 237, 0.12)' }}
      />
      <div 
        className="absolute bottom-10 -left-20 w-80 h-80 rounded-full pointer-events-none blur-[90px]"
        style={{ background: 'rgba(6, 182, 212, 0.10)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            Live Demo
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Try It Right Now — Paste Any Real Review
          </h2>
          <p className="mt-3 text-base text-slate-400">
            This is a real AI call. Not a mock. Not pre-scripted.
          </p>
        </div>

        {/* Two Panel Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* ================= LEFT PANEL: Input & Samples ================= */}
          <div className="flex-1 glow-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between border-white/[0.08] shadow-2xl">
            <div className="space-y-6">
              
              {/* 1. Category Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  1. Select Industry Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'btn-glow text-white shadow-md font-semibold'
                            : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Sample Review Cards */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    2. Pick a Real Sample Review
                  </label>
                  <span className="text-xs text-violet-400 font-medium">Click to load</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {sampleReviews[selectedCategory]?.map((sample, idx) => {
                    const isCurrent = reviewInput === sample.text;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectSample(sample.text)}
                        className={`p-3 rounded-xl cursor-pointer text-left transition-all border ${
                          isCurrent
                            ? 'bg-violet-600/15 border-violet-500/60 shadow-md shadow-violet-900/20'
                            : 'bg-white/[0.03] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-3 h-3 ${
                                  starIdx < sample.stars
                                    ? 'fill-current text-amber-400'
                                    : 'text-slate-600'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-400 truncate max-w-[80px]">
                            {sample.author}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          "{sample.text}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Textarea Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  3. Review Text for Analysis
                </label>
                <textarea
                  value={reviewInput}
                  onChange={(e) => {
                    setReviewInput(e.target.value);
                    if (validationWarning) setValidationWarning('');
                  }}
                  placeholder="Or paste your own custom customer review here..."
                  rows={4}
                  className="w-full bg-[#08080f]/80 border border-white/10 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all resize-none shadow-inner leading-relaxed"
                />
                {validationWarning && (
                  <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationWarning}
                  </p>
                )}
              </div>

            </div>

            {/* 4. Action Button */}
            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading || isStreaming}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                  loading || isStreaming
                    ? 'bg-violet-800/60 cursor-not-allowed opacity-75' 
                    : 'btn-glow cursor-pointer'
                }`}
              >
                {loading && !isStreaming && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Connecting...</span>
                  </>
                )}
                {isStreaming && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                    <span className="animate-pulse">Streaming...</span>
                  </>
                )}
                {!loading && !isStreaming && (
                  <>
                    <Sparkles className="w-5 h-5 text-white" />
                    <span>Analyze This Review</span>
                  </>
                )}
              </button>
            </div>

          </div>


          {/* ================= RIGHT PANEL: AI Analysis Results ================= */}
          <div className="flex-1 glow-card p-6 sm:p-7 rounded-2xl flex flex-col justify-center border-white/[0.08] min-h-[460px] shadow-2xl relative">
            
            {/* DEFAULT STATE: No analysis triggered yet */}
            {!loading && !isStreaming && !analysisResult && !error && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-white/10 rounded-2xl">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 text-slate-400">
                  <MessageSquare className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-200 mb-1">
                  Your analysis will appear here
                </h4>
                <p className="text-sm text-slate-400 max-w-sm mb-6">
                  Click 'Analyze This Review' to watch RepuAI extract sentiment, tags, urgency, and formulate a reply.
                </p>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="px-5 py-2 rounded-full bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Run Analysis Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* LOADING STATE: Shimmer Skeletons (Before stream begins) */}
            {loading && !isStreaming && (
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between p-4 glow-card border-white/10">
                  <div className="h-4 w-20 skeleton-box" />
                  <div className="h-7 w-28 skeleton-box" />
                </div>
                <div className="p-4 glow-card border-white/10">
                  <div className="h-4 w-24 mb-3 skeleton-box" />
                  <div className="flex gap-2">
                    <div className="h-6 w-24 skeleton-box" />
                    <div className="h-6 w-28 skeleton-box" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 glow-card border-white/10">
                  <div className="h-4 w-24 skeleton-box" />
                  <div className="h-7 w-32 skeleton-box" />
                </div>
                <div className="p-4 glow-card border-white/10">
                  <div className="h-4 w-36 mb-3 skeleton-box" />
                  <div className="h-20 w-full skeleton-box mb-3" />
                  <div className="h-8 w-28 skeleton-box" />
                </div>
                <p className="text-xs text-center text-violet-300/80 animate-pulse font-medium pt-2">
                  Connecting to NVIDIA Nemotron model...
                </p>
              </div>
            )}

            {/* STREAMING STATE: Real-time Live SSE Stream Display */}
            {isStreaming && (
              <div className="w-full h-full flex flex-col justify-between glow-card p-5 rounded-xl border-l-2 border-violet-500 animate-pulse bg-violet-950/20">
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-300">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                      </span>
                      <span>RepuAI is thinking...</span>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400">nvidia/nemotron-3-550b</span>
                  </div>
                  
                  <div 
                    ref={streamEndRef}
                    className="font-mono text-xs text-violet-300 leading-relaxed max-h-48 overflow-y-auto bg-black/40 p-3 rounded-lg border border-white/5 whitespace-pre-wrap break-all shadow-inner"
                  >
                    {streamingText || "Establishing connection..."}
                    <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-1 animate-pulse align-middle" />
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <p className="text-slate-400 italic text-xs">Parsing response stream...</p>
                  <Loader2 className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                </div>
              </div>
            )}

            {/* ERROR STATE */}
            {!isStreaming && error && (
              <div className="flex flex-col items-center justify-center text-center p-8 glow-card border-rose-500/30 rounded-2xl bg-rose-500/5">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400">
                  <AlertCircle className="w-8 h-8 text-rose-400" />
                </div>
                <h4 className="text-base font-bold text-rose-200 mb-1">
                  Analysis Request Failed
                </h4>
                <p className="text-xs text-rose-300/80 max-w-sm mb-6 leading-relaxed">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            )}

            {/* RESULT STATE */}
            {!loading && !isStreaming && analysisResult && (
              <div className="space-y-3.5 w-full">
                
                {/* CARD 1: SENTIMENT */}
                <div className="glow-card p-4 rounded-xl flex items-center justify-between border-white/10 animate-fade-in-up">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                      Sentiment
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Score: <strong className="text-white font-bold">{analysisResult.sentimentScore || '—'}/10</strong>
                    </span>
                  </div>
                  <div>
                    {analysisResult.sentiment?.toLowerCase() === 'positive' && (
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        <span>😊 Positive</span>
                      </span>
                    )}
                    {analysisResult.sentiment?.toLowerCase() === 'neutral' && (
                      <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        <span>😐 Neutral</span>
                      </span>
                    )}
                    {analysisResult.sentiment?.toLowerCase() === 'negative' && (
                      <span className="px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                        <span>😤 Negative</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* CARD 2: DETECTED ISSUES */}
                <div className="glow-card p-4 rounded-xl border-white/10 animate-fade-in-up delay-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                    Detected Issues
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(analysisResult.issues) && analysisResult.issues.length > 0 ? (
                      analysisResult.issues.map((issue, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-medium flex items-center gap-1.5"
                        >
                          <span>{getIssueEmoji(issue)}</span>
                          <span>{issue}</span>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No specific operational issue detected</span>
                    )}
                  </div>
                </div>

                {/* CARD 3: URGENCY */}
                <div className="glow-card p-4 rounded-xl border-white/10 animate-fade-in-up delay-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Urgency Level
                    </span>
                    <div>
                      {analysisResult.urgency?.toLowerCase() === 'high' && (
                        <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1">
                          🔴 HIGH PRIORITY
                        </span>
                      )}
                      {analysisResult.urgency?.toLowerCase() === 'medium' && (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1">
                          🟡 Medium
                        </span>
                      )}
                      {analysisResult.urgency?.toLowerCase() === 'low' && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1">
                          🟢 Low
                        </span>
                      )}
                    </div>
                  </div>
                  {analysisResult.urgencyReason && (
                    <p className="text-xs text-slate-400 italic mt-1">
                      Reason: {analysisResult.urgencyReason}
                    </p>
                  )}
                </div>

                {/* CARD 4: DRAFTED RESPONSE */}
                <div className="glow-card p-4 rounded-xl border-white/10 animate-fade-in-up delay-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      ✍️ Suggested Response
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold">
                      AI Generated
                    </span>
                  </div>
                  
                  <div className="p-3 bg-white/[0.04] rounded-lg border border-white/[0.06] mb-3.5">
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-normal">
                      "{analysisResult.draftedResponse}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-4 py-2 rounded-lg border border-violet-500/50 hover:bg-violet-500/20 text-violet-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-violet-400" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleAnalyze}
                      className="px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
