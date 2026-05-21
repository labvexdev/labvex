"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Wallet, User, Tag, CheckCircle, ArrowRight, ChevronRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { signIn } from "next-auth/react";
import bs58 from "bs58";

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
  const router = useRouter();

  const { select, wallets, publicKey, signMessage, disconnect } = useWallet();

  const toggleInterest = (i: string) =>
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  // Watch for wallet connection to trigger signature
  useEffect(() => {
    const handleSign = async () => {
      if (publicKey && signMessage && step === 1) {
        try {
          const message = `Sign this message to prove you own this wallet for LABVEX.\n\nNonce: ${Math.floor(Math.random() * 1000000)}`;
          const messageBytes = new TextEncoder().encode(message);
          
          toast.loading("Please sign the message in your wallet...", { id: "signMsg" });
          const signatureBytes = await signMessage(messageBytes);
          toast.dismiss("signMsg");
          
          const signature = bs58.encode(signatureBytes);
          const pubKeyStr = publicKey.toBase58();

          toast.loading("Verifying...", { id: "verify" });
          const res = await signIn("solana", {
            message,
            signature,
            publicKey: pubKeyStr,
            redirect: false,
          });
          toast.dismiss("verify");

          if (res?.error) {
            toast.error("Signature verification failed");
            await disconnect();
          } else {
            toast.success("Wallet verified!");
            setStep(2);
          }
        } catch (err: any) {
          toast.dismiss("signMsg");
          toast.error(err.message || "Failed to sign message");
          await disconnect();
        }
      }
    };
    handleSign();
  }, [publicKey, signMessage, step, disconnect]);

  const connectGoogle = async () => {
    await signIn("google", { callbackUrl: "/feed" });
  };

  const handleFinish = () => {
    if (selectedInterests.length === 0) { toast.error("Select at least one interest"); return; }
    
    // In a real app, you'd send these details to an API to update the User record.
    // We already created the user on signIn, so here we just advance.
    setStep(4);
    setTimeout(() => router.push(`/feed`), 2000);
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
              <h2 className="t-h3" style={{ marginBottom: 12, fontSize: 22 }}>Connect Your Identity</h2>
              <p className="t-body" style={{ marginBottom: 32, fontSize: 14.5 }}>
                Your Solana wallet or Google account acts as your scientific identity on LABVEX. 
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {wallets.slice(0, 2).map((w) => (
                  <button
                    key={w.adapter.name}
                    onClick={() => select(w.adapter.name)}
                    style={{ 
                      width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--surface)", transition: "all 0.2s", textAlign: "left", cursor: "pointer"
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
                  >
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `rgba(255,255,255,0.05)`, border: `1px solid rgba(255,255,255,0.1)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <img src={w.adapter.icon} alt={w.adapter.name} style={{ width: 20, height: 20 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{w.adapter.name}</p>
                      <p style={{ fontSize: 12, color: "var(--subtle)" }}>Sign-in with Solana</p>
                    </div>
                    <ChevronRight size={14} style={{ color: "var(--subtle)" }} />
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                <span style={{ fontSize: 12, color: "var(--subtle)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>OR</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>

              <button
                onClick={connectGoogle}
                style={{ 
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 16px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--surface)", transition: "all 0.2s", cursor: "pointer"
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green)"; (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                  <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.654-3.342-11.303-8h-6.571v4.819C9.656 39.663 16.318 44 24 44z"/>
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                </svg>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>Continue with Google</span>
              </button>
              
            </motion.div>
          )}

          {/* Step 2 — Create profile */}
          {step === 2 && (
            <motion.div key="step2" {...fade()} className="card" style={{ padding: 40 }}>
              <h2 className="t-h3" style={{ marginBottom: 8, fontSize: 22 }}>Setup Optional Info</h2>
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
                onClick={() => { setStep(3); }}
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
          <strong>Notice:</strong> By connecting your wallet or Google account, you agree to the LABVEX Informed Consent Protocol and Terms of Service. Science is a collaborative pursuit.
        </p>
      </div>
    </div>
  );
}
