"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CalendarClock, Wallet, ExternalLink, Activity, Network, Trophy } from "lucide-react";
import Link from "next/link";
import { formatNumber, truncateAddress } from "@/lib/utils";
import { useEffect, useState } from "react";

const MOCK_USER = {
  username: "genetics_mapper",
  display_name: "Dr. Alex Kim",
  bio: "Computational geneticist studying CRISPR efficiency and off-target modification patterns. PhD @ MIT. Building open science tooling on Solana.",
  wallet_address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  reputation_score: 650,
  badges: ["Research Contributor", "Early Scientist"],
  interests: ["Genetics", "AI", "Biotech", "DeSci"],
  created_at: "2025-01-15",
  stats: { posts: 24, comments: 137, upvotes_received: 842, missions_completed: 8 },
};

function CircularGauge({ score }: { score: number }) {
  const percentage = Math.min((score / 1000) * 100, 100);
  const strokeDasharray = `${percentage} 100`;

  return (
    <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="140" height="140" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
        {/* Background track */}
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--surface-3)" strokeWidth="3" />
        {/* Fill */}
        <motion.path 
          initial={{ strokeDasharray: "0 100" }}
          animate={{ strokeDasharray }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--green-3)" strokeWidth="3" strokeLinecap="round" 
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div className="font-mono" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 10, color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4, fontWeight: 600 }}>Score</div>
      </div>
    </div>
  );
}

export default function IdentityTerminal({ params }: { params: { username: string } }) {
  const user = MOCK_USER;
  const isOwnProfile = params.username === "me" || params.username === user.username;
  const [decayDays, setDecayDays] = useState(547); // 18 months

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        {/* Header Title */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em" }}>Identity Terminal</h1>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>Verifiable credentials and reputation data</p>
          </div>
          {isOwnProfile && (
            <button className="btn btn-outline" style={{ fontSize: 13.5, padding: "0.5rem 1.1rem" }}>
              Edit Credentials
            </button>
          )}
        </div>

        {/* Top Section: Identity & Reputation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, marginBottom: 24 }} className="lg:grid-cols-2 lg:flex-col lg:grid-cols-1">
          
          {/* Main Identity Card */}
          <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "var(--shadow-sm)" }}>
                <span style={{ color: "#fff", fontSize: 28, fontWeight: 700 }}>{user.display_name[0]}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>{user.display_name}</h2>
                  <div className="badge badge-green" style={{ background: "rgba(92,203,95,0.1)", border: "1px solid rgba(92,203,95,0.2)" }}>
                    <ShieldCheck size={12} style={{ marginRight: 4 }} /> ZK-Passport Valid
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>@{user.username} · Member since 2025</p>
                <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 460 }}>{user.bio}</p>
              </div>
            </div>

            <div className="hr" />

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <Wallet size={14} style={{ color: "var(--muted)" }} />
                <span className="font-mono" style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{truncateAddress(user.wallet_address)}</span>
                <ExternalLink size={12} style={{ color: "var(--subtle)", marginLeft: 4, cursor: "pointer" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <Trophy size={14} style={{ color: "var(--gold)" }} />
                <span style={{ fontSize: 13, color: "#b48b11", fontWeight: 600 }}>Scholar Tier</span>
              </div>
            </div>
          </div>

          {/* Reputation Gauge Card */}
          <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 24 }}>Reputation Score</h3>
            
            <CircularGauge score={user.reputation_score} />

            <div style={{ marginTop: 24, padding: "10px 16px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
              <CalendarClock size={16} style={{ color: "var(--muted)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "var(--subtle)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.02em" }}>Decay Countdown</div>
                <div className="font-mono" style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{decayDays} Days</div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Section: Stats & Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="md:grid-cols-1">
          {/* Network Activity */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Activity size={16} style={{ color: "var(--green-3)" }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Network Activity</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { l: "Research Posts", v: user.stats.posts },
                { l: "Peer Reviews", v: user.stats.comments },
                { l: "Upvotes Received", v: user.stats.upvotes_received },
                { l: "Missions Completed", v: user.stats.missions_completed },
              ].map(s => (
                <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13.5, color: "var(--muted)" }}>{s.l}</span>
                  <span className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Network size={16} style={{ color: "var(--green-3)" }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Specializations</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {user.interests.map(i => (
                <div key={i} className="badge badge-gray" style={{ fontSize: 12.5, padding: "6px 12px" }}>
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* On-Chain Badges */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <ShieldCheck size={16} style={{ color: "var(--green-3)" }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>On-Chain Badges</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {user.badges.map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-3)" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
