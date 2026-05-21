"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Clock, Zap, Users, Check, ArrowRight, Filter, Plus, DollarSign } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export type MissionData = {
  id: string;
  title: string;
  desc: string;
  reward: number;
  diff: string;
  category: string;
  time: string;
  completions: number;
  icon: string;
  usdt?: number;
};

const DIFF_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Easy: { bg: "rgba(34,197,94,0.08)", text: "#16a34a", border: "rgba(34,197,94,0.2)" },
  Medium: { bg: "rgba(245,158,11,0.08)", text: "#d97706", border: "rgba(245,158,11,0.2)" },
  Hard: { bg: "rgba(239,68,68,0.08)", text: "#dc2626", border: "rgba(239,68,68,0.2)" },
  Expert: { bg: "rgba(139,92,246,0.08)", text: "#7c3aed", border: "rgba(139,92,246,0.2)" },
};

const CATS = ["All", "Research", "Validation", "Peer Review", "Community"];

export default function MissionsClient({ initialMissions }: { initialMissions: MissionData[] }) {
  const [cat, setCat] = useState("All");
  const [completed, setCompleted] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newMissionTitle, setNewMissionTitle] = useState("");
  const [newMissionDesc, setNewMissionDesc] = useState("");
  const [rewardType, setRewardType] = useState("rep");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);

  const handleCreateMission = async () => {
    if (!newMissionTitle || !newMissionDesc) return toast.error("Title and description are required.");
    if (rewardType === "usdt" && !usdtAmount) return toast.error("USDT amount is required.");
    
    setIsPublishing(true);
    // In a real app, POST to /api/missions
    await new Promise(r => setTimeout(r, 1000));
    
    toast.success("Mission created and funded successfully in database!");
    setIsPublishing(false);
    setIsCreating(false);
    setNewMissionTitle("");
    setNewMissionDesc("");
    setUsdtAmount("");
  };

  const filtered = cat === "All" ? initialMissions : initialMissions.filter(m => m.category === cat);

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 4 }}>Community Missions</h1>
          <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Complete missions to earn reputation and contribute to the scientific ecosystem.</p>
        </div>
        <button onClick={() => setIsCreating(!isCreating)} className="btn btn-dark" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={16} /> Create Mission
        </button>
      </div>

      {isCreating && (
        <div className="card" style={{ padding: 24, marginBottom: 32, border: "1px solid var(--green)" }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>Fund a New Mission</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input value={newMissionTitle} onChange={e => setNewMissionTitle(e.target.value)} placeholder="Mission Title" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, outline: "none" }} />
            <textarea value={newMissionDesc} onChange={e => setNewMissionDesc(e.target.value)} placeholder="Describe the task required..." rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, outline: "none", resize: "none" }} />
            
            <div style={{ background: "var(--surface-2)", padding: 16, borderRadius: 8, border: "1px solid var(--border)" }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Reward Structure</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <button onClick={() => setRewardType("rep")} className={rewardType === "rep" ? "btn btn-dark" : "btn btn-outline"} style={{ flex: 1, fontSize: 13 }}>Reputation Only</button>
                <button onClick={() => setRewardType("usdt")} className={rewardType === "usdt" ? "btn btn-dark" : "btn btn-outline"} style={{ flex: 1, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}><DollarSign size={14}/> USDT + Reputation</button>
              </div>
              
              {rewardType === "usdt" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13 }}>USDT Amount:</span>
                  <input type="number" value={usdtAmount} onChange={e => setUsdtAmount(e.target.value)} placeholder="50" style={{ width: 100, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 14, outline: "none" }} />
                </div>
              )}
            </div>
            
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button onClick={() => setIsCreating(false)} disabled={isPublishing} className="btn btn-outline">Cancel</button>
              <button onClick={handleCreateMission} disabled={isPublishing} className="btn btn-dark" style={{ background: "var(--green-3)", borderColor: "var(--green-3)", opacity: isPublishing ? 0.5 : 1 }}>Publish & Fund</button>
            </div>
          </div>
        </div>
      )}

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        {[{ label: "Available", value: initialMissions.length, icon: Target, color: "var(--green-3)" }, { label: "Completed today", value: 929, icon: Check, color: "#2563eb" }, { label: "Active scientists", value: "2,400+", icon: Users, color: "#7c3aed" }, { label: "Rep distributed", value: "48K+", icon: Zap, color: "#d97706" }].map(s => {
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
          const d = DIFF_COLORS[m.diff] || DIFF_COLORS["Medium"];
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
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
                  {m.usdt && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <DollarSign size={12} style={{ color: "#10b981" }} />
                      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: "#10b981" }}>{m.usdt}</span>
                      <span style={{ fontSize: 11.5, color: "var(--muted)" }}>USDT</span>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Zap size={12} style={{ color: "var(--green-3)" }} />
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--green-3)" }}>+{m.reward}</span>
                    <span style={{ fontSize: 11.5, color: "var(--muted)" }}>rep</span>
                  </div>
                </div>
              </div>

              <button onClick={() => setCompleted(p => done ? p.filter(x => x !== m.id) : [...p, m.id])}
                className={done ? "btn btn-outline" : "btn btn-dark"} style={{ width: "100%", justifyContent: "center", fontSize: 13.5, padding: "0.55rem 1rem", transition: "all 0.2s" }}>
                {done ? <><Check size={14} />Completed</> : <>Start Mission <ArrowRight size={14} /></>}
              </button>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "var(--muted)", fontSize: 14, gridColumn: "1 / -1" }}>
            No missions found.
          </div>
        )}
      </div>
    </div>
  );
}
