"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Microscope,
  Menu,
  X,
  Wallet,
  ChevronDown,
  LogOut,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { truncateAddress } from "@/lib/utils";
import toast from "react-hot-toast";

export function AppTopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, walletAddress, signOut } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-carbon)]/90 backdrop-blur-xl">
      <div className="flex items-center h-14 px-4 gap-4">
        {/* Mobile logo */}
        <Link href="/feed" className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--green-neon)] flex items-center justify-center">
            <Microscope size={14} className="text-[#0d1117]" />
          </div>
          <span className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>
            LABVEX
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-lg hidden sm:flex">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              className="input-field pl-9 py-2 text-sm h-9"
              placeholder="Search research, topics, scientists..."
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* VEXY quick access */}
          <Link
            href="/vexy"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[var(--green-neon)] border border-[rgba(92,203,95,0.2)] bg-[rgba(92,203,95,0.06)] hover:bg-[rgba(92,203,95,0.12)] transition-colors"
          >
            <Zap size={13} />
            VEXY
          </Link>

          {/* Notifications */}
          <button className="relative btn-ghost p-2">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--green-neon)] rounded-full" />
          </button>

          {/* Profile dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-default)] bg-[var(--bg-surface)] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center text-[10px] font-bold text-[#0d1117]">
                  {user.username?.[0]?.toUpperCase() ?? "U"}
                </div>
                <span className="text-[13px] font-medium text-[var(--text-secondary)] hidden sm:block">
                  {user.username}
                </span>
                <ChevronDown size={12} className="text-[var(--text-muted)]" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-card py-1 z-50">
                  <Link
                    href="/profile/me"
                    className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User size={14} />
                    My Profile
                  </Link>
                  {walletAddress && (
                    <div className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--text-muted)]">
                      <Wallet size={14} />
                      {truncateAddress(walletAddress)}
                    </div>
                  )}
                  <div className="my-1 divider" />
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-400 hover:bg-[var(--glass-bg)] transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/onboarding" className="btn-primary py-2 px-4 text-[13px]">
              Enter Ecosystem
            </Link>
          )}

          {/* Mobile menu */}
          <button
            className="lg:hidden btn-ghost p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
