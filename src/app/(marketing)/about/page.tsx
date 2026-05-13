"use client";

import { motion } from "framer-motion";
import { Microscope, Dna, Brain, Globe, Zap, ArrowRight, Github, Shield, Cpu } from "lucide-react";
import Link from "next/link";

const ROADMAP = [
  { phase: "Phase 1", title: "Scientific Social Layer", status: "live", items: ["Scientific Feed", "VEXY AI Assistant", "User Profiles & Reputation", "Community Missions", "Wallet Onboarding"] },
  { phase: "Phase 2", title: "Deep Research Infrastructure", status: "upcoming", items: ["On-chain Reputation (Soulbound)", "Dataset Sharing Protocol", "Peer Review Attestations", "Research Collaboration Spaces", "ZK Identity Verification"] },
  { phase: "Phase 3", title: "Decentralized IP Layer", status: "future", items: ["Scientific IP Marketplace", "DAO Research Governance", "Community Grant System", "Cross-chain Interoperability", "Autonomous AI Lab Agents"] },
];

const TEAM = [
  { name: "Core Team", role: "Building LABVEX", description: "Researchers, engineers, and DeSci pioneers from biotech, AI, and Web3 backgrounds." },
  { name: "Scientific Advisors", role: "Domain Expertise", description: "PhD researchers and lab scientists across genetics, neuroscience, longevity, and AI." },
  { name: "Open Contributors", role: "Community", description: "Early scientists, developers, and DeSci builders helping shape the ecosystem." },
];

