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
  ArrowRight,
  Terminal,
  Layers,
  Cpu,
  CornerDownLeft
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
    { id: 'app', label: '📱 Mobile App' },
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
    <section id="demo" className="relative py-28 px-4 sm:px-6 bg-[#060609] overflow-hidden fade-in-section border-t border-white/[0.05]">
      
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none blur-[160px]"
        style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LIVE INTERACTIVE WORKSPACE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.05]">
            Test the live neural engine against any real review.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl">
            This connects directly to the streaming OpenRouter inference layer. Not a canned mock.
          </p>
        </div>

        {/* Studio-Grade Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* ================= LEFT PANEL: Review Input & Presets (5 Cols) ================= */}
          <div className="lg:col-span-5 hairline-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              
              {/* 1. Industry Switcher Tabs */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  01 // Select Domain Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-black/40 rounded-xl border border-white/[0.06]">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-white/10 text-white shadow-sm border border-white/[0.08]'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="truncate">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Sample Review Cards Slider */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    02 // Quick Load Sample
                  </label>
                  <span className="text-[11px] text-indigo-400 font-medium">Click to populate</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleReviews[selectedCategory]?.map((sample, idx) => {
                    const isCurrent = reviewInput === sample.text;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectSample(sample.text)}
                        className={`p-2.5 rounded-xl cursor-pointer text-left transition-all border ${
                          isCurrent
                            ? 'bg-indigo-600/15 border-indigo-500/50 shadow-md'
                            : 'bg-black/30 border-white/[0.05] hover:bg-black/50 hover:border-white/15'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-2.5 h-2.5 ${
                                  starIdx < sample.stars
                                    ? 'fill-current text-amber-400'
                                    : 'text-slate-700'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 truncate max-w-[70px]">
                            {sample.author}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                          "{sample.text}"
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Textarea Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    03 // Active Review Payload
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">
                    {reviewInput.length} chars
                  </span>
                </div>
                <textarea
                  value={reviewInput}
                  onChange={(e) => {
                    setReviewInput(e.target.value);
                    if (validationWarning) setValidationWarning('');
                  }}
                  placeholder="Paste any custom customer review from Google, Zomato, Amazon, or App Store..."
                  rows={4}
                  className="w-full bg-black/50 border border-white/[0.08] rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none font-normal leading-relaxed shadow-inner"
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
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2.5 transition-all text-sm shadow-xl ${
                  loading || isStreaming
                    ? 'bg-indigo-900/60 cursor-not-allowed opacity-80' 
                    : 'btn-primary cursor-pointer'
                }`}
              >
                {loading && !isStreaming && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Connecting to Model...</span>
                  </>
                )}
                {isStreaming && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                    <span className="animate-pulse">Streaming Response Tokens...</span>
                  </>
                )}
                {!loading && !isStreaming && (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Run AI Triage & Draft</span>
                  </>
                )}
              </button>
            </div>

          </div>


          {/* ================= RIGHT PANEL: AI Workspace & Streaming Inspector (7 Cols) ================= */}
          <div className="lg:col-span-7 hairline-card p-6 sm:p-7 rounded-2xl flex flex-col justify-center min-h-[480px] shadow-2xl relative">
            
            {/* Top Workspace Header */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>INSPECTOR // OUTPUT_FRAME</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {isStreaming ? '● STREAMING LIVE' : 'READY'}
              </span>
            </div>

            {/* DEFAULT STATE: No analysis triggered yet */}
            {!loading && !isStreaming && !analysisResult && !error && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/[0.08] rounded-xl bg-black/20">
                <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center mb-3 text-slate-400">
                  <MessageSquare className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="text-sm font-bold text-slate-200 mb-1">
                  Awaiting review execution
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed">
                  Select a sample preset on the left or paste your own review, then click <strong>Run AI Triage</strong> to watch real-time extraction.
                </p>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="btn-secondary px-4 py-2 rounded-full text-xs font-semibold text-slate-200 flex items-center gap-1.5"
                >
                  <span>Execute Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* LOADING STATE: Shimmer Skeletons (Connecting) */}
            {loading && !isStreaming && (
              <div className="space-y-3 w-full">
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="h-4 w-20 skeleton-box" />
                  <div className="h-6 w-28 skeleton-box" />
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="h-4 w-24 mb-3 skeleton-box" />
                  <div className="flex gap-2">
                    <div className="h-6 w-24 skeleton-box" />
                    <div className="h-6 w-28 skeleton-box" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="h-4 w-24 skeleton-box" />
                  <div className="h-6 w-32 skeleton-box" />
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <div className="h-4 w-36 mb-3 skeleton-box" />
                  <div className="h-16 w-full skeleton-box mb-3" />
                  <div className="h-8 w-28 skeleton-box" />
                </div>
                <p className="text-xs text-center text-indigo-300/70 animate-pulse font-mono pt-1">
                  Connecting to streaming endpoint...
                </p>
              </div>
            )}

            {/* STREAMING STATE: Real-time Live SSE Stream Display */}
            {isStreaming && (
              <div className="w-full h-full flex flex-col justify-between bg-black/60 rounded-xl p-4 border-l-2 border-indigo-500">
                <div>
                  <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                      <span>Live Neural Token Stream</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300">nvidia/nemotron-3-550b</span>
                  </div>
                  
                  <div 
                    ref={streamEndRef}
                    className="font-mono text-xs text-indigo-200 leading-relaxed max-h-52 overflow-y-auto bg-black/80 p-3 rounded-lg border border-white/[0.05] whitespace-pre-wrap break-all shadow-inner"
                  >
                    {streamingText || "Initiating stream handshake..."}
                    <span className="inline-block w-1.5 h-3.5 bg-indigo-400 ml-1 animate-pulse align-middle" />
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <p className="text-slate-400 italic text-[11px]">Validating structured JSON payload...</p>
                  <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                </div>
              </div>
            )}

            {/* ERROR STATE */}
            {!isStreaming && error && (
              <div className="flex flex-col items-center justify-center text-center p-6 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center mb-3 text-rose-400">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-rose-200 mb-1">
                  Analysis Pipeline Error
                </h4>
                <p className="text-xs text-rose-300/80 max-w-sm mb-4 leading-relaxed font-mono">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Retry Request</span>
                </button>
              </div>
            )}

            {/* RESULT STATE */}
            {!loading && !isStreaming && analysisResult && (
              <div className="space-y-3 w-full">
                
                {/* CARD 1: SENTIMENT & SCORE */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.07] flex items-center justify-between animate-fade-in-up">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Sentiment Analysis
                    </span>
                    <span className="text-xs text-slate-300">
                      Score: <strong className="text-white font-mono">{analysisResult.sentimentScore || '—'}/10</strong>
                    </span>
                  </div>
                  <div>
                    {analysisResult.sentiment?.toLowerCase() === 'positive' && (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                        <span>😊 Positive</span>
                      </span>
                    )}
                    {analysisResult.sentiment?.toLowerCase() === 'neutral' && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold flex items-center gap-1.5">
                        <span>😐 Neutral</span>
                      </span>
                    )}
                    {analysisResult.sentiment?.toLowerCase() === 'negative' && (
                      <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5">
                        <span>😤 Negative</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* CARD 2: DETECTED ISSUES */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.07] animate-fade-in-up delay-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Extracted Root Issues
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.isArray(analysisResult.issues) && analysisResult.issues.length > 0 ? (
                      analysisResult.issues.map((issue, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium flex items-center gap-1"
                        >
                          <span>{getIssueEmoji(issue)}</span>
                          <span>{issue}</span>
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No specific defect identified</span>
                    )}
                  </div>
                </div>

                {/* CARD 3: URGENCY LEVEL */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.07] animate-fade-in-up delay-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Triage Priority
                    </span>
                    <div>
                      {analysisResult.urgency?.toLowerCase() === 'high' && (
                        <span className="px-2.5 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold">
                          🔴 High Priority
                        </span>
                      )}
                      {analysisResult.urgency?.toLowerCase() === 'medium' && (
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
                          🟡 Medium
                        </span>
                      )}
                      {analysisResult.urgency?.toLowerCase() === 'low' && (
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                          🟢 Low
                        </span>
                      )}
                    </div>
                  </div>
                  {analysisResult.urgencyReason && (
                    <p className="text-xs text-slate-400 italic mt-1">
                      {analysisResult.urgencyReason}
                    </p>
                  )}
                </div>

                {/* CARD 4: DRAFTED EMPATHETIC RESOLUTION */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-indigo-950/20 to-black/60 border border-indigo-500/30 animate-fade-in-up delay-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Synthesized Owner Response
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                      Owner Empathy Tone
                    </span>
                  </div>
                  
                  <div className="p-3 bg-black/60 rounded-lg border border-white/[0.05] mb-3">
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-normal">
                      "{analysisResult.draftedResponse}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/40 hover:bg-indigo-600/50 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleAnalyze}
                      className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3" />
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
