"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Bookmark, ChevronUp, MessageSquare, Share2, Sparkles, Plus, Hash, Filter, ArrowRight } from "lucide-react";
import Link from "next/link";

const TAGS = ["All", "AI", "Biotech", "Longevity", "Neuroscience", "Genetics", "DeSci"];

const POSTS = [
  { id: "1", author: "dr_chen_lab", field: "Longevity · Stanford", reputation: 1840, title: "TERT reactivation in somatic cells shows 40% lifespan extension in murine models", body: "Our team investigated controlled TERT reactivation as a longevity intervention. Results show a 40% median lifespan extension in C57BL/6 mice with no observable tumor formation at 18 months post-treatment.", tags: ["Longevity", "Genetics"], upvotes: 312, comments: 47, time: "2h ago", summary: "TERT reactivation extended median murine lifespan by 40% with no tumor formation, reduced p21 expression, and improved mitochondrial function.", casFlag: false },
  { id: "2", author: "neuro_synthesis", field: "Neuroscience · MIT", reputation: 920, title: "Ketone metabolism as neuroprotective mechanism: hypothesis for Alzheimer's targeting", body: "Exogenous ketone supplementation may act as neuroprotection via dual pathways: direct ATP generation bypassing glycolytic deficits, and NLRP3 inflammasome suppression.", tags: ["Neuroscience", "Longevity"], upvotes: 187, comments: 29, time: "5h ago", summary: null, casFlag: false },
  { id: "3", author: "vexy_analyst", field: "Bioinformatics · Broad Institute", reputation: 3200, title: "Validation methodology for AI-assisted protein folding predictions: proposed community standard", body: "Proposing a four-tier verification protocol: AlphaFold2 baseline, wet-lab MD simulation validation, community peer review with structured scoring, and on-chain attestation for verified predictions.", tags: ["AI", "Biotech"], upvotes: 456, comments: 83, time: "1d ago", summary: "Four-tier validation protocol for AI protein folding: AlphaFold2 comparison, MD simulation, peer review, and on-chain attestation.", casFlag: false },
  { id: "4", author: "genetics_mapper", field: "Genetics · Weizmann Institute", reputation: 650, title: "CRISPR-Cas9 efficiency improvements with modified guide RNA secondary structures", body: "Engineering secondary structures into guide RNAs improves Cas9 binding efficiency by 23% on average across 14 target sequences, reducing off-target activity significantly. Reagent CAS: 9001-99-4.", tags: ["Genetics", "Biotech"], upvotes: 94, comments: 16, time: "2d ago", summary: null, casFlag: true },
];

const AVATARS = ["linear-gradient(135deg,#5ccb5f,#2e8b57)", "linear-gradient(135deg,#78d96b,#5ccb5f)", "linear-gradient(135deg,#3b82f6,#1d4ed8)", "linear-gradient(135deg,#8b5cf6,#6d28d9)"];

