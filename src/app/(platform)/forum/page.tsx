"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ThumbsUp, User, ShieldAlert, Plus, Filter, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

type Reply = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  isStaff?: boolean;
};

type Thread = {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  upvotes: number;
  replies: Reply[];
  createdAt: string;
  pinned?: boolean;
};

const CATEGORIES = ["All", "General", "Research", "Support", "Platform", "DeSci"];

const INITIAL_THREADS: Thread[] = [
  {
    id: "1",
    title: "Welcome to the LABVEX Support & Community Forum",
    content: "Please read the guidelines before posting. This forum is for discussing research, reporting bugs, and asking for support regarding the LABVEX platform features.",
    author: "labvex_admin",
    category: "Support",
    upvotes: 42,
    createdAt: "2025-01-10T10:00:00Z",
    pinned: true,
    replies: []
  },
  {
    id: "2",
    title: "Best practices for writing CAS-compliant protocols?",
    content: "I've been flagged by the AI compliance filter twice this week when submitting methodologies. Does anyone have a guide on formatting?",
    author: "neuro_synthesis",
    category: "Research",
    upvotes: 14,
    createdAt: "2025-02-15T14:30:00Z",
    replies: [
      { id: "r1", author: "dr_chen_lab", content: "Make sure you include the exact CAS registry numbers in the reagents section. The AI parser looks for those specifically.", createdAt: "2025-02-15T15:00:00Z" }
    ]
  }
];

