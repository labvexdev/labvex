"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rss, Sparkles, Target, Award, User, FlaskConical, MessageSquare, Home, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/feed",        label: "Scientific Feed", icon: Rss },
  { href: "/vexy",        label: "VEXY AI",         icon: Sparkles },
  { href: "/missions",    label: "Missions",         icon: Target },
  { href: "/reputation",  label: "Reputation",       icon: Award },
  { href: "/forum",       label: "Community Forum",  icon: MessageSquare },
  { href: "/profile/me",  label: "My Profile",       icon: User },
];

const ADMIN_USERNAMES = ["labvex_admin", "genetics_mapper"];

export function AppSidebar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("labvex_user");
    if (u) {
      const parsed = JSON.parse(u);
      if (ADMIN_USERNAMES.includes(parsed.username)) setIsAdmin(true);
    }
  }, []);

  return (
    <aside className="sidebar">
      {/* Logo — clicking goes back to the landing page */}
      <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FlaskConical size={15} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em", color: "var(--ink)" }}>LABVEX</span>
        </Link>
      </div>

      {/* Back to home link */}
      <div style={{ padding: "8px 10px 0" }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: 9,
          padding: "6px 10px", borderRadius: 8,
          fontSize: 12.5, fontWeight: 500,
          color: "var(--subtle)",
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.color = "var(--ink)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--subtle)"; }}
        >
          <Home size={13} /> Back to Website
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: "8px 10px", flex: 1 }}>
        <p style={{ fontSize: 10, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px", marginBottom: 6 }}>App</p>
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

        {/* Admin link — only shown to admins */}
        {isAdmin && (
          <>
            <p style={{ fontSize: 10, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "12px 8px 6px", marginTop: 8, borderTop: "1px solid var(--border)" }}>Admin</p>
            <Link href="/admin" style={{
              display: "flex", alignItems: "center", gap: 9,
              padding: "7px 10px", borderRadius: 8,
              fontSize: 13.5, fontWeight: pathname === "/admin" ? 600 : 400,
              color: pathname === "/admin" ? "#dc2626" : "var(--muted)",
              background: pathname === "/admin" ? "rgba(220,38,38,0.06)" : "transparent",
              border: pathname === "/admin" ? "1px solid rgba(220,38,38,0.15)" : "1px solid transparent",
              transition: "all 0.15s",
            }}
              onMouseEnter={e => { if (pathname !== "/admin") { e.currentTarget.style.background = "rgba(220,38,38,0.04)"; e.currentTarget.style.color = "#dc2626"; } }}
              onMouseLeave={e => { if (pathname !== "/admin") { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; } }}
            >
              <ShieldCheck size={15} />
              Admin Console
            </Link>
          </>
        )}
      </nav>

      {/* Bottom promo */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}>
        <div style={{ padding: "12px 14px", borderRadius: 12, background: "linear-gradient(135deg,rgba(92,203,95,0.06),rgba(46,139,87,0.06))", border: "1px solid rgba(92,203,95,0.18)" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--green-3)", marginBottom: 3 }}>Early Access</p>
          <p style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.5 }}>Earn reputation building on LABVEX</p>
        </div>
      </div>
    </aside>
  );
}
