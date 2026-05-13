"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Clock, Zap, Users, Check, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

const MISSIONS = [
  { id: "1", title: "Summarise a Longevity Paper", desc: "Find a peer-reviewed longevity paper published in 2023–24 and write a structured LABVEX summary with methodology, findings, and limitations.", reward: 50, diff: "Easy", category: "Research", time: "~30 min", completions: 312, icon: "📄" },
  { id: "2", title: "Validate an AI Protein Prediction", desc: "Take an AlphaFold2 prediction from the community feed and compare it against available wet-lab data. Submit your validation report.", reward: 120, diff: "Medium", category: "Validation", time: "~2h", completions: 89, icon: "🧬" },
  { id: "3", title: "Peer Review a DeSci Proposal", desc: "Review a community research proposal using LABVEX's structured peer review framework. Score methodology, feasibility, and impact.", reward: 180, diff: "Medium", category: "Peer Review", time: "~3h", completions: 54, icon: "🔬" },
  { id: "4", title: "Build a VEXY Research Thread", desc: "Create an in-depth research thread using VEXY AI to explore a frontier science topic. Minimum 5 connected posts with citations.", reward: 300, diff: "Hard", category: "Research", time: "~5h", completions: 21, icon: "🧠" },
  { id: "5", title: "Onboard a Researcher", desc: "Invite and onboard a practicing scientist to LABVEX. Help them complete their profile and post their first research thread.", reward: 75, diff: "Easy", category: "Community", time: "~1h", completions: 445, icon: "👥" },
  { id: "6", title: "Reproduce a Published Study", desc: "Select a recent study and attempt computational reproduction using available datasets. Document your process and findings.", reward: 500, diff: "Expert", category: "Validation", time: "~20h", completions: 8, icon: "⚗️" },
];

const DIFF_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Easy: { bg: "rgba(34,197,94,0.08)", text: "#16a34a", border: "rgba(34,197,94,0.2)" },
  Medium: { bg: "rgba(245,158,11,0.08)", text: "#d97706", border: "rgba(245,158,11,0.2)" },
  Hard: { bg: "rgba(239,68,68,0.08)", text: "#dc2626", border: "rgba(239,68,68,0.2)" },
  Expert: { bg: "rgba(139,92,246,0.08)", text: "#7c3aed", border: "rgba(139,92,246,0.2)" },
};

const CATS = ["All", "Research", "Validation", "Peer Review", "Community"];

export default function MissionsPage() {
  const [cat, setCat] = useState("All");
  const [completed, setCompleted] = useState<string[]>([]);

  const filtered = cat === "All" ? MISSIONS : MISSIONS.filter(m => m.category === cat);

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 4 }}>Community Missions</h1>
        <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Complete missions to earn reputation and contribute to the scientific ecosystem.</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        {[{ label: "Available", value: MISSIONS.length, icon: Target, color: "var(--green-3)" }, { label: "Completed today", value: 929, icon: Check, color: "#2563eb" }, { label: "Active scientists", value: "2,400+", icon: Users, color: "#7c3aed" }, { label: "Rep distributed", value: "48K+", icon: Zap, color: "#d97706" }].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ flex: 1, minWidth: 140, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
              <Icon size={18} style={{ color: s.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: "var(--ink)", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} className={cat === c ? "badge badge-green" : "badge badge-gray"} style={{ cursor: "pointer", fontSize: 13, padding: "6px 14px", transition: "all 0.15s" }}>{c}</button>
        ))}
      </div>

      {/* Mission cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
        {filtered.map((m, i) => {
          const done = completed.includes(m.id);
          const d = DIFF_COLORS[m.diff];
          return (
            <motion.div key={m.id} className="card" style={{ padding: "22px 22px" }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 28, lineHeight: 1 }}>{m.icon}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 99, background: d.bg, color: d.text, border: `1px solid ${d.border}` }}>{m.diff}</span>
                  <span className="badge badge-gray" style={{ fontSize: 11 }}>{m.category}</span>
                </div>
              </div>

              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ink)", marginBottom: 8, lineHeight: 1.4, letterSpacing: "-0.01em" }}>{m.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>{m.desc}</p>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "var(--muted)" }}>
                  <Clock size={12} />{m.time}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "var(--muted)" }}>
                  <Users size={12} />{m.completions} done
                </div>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                  <Zap size={12} style={{ color: "var(--green-3)" }} />
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--green-3)" }}>+{m.reward}</span>
                  <span style={{ fontSize: 11.5, color: "var(--muted)" }}>rep</span>
                </div>
              </div>

              <button onClick={() => setCompleted(p => done ? p.filter(x => x !== m.id) : [...p, m.id])}
                className={done ? "btn btn-outline" : "btn btn-dark"} style={{ width: "100%", justifyContent: "center", fontSize: 13.5, padding: "0.55rem 1rem", transition: "all 0.2s" }}>
                {done ? <><Check size={14} />Completed</> : <>Start Mission <ArrowRight size={14} /></>}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
