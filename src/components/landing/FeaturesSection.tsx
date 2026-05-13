"use client";

import { motion } from "framer-motion";
import {
  Brain,
  FlaskConical,
  Users,
  Shield,
  Zap,
  GitBranch,
  Globe,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    color: "#60a5fa",
    title: "VEXY AI Layer",
    description:
      "AI-native research assistant that summarizes papers, generates hypotheses, and recommends discoveries in real time.",
  },
  {
    icon: FlaskConical,
    color: "#5ccb5f",
    title: "Scientific Feed",
    description:
      "A living research network combining ResearchHub, Reddit, and GitHub for scientific discourse at scale.",
  },
  {
    icon: Shield,
    color: "#a78bfa",
    title: "Decentralized Identity",
    description:
      "Solana-native wallet identity with verifiable scientific reputation. Own your credentials forever.",
  },
  {
    icon: Users,
    color: "#f59e0b",
    title: "Community Missions",
    description:
      "Gamified contribution system rewarding peer review, dataset curation, and scientific validation.",
  },
  {
    icon: Zap,
    color: "#f87171",
    title: "Reputation Engine",
    description:
      "On-chain scientific credibility scoring based on contribution quality, peer reviews, and mission completion.",
  },
  {
    icon: GitBranch,
    color: "#34d399",
    title: "Research Threading",
    description:
      "Nested hypothesis threads with rich text support, AI summaries, and cross-linkable scientific arguments.",
  },
  {
    icon: Globe,
    color: "#818cf8",
    title: "DeSci Networks",
    description:
      "Connect across biotech, longevity, neuroscience, and genetics communities in one unified interface.",
  },
  {
    icon: Lock,
    color: "#fb923c",
    title: "Future IP Layer",
    description:
      "Designed for future decentralized IP infrastructure — patent-ready architecture built from day one.",
  },
];

const inView = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

export function FeaturesSection() {
  return (
    <section className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge badge-green mx-auto mb-4">Platform Capabilities</div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Built for the{" "}
            <span className="gradient-text">Future of Science</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
            Every component of LABVEX is designed to accelerate discovery,
            reward contribution, and decentralize scientific trust.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                custom={i}
                variants={inView}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-5 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}28` }}
                >
                  <Icon size={20} style={{ color: f.color }} />
                </div>
                <h3
                  className="text-[15px] font-600 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {f.title}
                </h3>
                <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
