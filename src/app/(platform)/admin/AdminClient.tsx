"use client";

import { useState } from "react";
import { ShieldCheck, XCircle, ExternalLink, Zap } from "lucide-react";
import toast from "react-hot-toast";

export type SubmissionData = {
  id: string;
  author: string;
  title: string;
  link: string;
  desc: string | null;
  status: string;
  date: string;
};

export default function AdminClient({ initialSubmissions }: { initialSubmissions: SubmissionData[] }) {
  const [submissions, setSubmissions] = useState<SubmissionData[]>(initialSubmissions);

  const handleAction = async (id: string, action: "Approved" | "Rejected", repToAward: number = 0) => {
    // Optimistic update
    const updated = submissions.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: action };
      }
      return sub;
    });
    setSubmissions(updated);
    
    // In a real app, POST to /api/submissions/[id]/action
    await new Promise(r => setTimeout(r, 500));
    
    if (action === "Approved") {
      toast.success(`Content approved! Awarded ${repToAward} Rep to author.`);
    } else {
      toast.error("Content rejected.");
    }
  };

  return (
    <div style={{ padding: "28px 28px 48px", maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(220, 38, 38, 0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ShieldCheck size={20} color="#dc2626" />
        </div>
        <div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.02em" }}>Admin Console</h1>
          <p style={{ fontSize: 13.5, color: "var(--muted)" }}>Manual Content Verification & Reputation Issuance</p>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 20 }}>Pending Verifications</h2>
        
        {submissions.length === 0 ? (
          <p style={{ fontSize: 14, color: "var(--muted)" }}>No submissions pending.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {submissions.map((sub) => (
              <div key={sub.id} style={{ border: "1px solid var(--border)", padding: 20, borderRadius: 12, background: "var(--surface-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{sub.title}</h3>
                      <span className={`badge badge-${sub.status === "Pending" ? "gray" : sub.status === "Approved" ? "green" : "red"}`} style={{ fontSize: 11 }}>{sub.status}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Submitted by <strong>@{sub.author}</strong> on {new Date(sub.date).toLocaleDateString()}</p>
                    <a href={sub.link} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "#2563eb", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      {sub.link} <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                
                {sub.desc && (
                  <div style={{ padding: 12, background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)", fontSize: 13.5, color: "var(--ink-2)", marginBottom: 16 }}>
                    {sub.desc}
                  </div>
                )}

                {sub.status === "Pending" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Award Reputation:</span>
                      <input id={`rep-${sub.id}`} type="number" defaultValue={50} style={{ width: 80, padding: "6px 10px", borderRadius: 6, border: "1px solid var(--border)", outline: "none", fontSize: 13 }} />
                    </div>
                    <button 
                      onClick={() => {
                        const val = parseInt((document.getElementById(`rep-${sub.id}`) as HTMLInputElement).value || "0");
                        handleAction(sub.id, "Approved", val);
                      }}
                      className="btn btn-dark" style={{ background: "var(--green-3)", borderColor: "var(--green-3)" }}>
                      <ShieldCheck size={14} /> Approve & Grant
                    </button>
                    <button onClick={() => handleAction(sub.id, "Rejected")} className="btn btn-outline" style={{ color: "#dc2626", borderColor: "rgba(220,38,38,0.3)" }}>
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
