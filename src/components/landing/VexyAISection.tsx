"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const MESSAGES = [
  { role: "user", text: "Summarise the key findings on CRISPR base editing in neurodegenerative disease models." },
  {
    role: "vexy",
    text: "Base editing studies in 2023–24 demonstrate high-efficiency correction of pathogenic SNVs in post-mitotic neurons without double-strand breaks. The key findings include...",
    partial: true,
  },
];

export function VexyAISection() {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="container px-6" style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — UI panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="card"
              style={{ padding: 0, overflow: "hidden", boxShadow: "var(--shadow-lg)" }}
            >
              {/* Panel header */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid var(--border)",
                  background: "var(--bg-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Sparkles size={13} style={{ color: "#fff" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>VEXY</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)" }}>AI Research Co-pilot</p>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                  {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div style={{ padding: "1.5rem", background: "var(--bg-primary)", minHeight: 240 }}>
                {MESSAGES.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 16,
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "0.75rem 1rem",
                        borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: msg.role === "user" ? "var(--text-primary)" : "var(--bg-secondary)",
                        color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                        fontSize: 13,
                        lineHeight: 1.6,
                        border: msg.role === "vexy" ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {msg.text}
                      {msg.partial && (
                        <span style={{ display: "inline-block", width: 2, height: 13, background: "#5ccb5f", marginLeft: 3, animation: "pulse 1s infinite", verticalAlign: "text-bottom", borderRadius: 1 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div
                style={{
                  padding: "0.875rem 1.25rem",
                  borderTop: "1px solid var(--border)",
                  background: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: "0.625rem 0.875rem",
                    borderRadius: 24,
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-medium)",
                    fontSize: 13,
                    color: "var(--text-muted)",
                  }}
                >
                  Ask VEXY anything about your research...
                </div>
                <button
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "var(--green-primary)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowRight size={14} style={{ color: "#fff" }} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="pill pill-green mb-6" style={{ display: "inline-flex" }}>
              <Sparkles size={11} /> VEXY AI
            </div>
            <h2 className="display-lg mb-5 text-balance">
              Your research.<br />
              <span className="gradient-text">Amplified by AI.</span>
            </h2>
            <p className="body-lg mb-8" style={{ maxWidth: 420 }}>
              VEXY is not a generic chatbot. It is a purpose-built scientific intelligence
              layer that understands your domain, accelerates your thinking, and
              connects your work to the global research ecosystem.
            </p>

            <div className="flex flex-col gap-4 mb-10">
              {[
                "Paper summarisation in seconds",
                "Hypothesis generation from datasets",
                "Cross-domain research connections",
                "Methodology critique and improvement",
              ].map((feat) => (
                <div key={feat} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 6, background: "var(--green-light)", border: "1px solid var(--green-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-primary)" }} />
                  </div>
                  <span style={{ fontSize: 14.5, color: "var(--text-secondary)" }}>{feat}</span>
                </div>
              ))}
            </div>

            <Link href="/vexy" className="btn-primary" style={{ fontSize: 15 }}>
              Try VEXY <ArrowRight size={15} />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
