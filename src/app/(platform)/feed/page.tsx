"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Clock, Bookmark, ChevronUp, MessageSquare,
  Share2, Zap, Plus, Hash, Filter,
} from "lucide-react";
import { timeAgo, formatNumber } from "@/lib/utils";
import Link from "next/link";

const TAGS = ["All", "AI", "Biotech", "Longevity", "Neuroscience", "Genetics", "DeSci"];

const MOCK_POSTS = [
  {
    id: "1",
    author: { username: "dr_chen_lab", reputation: 1840 },
    title: "TERT reactivation in somatic cells shows 40% lifespan extension in murine models",
    content: "Our team investigated controlled TERT reactivation as a longevity intervention. Results show a 40% median lifespan extension in C57BL/6 mice with no observable tumor formation at 18 months post-treatment.",
    tags: ["Longevity", "Genetics"],
    upvotes: 312, comment_count: 47, bookmark_count: 89,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    ai_summary: "TERT reactivation extended median murine lifespan by 40% with no tumor formation, reduced p21 expression, and improved mitochondrial function.",
  },
  {
    id: "2",
    author: { username: "neuro_synthesis", reputation: 920 },
    title: "Ketone metabolism as neuroprotective mechanism: hypothesis for Alzheimer's targeting",
    content: "Exogenous ketone supplementation may act as neuroprotection via dual pathways: direct ATP generation bypassing glycolytic deficits, and inflammatory modulation via NLRP3 inflammasome suppression.",
    tags: ["Neuroscience", "Longevity"],
    upvotes: 187, comment_count: 29, bookmark_count: 54,
    created_at: new Date(Date.now() - 18000000).toISOString(),
    ai_summary: null,
  },
  {
    id: "3",
    author: { username: "vexy_analyst", reputation: 3200 },
    title: "Validation methodology for AI-assisted protein folding predictions: proposed community standard",
    content: "Proposing a four-tier verification protocol: AlphaFold2 baseline, wet-lab MD simulation validation, community peer review with structured scoring, and on-chain attestation for verified predictions.",
    tags: ["AI", "Biotech"],
    upvotes: 456, comment_count: 83, bookmark_count: 201,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    ai_summary: "Four-tier validation protocol for AI protein folding: AlphaFold2 comparison, MD simulation, peer review, and on-chain attestation.",
  },
  {
    id: "4",
    author: { username: "genetics_mapper", reputation: 650 },
    title: "CRISPR-Cas9 efficiency improvements with modified guide RNA secondary structures",
    content: "Engineering secondary structures into guide RNAs improves Cas9 binding efficiency by 23% on average across 14 target sequences, reducing off-target activity.",
    tags: ["Genetics", "Biotech"],
    upvotes: 94, comment_count: 16, bookmark_count: 31,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    ai_summary: null,
  },
];