export default function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("General");
  
  // Expanded thread state
  const [expandedThreadId, setExpandedThreadId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    const u = localStorage.getItem("labvex_user");
    if (u) setCurrentUser(JSON.parse(u));
  }, []);

  const isAdmin = currentUser?.username === "labvex_admin" || currentUser?.username === "genetics_mapper";

  const handlePostThread = () => {
    if (!currentUser) return toast.error("You must be logged in to post.");
    if (!newTitle.trim() || !newContent.trim()) return toast.error("Please fill out all fields.");
    
    const newThread: Thread = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      author: currentUser.username,
      category: newCategory,
      upvotes: 0,
      replies: [],
      createdAt: new Date().toISOString(),
    };
    
    setThreads([newThread, ...threads]);
    setIsComposing(false);
    setNewTitle("");
    setNewContent("");
    toast.success("Thread posted successfully!");
  };

  const handleReply = (threadId: string) => {
    if (!currentUser) return toast.error("You must be logged in to reply.");
    if (!replyContent.trim()) return;

    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          replies: [...t.replies, {
            id: Date.now().toString(),
            author: currentUser.username,
            content: replyContent,
            createdAt: new Date().toISOString(),
            isStaff: isAdmin
          }]
        };
      }
      return t;
    }));
    setReplyContent("");
    toast.success("Reply added!");
  };

  const handleDelete = (threadId: string) => {
    if (!isAdmin) return;
    setThreads(prev => prev.filter(t => t.id !== threadId));
    toast.success("Thread removed by moderator.");
  };

  const filteredThreads = activeCategory === "All" ? threads : threads.filter(t => t.category === activeCategory);

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 960, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em" }}>Community Forum</h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>Discuss research, platform updates, and get support.</p>
        </div>
        <button onClick={() => currentUser ? setIsComposing(true) : toast.error("Please connect your wallet and create an account to post.")} className="btn btn-dark" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
          <Plus size={14} /> New Thread
        </button>
      </div>

      {/* Composition Modal */}
      <AnimatePresence>
        {isComposing && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card" style={{ padding: 24, marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>Create New Thread</h2>
            <input 
              placeholder="Thread Title" 
              value={newTitle} onChange={e => setNewTitle(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, marginBottom: 12, outline: "none" }}
            />
            <textarea 
              placeholder="What's on your mind?" 
              rows={4}
              value={newContent} onChange={e => setNewContent(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", fontSize: 14, marginBottom: 16, outline: "none", resize: "none" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 13, outline: "none" }}>
                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setIsComposing(false)} className="btn btn-outline" style={{ fontSize: 13 }}>Cancel</button>
                <button onClick={handlePostThread} className="btn btn-dark" style={{ fontSize: 13 }}>Post Thread</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
        <Filter size={14} style={{ color: "var(--muted)", marginRight: 4 }} />
        {CATEGORIES.map(c => (
          <button 
            key={c} onClick={() => setActiveCategory(c)}
            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500, transition: "all 0.2s", whiteSpace: "nowrap", border: "1px solid",
              background: activeCategory === c ? "var(--ink)" : "var(--surface)", 
              color: activeCategory === c ? "#fff" : "var(--muted)",
              borderColor: activeCategory === c ? "var(--ink)" : "var(--border)"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredThreads.map((thread) => {
          const isExpanded = expandedThreadId === thread.id;
          return (
            <motion.div key={thread.id} layout className="card" style={{ overflow: "hidden", border: thread.pinned ? "1px solid var(--green)" : "1px solid var(--border)" }}>
              {/* Thread Header / Preview */}
              <div 
                style={{ padding: "16px 20px", display: "flex", gap: 16, cursor: "pointer", background: isExpanded ? "var(--surface-2)" : "var(--surface)", transition: "background 0.2s" }}
                onClick={() => setExpandedThreadId(isExpanded ? null : thread.id)}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 40 }}>
                  <button style={{ color: "var(--subtle)", background: "transparent", border: "none" }}><ThumbsUp size={16} /></button>
                  <span className="font-mono" style={{ fontSize: 12, fontWeight: 600 }}>{thread.upvotes}</span>
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    {thread.pinned && <span className="badge badge-green" style={{ fontSize: 10, padding: "2px 6px" }}>Pinned</span>}
                    <span className="badge badge-gray" style={{ fontSize: 10, padding: "2px 6px" }}>{thread.category}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>• Posted by <strong style={{ color: "var(--ink)" }}>@{thread.author}</strong></span>
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: isExpanded ? 12 : 4 }}>{thread.title}</h2>
                  
                  {isExpanded && (
                    <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 16 }}>{thread.content}</p>
                  )}
                  
                  <div style={{ display: "flex", alignItems: "center", gap: 16, color: "var(--subtle)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <MessageCircle size={14} /> <span style={{ fontSize: 12 }}>{thread.replies.length} replies</span>
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(thread.id); }}
                    style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", padding: 4, height: "fit-content" }}
                    title="Moderate (Delete Thread)"
                  >
                    <ShieldAlert size={16} />
                  </button>
                )}
              </div>

              {/* Expanded Replies Section */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <div style={{ padding: "0 20px 20px 76px" }}>
                      <div className="hr" style={{ margin: "0 0 16px 0" }} />
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                        {thread.replies.map(reply => (
                          <div key={reply.id} style={{ padding: "12px 16px", borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>@{reply.author}</span>
                              {reply.isStaff && <span className="badge badge-green" style={{ fontSize: 9, padding: "2px 4px" }}>Staff</span>}
                            </div>
                            <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{reply.content}</p>
                          </div>
                        ))}
                        {thread.replies.length === 0 && (
                          <p style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>No replies yet. Be the first to answer.</p>
                        )}
                      </div>

                      {/* Reply Input */}
                      {currentUser ? (
                        <div style={{ display: "flex", gap: 12 }}>
                          <input 
                            placeholder="Write a reply..."
                            value={replyContent} onChange={e => setReplyContent(e.target.value)}
                            onKeyDown={e => { if (e.key === "Enter") handleReply(thread.id); }}
                            style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", fontSize: 13, outline: "none" }}
                          />
                          <button onClick={() => handleReply(thread.id)} className="btn btn-dark" style={{ fontSize: 13 }}>Reply</button>
                        </div>
                      ) : (
                        <p style={{ fontSize: 13, color: "var(--muted)" }}>You must be logged in to reply.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
