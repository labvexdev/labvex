"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, RefreshCw, Lightbulb, FileText, Network, BookOpen, Check } from "lucide-react";

const PROMPTS = [
  { icon: FileText, label: "Summarise research", prompt: "Summarise the latest findings on CRISPR gene editing safety in clinical trials." },
  { icon: Lightbulb, label: "Generate hypothesis", prompt: "Generate a testable hypothesis about gut microbiome diversity and cognitive decline." },
  { icon: Network, label: "Find researchers", prompt: "Who are the leading researchers working on senolytic compounds for longevity?" },
  { icon: BookOpen, label: "Explain concept", prompt: "Explain epigenetic clocks and how they measure biological age." },
];

const WELCOME = "Hello. I'm **VEXY**, your AI research co-pilot on LABVEX.\n\nI can summarise scientific papers, generate research hypotheses, find relevant researchers, and explore complex scientific concepts.\n\nWhat would you like to explore today?";

function format(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/\n/g, "<br/>");
}

type Msg = { id: string; role: "user" | "assistant"; content: string; time: Date };

export default function VexyPage() {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: "0", role: "assistant", content: WELCOME, time: new Date() }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { id: Date.now().toString(), role: "user", content: text, time: new Date() };
    setMsgs(p => [...p, userMsg]);
    setInput("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const aiMsg: Msg = {
      id: (Date.now() + 1).toString(), role: "assistant", time: new Date(),
      content: `Based on current literature indexed across the LABVEX research network:\n\n**Key findings:**\n- Significant progress in this area over 2023–24, with 847K+ papers indexed\n- Leading methodology combines computational modelling with wet-lab validation\n- Community consensus favours a 3-tier verification approach\n\n*Connect your OpenAI API key in Vercel environment variables to enable live AI responses.*`,
    };
    setMsgs(p => [...p, aiMsg]);
    setLoading(false);
  }

  return (
    <div style={{ height: "calc(100vh - 56px)", display: "flex", overflow: "hidden" }}>
      {/* Chat panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--surface)" }}>
        {/* Header */}
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, background: "var(--surface)", flexShrink: 0 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={17} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>VEXY AI</h1>
            <p style={{ fontSize: 12, color: "var(--green-3)", fontWeight: 500 }}>● Research Co-pilot · GPT-4o</p>
          </div>
          <button onClick={() => setMsgs([{ id: "0", role: "assistant", content: "New session started. What would you like to research?", time: new Date() }])}
            style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, fontSize: 13, color: "var(--muted)", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
            <RefreshCw size={12} />New Session
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <AnimatePresence initial={false}>
            {msgs.map(m => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
                style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
                {m.role === "assistant" && (
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Sparkles size={12} color="#fff" />
                  </div>
                )}
                <div style={{ maxWidth: "76%", padding: "11px 15px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? "var(--ink)" : "var(--surface-2)", color: m.role === "user" ? "#fff" : "var(--ink)", fontSize: 14, lineHeight: 1.65, border: m.role === "assistant" ? "1px solid var(--border)" : "none" }}>
                  <p dangerouslySetInnerHTML={{ __html: format(m.content) }} />
                  <p style={{ fontSize: 11, color: m.role === "user" ? "rgba(255,255,255,0.5)" : "var(--subtle)", marginTop: 8 }}>
                    {m.time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Sparkles size={12} color="#fff" />
                </div>
                <div style={{ padding: "11px 15px", background: "var(--surface-2)", borderRadius: "16px 16px 16px 4px", border: "1px solid var(--border)", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }}
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", background: "var(--surface)", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder="Ask VEXY anything about science, research, or data…" rows={1}
              style={{ flex: 1, resize: "none", border: "1px solid var(--border-2)", borderRadius: 12, padding: "11px 15px", fontSize: 14, color: "var(--ink)", background: "var(--surface-2)", outline: "none", fontFamily: "inherit", lineHeight: 1.5, maxHeight: 120 }} />
            <button onClick={() => send(input)} disabled={!input.trim() || loading}
              style={{ width: 42, height: 42, borderRadius: 12, background: input.trim() ? "var(--ink)" : "var(--surface-3)", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
              <Send size={16} color={input.trim() ? "#fff" : "var(--subtle)"} />
            </button>
          </div>
          <p style={{ fontSize: 11.5, color: "var(--subtle)", marginTop: 8, textAlign: "center" }}>VEXY analyses the LABVEX research network. Verify critical findings against primary literature.</p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 280, borderLeft: "1px solid var(--border)", background: "var(--surface-2)", display: "flex", flexDirection: "column", gap: 0, overflowY: "auto" }} className="hidden lg:flex">
        {/* Quick prompts */}
        <div style={{ padding: "20px 18px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Quick Prompts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PROMPTS.map(p => {
              const Icon = p.icon;
              return (
                <button key={p.label} onClick={() => send(p.prompt)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(92,203,95,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(92,203,95,0.04)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}>
                  <Icon size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink-2)" }}>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: "20px 18px", borderBottom: "1px solid var(--border)" }}>
          <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>VEXY Context</h3>
          {[["Papers Indexed", "847K+"], ["Research Threads", "18,400"], ["Model", "GPT-4o"], ["Mode", "Streaming SSE"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Capabilities */}
        <div style={{ padding: "20px 18px" }}>
          <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Capabilities</h3>
          {["Paper summarisation", "Hypothesis generation", "Methodology critique", "Cross-domain connections", "Dataset analysis"].map(c => (
            <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(92,203,95,0.1)", border: "1px solid rgba(92,203,95,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={10} style={{ color: "var(--green-3)" }} />
              </div>
              <span style={{ fontSize: 13, color: "var(--ink-2)" }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
