"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, Wallet, User, Tag, CheckCircle, ArrowRight, ChevronRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const INTERESTS = ["AI", "Biotech", "Longevity", "Neuroscience", "Genetics", "DeSci"];

const STEPS = [
  { id: 1, label: "Connect Wallet", icon: Wallet },
  { id: 2, label: "Create Profile", icon: User },
  { id: 3, label: "Select Interests", icon: Tag },
  { id: 4, label: "Enter LABVEX", icon: Zap },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const router = useRouter();

  const toggleInterest = (i: string) =>
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const connectWallet = async () => {
    await new Promise((r) => setTimeout(r, 900));
    setWalletConnected(true);
    toast.success("Wallet connected!");
    setTimeout(() => setStep(2), 600);
  };

  const handleFinish = () => {
    if (selectedInterests.length === 0) { toast.error("Select at least one interest"); return; }
    setStep(4);
    setTimeout(() => router.push("/feed"), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-carbon)] sci-grid flex flex-col items-center justify-center px-6 py-12">
      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(92,203,95,0.08) 0%, transparent 60%)" }} />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <div className="w-10 h-10 rounded-xl bg-[var(--green-neon)] flex items-center justify-center">
            <Microscope size={20} className="text-[#0d1117]" />
          </div>
          <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>LABVEX</span>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${done ? "bg-[var(--green-neon)]" : active ? "border-2 border-[var(--green-neon)] bg-[rgba(92,203,95,0.1)]" : "border border-[var(--border-subtle)] opacity-40"}`}>
                  {done ? <CheckCircle size={14} className="text-[#0d1117]" /> : <Icon size={13} className={active ? "text-[var(--green-neon)]" : "text-[var(--text-muted)]"} />}
                </div>
                {i < STEPS.length - 1 && <div className={`w-8 h-px ${step > s.id ? "bg-[var(--green-neon)]" : "bg-[var(--border-subtle)]"}`} />}
              </div>
            );
          })}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {/* Step 1 — Connect wallet */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(92,203,95,0.1)] border border-[rgba(92,203,95,0.25)] flex items-center justify-center mx-auto mb-5">
                <Wallet size={28} className="text-[var(--green-neon)]" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Connect Your Wallet</h2>
              <p className="text-[var(--text-secondary)] text-[14px] mb-8 leading-relaxed">
                Your Solana wallet is your scientific identity on LABVEX. Connect Phantom or Backpack to get started.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Phantom Wallet", sub: "Most popular Solana wallet", color: "#ab9ff2" },
                  { label: "Backpack", sub: "Multi-chain wallet by Coral", color: "#e15d3d" },
                ].map((w) => (
                  <button
                    key={w.label}
                    onClick={connectWallet}
                    className="w-full flex items-center gap-3 p-4 rounded-xl border border-[var(--border-subtle)] hover:border-[rgba(92,203,95,0.3)] hover:bg-[var(--glass-bg)] transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${w.color}20`, border: `1px solid ${w.color}40` }}>
                      <Wallet size={16} style={{ color: w.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] font-semibold">{w.label}</p>
                      <p className="text-[12px] text-[var(--text-muted)]">{w.sub}</p>
                    </div>
                    <ChevronRight size={14} className="text-[var(--text-muted)]" />
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-ghost w-full justify-center mt-4 text-[13px]">
                Continue without wallet
              </button>
            </motion.div>
          )}

          {/* Step 2 — Create profile */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Create Your Profile</h2>
              <p className="text-[var(--text-secondary)] text-[14px] mb-6">Set up your scientific identity on LABVEX.</p>
              <div className="space-y-4">
                <div>
                  <label className="text-[13px] font-medium text-[var(--text-secondary)] block mb-1.5">Username <span className="text-[var(--green-neon)]">*</span></label>
                  <input className="input-field" placeholder="e.g. dr_chen_lab" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, "_"))} />
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">labvex.io/profile/{username || "your_username"}</p>
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[var(--text-secondary)] block mb-1.5">Display Name</label>
                  <input className="input-field" placeholder="Dr. Jane Smith" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[var(--text-secondary)] block mb-1.5">Bio</label>
                  <textarea className="input-field resize-none" rows={3} placeholder="Tell the scientific community about your research focus..." value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
              </div>
              <button
                onClick={() => { if (!username.trim()) { toast.error("Username is required"); return; } setStep(3); }}
                className="btn-primary w-full justify-center mt-6"
              >
                Continue <ArrowRight size={15} />
              </button>
            </motion.div>
          )}

          {/* Step 3 — Interests */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Select Your Interests</h2>
              <p className="text-[var(--text-secondary)] text-[14px] mb-6">We'll personalize your feed and VEXY AI recommendations.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {INTERESTS.map((interest) => {
                  const selected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`py-3 px-4 rounded-xl border text-[14px] font-medium transition-all ${selected ? "border-[var(--green-neon)] bg-[rgba(92,203,95,0.1)] text-[var(--green-neon)]" : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"}`}
                    >
                      {selected && <CheckCircle size={13} className="inline mr-1.5" />}{interest}
                    </button>
                  );
                })}
              </div>
              <p className="text-[12px] text-[var(--text-muted)] mb-5">{selectedInterests.length} selected — choose at least 1</p>
              <button onClick={handleFinish} className="btn-primary w-full justify-center">
                Enter LABVEX <Zap size={15} />
              </button>
            </motion.div>
          )}

          {/* Step 4 — Success */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 text-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-[var(--green-neon)] flex items-center justify-center mx-auto mb-5"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                <CheckCircle size={36} className="text-[#0d1117]" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Welcome to LABVEX!</h2>
              <p className="text-[var(--text-secondary)] text-[14px]">Your scientific identity is ready. Entering the ecosystem...</p>
              <div className="flex items-center justify-center gap-1.5 mt-5 text-[var(--green-neon)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-neon)] animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-neon)] animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-neon)] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
