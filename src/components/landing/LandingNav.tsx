"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Platform", href: "/feed" },
  { label: "About", href: "/about" },
  { label: "VEXY AI", href: "/vexy" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(15,23,32,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(15,23,32,0.06)" : "none",
      }}
    >
      <nav className="container flex items-center justify-between h-16 px-6" style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline" style={{ textDecoration: "none" }}>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #5ccb5f 0%, #2e8b57 100%)" }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>L</span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            LABVEX
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{ color: "var(--text-muted)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/feed" className="btn-secondary" style={{ padding: "0.5rem 1.25rem", fontSize: 14 }}>
            Sign in
          </Link>
          <Link href="/onboarding" className="btn-primary" style={{ padding: "0.5rem 1.25rem", fontSize: 14 }}>
            Get started <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: "var(--text-primary)", background: "transparent", border: "none", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "1.25rem 1.5rem 1.5rem" }}
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 500, textDecoration: "none" }}>
                  {l.label}
                </Link>
              ))}
              <Link href="/onboarding" className="btn-primary mt-2" style={{ justifyContent: "center" }}>
                Get started <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