function PostCard({ post, idx }: { post: typeof POSTS[0]; idx: number }) {
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06, duration: 0.4 }}
      style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 22px", transition: "box-shadow 0.2s, border-color 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
    >
      {/* Author row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: AVATARS[idx % 4], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>{post.author[0].toUpperCase()}</span>
        </div>
        <div style={{ flex: 1 }}>
          <Link href={`/profile/${post.author}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>@{post.author}</Link>
          <span style={{ fontSize: 12, color: "var(--subtle)", marginLeft: 8 }}>{post.field}</span>
        </div>
        <span style={{ fontSize: 11, color: "var(--subtle)" }}>{post.time}</span>
        <span className="badge badge-green" style={{ fontSize: 11 }}>{post.reputation.toLocaleString()} rep</span>
      </div>

      {/* Title */}
      <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 8, lineHeight: 1.45, letterSpacing: "-0.01em", fontFamily: "'Space Grotesk',sans-serif" }}>{post.title}</h2>
      <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.65, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.body}</p>

      {/* AI Summary */}
      {post.summary && showSummary && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          style={{ background: "rgba(92,203,95,0.05)", border: "1px solid rgba(92,203,95,0.18)", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <Sparkles size={11} style={{ color: "var(--green)" }} />
            <span style={{ fontSize: 10.5, fontWeight: 600, color: "var(--green-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>VEXY AI Summary</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6 }}>{post.summary}</p>
        </motion.div>
      )}

      {/* CAS Screening Alert */}
      {post.casFlag && (
        <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>!</span>
          </div>
          <div>
            <p style={{ fontSize: 12.5, fontWeight: 600, color: "#d97706", marginBottom: 2 }}>Compliance Filter: CAS Screening Active</p>
            <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>This post references unregistered chemical compounds or biological agents. Data is unverified by WHO/FDA standards. Proceed with caution.</p>
          </div>
        </div>
      )}

      {/* Experience Log */}
      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>Experience Log — Reproducibility</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "6px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 12.5, fontWeight: 500, color: "var(--ink)", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green)"; (e.currentTarget as HTMLElement).style.color = "var(--green-3)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}>
            Does it work <span className="badge badge-gray" style={{ fontSize: 10, padding: "2px 6px" }}>12</span>
          </button>
          <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "6px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 12.5, fontWeight: 500, color: "var(--ink)", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#ef4444"; (e.currentTarget as HTMLElement).style.color = "#dc2626"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}>
            Does not work <span className="badge badge-gray" style={{ fontSize: 10, padding: "2px 6px" }}>3</span>
          </button>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {post.tags.map(t => (
          <span key={t} className="badge badge-gray" style={{ fontSize: 11 }}><Hash size={9} />{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
        <button onClick={() => setUpvoted(!upvoted)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, fontSize: 13, fontWeight: upvoted ? 600 : 400, color: upvoted ? "var(--green-3)" : "var(--muted)", background: upvoted ? "rgba(92,203,95,0.08)" : "transparent", border: "none", cursor: "pointer", transition: "all 0.15s" }}>
          <ChevronUp size={14} />{(post.upvotes + (upvoted ? 1 : 0)).toLocaleString()}
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, fontSize: 13, color: "var(--muted)", background: "transparent", border: "none", cursor: "pointer" }}>
          <MessageSquare size={13} />{post.comments}
        </button>
        <button onClick={() => setBookmarked(!bookmarked)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, fontSize: 13, color: bookmarked ? "var(--green-3)" : "var(--muted)", background: "transparent", border: "none", cursor: "pointer" }}>
          <Bookmark size={13} />
        </button>
        <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, fontSize: 13, color: "var(--muted)", background: "transparent", border: "none", cursor: "pointer" }}>
          <Share2 size={13} />
        </button>
        {post.summary && (
          <button onClick={() => setShowSummary(!showSummary)} style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 20, fontSize: 12.5, fontWeight: 500, color: "var(--green-3)", border: "1px solid rgba(92,203,95,0.2)", background: "rgba(92,203,95,0.05)", cursor: "pointer", transition: "all 0.15s" }}>
            <Sparkles size={11} />{showSummary ? "Hide" : "AI Summary"}
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default function FeedPage() {
  const [tab, setTab] = useState("trending");
  const [tag, setTag] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const filtered = tag === "All" ? POSTS : POSTS.filter(p => p.tags.includes(tag));

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 28 }}>
        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em" }}>Scientific Feed</h1>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>Live research discussions and discoveries</p>
            </div>
            <button onClick={() => setShowCreate(!showCreate)} className="btn btn-dark" style={{ fontSize: 13.5, padding: "0.5rem 1.1rem" }}>
              <Plus size={14} />Post Research
            </button>
          </div>

          {/* Create box */}
          {showCreate && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 14, padding: 20, marginBottom: 20, boxShadow: "var(--shadow-md)" }}>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Research title or hypothesis…"
                style={{ width: "100%", border: "1px solid var(--border-2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "var(--ink)", background: "var(--surface-2)", outline: "none", marginBottom: 10, fontFamily: "inherit" }} />
              <textarea value={body} onChange={e => setBody(e.target.value)} rows={3} placeholder="Share your findings, methodology, or scientific discussion…"
                style={{ width: "100%", border: "1px solid var(--border-2)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "var(--ink)", background: "var(--surface-2)", outline: "none", resize: "none", fontFamily: "inherit" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 12, justifyContent: "flex-end" }}>
                <button onClick={() => setShowCreate(false)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13.5, color: "var(--muted)", border: "1px solid var(--border)", background: "transparent", cursor: "pointer" }}>Cancel</button>
                <button className="btn btn-dark" style={{ fontSize: 13.5, padding: "7px 20px" }}>Publish</button>
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          <div style={{ display: "flex", gap: 2, background: "var(--surface-3)", borderRadius: 10, padding: 4, width: "fit-content", marginBottom: 16 }}>
            {[{ k: "trending", icon: TrendingUp, l: "Trending" }, { k: "latest", icon: Clock, l: "Latest" }, { k: "saved", icon: Bookmark, l: "Saved" }].map(({ k, icon: Icon, l }) => (
              <button key={k} onClick={() => setTab(k)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 7, fontSize: 13.5, fontWeight: tab === k ? 600 : 400, color: tab === k ? "var(--ink)" : "var(--muted)", background: tab === k ? "var(--surface)" : "transparent", border: tab === k ? "1px solid var(--border)" : "1px solid transparent", cursor: "pointer", boxShadow: tab === k ? "var(--shadow-sm)" : "none", transition: "all 0.15s" }}>
                <Icon size={13} />{l}
              </button>
            ))}
          </div>

          {/* Tag filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)} className={tag === t ? "badge badge-green" : "badge badge-gray"} style={{ cursor: "pointer", fontSize: 12.5, transition: "all 0.15s" }}>{t}</button>
            ))}
          </div>

          {/* Posts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map((p, i) => <PostCard key={p.id} post={p} idx={i} />)}
          </div>
        </div>

        {/* Right sidebar */}
        <aside style={{ width: 268, flexShrink: 0, display: "flex", flexDirection: "column", gap: 14 }} className="hidden xl:flex">
          {/* Welcome */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 18px" }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: 14.5, marginBottom: 6, color: "var(--ink)" }}>Welcome to LABVEX</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14 }}>Connect your wallet to post research, earn reputation, and join missions.</p>
            <Link href="/onboarding" className="btn btn-dark" style={{ width: "100%", justifyContent: "center", fontSize: 13.5, padding: "0.55rem 1rem" }}>Get Started <ArrowRight size={13} /></Link>
          </div>

          {/* Leaderboard */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 18px" }}>
            <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Top Contributors</h3>
            {[{ n: "vexy_analyst", r: 3200 }, { n: "dr_chen_lab", r: 1840 }, { n: "neuro_synthesis", r: 920 }, { n: "genetics_mapper", r: 650 }].map((c, i) => (
              <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: "var(--subtle)", width: 14, textAlign: "right" }}>{i + 1}</span>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: AVATARS[i % 4], display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>{c.n[0].toUpperCase()}</span>
                </div>
                <Link href={`/profile/${c.n}`} style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "var(--ink-2)" }}>@{c.n}</Link>
                <span className="badge badge-green" style={{ fontSize: 10.5 }}>{c.r.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Active missions */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 18px" }}>
            <h3 style={{ fontSize: 11, fontWeight: 600, color: "var(--subtle)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Active Missions</h3>
            {[{ t: "Summarise a Longevity Paper", r: 50, d: "Easy" }, { t: "Validate AI Protein Prediction", r: 120, d: "Medium" }].map(m => (
              <div key={m.t} style={{ marginBottom: 10, padding: "10px 12px", borderRadius: 10, border: "1px solid var(--border)", cursor: "pointer", transition: "border-color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(92,203,95,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 6, lineHeight: 1.35 }}>{m.t}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <span className="badge badge-gray" style={{ fontSize: 10.5 }}>{m.d}</span>
                  <span className="badge badge-green" style={{ fontSize: 10.5 }}>+{m.r} rep</span>
                </div>
              </div>
            ))}
            <Link href="/missions" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, width: "100%", marginTop: 6, padding: "7px", borderRadius: 8, fontSize: 13, color: "var(--muted)", border: "1px solid var(--border)", background: "transparent", textDecoration: "none", transition: "all 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
              View All Missions <ArrowRight size={12} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
