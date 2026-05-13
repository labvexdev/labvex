"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, Sparkles, Target, Award, User, FlaskConical, ChevronRight } from "lucide-react";

const NAV = [
  { href: "/feed",        label: "Scientific Feed", icon: Rss },
  { href: "/vexy",        label: "VEXY AI",         icon: Sparkles },
  { href: "/missions",    label: "Missions",         icon: Target },
  { href: "/reputation",  label: "Reputation",       icon: Award },
  { href: "/profile/me",  label: "Profile",          icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FlaskConical size={15} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", color: "var(--ink)" }}>LABVEX</span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: "12px 10px", flex: 1 }}>
        <p style={{ fontSize: 10, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", marginBottom: 6 }}>Platform</p>
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "7px 10px", borderRadius: 8, marginBottom: 2,
              fontSize: 13.5, fontWeight: active ? 600 : 400,
              color: active ? "var(--ink)" : "var(--muted)",
              background: active ? "var(--surface-3)" : "transparent",
              border: active ? "1px solid var(--border)" : "1px solid transparent",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.color = "var(--ink)"; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; } }}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom promo */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}>
        <div style={{ padding: "12px 14px", borderRadius: 12, background: "linear-gradient(135deg,rgba(92,203,95,0.06),rgba(46,139,87,0.06))", border: "1px solid rgba(92,203,95,0.18)", cursor: "pointer" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--green-3)", marginBottom: 3 }}>Early Access</p>
          <p style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.5 }}>Earn reputation building on LABVEX</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 11.5, color: "var(--green)", fontWeight: 600 }}>
            Learn more <ChevronRight size={11} />
          </div>
        </div>
      </div>
    </aside>
  );
}
