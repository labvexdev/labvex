"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Send, RefreshCw, Lightbulb, FileText, Network, BookOpen, Sparkles } from "lucide-react";
import type { VexyMessage } from "@/lib/types";

const SUGGESTIONS = [
  { icon: FileText, label: "Summarize research", prompt: "Summarize the latest findings on CRISPR gene editing safety in clinical trials." },
  { icon: Lightbulb, label: "Generate hypothesis", prompt: "Generate a testable hypothesis about the relationship between gut microbiome diversity and cognitive decline." },
  { icon: Network, label: "Find researchers", prompt: "Who are the leading researchers in longevity science working on senolytic compounds?" },
  { icon: BookOpen, label: "Explain concept", prompt: "Explain epigenetic clocks and how they measure biological aging." },
];

function TypingIndicator() {
  return (
    <div className="vexy-message-ai flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[var(--green-neon)]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export default function VexyPage() {
  const [messages, setMessages] = useState<VexyMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello. I'm **VEXY**, your AI research co-pilot on LABVEX.\n\nI can help you summarize scientific papers, generate research hypotheses, find relevant researchers, and explore complex scientific concepts.\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: VexyMessage = { id: Date.now().toString(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1400));

    const aiMsg: VexyMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `Based on my analysis of the LABVEX research network and connected scientific databases:\n\n**Key findings:**\n- Current research indicates significant progress in this area across 847 indexed papers\n- The leading methodology involves combining computational modeling with wet-lab validation\n- Community consensus suggests a 3-tier verification approach is most reliable\n\n*To get a real AI response, connect your OpenAI API key in the environment variables.*`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="container-platform py-8 h-[calc(100vh-56px)] flex flex-col">
      <div className="flex gap-8 h-full">
        {/* Chat column */}
        <div className="flex-1 flex flex-col min-w-0 glass-card p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--border-subtle)]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center">
              <Zap size={18} className="text-[#0d1117]" />
            </div>
            <div>
              <h1 className="text-[16px] font-bold" style={{ fontFamily: "var(--font-display)" }}>VEXY AI</h1>
              <p className="text-[12px] text-[var(--green-neon)]">● Online · Research Mode</p>
            </div>
            <button onClick={() => setMessages([{ id: "welcome", role: "assistant", content: "New session started. What would you like to research?", timestamp: new Date() }])} className="ml-auto btn-ghost text-[13px]">
              <RefreshCw size={14} />New Session
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center shrink-0 mr-2.5 mt-0.5">
                      <Zap size={12} className="text-[#0d1117]" />
                    </div>
                  )}
                  <div className={msg.role === "user" ? "vexy-message-user" : "vexy-message-ai"}>
                    <p
                      className="text-[14px] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                    />
                    <p className="text-[11px] text-[var(--text-muted)] mt-2">
                      {msg.timestamp.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center shrink-0 mr-2.5">
                    <Zap size={12} className="text-[#0d1117]" />
                  </div>
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-5 pb-5 pt-3 border-t border-[var(--border-subtle)]">
            <div className="flex items-end gap-3">
              <textarea
                className="input-field flex-1 resize-none text-[14px] min-h-[48px] max-h-32 py-3"
                placeholder="Ask VEXY anything about science, research, or data..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="btn-primary p-3 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-2 text-center">
              VEXY analyses the LABVEX research network. Responses are AI-generated — verify critical findings.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <aside className="w-72 shrink-0 hidden lg:flex flex-col gap-4">
          {/* Capabilities */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-[var(--green-neon)]" />
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Quick Prompts</h3>
            </div>
            <div className="space-y-2">
              {SUGGESTIONS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    onClick={() => sendMessage(s.prompt)}
                    className="w-full text-left p-3 rounded-xl border border-[var(--border-subtle)] hover:border-[rgba(92,203,95,0.3)] hover:bg-[rgba(92,203,95,0.05)] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className="text-[var(--text-muted)] group-hover:text-[var(--green-neon)] transition-colors" />
                      <span className="text-[13px] font-medium group-hover:text-[var(--text-primary)] transition-colors">{s.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context */}
          <div className="glass-card p-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">VEXY Context</h3>
            <div className="space-y-3">
              {[
                { label: "Papers Indexed", value: "847K+" },
                { label: "Research Threads", value: "18,400" },
                { label: "Model Version", value: "GPT-4o" },
                { label: "Response Mode", value: "Streaming" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-[var(--text-muted)]">{item.label}</span>
                  <span className="text-[13px] font-medium text-[var(--text-primary)]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 rounded-xl border border-[rgba(255,200,0,0.15)] bg-[rgba(255,200,0,0.04)]">
            <p className="text-[12px] text-[#fbbf24] leading-relaxed">
              VEXY is an AI assistant. Always verify scientific claims against primary literature. Do not use for medical decisions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