const STATUS_COLOR = { live: "#5ccb5f", upcoming: "#60a5fa", future: "#a78bfa" } as const;
const STATUS_BG = { live: "rgba(92,203,95,0.1)", upcoming: "rgba(96,165,250,0.1)", future: "rgba(167,139,250,0.1)" } as const;

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(92,203,95,0.08) 0%, transparent 65%)" }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="badge badge-green mx-auto mb-6"><Microscope size={11} />About LABVEX</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Science Deserves a <span className="gradient-text">Better OS</span>
            </h1>
            <p className="text-[var(--text-secondary)] text-xl max-w-2xl mx-auto mb-5 leading-relaxed">
              The current scientific publishing system is slow, opaque, and centralised. Research is locked behind paywalls. Data is siloed. Credit is misattributed. Reproducibility is broken.
            </p>
            <p className="text-[var(--text-primary)] text-lg max-w-2xl mx-auto font-medium">
              LABVEX is built to change that. Not incrementally — fundamentally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6 border-y border-[var(--border-subtle)] bg-[var(--bg-graphite)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Shield, title: "Don't Trust Papers", body: "Trust is earned through reproducibility, data transparency, and community verification — not journal prestige.", color: "#f59e0b" },
              { icon: Cpu, title: "Verify Data", body: "Every claim on LABVEX is checkable. AI assists validation. Community confirms. On-chain attestations make truth permanent.", color: "#5ccb5f" },
              { icon: Globe, title: "Own Discovery", body: "Scientists should own their contributions. Decentralized identity, on-chain reputation, and future IP infrastructure give researchers real ownership.", color: "#a78bfa" },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: `${p.color}14`, border: `1px solid ${p.color}28` }}>
                    <Icon size={24} style={{ color: p.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
                  <p className="text-[var(--text-secondary)] text-[14px] leading-relaxed">{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why DeSci */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge badge-green mb-5"><Dna size={11} />Why DeSci</div>
              <h2 className="text-4xl font-bold mb-5" style={{ fontFamily: "var(--font-display)" }}>
                Science is the Most Important Thing <span className="gradient-text">Humans Do</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-4">
                Every major advance in human health, longevity, and understanding of the universe comes from science. Yet the infrastructure supporting it is fundamentally broken.
              </p>
              <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed mb-4">
                Peer review is slow and biased. Data sharing is rare. Credit systems fail junior researchers. Paywalls block access to publicly-funded research. Reproducibility crises undermine entire fields.
              </p>
              <p className="text-[var(--text-primary)] text-[15px] leading-relaxed font-medium">
                Decentralized science — DeSci — is the movement to rebuild this infrastructure on open, verifiable, and community-owned foundations.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { stat: "70%", label: "of studies cannot be reproduced", color: "#f87171" },
                { stat: "$10K+", label: "average cost to publish one paper", color: "#f59e0b" },
                { stat: "18 months", label: "average peer review timeline", color: "#60a5fa" },
                { stat: "85%", label: "of research data is never shared", color: "#a78bfa" },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 flex items-center gap-4">
                  <span className="text-2xl font-bold shrink-0" style={{ color: item.color, fontFamily: "var(--font-display)" }}>{item.stat}</span>
                  <span className="text-[14px] text-[var(--text-secondary)]">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20 px-6 border-y border-[var(--border-subtle)] bg-[var(--bg-graphite)]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="badge badge-green mx-auto mb-4"><Brain size={11} />Technology</div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Built on the Best <span className="gradient-text">Infrastructure</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Solana", desc: "High-performance L1 blockchain for decentralized identity and attestations", color: "#9945ff" },
              { label: "OpenAI", desc: "GPT-4o powering VEXY AI research assistant and summarization", color: "#10a37f" },
              { label: "Supabase", desc: "Real-time PostgreSQL database with row-level security", color: "#3ecf8e" },
              { label: "Helius", desc: "Solana RPC infrastructure for reliable on-chain data access", color: "#f97316" },
              { label: "Next.js 15", desc: "App Router with server components for optimal performance", color: "#ffffff" },
              { label: "Framer Motion", desc: "Production-grade animations for premium UI experience", color: "#bb4df1" },
              { label: "Pinecone", desc: "Vector database for RAG-ready AI architecture (Phase 2)", color: "#61dac9" },
              { label: "Vercel", desc: "Edge deployment with global CDN for sub-100ms responses", color: "#ffffff" },
            ].map((tech) => (
              <motion.div key={tech.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card p-4 text-center hover:border-[rgba(92,203,95,0.2)] transition-colors">
                <p className="text-[15px] font-bold mb-1" style={{ color: tech.color, fontFamily: "var(--font-display)" }}>{tech.label}</p>
                <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="badge badge-green mx-auto mb-4">Roadmap</div>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>The Path <span className="gradient-text">Forward</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {ROADMAP.map((phase, i) => (
              <motion.div key={phase.phase} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">{phase.phase}</span>
                  <span className="badge text-[11px] font-semibold" style={{ background: STATUS_BG[phase.status as keyof typeof STATUS_BG], color: STATUS_COLOR[phase.status as keyof typeof STATUS_COLOR], border: `1px solid ${STATUS_COLOR[phase.status as keyof typeof STATUS_COLOR]}30` }}>
                    {phase.status === "live" ? "● Live" : phase.status === "upcoming" ? "Coming Soon" : "Future"}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
                      <span className="text-[var(--green-neon)] mt-0.5 shrink-0">→</span>{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-[var(--border-subtle)] bg-[var(--bg-graphite)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Build the Future of <span className="gradient-text">Science</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              LABVEX is open to scientists, builders, and anyone who believes in the power of decentralized knowledge.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/onboarding" className="btn-primary text-base px-8 py-3.5">Enter Ecosystem <ArrowRight size={16} /></Link>
              <a href="https://github.com/labvex" target="_blank" rel="noopener noreferrer" className="btn-secondary text-base px-8 py-3.5">
                <Github size={16} />GitHub
              </a>
            </div>
            <div className="flex items-center justify-center gap-5">
              <a href="https://x.com/labvex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <Globe size={15} />@labvex
              </a>
              <a href="https://github.com/labvex" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[14px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <Github size={15} />github.com/labvex
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
