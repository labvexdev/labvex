"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Microscope,
  LayoutDashboard,
  Zap,
  Trophy,
  Target,
  Info,
  User,
  ChevronRight,
  TrendingUp,
  Dna,
  Brain,
  Leaf,
  Activity,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/feed", label: "Scientific Feed", icon: LayoutDashboard },
  { href: "/vexy", label: "VEXY AI", icon: Zap },
  { href: "/missions", label: "Missions", icon: Target },
  { href: "/reputation", label: "Reputation", icon: Trophy },
  { href: "/profile/me", label: "My Profile", icon: User },
  { href: "/about", label: "About LABVEX", icon: Info },
];

const trendingTopics = [
  { label: "AI", icon: Brain, color: "#60a5fa" },
  { label: "Longevity", icon: Leaf, color: "#5ccb5f" },
  { label: "Neuroscience", icon: Activity, color: "#a78bfa" },
  { label: "Genetics", icon: Dna, color: "#f59e0b" },
  { label: "Biotech", icon: FlaskConical, color: "#f87171" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-[var(--border-subtle)] bg-[var(--bg-graphite)] overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[var(--border-subtle)]">
        <div className="w-8 h-8 rounded-lg bg-[var(--green-neon)] flex items-center justify-center">
          <Microscope size={16} className="text-[#0d1117]" />
        </div>
        <span
          className="text-[15px] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          LABVEX
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className="sidebar-link" data-active={isActive}>
              <span
                className={cn(
                  "sidebar-link w-full",
                  isActive && "active"
                )}
              >
                <Icon size={16} />
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Trending Topics */}
      <div className="px-3 pb-4">
        <div className="glass-card p-3">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={13} className="text-[var(--green-neon)]" />
            <span className="text-[11px] font-600 uppercase tracking-widest text-[var(--text-muted)]">
              Trending
            </span>
          </div>
          <div className="space-y-1.5">
            {trendingTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.label}
                  href={`/feed?tag=${topic.label.toLowerCase()}`}
                  className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-[var(--glass-bg)] transition-colors group"
                >
                  <Icon size={13} style={{ color: topic.color }} />
                  <span className="text-[13px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {topic.label}
                  </span>
                  <ChevronRight size={11} className="ml-auto text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[var(--border-subtle)]">
        <p className="text-[11px] text-[var(--text-muted)]">
          LABVEX v1.0 · DeSci OS
        </p>
      </div>
    </aside>
  );
}
