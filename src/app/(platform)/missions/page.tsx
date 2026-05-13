"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Trophy, Zap, Clock, Users, CheckCircle, ChevronRight, Filter } from "lucide-react";

const MISSIONS = [
  {
    id: "1", title: "Summarize a Longevity Paper", category: "Longevity", difficulty: "easy",
    description: "Find a recent longevity research paper published in 2024–2025 and write a clear 3-paragraph plain-language summary, suitable for a non-specialist audience.",
    rep_reward: 50, badge_reward: null, participants: 142, deadline: "72h left", status: "available",
  },
  {
    id: "2", title: "Validate an AI-Generated Summary", category: "AI", difficulty: "medium",
    description: "Review one AI-generated research summary posted in the feed. Fact-check all claims against primary sources and submit a structured accuracy report.",
    rep_reward: 120, badge_reward: "AI Analyst", participants: 38, deadline: "5d left", status: "available",
  },
  {
    id: "3", title: "Organize a DeSci Dataset", category: "DeSci", difficulty: "medium",
    description: "Help categorize and tag a shared scientific dataset. Add missing metadata fields, improve tag accuracy, and enhance discoverability for the research community.",
    rep_reward: 100, badge_reward: null, participants: 27, deadline: "3d left", status: "available",
  },
  {
    id: "4", title: "Write a Scientific Hypothesis Thread", category: "Biotech", difficulty: "hard",
    description: "Post a well-structured scientific hypothesis with supporting evidence from at least 3 peer-reviewed sources. Thread must receive 5+ community upvotes to qualify.",
    rep_reward: 200, badge_reward: "Research Contributor", participants: 15, deadline: "7d left", status: "available",
  },
  {
    id: "5", title: "Peer Review a Hypothesis", category: "Genetics", difficulty: "medium",
    description: "Provide substantive peer review on an open hypothesis thread. Your review must address methodology, evidence quality, and alternative explanations.",
    rep_reward: 80, badge_reward: "Reviewer", participants: 61, deadline: "4d left", status: "available",
  },
  {
    id: "6", title: "Improve Neuroscience Post Tagging", category: "Neuroscience", difficulty: "easy",
    description: "Review 10 neuroscience posts and add missing or incorrect tags. Improve discoverability and help maintain research taxonomy quality.",
    rep_reward: 40, badge_reward: null, participants: 88, deadline: "Ongoing", status: "available",
  },
];

const DIFF_COLOR: Record<string, string> = {
  easy: "#5ccb5f", medium: "#f59e0b", hard: "#f87171",
};
const DIFF_BG: Record<string, string> = {
  easy: "rgba(92,203,95,0.1)", medium: "rgba(245,158,11,0.1)", hard: "rgba(248,113,113,0.1)",
};

export default function MissionsPage() {
  const [filter, setFilter] = useState("All");
  const [joined, setJoined] = useState<string[]>([]);

  const categories = ["All", "AI", "Biotech", "Longevity", "Neuroscience", "Genetics", "DeSci"];
  const filtered = filter === "All" ? MISSIONS : MISSIONS.filter((m) => m.category === filter);

  return (
    <div className="container-platform py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="badge badge-green mb-4"><Target size={11} />Community Missions</div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Scientific Missions
        </h1>
        <p className="text-[var(--text-secondary)] text-[15px] max-w-xl">
          Complete peer-reviewed scientific tasks, earn reputation points, and unlock badges. Your contributions directly improve the LABVEX research ecosystem.
        </p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Target, label: "Active Missions", value: "6", color: "#5ccb5f" },
          { icon: Users, label: "Participants", value: "371", color: "#60a5fa" },
          { icon: Trophy, label: "Badges Available", value: "4", color: "#a78bfa" },
          { icon: Zap, label: "Max Reward", value: "200 rep", color: "#f59e0b" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.color}14`, border: `1px solid ${s.color}28` }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[18px] font-bold" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                <p className="text-[12px] text-[var(--text-muted)]">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`badge cursor-pointer transition-all ${filter === c ? "badge-green" : "badge-muted"}`}>{c}</button>
        ))}
      </div>

      {/* Mission grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((mission, i) => {
          const isJoined = joined.includes(mission.id);
          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card p-5 flex flex-col"
            >
              {/* Top */}
              <div className="flex items-start justify-between mb-3">
                <span className="badge badge-muted text-[11px]">{mission.category}</span>
                <span
                  className="badge text-[11px] font-semibold"
                  style={{ background: DIFF_BG[mission.difficulty], color: DIFF_COLOR[mission.difficulty], border: `1px solid ${DIFF_COLOR[mission.difficulty]}28` }}
                >
                  {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
                </span>
              </div>

              <h3 className="text-[15px] font-semibold mb-2 leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                {mission.title}
              </h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">{mission.description}</p>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-4 text-[12px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1"><Users size={11} />{mission.participants} joined</span>
                <span className="flex items-center gap-1"><Clock size={11} />{mission.deadline}</span>
              </div>

              {/* Rewards */}
              <div className="flex items-center gap-2 mb-4">
                <span className="badge badge-green text-[12px] font-semibold">+{mission.rep_reward} rep</span>
                {mission.badge_reward && (
                  <span className="badge badge-purple text-[12px]">
                    <Trophy size={9} />{mission.badge_reward}
                  </span>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={() => setJoined((prev) => isJoined ? prev.filter((id) => id !== mission.id) : [...prev, mission.id])}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  isJoined
                    ? "bg-[rgba(92,203,95,0.1)] text-[var(--green-neon)] border border-[rgba(92,203,95,0.3)]"
                    : "btn-primary"
                }`}
              >
                {isJoined ? <><CheckCircle size={14} />Joined</> : <>Accept Mission<ChevronRight size={14} /></>}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
