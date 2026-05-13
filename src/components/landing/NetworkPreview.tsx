"use client";

import { motion } from "framer-motion";

const POSTS = [
  {
    author: "Dr. Sarah Chen",
    role: "Computational Biology · Stanford",
    tag: "Longevity",
    title: "Epigenetic reprogramming extends healthspan in aged murine models without oncogenic transformation",
    summary: "Partial reprogramming via Oct4/Sox2/Klf4 cycling restores youthful gene expression signatures in aged mice, demonstrating a 34% improvement in metabolic markers.",
    upvotes: 142,
    time: "3h ago",
  },
  {
    author: "Marcus Reyes",
    role: "Neuroscience · MIT",
    tag: "Neurodegenerative",
    title: "AAV-mediated CRISPR base editing corrects APOE4 variant in post-mitotic neurons",
    summary: "Single-nucleotide precision editing in primary neuron cultures achieves 78% efficiency with minimal off-target activity, validated by long-read sequencing.",
    upvotes: 89,
    time: "7h ago",
  },
];

export function NetworkPreview() {
  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container px-6" style={{ maxWidth: 1160, margin: "0 auto" }}>

        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pill pill-green mb-6" style={{ display: "inline-flex" }}>Scientific Network</div>
          <h2 className="display-lg mb-4">
            Research, <span className="gradient-text">in motion.</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 480, margin: "0 auto" }}>
            The global scientific community — distilled into a precision feed.
            No noise. No vanity metrics. Just verified science.
          </p>
        </motion.div>

        {/* Feed preview */}
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {POSTS.map((post, i) => (
            <motion.div
              key={i}
              className="card"
              style={{ padding: "1.75rem 2rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: i === 0 ? "linear-gradient(135deg,#5ccb5f,#2e8b57)" : "linear-gradient(135deg,#78d96b,#5ccb5f)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)" }}>{post.author}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{post.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="pill pill-green" style={{ fontSize: 11 }}>{post.tag}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{post.time}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.45, letterSpacing: "-0.01em" }}>
                {post.title}
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.65 }}>{post.summary}</p>

              <div className="flex items-center gap-5 mt-5" style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 11l5-5 5 5M7 17l5-5 5 5" /></svg>
                  {post.upvotes}
                </button>
                <button style={{ fontSize: 12, color: "var(--green-deep)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                  AI Summary
                </button>
                <button style={{ fontSize: 12, color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>
                  Cite
                </button>
              </div>
            </motion.div>
          ))}

          {/* Blur fade */}
          <div style={{ position: "relative", height: 80, marginTop: -20, background: "linear-gradient(to bottom, transparent, var(--bg-primary))", pointerEvents: "none" }} />
        </div>
      </div>
    </section>
  );
}
