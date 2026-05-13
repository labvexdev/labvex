"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Microscope, Globe, Code } from "lucide-react";

const links = [
  { label: "Scientific Feed", href: "/feed" },
  { label: "VEXY AI", href: "/vexy" },
  { label: "Community Missions", href: "/missions" },
  { label: "Reputation System", href: "/reputation" },
  { label: "About LABVEX", href: "/about" },
];

const socials = [
  { label: "Twitter / X", href: "https://x.com/labvex", icon: Globe },
  { label: "GitHub", href: "https://github.com/labvex", icon: Code },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-graphite)]">
      {/* CTA band */}
      <div className="border-b border-[var(--border-subtle)] py-20 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="badge badge-green mx-auto mb-5">Begin Your Journey</div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join the DeSci Revolution
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-xl mx-auto">
            LABVEX is live. Connect your wallet, build your scientific identity,
            and start contributing to the future of decentralized science.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding" className="btn-primary text-base px-8 py-3.5">
              Enter Ecosystem
              <ArrowRight size={16} />
            </Link>
            <Link href="/feed" className="btn-secondary text-base px-8 py-3.5">
              Browse the Feed
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer links */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--green-neon)] flex items-center justify-center">
                <Microscope size={16} className="text-[#0d1117]" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "var(--font-display)" }}>
                LABVEX
              </span>
            </div>
            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
              The Unified DeSci Operating System. AI-native. Decentralized.
              Scientific.
            </p>
            <p className="text-[12px] text-[var(--text-muted)] mt-3 italic">
              "Don't trust papers. Verify data. Own discovery."
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mb-4 font-medium">
              Platform
            </p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--green-neon)] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-widest mb-4 font-medium">
              Community
            </p>
            <ul className="space-y-2.5">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--green-neon)] transition-colors"
                    >
                      <Icon size={14} />
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--text-muted)]">
            © 2025 LABVEX. All rights reserved.
          </p>
          <p className="text-[12px] text-[var(--text-muted)]">
            Built on Solana · Powered by AI · Made for Science
          </p>
        </div>
      </div>
    </footer>
  );
}
