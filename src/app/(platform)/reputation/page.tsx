"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, Zap, Users, Star } from "lucide-react";
import Link from "next/link";

const TIERS = [
  { name: "Observer", min: 0, max: 100, color: "#9ca3af", desc: "New to the ecosystem" },
  { name: "Contributor", min: 100, max: 500, color: "#3b82f6", desc: "Active researcher" },
  { name: "Validator", min: 500, max: 1500, color: "#8b5cf6", desc: "Peer reviewer" },
  { name: "Scholar", min: 1500, max: 5000, color: "#f59e0b", desc: "Domain expert" },
  { name: "Pioneer", min: 5000, max: 999999, color: "#5ccb5f", desc: "DeSci leader" },
];

const LEADERBOARD = [
  { rank: 1, username: "vexy_analyst", field: "Bioinformatics", rep: 3200, tier: "Scholar", badge: "🏆", delta: "+142" },
  { rank: 2, username: "dr_chen_lab", field: "Longevity Science", rep: 1840, tier: "Scholar", badge: "🥈", delta: "+89" },
  { rank: 3, username: "protein_foldr", field: "Structural Biology", rep: 1620, tier: "Scholar", badge: "🥉", delta: "+67" },
  { rank: 4, username: "neuro_synthesis", field: "Neuroscience", rep: 920, tier: "Validator", badge: null, delta: "+45" },
  { rank: 5, username: "genetics_mapper", field: "Genomics", rep: 650, tier: "Validator", badge: null, delta: "+38" },
  { rank: 6, username: "bio_compute_1", field: "Computational Biology", rep: 420, tier: "Contributor", badge: null, delta: "+22" },
  { rank: 7, username: "crispr_lab_x", field: "Gene Editing", rep: 310, tier: "Contributor", badge: null, delta: "+18" },
  { rank: 8, username: "longevity_dao", field: "DeSci", rep: 280, tier: "Contributor", badge: null, delta: "+14" },
];

const MY_REP = 920;
const MY_TIER = TIERS.find(t => MY_REP >= t.min && MY_REP < t.max)!;
const NEXT_TIER = TIERS[TIERS.indexOf(MY_TIER) + 1];

const AVATARS = ["linear-gradient(135deg,#5ccb5f,#2e8b57)", "linear-gradient(135deg,#3b82f6,#1d4ed8)", "linear-gradient(135deg,#8b5cf6,#6d28d9)", "linear-gradient(135deg,#f59e0b,#d97706)"];

export default function ReputationPage() {
  const progress = NEXT_TIER ? ((MY_REP - MY_TIER.min) / (NEXT_TIER.min - MY_TIER.min)) * 100 : 100;

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 24 }}>
        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 4 }}>Reputation</h1>
          <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 24 }}>Your on-chain scientific standing, earned through verifiable contributions.</p>

          {/* My rep card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px", marginBottom: 20, boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>N</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>neuro_synthesis</p>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>Neuroscience · MIT</p>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 28, color: MY_TIER.color, letterSpacing: "-0.03em" }}>{MY_REP.toLocaleString()}</p>
                <p style={{ fontSize: 12, color: "var(--muted)" }}>reputation points</p>
              </div>
            </div>

            {/* Tier progress */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: MY_TIER.color }}>{MY_TIER.name}</span>
              {NEXT_TIER && <span style={{ fontSize: 12, color: "var(--muted)" }}>{NEXT_TIER.min - MY_REP} rep to {NEXT_TIER.name}</span>}
            </div>
            <div style={{ height: 6, background: "var(--surface-3)", borderRadius: 3, overflow: "hidden" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" as const }}
                style={{ height: "100%", background: `linear-gradient(90deg,${MY_TIER.color},${NEXT_TIER?.color || MY_TIER.color})`, borderRadius: 3 }} />
            </div>
          </motion.div>

          {/* Tier cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8, marginBottom: 28 }}>
            {TIERS.map((t, i) => {
              const active = t.name === MY_TIER.name;
              const unlocked = MY_REP >= t.min;
              return (
                <div key={t.name} style={{ padding: "14px 12px", borderRadius: 12, border: `1px solid ${active ? t.color + "40" : "var(--border)"}`, background: active ? t.color + "08" : "var(--surface)", textAlign: "center", opacity: unlocked ? 1 : 0.5 }}>
                  <Star size={16} style={{ color: t.color, margin: "0 auto 6px" }} />
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 12.5, color: active ? t.color : "var(--ink)", marginBottom: 2 }}>{t.name}</p>
                  <p style={{ fontSize: 10.5, color: "var(--subtle)" }}>{t.min >= 5000 ? "5K+" : `${t.min}+`}</p>
                </div>
              );
            })}
          </div>

          {/* Leaderboard */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>Global Leaderboard</h2>
              <span className="badge badge-gray" style={{ fontSize: 11 }}>This week</span>
            </div>
            <div>
              {LEADERBOARD.map((r, i) => {
                const isMe = r.username === "neuro_synthesis";
                const tier = TIERS.find(t => r.rep >= t.min && r.rep < t.max)!;
                return (
                  <motion.div key={r.rank} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.35 }}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: i < LEADERBOARD.length - 1 ? "1px solid var(--border)" : "none", background: isMe ? "rgba(92,203,95,0.03)" : "transparent" }}>
                    <span style={{ width: 24, textAlign: "center", fontSize: r.badge ? 18 : 13, fontWeight: r.badge ? 400 : 600, color: r.badge ? undefined : "var(--muted)" }}>{r.badge || r.rank}</span>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: AVATARS[i % 4], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{r.username[0].toUpperCase()}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Link href={`/profile/${r.username}`} style={{ fontSize: 13.5, fontWeight: isMe ? 700 : 500, color: "var(--ink)" }}>@{r.username}</Link>
                      <p style={{ fontSize: 11.5, color: "var(--subtle)" }}>{r.field}</p>
                    </div>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: tier.color, padding: "2px 8px", borderRadius: 99, background: tier.color + "12", border: `1px solid ${tier.color}28` }}>{r.tier}</span>
                    <span style={{ fontSize: 12, color: "var(--green-3)", fontWeight: 600, width: 44, textAlign: "right" }}>{r.delta}</span>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, color: "var(--ink)", width: 52, textAlign: "right", letterSpacing: "-0.01em" }}>{r.rep.toLocaleString()}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }} className="hidden xl:flex">
          {/* How to earn */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 18px" }}>
            <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>How to earn rep</h3>
            {[{ a: "Post research", r: "+10–50" }, { a: "Complete mission", r: "+50–500" }, { a: "Peer review", r: "+25–180" }, { a: "VEXY analysis", r: "+15" }, { a: "Receive upvotes", r: "+2/vote" }, { a: "Onboard scientist", r: "+75" }].map(({ a, r }) => (
              <div key={a} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{a}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--green-3)" }}>{r}</span>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 18px" }}>
            <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Quick actions</h3>
            <Link href="/missions" className="btn btn-dark" style={{ width: "100%", justifyContent: "center", fontSize: 13.5, marginBottom: 8 }}>View Missions</Link>
            <Link href="/feed" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", fontSize: 13.5 }}>Post Research</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
