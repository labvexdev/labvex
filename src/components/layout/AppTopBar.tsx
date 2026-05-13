"use client";

import { Search, Bell } from "lucide-react";
import Link from "next/link";

export function AppTopBar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 220,
        right: 0,
        height: 56,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        zIndex: 39,
      }}
    >
      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: 24,
          padding: "0.4rem 0.875rem",
          width: 260,
        }}
      >
        <Search size={13} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
        <input
          placeholder="Search research, scientists..."
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 13,
            color: "var(--text-primary)",
            width: "100%",
          }}
        />
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bell size={14} style={{ color: "var(--text-muted)" }} />
        </button>

        <Link
          href="/profile/me"
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg,#5ccb5f,#2e8b57)",
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>S</span>
        </Link>
      </div>
    </header>
  );
}
