"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  Microscope,
  Dna,
  Activity,
} from "lucide-react";

const floatVariants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Radial glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(92,203,95,0.1) 0%, transparent 65%)",
        }}
      />

      {/* Floating DNA strands */}
      <motion.div
        className="absolute top-24 left-[8%] opacity-20"
        variants={floatVariants}
        animate="animate"
      >
        <Dna size={48} className="text-[var(--green-neon)]" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-[10%] opacity-15"
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
      >
        <Activity size={36} className="text-[var(--green-deep)]" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[12%] opacity-10"
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
      >
        <Microscope size={40} className="text-[var(--green-mint)]" />
      </motion.div>

      {/* Badge */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="badge badge-green mb-8 text-[13px]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green-neon)] animate-pulse" />
        AI-Native DeSci Ecosystem · Now in Beta
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center max-w-5xl leading-[1.08] tracking-tight mb-6"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The Unified{" "}
        <span className="gradient-text">DeSci</span>
        <br />
        Operating System
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-lg sm:text-xl text-[var(--text-secondary)] text-center max-w-2xl mb-4 leading-relaxed"
      >
        Where AI meets decentralized science. Collaborate, discover, and verify
        research across a living ecosystem of scientists, AI agents, and biotech
        communities.
      </motion.p>

      {/* Philosophy */}
      <motion.p
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-[13px] text-[var(--text-muted)] tracking-widest uppercase mb-12 font-medium"
      >
        Don&apos;t trust papers · Verify data · Own discovery
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row items-center gap-4 mb-20"
      >
        <Link href="/onboarding" className="btn-primary text-base px-8 py-3.5">
          Enter Ecosystem
          <ArrowRight size={16} />
        </Link>
        <Link href="/onboarding" className="btn-secondary text-base px-8 py-3.5">
          <Wallet size={16} />
          Connect Wallet
        </Link>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="glass-card flex flex-col sm:flex-row items-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)] px-0 py-0 overflow-hidden max-w-2xl w-full"
      >
        {[
          { value: "2,400+", label: "Scientists" },
          { value: "18K+", label: "Research Posts" },
          { value: "94%", label: "AI Accuracy" },
          { value: "Solana", label: "Infrastructure" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex-1 text-center py-5 px-6"
          >
            <div
              className="text-2xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {stat.value}
            </div>
            <div className="text-[12px] text-[var(--text-muted)] mt-1 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--green-neon)] to-transparent" />
      </motion.div>
    </section>
  );
}
