"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      className="section"
      style={{
        background: "var(--bg-tertiary)",
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div className="container-sm px-6" style={{ maxWidth: 640, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="pill pill-green mb-8" style={{ display: "inline-flex" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-primary)", display: "inline-block" }} />
            Now in early access
          </div>

          <h2
            className="display-xl mb-6 text-balance"
            style={{ color: "var(--text-primary)" }}
          >
            The future of science{" "}
            <span className="gradient-text">starts here.</span>
          </h2>

          <p className="body-lg mb-10" style={{ maxWidth: 440, margin: "0 auto 2.5rem" }}>
            Join thousands of researchers building the open scientific stack
            on LABVEX. No paywalls. No gatekeepers. Just science.
          </p>

          <Link
            href="/onboarding"
            className="btn-primary"
            style={{ fontSize: 16, padding: "1rem 2.5rem" }}
          >
            Enter the Ecosystem <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