function PostCard({ post, index }: { post: typeof MOCK_POSTS[0]; index: number }) {
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  return (
    <motion.article
      className="post-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center text-[11px] font-bold text-[#0d1117] shrink-0">
          {post.author.username[0].toUpperCase()}
        </div>
        <div>
          <Link href={`/profile/${post.author.username}`} className="text-[13px] font-semibold text-[var(--text-primary)] hover:text-[var(--green-neon)] transition-colors">
            @{post.author.username}
          </Link>
          <span className="mx-2 text-[var(--text-muted)]">·</span>
          <span className="text-[12px] text-[var(--text-muted)]">{timeAgo(post.created_at)}</span>
        </div>
        <div className="ml-auto badge badge-green text-[11px]">{formatNumber(post.author.reputation)} rep</div>
      </div>

      <Link href={`/feed/${post.id}`}>
        <h2 className="text-[15px] font-semibold text-[var(--text-primary)] mb-2 leading-snug hover:text-[var(--green-neon)] transition-colors cursor-pointer">
          {post.title}
        </h2>
      </Link>

      <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3 line-clamp-2">{post.content}</p>

      {post.ai_summary && showSummary && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 p-3 rounded-xl border border-[rgba(92,203,95,0.2)] bg-[rgba(92,203,95,0.06)]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Zap size={11} className="text-[var(--green-neon)]" />
            <span className="text-[11px] font-semibold text-[var(--green-neon)] uppercase tracking-wider">VEXY AI Summary</span>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{post.ai_summary}</p>
        </motion.div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map((tag) => (
          <span key={tag} className="badge badge-muted text-[11px]"><Hash size={9} />{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button onClick={() => setUpvoted(!upvoted)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${upvoted ? "bg-[rgba(92,203,95,0.12)] text-[var(--green-neon)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"}`}>
          <ChevronUp size={15} />{formatNumber(post.upvotes + (upvoted ? 1 : 0))}
        </button>
        <Link href={`/feed/${post.id}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors">
          <MessageSquare size={14} />{post.comment_count}
        </Link>
        <button onClick={() => setBookmarked(!bookmarked)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition-colors ${bookmarked ? "text-[var(--green-neon)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"}`}>
          <Bookmark size={14} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors">
          <Share2 size={14} />
        </button>
        {post.ai_summary && (
          <button onClick={() => setShowSummary(!showSummary)} className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-[var(--green-neon)] border border-[rgba(92,203,95,0.2)] hover:bg-[rgba(92,203,95,0.08)] transition-colors">
            <Zap size={12} />{showSummary ? "Hide" : "AI Summary"}
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [activeTag, setActiveTag] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const filtered = activeTag === "All" ? MOCK_POSTS : MOCK_POSTS.filter((p) => p.tags.includes(activeTag));

  return (
    <div className="container-platform py-8">
      <div className="flex gap-8">
        {/* Main feed */}
        <div className="flex-1 min-w-0 max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Scientific Feed</h1>
              <p className="text-[13px] text-[var(--text-muted)] mt-0.5">Live research discussions and discoveries</p>
            </div>
            <button onClick={() => setShowCreate(!showCreate)} className="btn-primary py-2 px-4 text-[13px]">
              <Plus size={15} />Post Research
            </button>
          </div>

          {showCreate && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass-card p-5 mb-5">
              <input className="input-field mb-3" placeholder="Research title or hypothesis..." value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
              <textarea className="input-field resize-none" rows={4} placeholder="Share your findings, hypotheses, or scientific discussion..." value={postContent} onChange={(e) => setPostContent(e.target.value)} />
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-1.5 flex-1 flex-wrap">
                  {["AI", "Biotech", "Longevity"].map((t) => (
                    <span key={t} className="badge badge-muted text-[11px] cursor-pointer">{t}</span>
                  ))}
                </div>
                <button onClick={() => setShowCreate(false)} className="btn-ghost text-[13px]">Cancel</button>
                <button className="btn-primary py-2 px-4 text-[13px]">Publish</button>
              </div>
            </motion.div>
          )}

          <div className="flex items-center gap-1 mb-5 p-1 bg-[var(--bg-surface)] rounded-xl w-fit">
            {[{ key: "trending", icon: TrendingUp, label: "Trending" }, { key: "latest", icon: Clock, label: "Latest" }, { key: "saved", icon: Bookmark, label: "Saved" }].map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`tab-btn flex items-center gap-1.5 ${activeTab === tab.key ? "active" : ""}`}>
                  <Icon size={13} />{tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex gap-1.5 flex-wrap mb-6">
            {TAGS.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(tag)} className={`badge cursor-pointer transition-all ${activeTag === tag ? "badge-green" : "badge-muted"}`}>{tag}</button>
            ))}
          </div>

          <div className="space-y-4">
            {filtered.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-72 shrink-0 hidden xl:block space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-[15px] font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>Welcome to LABVEX</h3>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-4">Connect your wallet to post research, earn reputation, and participate in missions.</p>
            <Link href="/onboarding" className="btn-primary w-full justify-center text-[13px] py-2.5">Get Started</Link>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Top Contributors</h3>
            {[{ name: "vexy_analyst", rep: 3200 }, { name: "dr_chen_lab", rep: 1840 }, { name: "neuro_synthesis", rep: 920 }, { name: "genetics_mapper", rep: 650 }].map((c, i) => (
              <div key={c.name} className="flex items-center gap-2.5 mb-3 last:mb-0">
                <span className="text-[12px] text-[var(--text-muted)] w-4">{i + 1}</span>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--green-deep)] to-[var(--green-neon)] flex items-center justify-center text-[10px] font-bold text-[#0d1117]">{c.name[0].toUpperCase()}</div>
                <Link href={`/profile/${c.name}`} className="flex-1 text-[13px] font-medium hover:text-[var(--green-neon)] transition-colors">@{c.name}</Link>
                <span className="badge badge-green text-[11px]">{formatNumber(c.rep)}</span>
              </div>
            ))}
          </div>

          <div className="glass-card p-5">
            <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Active Missions</h3>
            {[{ title: "Summarize a Longevity Paper", rep: 50, diff: "Easy" }, { title: "Validate AI Output", rep: 120, diff: "Medium" }].map((m) => (
              <div key={m.title} className="mb-3 last:mb-0 p-3 rounded-xl border border-[var(--border-subtle)] hover:border-[rgba(92,203,95,0.2)] transition-colors cursor-pointer">
                <p className="text-[13px] font-medium mb-1 leading-snug">{m.title}</p>
                <div className="flex items-center gap-2">
                  <span className="badge badge-muted text-[11px]">{m.diff}</span>
                  <span className="badge badge-green text-[11px]">+{m.rep} rep</span>
                </div>
              </div>
            ))}
            <Link href="/missions" className="btn-ghost w-full justify-center text-[13px] mt-2">View All Missions</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
