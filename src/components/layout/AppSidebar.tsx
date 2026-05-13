"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, Brain, Target, Award, User, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/feed", label: "Scientific Feed", icon: Rss },
  { href: "/vexy", label: "VEXY AI", icon: Brain },
  { href: "/missions", label: "Missions", icon: Target },
  { href: "/reputation", label: "Reputation", icon: Award },
  { href: "/profile/me", label: "Profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 220,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "var(--bg-primary)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        zIndex: 40,
        paddingTop: "1.25rem",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 1.25rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <div
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg,#5ccb5f,#2e8b57)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-display)" }}>L</span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            LABVEX
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: "1rem 0.75rem", flex: 1 }}>
        <p style={{ fontSize: 10.5, fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 0.5rem", marginBottom: "0.5rem" }}>
          Platform
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "0.5rem 0.625rem",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13.5,
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--text-primary)" : "var(--text-muted)",
                  background: active ? "var(--bg-secondary)" : "transparent",
                  transition: "all 0.15s ease",
                  border: active ? "1px solid var(--border)" : "1px solid transparent",
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.color = "var(--text-primary)"; } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; } }}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom upgrade prompt */}
      <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            padding: "0.875rem",
            borderRadius: 10,
            background: "linear-gradient(135deg, rgba(92,203,95,0.06) 0%, rgba(46,139,87,0.06) 100%)",
            border: "1px solid var(--green-border)",
            cursor: "pointer",
          }}
        >
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--green-deep)", marginBottom: 2 }}>Early Access</p>
          <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>Earn reputation building on LABVEX</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 11, color: "var(--green-primary)", fontWeight: 600 }}>
            Learn more <ChevronRight size={11} />
          </div>
        </div>
      </div>
    </aside>
  );
}
