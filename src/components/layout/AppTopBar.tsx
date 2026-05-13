"use client";

import { Search, Bell, FlaskConical } from "lucide-react";
import Link from "next/link";

export function AppTopBar() {
  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, maxWidth: 340 }}>
        <Search size={13} style={{ color: "var(--subtle)", flexShrink: 0 }} />
        <input
          placeholder="Search research, scientists, topics…"
          style={{ background: "transparent", border: "none", outline: "none", fontSize: 13.5, color: "var(--ink)", width: "100%", fontFamily: "inherit" }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--surface)")}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
          <span className="font-mono" style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Connect Wallet</span>
        </button>
        <button style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Bell size={14} style={{ color: "var(--muted)" }} />
        </button>
        <Link href="/profile/me" style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>S</span>
        </Link>
      </div>
    </header>
  );
}
