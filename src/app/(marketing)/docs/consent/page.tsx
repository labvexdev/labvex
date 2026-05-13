"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ConsentPage() {
  return (
    <div style={{ paddingTop: 120, paddingBottom: 96 }}>
      <div className="wrap-sm">
        <Link href="/docs" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "var(--muted)", textDecoration: "none", marginBottom: 32 }}>
          <ArrowLeft size={14} /> Back to Docs
        </Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="t-h2" style={{ marginBottom: 24 }}>Informed Consent Protocol</h1>
          <p className="t-body" style={{ marginBottom: 32 }}>Last updated: May 2026</p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>1. Purpose of the Platform</h3>
            <p className="t-body" style={{ marginBottom: 24 }}>
              LABVEX is a decentralized scientific network designed for the sharing, validation, and tokenization of scientific research. The information provided on this platform is for educational and research purposes only.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>2. No Medical Advice</h3>
            <p className="t-body" style={{ marginBottom: 24 }}>
              None of the content, hypotheses, VEXY AI outputs, or peer-reviewed findings on LABVEX constitute medical advice, diagnosis, or treatment. Users must not rely on the platform's data for personal health decisions. Always consult a qualified healthcare provider.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>3. CAS Screening & Compliance</h3>
            <p className="t-body" style={{ marginBottom: 24 }}>
              All scientific data, especially relating to pharmacology, biochemistry, and human trials, is subject to LABVEX's automated Compliance Filter. This filter screens for Chemical Abstracts Service (CAS) registries and flags unverified or potentially hazardous compound data in accordance with WHO/FDA guidelines.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>4. Intellectual Property & Assumption of Risk</h3>
            <p className="t-body" style={{ marginBottom: 24 }}>
              By participating in the IP Marketplace and purchasing Intellectual Property Tokens (IPTs), you acknowledge that scientific research is inherently risky and speculative. There is no guarantee of commercial success or royalty generation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
