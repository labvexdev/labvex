import Link from "next/link";
import { Microscope } from "lucide-react";

export function LandingNav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-carbon)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--green-neon)] flex items-center justify-center">
            <Microscope size={16} className="text-[#0d1117]" />
          </div>
          <span
            className="font-bold text-base tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            LABVEX
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Feed", href: "/feed" },
            { label: "VEXY AI", href: "/vexy" },
            { label: "Missions", href: "/missions" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/feed" className="btn-ghost hidden sm:flex text-[14px]">
            Explore
          </Link>
          <Link href="/onboarding" className="btn-primary py-2 px-5 text-[14px]">
            Enter Ecosystem
          </Link>
        </div>
      </div>
    </header>
  );
}
