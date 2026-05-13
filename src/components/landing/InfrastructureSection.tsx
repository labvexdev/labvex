"use client";

import { motion } from "framer-motion";
import { Rss, Brain, Award, Network } from "lucide-react";

const CARDS = [
  {
    icon: Rss,
    title: "Scientific Feed",
    body: "A curated, AI-filtered stream of peer research. Summaries, tagging, and collaborative annotation — no noise, only signal.",
    tag: "Social layer",
    color: "#5ccb5f",
  },
  {
    icon: Brain,
    title: "VEXY AI",
    body: "Your embedded research co-pilot. Hypothesis generation, paper summarisation, dataset analysis — scientific intelligence on demand.",
    tag: "AI engine",
    color: "#2e8b57",
  },
  {
    icon: Award,
    title: "Reputation Layer",
    body: "Earn provable scientific standing through verified contributions. On-chain soulbound credentials with tiered progression.",
    tag: "Identity",
    color: "#78d96b",
  },
  {
    icon: Network,
    title: "Research Network",
    body: "Connect with scientists, datasets, and institutions globally. Decentralised collaboration with Solana-backed attestations.",
    tag: "Infrastructure",
    color: "#5ccb5f",
  },
];

export function InfrastructureSection() {
  return (
    <section className="section" style={{ background: "var(--bg-primary)" }}>
      <div className="container px-6" style={{ maxWidth: 1160, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pill pill-green mb-6" style={{ display: "inline-flex" }}>Core Infrastructure</div>
          <h2 className="display-lg mb-4">
            Four primitives.<br />
            <span className="gradient-text">One operating system.</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 520, margin: "0 auto" }}>
            Every layer of LABVEX is purpose-built for science.
            From social discovery to on-chain verification.
          </p>
        </motion.div>

        {/* Cards — 2×2 grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                className="card"
                style={{ padding: "2.5rem" }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: "var(--shadow-lg)" }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${card.color}14`,
                      border: `1px solid ${card.color}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={22} style={{ color: card.color }} />
                  </div>
                  <span className="pill pill-gray">{card.tag}</span>
                </div>

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10, letterSpacing: "-0.02em" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
