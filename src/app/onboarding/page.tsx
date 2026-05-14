"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Wallet, User, Tag, CheckCircle, ArrowRight, ChevronRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { connectSolanaWallet, connectBackpackWallet } from "@/lib/wallet";

const INTERESTS = ["AI", "Biotech", "Longevity", "Neuroscience", "Genetics", "DeSci"];

const STEPS = [
  { id: 1, label: "Connect Wallet", icon: Wallet },
  { id: 2, label: "Create Profile", icon: User },
  { id: 3, label: "Select Interests", icon: Tag },
  { id: 4, label: "Enter LABVEX", icon: Zap },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

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
    const mockAddress = "7xKX" + Math.random().toString(36).substring(2, 10).toUpperCase() + "..." + Math.random().toString(36).substring(2, 6).toUpperCase();
    localStorage.setItem("labvex_wallet", mockAddress);
    setWalletConnected(true);
    toast.success("Wallet connected: " + mockAddress.substring(0, 8) + "...");
    setTimeout(() => setStep(2), 600);
  };

  const handleFinish = () => {
    if (selectedInterests.length === 0) { toast.error("Select at least one interest"); return; }
    
    // Save profile data
    const userData = {
      username: username || "anonymous",
      display_name: displayName || "New Researcher",
      bio: bio || "Science enthusiast and LABVEX member.",
      interests: selectedInterests,
      wallet_address: localStorage.getItem("labvex_wallet") || "Not Connected",
      reputation_score: 100, // Starting score
      badges: ["Early Scientist"],
      created_at: new Date().toISOString().split('T')[0],
      stats: { posts: 0, comments: 0, upvotes_received: 0, missions_completed: 0 }
    };
    localStorage.setItem("labvex_user", JSON.stringify(userData));

    setStep(4);
    setTimeout(() => router.push(`/profile/${userData.username}`), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface)", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(92,203,95,0.05) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", width: "100%", height: "1px", top: "25%", background: "linear-gradient(90deg, transparent, var(--border), transparent)", opacity: 0.5 }} />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 480 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 48 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-sm)" }}>
            <FlaskConical size={20} color="#fff" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em", color: "var(--ink)" }}>LABVEX</span>
        </div>

        {/* Stepper */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 48 }}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ 
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s",
                  background: done ? "var(--green)" : active ? "var(--surface)" : "var(--surface-2)",
                  border: active ? "2px solid var(--green)" : "1px solid var(--border)",
                  boxShadow: active ? "0 0 15px var(--green-glow)" : "none"
                }}>
                  {done ? <CheckCircle size={14} color="#fff" /> : <Icon size={14} color={active ? "var(--green-3)" : "var(--muted)"} />}
                </div>
                {i < STEPS.length - 1 && <div style={{ width: 24, height: 1, background: step > s.id ? "var(--green)" : "var(--border)" }} />}
              </div>
            );
          })}
        </div>

        {/* Form Area */}
        <AnimatePresence mode="wait">
          {/* Step 1 — Connect wallet */}
          {step === 1 && (
            <motion.div key="step1" {...fade()} className="card" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(92,203,95,0.08)", border: "1px solid rgba(92,203,95,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <Wallet size={28} color="var(--green-3)" />
              </div>
              <h2 className="t-h3" style={{ marginBottom: 12, fontSize: 22 }}>Connect Your Wallet</h2>
              <p className="t-body" style={{ marginBottom: 32, fontSize: 14.5 }}>
                Your Solana wallet is your scientific identity on LABVEX. Connect Phantom or Backpack to get started.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Phantom Wallet", sub: "Most popular Solana wallet", color: "#ab9ff2", connect: connectSolanaWallet },
                  { label: "Backpack", sub: "Multi-chain wallet by Coral", color: "#e15d3d", connect: connectBackpackWallet },
                ].map((w) => (
                  <button
                    key={w.label}
                    onClick={async () => {
                      const addr = await w.connect();
                      if (addr) {
                        setWalletConnected(true);
                        toast.success("Identity Verified: " + addr.substring(0, 8) + "...");
                        setTimeout(() => setStep(2), 800);
                      }
                    }}
                    style={{ 
                      width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--surface)", transition: "all 0.2s", textAlign: "left" 
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${w.color}15`, border: `1px solid ${w.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Wallet size={16} style={{ color: w.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{w.label}</p>
                      <p style={{ fontSize: 12, color: "var(--subtle)" }}>{w.sub}</p>
                    </div>
                    <ChevronRight size={14} style={{ color: "var(--subtle)" }} />
                  </button>
                ))}
              </div>
              
              <button onClick={() => setStep(2)} style={{ background: "none", border: "none", width: "100%", display: "flex", justifyContent: "center", marginTop: 24, fontSize: 13.5, color: "var(--muted)", fontWeight: 500, cursor: "pointer" }}>
                Continue without wallet
              </button>
            </motion.div>
          )}

          {/* Step 2 — Create profile */}
          {step === 2 && (
            <motion.div key="step2" {...fade()} className="card" style={{ padding: 40 }}>
              <h2 className="t-h3" style={{ marginBottom: 8, fontSize: 22 }}>Create Your Profile</h2>
              <p className="t-body" style={{ marginBottom: 32, fontSize: 14.5 }}>Set up your scientific identity on LABVEX.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Username <span style={{ color: "var(--green-3)" }}>*</span></label>
                  <input 
                    placeholder="e.g. dr_chen_lab" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, "_"))} 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, color: "var(--ink)", outline: "none" }}
                  />
                  <p className="font-mono" style={{ fontSize: 11, color: "var(--subtle)", marginTop: 6 }}>labvex.io/profile/{username || "your_username"}</p>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Display Name</label>
                  <input 
                    placeholder="Dr. Jane Smith" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, color: "var(--ink)", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Bio</label>
                  <textarea 
                    rows={3} 
                    placeholder="Tell the scientific community about your research focus..." 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, color: "var(--ink)", outline: "none", resize: "none" }}
                  />
                </div>
              </div>
              
              <button
                onClick={() => { if (!username.trim()) { toast.error("Username is required"); return; } setStep(3); }}
                className="btn btn-dark" style={{ width: "100%", justifyContent: "center", marginTop: 32, fontSize: 15, padding: "12px" }}
              >
                Continue <ArrowRight size={15} />
              </button>
            </motion.div>
          )}

          {/* Step 3 — Interests */}
          {step === 3 && (
            <motion.div key="step3" {...fade()} className="card" style={{ padding: 40 }}>
              <h2 className="t-h3" style={{ marginBottom: 8, fontSize: 22 }}>Select Your Interests</h2>
              <p className="t-body" style={{ marginBottom: 32, fontSize: 14.5 }}>We'll personalize your feed and VEXY AI recommendations.</p>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 24 }}>
                {INTERESTS.map((interest) => {
                  const selected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      style={{ 
                        padding: "12px", borderRadius: 12, border: selected ? "2px solid var(--green)" : "1px solid var(--border)", 
                        background: selected ? "rgba(92,203,95,0.08)" : "var(--surface)", 
                        color: selected ? "var(--green-3)" : "var(--muted)",
                        fontSize: 14, fontWeight: selected ? 600 : 500, transition: "all 0.2s", textAlign: "center", cursor: "pointer"
                      }}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
              
              <p style={{ fontSize: 12, color: "var(--subtle)", textAlign: "center", marginBottom: 24 }}>{selectedInterests.length} selected — choose at least 1</p>
              
              <button onClick={handleFinish} className="btn btn-dark" style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "12px" }}>
                Enter LABVEX <Zap size={15} />
              </button>
            </motion.div>
          )}

          {/* Step 4 — Success */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card" style={{ padding: 48, textAlign: "center" }}>
              <motion.div
                style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 0 20px var(--green-glow)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <CheckCircle size={32} color="#fff" />
              </motion.div>
              <h2 className="t-h3" style={{ marginBottom: 12, fontSize: 24 }}>Welcome to LABVEX</h2>
              <p className="t-body">Your scientific identity is ready. Entering the ecosystem...</p>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 32 }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Disclaimer */}
      <div style={{ position: "relative", zIndex: 10, marginTop: 48, textAlign: "center", maxWidth: 400 }}>
        <p style={{ fontSize: 11, color: "var(--subtle)", lineHeight: 1.6 }}>
          <strong>Notice:</strong> By connecting your wallet, you agree to the LABVEX Informed Consent Protocol and Terms of Service. Science is a collaborative pursuit.
        </p>
      </div>
    </div>
  );
}
