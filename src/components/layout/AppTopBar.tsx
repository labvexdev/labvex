"use client";

import { Search, Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { truncateAddress } from "@/lib/utils";
import { connectSolanaWallet } from "@/lib/wallet";

export function AppTopBar() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const w = localStorage.getItem("labvex_wallet");
    if (w) setWallet(w);
    const u = localStorage.getItem("labvex_user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const handleConnect = async () => {
    const addr = await connectSolanaWallet();
    if (addr) setWallet(addr);
  };

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
        {/* Devnet badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 99, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.25)" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#7c3aed", letterSpacing: "0.04em" }}>DEVNET</span>
        </div>

        <button
          onClick={handleConnect}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", transition: "background 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--surface)")}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: wallet ? "var(--green)" : "var(--muted)" }} />
          <span className="font-mono" style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>
            {wallet ? truncateAddress(wallet) : "Connect Wallet"}
          </span>
        </button>

        <button style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Bell size={14} style={{ color: "var(--muted)" }} />
        </button>

        <Link href={user ? `/profile/${user.username}` : "/onboarding"} style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{user ? user.display_name[0].toUpperCase() : "S"}</span>
        </Link>
      </div>
    </header>
  );
}
