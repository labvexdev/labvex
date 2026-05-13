"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Zap } from "lucide-react";
import Link from "next/link";

const mockPosts = [
  {
    id: "1",
    author: "dr_chen",
    title: "New findings on CRISPR off-target effects in somatic cells",
    tags: ["Genetics", "CRISPR"],
    upvotes: 142,
    comments: 38,
  },
  {
    id: "2",
    author: "neuro_lab",
    title: "Hypothesis: Ketone metabolism as neuroprotective mechanism in aging",
    tags: ["Neuroscience", "Longevity"],
    upvotes: 89,
    comments: 22,
  },
  {
    id: "3",
    author: "ai_biotech",
    title: "AI-assisted protein folding validation methodology",
    tags: ["AI", "Biotech"],
    upvotes: 203,
    comments: 61,
  },
];

export function CommunitySection() {
  return (
    <section className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Stats row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            {
              icon: Users,
              color: "#5ccb5f",
              value: "2,400+",
              label: "Active Scientists",
              desc: "Researchers from 60+ countries",
            },
            {
              icon: Trophy,
              color: "#a78bfa",
              value: "18K+",
              label: "Research Posts",
              desc: "Across 6 scientific disciplines",
            },
            {
              icon: Zap,
              color: "#60a5fa",
              value: "94%",
              label: "AI Accuracy",
              desc: "Verified by community review",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card p-6 text-center">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `${stat.color}14`,
                    border: `1px solid ${stat.color}28`,
                  }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <div
                  className="text-3xl font-bold gradient-text mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[14px] font-600 text-[var(--text-primary)] mb-1">
                  {stat.label}
                </div>
                <div className="text-[12px] text-[var(--text-muted)]">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Feed preview */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Live from the{" "}
            <span className="gradient-text">Scientific Feed</span>
          </h2>
          <p className="text-[var(--text-secondary)]">
            Real discussions happening right now on LABVEX
          </p>
        </motion.div>

        <div className="space-y-3 mb-10 max-w-2xl mx-auto">
          {mockPosts.map((post, i) => (
            <motion.div
              key={post.id}
              className="post-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center text-[10px] font-bold text-[#0d1117]">
                  {post.author[0].toUpperCase()}
                </div>
                <span className="text-[12px] text-[var(--text-muted)]">
                  @{post.author}
                </span>
                <span className="text-[11px] text-[var(--text-muted)] ml-auto">
                  2h ago
                </span>
              </div>
              <h3 className="text-[14px] font-600 text-[var(--text-primary)] mb-3 leading-snug">
                {post.title}
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {post.tags.map((t) => (
                    <span key={t} className="badge badge-muted text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-3 text-[12px] text-[var(--text-muted)]">
                  <span>↑ {post.upvotes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/feed" className="btn-primary">
            Enter the Feed
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
