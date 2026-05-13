"use client";

import Link from "next/link";

const LINKS = [
  { label: "Platform", href: "/feed" },
  { label: "About", href: "/about" },
  { label: "VEXY AI", href: "/vexy" },
  { label: "Missions", href: "/missions" },
  { label: "Reputation", href: "/reputation" },
];

export function LandingFooter() {
  return (
    <footer
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
        padding: "3rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: "linear-gradient(135deg,#5ccb5f,#2e8b57)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-display)" }}>L</span>
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              LABVEX
            </span>
          </Link>

          {/* Nav */}
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem 1.75rem" }}>
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                style={{ fontSize: 13.5, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p style={{ fontSize: 12.5, color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} LABVEX. Building the open scientific stack.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {["Privacy", "Terms"].map((t) => (
              <Link
                key={t}
                href="#"
                style={{ fontSize: 12.5, color: "var(--text-muted)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
