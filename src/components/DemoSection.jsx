import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Terminal
} from 'lucide-react';
import { sampleReviews } from '../data/sampleReviews';
import { fadeUp, slideRight } from '../lib/animations';

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
    { id: 'ecommerce', label: '🛍️ E-Commerce' },
    { id: 'hotel', label: '🏨 Hospitality' },
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
    <section id="demo" className="relative py-32 px-4 sm:px-6 bg-[#040407] overflow-hidden border-t border-white/[0.05]">
      
      {/* Ambient lighting */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[420px] rounded-full pointer-events-none blur-[180px]"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.09) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-mono font-semibold text-violet-400 mb-6">
            <Terminal className="w-3.5 h-3.5" />
            <span>AI WORKSPACE // STREAMING_CONSOLE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-[-0.04em] leading-[0.95]">
            Run live inference <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-violet-300">
              on any customer review.
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            Real-time SSE token stream executing on NVIDIA Nemotron 550B & Meta LLaMA 3.3.
          </p>
        </div>

        {/* Studio-Grade Pro Console Chassis */}
        <div className="studio-chassis rounded-2xl p-5 sm:p-7 shadow-2xl">
          
          {/* Pro Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.08] font-mono text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-slate-200 font-bold">MODEL // nvidia/nemotron-3-ultra-550b</span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 text-[11px]">
              <span>STREAM: SSE</span>
              <span>•</span>
              <span className="text-emerald-400">LATENCY: ~40ms</span>
            </div>
          </div>

          {/* 2-Column Console Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* ================= LEFT CONSOLE: Review Input & Presets (5 Cols) ================= */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              custom={0}
              className="lg:col-span-5 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                {/* 1. Industry Switcher */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                    01 // Domain Preset
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-black/60 rounded-xl border border-white/[0.07]">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`px-2 py-2 rounded-lg text-xs font-semibold font-mono transition-all text-center flex items-center justify-center cursor-pointer ${
                            isSelected
                              ? 'bg-white/10 text-white border border-white/[0.1] shadow-sm'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span className="truncate">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Sample Presets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      02 // Real Sample Preset
                    </label>
                    <span className="text-[11px] font-mono text-violet-400">Click to populate</span>
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
                              ? 'bg-violet-600/20 border-violet-500/60 shadow-md'
                              : 'bg-black/40 border-white/[0.05] hover:bg-black/60 hover:border-white/15'
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
                      03 // Review Payload
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
                    placeholder="Paste any custom customer review here..."
                    rows={4}
                    className="w-full bg-black/70 border border-white/[0.08] rounded-xl p-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 focus:outline-none transition-all resize-none font-normal leading-relaxed shadow-inner"
                  />
                  {validationWarning && (
                    <p className="mt-1.5 text-xs text-rose-400 font-medium flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationWarning}
                    </p>
                  )}
                </div>
              </div>

              {/* 4. Action Button with Framer Hover Glow */}
              <div className="pt-3 border-t border-white/[0.06]">
                <motion.button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={loading || isStreaming}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124,58,237,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2.5 transition-all text-sm shadow-xl ${
                    loading || isStreaming
                      ? 'bg-violet-950/60 cursor-not-allowed opacity-80' 
                      : 'btn-primary cursor-pointer'
                  }`}
                >
                  {loading && !isStreaming && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span className="font-mono">Connecting to Model...</span>
                    </>
                  )}
                  {isStreaming && (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span className="font-mono animate-pulse">Streaming Response Tokens...</span>
                    </>
                  )}
                  {!loading && !isStreaming && (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Execute Neural Analysis</span>
                    </>
                  )}
                </motion.button>
              </div>

            </motion.div>


            {/* ================= RIGHT CONSOLE: Workspace Inspector & Token Stream (7 Cols) ================= */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideRight}
              custom={0.2}
              className="lg:col-span-7 bg-black/60 rounded-xl p-5 sm:p-6 border border-white/[0.07] flex flex-col justify-center min-h-[460px] shadow-inner relative"
            >
              
              {/* DEFAULT STATE */}
              {!loading && !isStreaming && !analysisResult && !error && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/[0.08] rounded-xl bg-black/20">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-center mb-3 text-slate-400">
                    <MessageSquare className="w-6 h-6 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 mb-1 font-mono">
                    READY FOR EXECUTION
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed font-normal">
                    Select a domain preset on the left or paste your own review, then click <strong>Execute Neural Analysis</strong> to begin live inference.
                  </p>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="btn-secondary px-4 py-2 rounded-full text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <span>Execute Sample</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* LOADING STATE */}
              {loading && !isStreaming && (
                <div className="space-y-3 w-full">
                  <div className="flex items-center justify-between p-4 bg-black/60 rounded-xl border border-white/5">
                    <div className="h-4 w-20 skeleton-box" />
                    <div className="h-6 w-28 skeleton-box" />
                  </div>
                  <div className="p-4 bg-black/60 rounded-xl border border-white/5">
                    <div className="h-4 w-24 mb-3 skeleton-box" />
                    <div className="flex gap-2">
                      <div className="h-6 w-24 skeleton-box" />
                      <div className="h-6 w-28 skeleton-box" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/60 rounded-xl border border-white/5">
                    <div className="h-4 w-24 skeleton-box" />
                    <div className="h-6 w-32 skeleton-box" />
                  </div>
                  <div className="p-4 bg-black/60 rounded-xl border border-white/5">
                    <div className="h-4 w-36 mb-3 skeleton-box" />
                    <div className="h-16 w-full skeleton-box mb-3" />
                    <div className="h-8 w-28 skeleton-box" />
                  </div>
                  <p className="text-xs text-center text-violet-300/70 animate-pulse font-mono pt-1">
                    Establishing SSE socket connection...
                  </p>
                </div>
              )}

              {/* STREAMING STATE: Live Token Terminal */}
              {isStreaming && (
                <div className="w-full h-full flex flex-col justify-between bg-black/80 rounded-xl p-4 border-l-2 border-violet-500">
                  <div>
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/[0.06] font-mono">
                      <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                        <span>Live Neural Token Stream</span>
                      </div>
                      <span className="text-[10px] text-cyan-300">nvidia/nemotron-3-550b</span>
                    </div>
                    
                    <div 
                      ref={streamEndRef}
                      className="font-mono text-xs text-violet-200 leading-relaxed max-h-56 overflow-y-auto bg-black/90 p-3 rounded-lg border border-white/[0.05] whitespace-pre-wrap break-all shadow-inner"
                    >
                      {streamingText || "Initiating stream handshake..."}
                      <span className="inline-block w-1.5 h-3.5 bg-violet-400 ml-1 animate-pulse align-middle" />
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px]">
                    <p className="text-slate-400 italic">Validating structured JSON schema...</p>
                    <Loader2 className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                  </div>
                </div>
              )}

              {/* ERROR STATE */}
              {!isStreaming && error && (
                <div className="flex flex-col items-center justify-center text-center p-6 rounded-xl bg-rose-500/10 border border-rose-500/30">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center mb-3 text-rose-400">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-rose-200 mb-1 font-mono">
                    Pipeline Execution Error
                  </h4>
                  <p className="text-xs text-rose-300/80 max-w-sm mb-4 leading-relaxed font-mono">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Retry Request</span>
                  </button>
                </div>
              )}

              {/* RESULT STATE: AnimatePresence Staggered Cards */}
              <AnimatePresence>
                {!loading && !isStreaming && analysisResult && (
                  <div className="space-y-3 w-full">
                    
                    {/* CARD 1: SENTIMENT & SCORE */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                          Sentiment Diagnostic
                        </span>
                        <span className="text-xs text-slate-300 font-mono">
                          Polarity Score: <strong className="text-white font-bold">{analysisResult.sentimentScore || '—'} / 10</strong>
                        </span>
                      </div>
                      <div>
                        {analysisResult.sentiment?.toLowerCase() === 'positive' && (
                          <motion.span 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                            className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5"
                          >
                            <span>😊 Positive</span>
                          </motion.span>
                        )}
                        {analysisResult.sentiment?.toLowerCase() === 'neutral' && (
                          <motion.span 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                            className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono flex items-center gap-1.5"
                          >
                            <span>😐 Neutral</span>
                          </motion.span>
                        )}
                        {analysisResult.sentiment?.toLowerCase() === 'negative' && (
                          <motion.span 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                            className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono flex items-center gap-1.5"
                          >
                            <span>😤 Negative</span>
                          </motion.span>
                        )}
                      </div>
                    </motion.div>

                    {/* CARD 2: EXTRACTED ISSUES */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08]"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                        Extracted Root Failure Modes
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(analysisResult.issues) && analysisResult.issues.length > 0 ? (
                          analysisResult.issues.map((issue, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                              className="px-2.5 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-medium font-mono flex items-center gap-1"
                            >
                              <span>{getIssueEmoji(issue)}</span>
                              <span>{issue}</span>
                            </motion.span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400 italic">No specific defect identified</span>
                        )}
                      </div>
                    </motion.div>

                    {/* CARD 3: URGENCY LEVEL */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          Triage Severity
                        </span>
                        <div>
                          {analysisResult.urgency?.toLowerCase() === 'high' && (
                            <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 border border-rose-500/35 text-rose-400 text-xs font-bold font-mono">
                              🔴 High Priority
                            </span>
                          )}
                          {analysisResult.urgency?.toLowerCase() === 'medium' && (
                            <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/35 text-amber-400 text-xs font-bold font-mono">
                              🟡 Medium
                            </span>
                          )}
                          {analysisResult.urgency?.toLowerCase() === 'low' && (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/35 text-emerald-400 text-xs font-bold font-mono">
                              🟢 Low
                            </span>
                          )}
                        </div>
                      </div>
                      {analysisResult.urgencyReason && (
                        <p className="text-xs text-slate-400 italic mt-1 font-mono">
                          Rationale: {analysisResult.urgencyReason}
                        </p>
                      )}
                    </motion.div>

                    {/* CARD 4: DRAFTED EMPATHETIC RESOLUTION */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.36, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="p-4 rounded-xl bg-gradient-to-b from-violet-950/30 to-black/70 border border-violet-500/35"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                          Synthesized Owner Response
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-semibold">
                          Empathetic Owner Tone
                        </span>
                      </div>
                      
                      <div className="p-3 bg-black/70 rounded-lg border border-white/[0.06] mb-3">
                        <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed font-normal">
                          "{analysisResult.draftedResponse}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="px-3.5 py-1.5 rounded-lg bg-violet-600/30 border border-violet-500/50 hover:bg-violet-600/50 text-violet-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm font-mono"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied!</span>
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
                          className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer font-mono"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Regenerate</span>
                        </button>
                      </div>
                    </motion.div>

                  </div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
