"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CalendarClock, Wallet, ExternalLink, Activity, Network, Trophy } from "lucide-react";
import Link from "next/link";
import { formatNumber, truncateAddress } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

export type UserProfileData = {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  wallet_address: string;
  reputation_score: number;
  badges: string[];
  interests: string[];
  created_at: string;
  stats: { posts: number; comments: number; upvotes_received: number; missions_completed: number };
};

function CircularGauge({ score }: { score: number }) {
  const percentage = Math.min((score / 1000) * 100, 100);
  const strokeDasharray = `${percentage} 100`;

  return (
    <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="140" height="140" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
        {/* Background track */}
        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--surface-3)" strokeWidth="3" />
        {/* Fill */}
        <motion.path 
          initial={{ strokeDasharray: "0 100" }}
          animate={{ strokeDasharray }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--green-3)" strokeWidth="3" strokeLinecap="round" 
        />
      </svg>
      <div style={{ position: "absolute", textAlign: "center" }}>
        <div className="font-mono" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 10, color: "var(--subtle)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4, fontWeight: 600 }}>Score</div>
      </div>
    </div>
  );
}

export default function ProfileClient({ user, isOwnProfile }: { user: UserProfileData, isOwnProfile: boolean }) {
  const [decayDays] = useState(547);
  const [shareTitle, setShareTitle] = useState("");
  const [shareXLink, setShareXLink] = useState("");
  const [shareYoutubeLink, setShareYoutubeLink] = useState("");
  const [shareOtherLink, setShareOtherLink] = useState("");
  const [shareDesc, setShareDesc] = useState("");
  const [shareCategory, setShareCategory] = useState("Research");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShare = async () => {
    if (!shareTitle) return toast.error("Title is required.");
    if (!shareXLink && !shareYoutubeLink && !shareOtherLink) return toast.error("Please add at least one link.");
    
    setIsSubmitting(true);
    // In a real app, POST to /api/submissions
    await new Promise(r => setTimeout(r, 800));

    toast.success("Content submitted for admin review!");
    setShareTitle(""); setShareXLink(""); setShareYoutubeLink(""); setShareOtherLink(""); setShareDesc("");
    setIsSubmitting(false);
  };

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        
        {/* Header Title */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em" }}>Identity Terminal</h1>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>Verifiable credentials and reputation data</p>
          </div>
          {isOwnProfile && (
            <button className="btn btn-outline" style={{ fontSize: 13.5, padding: "0.5rem 1.1rem" }}>
              Edit Credentials
            </button>
          )}
        </div>

        {/* Top Section: Identity & Reputation */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, marginBottom: 24 }} className="lg:grid-cols-2 lg:flex-col lg:grid-cols-1">
          
          {/* Main Identity Card */}
          <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: "linear-gradient(135deg,#5ccb5f,#2e8b57)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "var(--shadow-sm)" }}>
                <span style={{ color: "#fff", fontSize: 28, fontWeight: 700 }}>{user.display_name[0]?.toUpperCase() || "?"}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em" }}>{user.display_name}</h2>
                  <div className="badge badge-green" style={{ background: "rgba(92,203,95,0.1)", border: "1px solid rgba(92,203,95,0.2)" }}>
                    <ShieldCheck size={12} style={{ marginRight: 4 }} /> ZK-Passport Valid
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>@{user.username} · Member since {user.created_at}</p>
                <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 460 }}>{user.bio}</p>
              </div>
            </div>

            <div className="hr" />

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {user.wallet_address !== "Not Connected" && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <Wallet size={14} style={{ color: "var(--muted)" }} />
                  <span className="font-mono" style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{truncateAddress(user.wallet_address)}</span>
                  <ExternalLink size={12} style={{ color: "var(--subtle)", marginLeft: 4, cursor: "pointer" }} />
                </div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.2)" }}>
                <Trophy size={14} style={{ color: "var(--gold)" }} />
                <span style={{ fontSize: 13, color: "#b48b11", fontWeight: 600 }}>Scholar Tier</span>
              </div>
            </div>
          </div>

          {/* Reputation Gauge Card */}
          <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 24 }}>Reputation Score</h3>
            
            <CircularGauge score={user.reputation_score} />

            <div style={{ marginTop: 24, padding: "10px 16px", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
              <CalendarClock size={16} style={{ color: "var(--muted)" }} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "var(--subtle)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.02em" }}>Decay Countdown</div>
                <div className="font-mono" style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{decayDays} Days</div>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Section: Stats & Badges */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="md:grid-cols-1">
          {/* Network Activity */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Activity size={16} style={{ color: "var(--green-3)" }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Network Activity</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { l: "Research Posts", v: user.stats.posts },
                { l: "Peer Reviews", v: user.stats.comments },
                { l: "Upvotes Received", v: user.stats.upvotes_received },
                { l: "Missions Completed", v: user.stats.missions_completed },
              ].map(s => (
                <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13.5, color: "var(--muted)" }}>{s.l}</span>
                  <span className="font-mono" style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <Network size={16} style={{ color: "var(--green-3)" }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>Specializations</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {user.interests.map(i => (
                <div key={i} className="badge badge-gray" style={{ fontSize: 12.5, padding: "6px 12px" }}>
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* On-Chain Badges */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <ShieldCheck size={16} style={{ color: "var(--green-3)" }} />
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>On-Chain Badges</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {user.badges.map(b => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-3)" }} />
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Submission Form */}
        {isOwnProfile && (
          <div className="card" style={{ padding: 32, marginTop: 24, border: "1px solid rgba(92,203,95,0.2)", background: "linear-gradient(135deg,rgba(92,203,95,0.02),rgba(255,255,255,1))" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(92,203,95,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-3)" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>Share Your Content</h3>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 24 }}>Submit your X posts, YouTube videos, papers, or other research. Admins will review and award reputation manually.</p>

            <div style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Title <span style={{ color: "var(--green-3)" }}>*</span></label>
                  <input value={shareTitle} onChange={e => setShareTitle(e.target.value)} placeholder="e.g. Longevity research thread" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Category</label>
                  <select value={shareCategory} onChange={e => setShareCategory(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, outline: "none" }}>
                    {["Research","Peer Review","Validation","Educational","Community"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                      X Post Link
                    </span>
                  </label>
                  <input value={shareXLink} onChange={e => setShareXLink(e.target.value)} placeholder="https://x.com/..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 13, outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17,2 12,7 7,2"/></svg>
                      YouTube Link
                    </span>
                  </label>
                  <input value={shareYoutubeLink} onChange={e => setShareYoutubeLink(e.target.value)} placeholder="https://youtube.com/..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 13, outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Other Link (DOI, paper)</label>
                  <input value={shareOtherLink} onChange={e => setShareOtherLink(e.target.value)} placeholder="https://..." style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 13, outline: "none" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>Description / Notes</label>
                <textarea value={shareDesc} onChange={e => setShareDesc(e.target.value)} placeholder="Briefly explain your content and why it should earn reputation..." rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, outline: "none", resize: "none" }} />
              </div>

              <button onClick={handleShare} disabled={isSubmitting} className="btn btn-dark" style={{ width: "fit-content", padding: "0.6rem 1.8rem", background: "var(--green-3)", borderColor: "var(--green-3)", opacity: isSubmitting ? 0.5 : 1 }}>
                Submit for Review
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}
