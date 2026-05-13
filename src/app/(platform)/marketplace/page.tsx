"use client";

import { motion } from "framer-motion";
import { Coins, Beaker, Bot, Search, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";

const IPTS = [
  { id: "1", title: "CRISPR Base Editor Variant 4b (Off-Target Reduction)", author: "genetics_mapper", progress: 85, raised: 425000, goal: 500000, royalty: 4.5, participants: 142 },
  { id: "2", title: "Cyclic OSK Expression Protocol for Murine Models", author: "dr_chen_lab", progress: 30, raised: 150000, goal: 500000, royalty: 6.0, participants: 38 },
  { id: "3", title: "Non-Hallucinogenic Ibogaine Analog (Synthesis Pathway)", author: "neuro_synthesis", progress: 100, raised: 1200000, goal: 1200000, royalty: 3.0, participants: 310 },
];

const LAAS = [
  { id: "1", provider: "Stanford Biohub", service: "Next-Gen Sequencing (Illumina NovaSeq)", price: "2.5 SOL / run", rating: 4.9 },
  { id: "2", provider: "Broad Institute", service: "Cryo-EM Protein Structure Determination", price: "18 SOL / structure", rating: 4.8 },
];

const AGENTS = [
  { id: "1", name: "Bioinformatics Specialist", type: "Data Analysis", price: "0.1 SOL / hr", description: "Specialized in scRNA-seq analysis and spatial transcriptomics." },
  { id: "2", name: "CAS Compliance Monitor", type: "Regulation", price: "Free (Standard)", description: "Automated screening of molecular structures against WHO/FDA registries." },
];

export default function MarketplacePage() {
  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em" }}>The Economy</h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>IP Marketplace, Lab-as-a-Service, and AI Agents</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "6px 12px" }}>
          <Search size={14} style={{ color: "var(--muted)" }} />
          <input placeholder="Search assets..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: "var(--ink)", width: 140, fontFamily: "inherit" }} />
        </div>
      </div>

      {/* IP Tokens (IPTs) */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(212,175,55,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Coins size={16} style={{ color: "var(--gold)" }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>Intellectual Property Tokens (IPTs)</h2>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {IPTS.map((ipt, i) => (
            <motion.div key={ipt.id} className="card" style={{ padding: 20 }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <Link href={`/profile/${ipt.author}`} style={{ fontSize: 12, color: "var(--subtle)", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
                  @{ipt.author} <ExternalLink size={10} />
                </Link>
                <div className="badge badge-gray" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)", color: "#b48b11", fontSize: 10.5 }}>
                  {ipt.royalty}% Royalty
                </div>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 20, lineHeight: 1.4 }}>{ipt.title}</h3>
              
              <div style={{ marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="font-mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>${formatNumber(ipt.raised)}</span>
                <span style={{ fontSize: 11, color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Goal: ${formatNumber(ipt.goal)}</span>
              </div>
              <div style={{ width: "100%", height: 6, background: "var(--surface-3)", borderRadius: 3, marginBottom: 16, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${ipt.progress}%` }} transition={{ duration: 1, delay: 0.2 }} style={{ height: "100%", background: "var(--gold)", borderRadius: 3 }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{ipt.participants} backers</span>
                <button className="btn" style={{ padding: "6px 14px", background: "var(--surface-2)", border: "1px solid var(--border)", fontSize: 12.5, color: "var(--ink)" }}>
                  Fund Research
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="md:grid-cols-1">
        
        {/* Lab as a Service */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(92,203,95,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Beaker size={16} style={{ color: "var(--green-3)" }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>Lab-as-a-Service (LaaS)</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {LAAS.map(l => (
              <div key={l.id} className="card" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{l.service}</h3>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--subtle)" }}>{l.provider}</span>
                    <span style={{ fontSize: 11, color: "var(--gold)", fontWeight: 600 }}>★ {l.rating}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="font-mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{l.price}</div>
                  <button style={{ background: "none", border: "none", color: "var(--green-3)", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", cursor: "pointer" }}>
                    Request <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Agent Store */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={16} style={{ color: "#8b5cf6" }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>AI Agent Store</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {AGENTS.map(a => (
              <div key={a.id} className="card" style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{a.name}</h3>
                  <span className="font-mono" style={{ fontSize: 12, color: "#8b5cf6", fontWeight: 600 }}>{a.price}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 12, lineHeight: 1.5 }}>{a.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="badge badge-gray" style={{ fontSize: 10.5 }}>{a.type}</span>
                  <button className="btn" style={{ padding: "4px 12px", background: "var(--surface)", border: "1px solid var(--border)", fontSize: 12, color: "var(--ink)" }}>
                    Deploy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
