"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, Star, Award, Zap, ArrowUp, Activity } from "lucide-react";
import { formatNumber, reputationTier } from "@/lib/utils";

const LEADERBOARD = [
  { rank: 1, username: "vexy_analyst", score: 3200, tier: "Expert", delta: 142, badges: 5 },
  { rank: 2, username: "dr_chen_lab", score: 1840, tier: "Contributor", delta: 89, badges: 3 },
  { rank: 3, username: "neuro_synthesis", score: 920, tier: "Contributor", delta: 34, badges: 2 },
  { rank: 4, username: "genetics_mapper", score: 650, tier: "Member", delta: 21, badges: 1 },
  { rank: 5, username: "longevity_lab", score: 480, tier: "Member", delta: 15, badges: 1 },
  { rank: 6, username: "desci_builder", score: 310, tier: "Member", delta: 8, badges: 1 },
  { rank: 7, username: "bio_pioneer", score: 190, tier: "Newcomer", delta: 5, badges: 0 },
  { rank: 8, username: "sci_contrib", score: 120, tier: "Newcomer", delta: 3, badges: 0 },
];

const TIER_THRESHOLDS = [
  { tier: "Newcomer", min: 0, max: 200, color: "#4d5566", description: "Just joined the scientific community" },
  { tier: "Member", min: 200, max: 800, color: "#8b949e", description: "Active contributor to research discussions" },
  { tier: "Contributor", min: 800, max: 2000, color: "#5ccb5f", description: "Recognized scientific contributor" },
  { tier: "Expert", min: 2000, max: 5000, color: "#60a5fa", description: "Respected expert in the community" },
  { tier: "Distinguished", min: 5000, max: 99999, color: "#a78bfa", description: "Elite scientific authority" },
];

const REPUTATION_EVENTS = [
  { type: "post_upvoted", description: "Your CRISPR post received 10 upvotes", points: 25, time: "2h ago" },
  { type: "mission_completed", description: "Completed: Summarize a Longevity Paper", points: 50, time: "1d ago" },
  { type: "comment_upvoted", description: "Your comment on telomere research was upvoted", points: 10, time: "2d ago" },
  { type: "review_given", description: "Provided peer review on a hypothesis", points: 30, time: "3d ago" },
];

export default function ReputationPage() {
  const myScore = 650;
  const myTier = reputationTier(myScore);
  const nextTier = TIER_THRESHOLDS.find((t) => t.min > myScore);
  const currentThreshold = TIER_THRESHOLDS.find((t) => myScore >= t.min && myScore < t.max);
  const progress = currentThreshold
    ? ((myScore - currentThreshold.min) / (currentThreshold.max - currentThreshold.min)) * 100
    : 100;

  return (
    <div className="container-platform py-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="badge badge-green mb-4"><Trophy size={11} />Reputation System</div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Scientific Reputation</h1>
        <p className="text-[var(--text-secondary)] text-[15px] max-w-xl">
          Your credibility score reflects contribution quality, peer validation, and community impact across the LABVEX ecosystem.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* My reputation card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 lg:col-span-1">
          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Your Reputation</h2>
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#0d1117]" style={{ fontFamily: "var(--font-display)" }}>
              G
            </div>
            <div className="text-4xl font-bold gradient-text mb-1" style={{ fontFamily: "var(--font-display)" }}>{formatNumber(myScore)}</div>
            <div className="badge badge-green mx-auto">{myTier.label}</div>
          </div>
          {/* Progress to next tier */}
          {nextTier && (
            <div>
              <div className="flex justify-between text-[12px] text-[var(--text-muted)] mb-2">
                <span>Progress to {nextTier.tier}</span>
                <span>{myScore} / {currentThreshold?.max}</span>
              </div>
              <div className="rep-bar">
                <motion.div className="rep-bar-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.2, delay: 0.3 }} />
              </div>
            </div>
          )}
        </motion.div>

        {/* Tiers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6 lg:col-span-2">
          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-5">Reputation Tiers</h2>
          <div className="space-y-3">
            {TIER_THRESHOLDS.map((tier) => {
              const isActive = myTier.label === tier.tier;
              return (
                <div key={tier.tier} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isActive ? "border border-[rgba(92,203,95,0.3)] bg-[rgba(92,203,95,0.05)]" : "opacity-60"}`}>
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: tier.color, boxShadow: isActive ? `0 0 10px ${tier.color}80` : "none" }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold" style={{ color: isActive ? tier.color : "var(--text-secondary)" }}>{tier.tier}</span>
                      {isActive && <span className="badge badge-green text-[10px]">Current</span>}
                    </div>
                    <p className="text-[12px] text-[var(--text-muted)]">{tier.description}</p>
                  </div>
                  <span className="text-[12px] text-[var(--text-muted)] shrink-0">
                    {formatNumber(tier.min)}{tier.max < 99999 ? `–${formatNumber(tier.max)}` : "+"}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Star size={15} className="text-[var(--green-neon)]" />
            <h2 className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>Global Leaderboard</h2>
          </div>
          <div className="space-y-2">
            {LEADERBOARD.map((entry) => {
              const tier = reputationTier(entry.score);
              return (
                <div key={entry.username} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${entry.username === "genetics_mapper" ? "border border-[rgba(92,203,95,0.2)] bg-[rgba(92,203,95,0.04)]" : "hover:bg-[var(--glass-bg)]"}`}>
                  <span className={`text-[13px] font-bold w-5 text-center ${entry.rank <= 3 ? "text-[var(--green-neon)]" : "text-[var(--text-muted)]"}`}>{entry.rank}</span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center text-[10px] font-bold text-[#0d1117] shrink-0">
                    {entry.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">@{entry.username}</p>
                    <p className="text-[11px]" style={{ color: tier.color }}>{entry.tier}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14px] font-bold">{formatNumber(entry.score)}</p>
                    <p className="text-[11px] text-[var(--green-neon)] flex items-center gap-0.5 justify-end">
                      <ArrowUp size={9} />+{entry.delta}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent events */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity size={15} className="text-[var(--green-neon)]" />
            <h2 className="text-[15px] font-semibold" style={{ fontFamily: "var(--font-display)" }}>Recent Activity</h2>
          </div>
          <div className="space-y-3">
            {REPUTATION_EVENTS.map((event, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }} className="flex items-start gap-3 p-3 rounded-xl border border-[var(--border-subtle)]">
                <div className="w-8 h-8 rounded-lg bg-[rgba(92,203,95,0.1)] border border-[rgba(92,203,95,0.2)] flex items-center justify-center shrink-0">
                  <Zap size={13} className="text-[var(--green-neon)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-[var(--text-primary)] leading-snug">{event.description}</p>
                  <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{event.time}</p>
                </div>
                <span className="badge badge-green text-[12px] shrink-0">+{event.points}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <p className="text-[13px] font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>Earn More Reputation</p>
            <div className="space-y-1.5 text-[13px] text-[var(--text-secondary)]">
              <p>• Post quality research — <span className="text-[var(--green-neon)]">+5–50 per upvote</span></p>
              <p>• Complete missions — <span className="text-[var(--green-neon)]">+40–200 per mission</span></p>
              <p>• Peer review threads — <span className="text-[var(--green-neon)]">+30 per review</span></p>
              <p>• Receive badges — <span className="text-[var(--green-neon)]">+100 bonus</span></p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
