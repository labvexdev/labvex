"use client";

import { motion } from "framer-motion";
import { FlaskConical, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 160, paddingBottom: 96 }}>
      <div className="wrap-sm">
        <motion.div {...fade(0)}>
          <div className="badge badge-green" style={{ marginBottom: 20 }}>
            <FlaskConical size={12} style={{ marginRight: 4 }} />
            The Universal Operating System for Science
          </div>
          <h1 className="t-hero text-balance" style={{ marginBottom: 24, fontSize: "clamp(2.5rem, 4vw, 4rem)" }}>
            From Idea to <span className="t-green">Patent.</span>
          </h1>
          <p className="t-lead" style={{ marginBottom: 48, fontSize: 18, lineHeight: 1.6 }}>
            LABVEX is an AI-native decentralized scientific network on Solana where intelligence becomes capital. We are rebuilding the scientific method for the digital age—eliminating paywalls, democratizing peer review, and turning intellectual property into liquid assets.
          </p>
        </motion.div>

        <motion.div {...fade(0.1)} style={{ marginBottom: 64 }}>
          <h2 className="t-h3" style={{ marginBottom: 16 }}>The Crisis in Science</h2>
          <p className="t-body" style={{ marginBottom: 16 }}>
            Modern science is broken. Researchers spend up to 40% of their time writing grants, peer review is uncompensated and opaque, and the results of publicly funded research are locked behind publisher paywalls. This system stifles innovation and delays life-saving discoveries.
          </p>
          <p className="t-body">
            We believe that scientific discovery should be an open, verifiable, and economically rewarding pursuit. Intelligence should be capital.
          </p>
        </motion.div>

        <motion.div {...fade(0.2)} style={{ marginBottom: 64 }}>
          <h2 className="t-h3" style={{ marginBottom: 16 }}>The LABVEX Solution</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(92,203,95,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "var(--green-3)", fontWeight: 700 }}>1</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>Decentralized Peer Review</h3>
              </div>
              <p className="t-body" style={{ fontSize: 14 }}>
                A transparent, community-driven review process where validators earn on-chain reputation for rigorous critiques.
              </p>
            </div>
            
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(92,203,95,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "var(--green-3)", fontWeight: 700 }}>2</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>Intellectual Property Tokens (IPTs)</h3>
              </div>
              <p className="t-body" style={{ fontSize: 14 }}>
                Research is tokenized into IPTs, allowing researchers to raise funding directly from the community and share future royalties.
              </p>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(92,203,95,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "var(--green-3)", fontWeight: 700 }}>3</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>AI-Native Verification</h3>
              </div>
              <p className="t-body" style={{ fontSize: 14 }}>
                VEXY, our scientific AI, acts as a knowledge architect—cross-referencing data, screening for compliance (WHO/FDA), and generating hypotheses.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div {...fade(0.3)} style={{ textAlign: "center", padding: "48px 0", borderTop: "1px solid var(--border)" }}>
          <h2 className="t-h3" style={{ marginBottom: 16 }}>Ready to verify data and own your discovery?</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/onboarding" className="btn btn-dark">
              Join the Network <ArrowRight size={14} />
            </Link>
            <Link href="/docs" className="btn btn-outline">
              Read the Docs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
