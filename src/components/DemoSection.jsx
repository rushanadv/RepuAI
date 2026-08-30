import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Sparkles, 
  Star, 
  Copy, 
  Check, 
  RotateCw, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { sampleReviews } from '../data/sampleReviews';
import { slideLeft, slideRight, getVariants, EASE } from '../lib/animations';
import MagneticButton from './MagneticButton';

export default function DemoSection() {
  const prefersReduced = useReducedMotion();
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

  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollTop = streamEndRef.current.scrollHeight;
    }
  }, [streamingText]);

  const categories = [
    { id: 'restaurant', label: 'RESTAURANT' },
    { id: 'ecommerce', label: 'E-COMMERCE' },
    { id: 'hotel', label: 'HOSPITALITY' },
    { id: 'app', label: 'MOBILE APP' },
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
      buffer = lines.pop();

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
            setStreamingText(fullText);
          }
        } catch {
          // ignore malformed chunks
        }
      }
    }

    setIsStreaming(false);

    const cleaned = fullText
      .replace(/```json/gi, "")
      .replace(/```/gi, "")
      .trim();

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

  return (
    <section id="demo" className="relative py-28 sm:py-36 px-6 sm:px-8 bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Full-Width Large Editorial Header */}
        <div className="mb-20">
          <div className="font-mono text-[10px] text-[var(--text-2)] tracking-[0.2em] uppercase mb-4">
            // INTERACTIVE NEURAL STUDIO
          </div>

          <h2 className="text-[clamp(48px,6vw,96px)] font-display font-bold text-[var(--text-1)] tracking-[-0.04em] leading-[0.92]">
            TRY IT LIVE.
          </h2>

          <p className="font-mono text-[11px] text-[var(--text-2)] mt-4 tracking-wider uppercase">
            Real AI. Real reviews. No scripts.
          </p>
        </div>

        {/* 2-Column Unboxed Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ================= LEFT PANEL: Inputs (6 Cols) ================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={getVariants(slideLeft, prefersReduced)}
            className="lg:col-span-6 border-l-2 border-[var(--accent)] pl-6 sm:pl-8 space-y-8"
          >
            {/* 1. Square Category Pills */}
            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-[var(--text-3)] mb-3">
                01 // SELECT DOMAIN
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-3.5 py-2 rounded-[4px] font-mono text-[11px] tracking-[0.05em] transition-all cursor-pointer border ${
                        isSelected
                          ? 'border-[var(--accent)] text-[var(--text-1)] bg-purple-500/10'
                          : 'border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Sample Review Strips */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-3)]">
                  02 // CHOOSE SAMPLE PAYLOAD
                </label>
                <span className="font-mono text-[9px] text-[var(--accent)]">Click to populate</span>
              </div>
              
              <div className="space-y-2">
                {sampleReviews[selectedCategory]?.map((sample, idx) => {
                  const isCurrent = reviewInput === sample.text;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectSample(sample.text)}
                      className={`p-3 border-l-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'border-l-[var(--accent)] bg-purple-500/[0.04]'
                          : 'border-l-[var(--border)] hover:border-l-white/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] font-bold text-slate-300">
                          {sample.author}
                        </span>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className={`w-2.5 h-2.5 ${
                                starIdx < sample.stars
                                  ? 'fill-current text-amber-400'
                                  : 'text-slate-800'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[12px] text-[var(--text-2)] line-clamp-2 leading-relaxed">
                        "{sample.text}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Raw Payload Textarea */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-3)]">
                  03 // REVIEW PAYLOAD
                </label>
                <span className="font-mono text-[9px] text-[var(--text-3)]">
                  {reviewInput.length} CHARS
                </span>
              </div>
              <textarea
                value={reviewInput}
                onChange={(e) => {
                  setReviewInput(e.target.value);
                  if (validationWarning) setValidationWarning('');
                }}
                rows={4}
                className="w-full bg-black/40 border border-[var(--border)] rounded-[4px] p-3.5 text-xs text-[var(--text-1)] placeholder-[var(--text-3)] focus:border-[var(--accent)] focus:outline-none transition-colors font-mono leading-relaxed"
                placeholder="Paste customer review here..."
              />
              {validationWarning && (
                <p className="mt-2 font-mono text-[10px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {validationWarning}
                </p>
              )}
            </div>

            {/* 4. Action Button (Full-width, 52px height) */}
            <div>
              <MagneticButton
                onClick={handleAnalyze}
                className={`w-full h-[52px] rounded-[6px] font-display font-bold text-sm tracking-[0.02em] text-white flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  loading || isStreaming
                    ? 'bg-purple-950/60 opacity-80 cursor-wait'
                    : 'bg-[var(--accent)] hover:bg-violet-600 shadow-lg'
                }`}
              >
                {loading && !isStreaming && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span className="font-mono text-xs">CONNECTING TO NEMOTRON 550B...</span>
                  </>
                )}
                {isStreaming && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                    <span className="font-mono text-xs">STREAMING RESPONSE TOKENS...</span>
                  </>
                )}
                {!loading && !isStreaming && (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>EXECUTE NEURAL ANALYSIS</span>
                  </>
                )}
              </MagneticButton>
            </div>

          </motion.div>

          {/* ================= RIGHT PANEL: Terminal & Unboxed Results (6 Cols) ================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={getVariants(slideRight, prefersReduced)}
            custom={0.2}
            className="lg:col-span-6 border-l border-[var(--border)] pl-6 sm:pl-8 min-h-[460px] flex flex-col justify-start"
          >
            
            {/* DEFAULT STATE */}
            {!loading && !isStreaming && !analysisResult && !error && (
              <div className="py-16 text-left">
                <span className="font-mono text-[9px] text-[var(--text-3)] tracking-widest uppercase block mb-3">
                  SYSTEM STATUS // IDLE
                </span>
                <h4 className="text-xl font-display font-bold text-[var(--text-1)] mb-2">
                  Awaiting Input Payload
                </h4>
                <p className="text-xs text-[var(--text-2)] max-w-sm leading-relaxed mb-6 font-normal">
                  Select a domain sample or paste any review on the left, then click <strong>Execute Neural Analysis</strong> to stream inferences.
                </p>
                <div className="font-mono text-[10px] text-[var(--text-3)] border-t border-[var(--border)] pt-4 space-y-1">
                  <p>• Meta LLaMA 3.3 70B & NVIDIA Nemotron 550B</p>
                  <p>• Server-Sent Events (SSE) token protocol</p>
                </div>
              </div>
            )}

            {/* STREAMING STATE: Raw JSON Monospace Terminal */}
            {isStreaming && (
              <div className="w-full py-4 space-y-3">
                <div className="flex items-center justify-between font-mono text-[9px] text-[var(--text-2)] pb-2 border-b border-[var(--border)]">
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                    STREAMING RAW TOKEN PROTOCOL
                  </span>
                  <span>nvidia/nemotron-3-550b</span>
                </div>

                <div 
                  ref={streamEndRef}
                  className="font-mono text-[11px] text-[var(--accent)] leading-relaxed max-h-[320px] overflow-y-auto bg-black/60 p-4 border border-[var(--border)] rounded-[4px] whitespace-pre-wrap break-all"
                >
                  {streamingText || "Initiating SSE socket handshake..."}
                  <span className="inline-block w-1.5 h-3.5 bg-purple-400 ml-1 animate-pulse align-middle" />
                </div>
              </div>
            )}

            {/* ERROR STATE */}
            {!isStreaming && error && (
              <div className="py-8">
                <div className="p-4 border border-rose-500/30 bg-rose-500/[0.04] rounded-[4px] mb-4">
                  <div className="font-mono text-[11px] font-bold text-rose-400 mb-1">
                    EXECUTION FAILED
                  </div>
                  <p className="font-mono text-[10px] text-rose-300/80 leading-relaxed">
                    {error}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="font-mono text-[10px] text-[var(--text-2)] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>RETRY INFERENCE REQUEST</span>
                </button>
              </div>
            )}

            {/* RESULT STATE: Unboxed Border-Bottom Rows with AnimatePresence */}
            <AnimatePresence>
              {!loading && !isStreaming && analysisResult && (
                <div className="w-full divide-y divide-[var(--border)]">
                  
                  {/* ROW 1: SENTIMENT & POLARITY */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="py-5"
                  >
                    <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-widest block mb-1">
                      01 // SENTIMENT DIAGNOSTIC
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-[var(--text-1)] font-display">
                        Polarity: <strong className="font-mono text-purple-300">{analysisResult.sentimentScore || '—'} / 10</strong>
                      </span>

                      <div>
                        {analysisResult.sentiment?.toLowerCase() === 'positive' && (
                          <span className="font-mono text-[10px] font-bold text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-[4px] bg-emerald-500/10">
                            POSITIVE
                          </span>
                        )}
                        {analysisResult.sentiment?.toLowerCase() === 'neutral' && (
                          <span className="font-mono text-[10px] font-bold text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-[4px] bg-amber-500/10">
                            NEUTRAL
                          </span>
                        )}
                        {analysisResult.sentiment?.toLowerCase() === 'negative' && (
                          <span className="font-mono text-[10px] font-bold text-rose-400 border border-rose-500/30 px-2.5 py-1 rounded-[4px] bg-rose-500/10">
                            NEGATIVE
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* ROW 2: IDENTIFIED DEFECTS */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                    className="py-5"
                  >
                    <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-widest block mb-2">
                      02 // ROOT FAILURE MODES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(analysisResult.issues) && analysisResult.issues.length > 0 ? (
                        analysisResult.issues.map((issue, idx) => (
                          <span
                            key={idx}
                            className="font-mono text-[10px] px-2.5 py-1 rounded-[4px] bg-white/[0.04] border border-[var(--border)] text-slate-200"
                          >
                            {issue}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500 italic">No specific failure mode detected</span>
                      )}
                    </div>
                  </motion.div>

                  {/* ROW 3: URGENCY & REASON */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
                    className="py-5"
                  >
                    <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-widest block mb-1">
                      03 // TRIAGE SEVERITY
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold uppercase text-[var(--text-1)]">
                        {analysisResult.urgency === 'high' ? '🔴 HIGH PRIORITY ESCALATION' : analysisResult.urgency === 'medium' ? '🟡 MEDIUM' : '🟢 LOW'}
                      </span>
                      {analysisResult.urgencyReason && (
                        <span className="font-mono text-[10px] text-[var(--text-2)] italic">
                          {analysisResult.urgencyReason}
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* ROW 4: DRAFTED OWNER RESOLUTION */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
                    className="py-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-widest">
                        04 // SYNTHESIZED OWNER RESOLUTION
                      </span>
                      <span className="font-mono text-[9px] text-purple-400">
                        EMPATHETIC OWNER VOICE
                      </span>
                    </div>

                    <p className="text-[13px] text-slate-200 leading-relaxed italic mb-4">
                      "{analysisResult.draftedResponse}"
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="font-mono text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-[4px] bg-white/[0.05] hover:bg-white/[0.1] border border-[var(--border)] text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">COPIED TO CLIPBOARD</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-purple-400" />
                            <span>COPY RESPONSE</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleAnalyze}
                        className="font-mono text-[10px] text-[var(--text-3)] hover:text-[var(--text-2)] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>REGENERATE</span>
                      </button>
                    </div>
                  </motion.div>

                </div>
              )}
            </AnimatePresence>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
