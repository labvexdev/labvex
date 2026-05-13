"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Zap, Edit, ExternalLink, Wallet, Activity, FileText, Bookmark } from "lucide-react";
import { formatNumber, reputationTier, truncateAddress } from "@/lib/utils";
import Link from "next/link";

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

const BADGE_CONFIG: Record<string, { color: string; bg: string; icon: typeof Star }> = {
  "Research Contributor": { color: "#5ccb5f", bg: "rgba(92,203,95,0.1)", icon: FileText },
  "Reviewer": { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", icon: Star },
  "AI Analyst": { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", icon: Zap },
  "Early Scientist": { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: Trophy },
  "Community Builder": { color: "#f87171", bg: "rgba(248,113,113,0.1)", icon: Activity },
};

const RECENT_POSTS = [
  { id: "1", title: "CRISPR-Cas9 efficiency improvements with modified guide RNA structures", upvotes: 94, comments: 16, time: "2d ago" },
  { id: "2", title: "Validating AI-predicted gene expression patterns in vivo", upvotes: 67, comments: 9, time: "5d ago" },
  { id: "3", title: "Open dataset: Off-target CRISPR edits across 14 human cell lines", upvotes: 143, comments: 31, time: "1w ago" },
];

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = MOCK_USER;
  const tier = reputationTier(user.reputation_score);
  const isOwnProfile = params.username === "me" || params.username === user.username;

  return (
    <div className="container-platform py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile header card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center text-3xl font-bold text-[#0d1117]" style={{ fontFamily: "var(--font-display)" }}>
                {user.display_name[0]}
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-[var(--green-neon)] border-2 border-[var(--bg-graphite)] flex items-center justify-center">
                <Star size={10} className="text-[#0d1117]" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>{user.display_name}</h1>
                  <p className="text-[14px] text-[var(--text-muted)]">@{user.username}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isOwnProfile && (
                    <button className="btn-ghost text-[13px]"><Edit size={14} />Edit Profile</button>
                  )}
                </div>
              </div>

              <p className="text-[14px] text-[var(--text-secondary)] mt-3 mb-4 leading-relaxed max-w-lg">{user.bio}</p>

              <div className="flex flex-wrap items-center gap-3">
                {/* Wallet */}
                <div className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)] bg-[var(--bg-surface)] px-3 py-1.5 rounded-lg border border-[var(--border-subtle)]">
                  <Wallet size={12} />
                  {truncateAddress(user.wallet_address)}
                  <ExternalLink size={10} className="text-[var(--text-muted)]" />
                </div>
                {/* Tier */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold border" style={{ color: tier.color, borderColor: `${tier.color}30`, background: `${tier.color}10` }}>
                  <Trophy size={11} />{tier.label}
                </div>
                {/* Joined */}
                <span className="text-[12px] text-[var(--text-muted)]">Member since Jan 2025</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Reputation", value: formatNumber(user.reputation_score), color: "#5ccb5f" },
            { label: "Posts", value: user.stats.posts.toString(), color: "#60a5fa" },
            { label: "Upvotes Received", value: formatNumber(user.stats.upvotes_received), color: "#a78bfa" },
            { label: "Missions Done", value: user.stats.missions_completed.toString(), color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <div className="text-2xl font-bold mb-1 gradient-text" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
              <div className="text-[12px] text-[var(--text-muted)]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-5">
            {/* Badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="glass-card p-5">
              <h2 className="text-[15px] font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Badges</h2>
              <div className="flex flex-wrap gap-3">
                {user.badges.map((badge) => {
                  const cfg = BADGE_CONFIG[badge] ?? { color: "#8b949e", bg: "rgba(139,148,158,0.1)", icon: Star };
                  const Icon = cfg.icon;
                  return (
                    <div key={badge} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border" style={{ background: cfg.bg, borderColor: `${cfg.color}30` }}>
                      <Icon size={14} style={{ color: cfg.color }} />
                      <span className="text-[13px] font-semibold" style={{ color: cfg.color }}>{badge}</span>
                    </div>
                  );
                })}
                {/* Locked badges */}
                {["Reviewer", "AI Analyst", "Community Builder"].filter((b) => !user.badges.includes(b)).map((badge) => (
                  <div key={badge} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] opacity-40 cursor-not-allowed">
                    <Star size={14} className="text-[var(--text-muted)]" />
                    <span className="text-[13px] text-[var(--text-muted)]">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent posts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="glass-card p-5">
              <h2 className="text-[15px] font-semibold mb-4" style={{ fontFamily: "var(--font-display)" }}>Recent Research</h2>
              <div className="space-y-3">
                {RECENT_POSTS.map((post) => (
                  <Link key={post.id} href={`/feed/${post.id}`} className="block p-3 rounded-xl border border-[var(--border-subtle)] hover:border-[rgba(92,203,95,0.2)] hover:bg-[var(--glass-bg)] transition-all">
                    <p className="text-[14px] font-medium text-[var(--text-primary)] mb-2 leading-snug">{post.title}</p>
                    <div className="flex items-center gap-4 text-[12px] text-[var(--text-muted)]">
                      <span>↑ {post.upvotes}</span>
                      <span>💬 {post.comments}</span>
                      <span className="ml-auto">{post.time}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Interests */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="glass-card p-5">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Research Interests</h2>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span key={interest} className="badge badge-green text-[12px]">{interest}</span>
                ))}
              </div>
            </motion.div>

            {/* Rep progress */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="glass-card p-5">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Reputation Progress</h2>
              <div className="text-3xl font-bold gradient-text mb-1" style={{ fontFamily: "var(--font-display)" }}>
                {formatNumber(user.reputation_score)}
              </div>
              <p className="text-[12px] text-[var(--text-muted)] mb-4">Next: Expert at 2,000</p>
              <div className="rep-bar">
                <motion.div className="rep-bar-fill" initial={{ width: 0 }} animate={{ width: "31%" }} transition={{ duration: 1.2, delay: 0.4 }} />
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-2">31% toward Expert tier</p>
            </motion.div>

            {/* Bookmarks shortcut */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Bookmark size={14} className="text-[var(--green-neon)]" />
                <h2 className="text-[13px] font-semibold">Saved Posts</h2>
              </div>
              <p className="text-[13px] text-[var(--text-muted)]">12 bookmarked research posts</p>
              <button className="btn-ghost text-[13px] mt-2 w-full justify-center">View Bookmarks</button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
