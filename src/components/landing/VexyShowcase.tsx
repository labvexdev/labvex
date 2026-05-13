"use client";

import { motion } from "framer-motion";
import { Zap, MessageSquare, Lightbulb, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    icon: MessageSquare,
    label: "Research Summarization",
    desc: "Instantly condense complex papers into clear, actionable insights.",
  },
  {
    icon: Lightbulb,
    label: "Hypothesis Generation",
    desc: "AI-powered brainstorming from existing research threads.",
  },
  {
    icon: Network,
    label: "Researcher Matching",
    desc: "Find collaborators with aligned scientific interests.",
  },
  {
    icon: Zap,
    label: "Real-Time Streaming",
    desc: "Token-by-token streaming responses for a live AI feel.",
  },
];

export function VexyShowcase() {
  return (
    <section className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="badge badge-green mb-5">
              <Zap size={11} />
              VEXY AI Layer
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-5 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your AI Research
              <br />
              <span className="gradient-text">Co-Pilot</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
              VEXY is the AI intelligence layer woven into every part of
              LABVEX. Summarize research, generate hypotheses, explore
              datasets, and connect with scientists — all through natural
              language.
            </p>
            <div className="space-y-4 mb-10">
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(92,203,95,0.1)] border border-[rgba(92,203,95,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-[var(--green-neon)]" />
                    </div>
                    <div>
                      <p className="text-[14px] font-600 text-[var(--text-primary)]">
                        {cap.label}
                      </p>
                      <p className="text-[13px] text-[var(--text-secondary)]">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/vexy" className="btn-primary">
              Talk to VEXY
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Right — mock chat window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="glass-card p-0 overflow-hidden border-[var(--glass-border)] glow-green">
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-subtle)]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center">
                  <Zap size={14} className="text-[#0d1117]" />
                </div>
                <div>
                  <p className="text-[14px] font-600">VEXY</p>
                  <p className="text-[11px] text-[var(--green-neon)]">● Active</p>
                </div>
              </div>

              {/* Chat */}
              <div className="p-5 space-y-4 min-h-[280px]">
                <div className="vexy-message-user">
                  Summarize the latest research on telomere elongation and longevity interventions.
                </div>

                <div className="vexy-message-ai">
                  <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
                    Based on 2024–2025 research, telomere elongation studies focus on three primary mechanisms:
                  </p>
                  <ol className="mt-2 space-y-1 text-[13px] text-[var(--text-secondary)]">
                    <li><span className="text-[var(--green-neon)]">1.</span> <strong className="text-[var(--text-primary)]">TERT reactivation</strong> — controlled activation of telomerase in somatic cells</li>
                    <li><span className="text-[var(--green-neon)]">2.</span> <strong className="text-[var(--text-primary)]">ALT pathway</strong> — alternative lengthening mechanisms in cancer-free models</li>
                    <li><span className="text-[var(--green-neon)]">3.</span> <strong className="text-[var(--text-primary)]">Senolytic compounds</strong> — clearing senescent cells to reduce systemic inflammation</li>
                  </ol>
                </div>

                <div className="flex items-center gap-2 text-[12px] text-[var(--text-muted)]">
                  <span className="animate-blink">|</span>
                  <span>VEXY is analyzing 847 related papers...</span>
                </div>
              </div>

              {/* Input */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl px-4 py-3">
                  <span className="flex-1 text-[13px] text-[var(--text-muted)]">
                    Ask VEXY anything about science...
                  </span>
                  <button className="w-7 h-7 rounded-lg bg-[var(--green-neon)] flex items-center justify-center">
                    <ArrowRight size={13} className="text-[#0d1117]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating glow */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(92,203,95,0.08) 0%, transparent 70%)",
                zIndex: -1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
