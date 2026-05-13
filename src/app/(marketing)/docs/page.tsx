"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Code, ShieldCheck } from "lucide-react";
import Link from "next/link";

const DOCS_NAV = [
  { title: "Introduction", links: ["What is LABVEX?", "The Scientific Hub", "Identity Terminal"] },
  { title: "Economy", links: ["Reputation Decay", "IP Marketplace (IPTs)", "Lab-as-a-Service (LaaS)"] },
  { title: "AI & Verification", links: ["VEXY AI Matchmaker", "CAS Screening", "Informed Consent Protocol"] },
];

export default function DocsPage() {
  return (
    <div style={{ paddingTop: 120, paddingBottom: 96 }}>
      <div className="wrap" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>
        
        {/* Sidebar */}
        <aside style={{ width: 240, flexShrink: 0, position: "sticky", top: 100 }} className="hidden md:block">
          {DOCS_NAV.map(section => (
            <div key={section.title} style={{ marginBottom: 32 }}>
              <h4 style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
                {section.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {section.links.map(link => (
                  <li key={link}>
                    <Link href="#" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--green-3)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="badge badge-gray" style={{ marginBottom: 16 }}>Documentation v3.2</div>
            <h1 className="t-h2" style={{ marginBottom: 24 }}>Welcome to LABVEX Docs</h1>
            <p className="t-lead" style={{ marginBottom: 48 }}>
              Learn how to verify data, build reputation, and fund your research through Intellectual Property Tokens (IPTs).
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
              <div className="card" style={{ padding: 24, cursor: "pointer" }}>
                <BookOpen size={20} style={{ color: "var(--green-3)", marginBottom: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>Platform Guide</h3>
                <p className="t-body" style={{ fontSize: 14 }}>Learn the basics of the Scientific Hub, Experience Logs, and Identity Terminal.</p>
              </div>
              <div className="card" style={{ padding: 24, cursor: "pointer" }}>
                <FileText size={20} style={{ color: "var(--gold)", marginBottom: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>IP Tokenization</h3>
                <p className="t-body" style={{ fontSize: 14 }}>Understand how to mint IPTs, set royalty streams, and raise capital.</p>
              </div>
              <div className="card" style={{ padding: 24, cursor: "pointer" }}>
                <Code size={20} style={{ color: "#3b82f6", marginBottom: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>VEXY API</h3>
                <p className="t-body" style={{ fontSize: 14 }}>Integrate VEXY's hypothesis generation and CAS compliance screening.</p>
              </div>
              <Link href="/docs/consent" className="card" style={{ padding: 24, cursor: "pointer", textDecoration: "none" }}>
                <ShieldCheck size={20} style={{ color: "#8b5cf6", marginBottom: 16 }} />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 8 }}>Informed Consent</h3>
                <p className="t-body" style={{ fontSize: 14 }}>Read the mandatory digital protocol for scientific research purposes.</p>
              </Link>
            </div>

            <div className="hr" style={{ marginBottom: 48 }} />

            <h2 className="t-h3" style={{ marginBottom: 20 }}>Getting Started</h2>
            <p className="t-body" style={{ marginBottom: 16 }}>
              To get started with LABVEX, connect your Solana wallet (Phantom or Solflare) via the top right corner of the platform shell.
              Your wallet serves as your decentralized identity.
            </p>
            <p className="t-body" style={{ marginBottom: 16 }}>
              Once connected, you will be issued a provisional <strong>ZK-Passport</strong>. To upgrade this to verified status, you must complete your first Peer Review mission or publish a research thread that receives passing validation scores from Scholar-tier members.
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
