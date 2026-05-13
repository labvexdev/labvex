"use client";

import { motion } from "framer-motion";

function VisionDiagram() {
  const nodes = [
    { x: 210, y: 60, label: "VEXY AI", color: "#5ccb5f" },
    { x: 90, y: 180, label: "Scientific\nFeed", color: "#2e8b57" },
    { x: 330, y: 180, label: "Research\nNetwork", color: "#78d96b" },
    { x: 150, y: 290, label: "Reputation\nLayer", color: "#5ccb5f" },
    { x: 270, y: 290, label: "Solana\nAttestation", color: "#2e8b57" },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2],
  ];

  return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ maxWidth: 420 }}>
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5ccb5f" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#5ccb5f" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Background glow */}
      <ellipse cx="210" cy="180" rx="160" ry="130" fill="url(#nodeGlow)" />

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(92,203,95,0.2)" strokeWidth="1.5" strokeDasharray="4 4"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={32} fill="white" stroke={n.color} strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 4px 12px rgba(92,203,95,0.12))" }} />
          <circle cx={n.x} cy={n.y} r={6} fill={n.color} />
          {n.label.split("\n").map((line, li) => (
            <text
              key={li}
              x={n.x}
              y={n.y + 20 + li * 12}
              textAnchor="middle"
              fontSize="9"
              fill="#4b5563"
              fontFamily="Inter, sans-serif"
              fontWeight="500"
            >
              {line}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
}

export function PlatformVision() {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="container px-6" style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="pill pill-green mb-6" style={{ display: "inline-flex" }}>Platform Vision</div>
            <h2 className="display-lg mb-6 text-balance">
              Science infrastructure{" "}
              <span className="gradient-text">reimagined</span>
            </h2>
            <p className="body-lg mb-6" style={{ maxWidth: 440 }}>
              LABVEX is not a social network. It is a composable operating system
              for how science is created, verified, and shared in the age of AI.
            </p>

            <div className="flex flex-col gap-5 mt-8">
              {[
                { title: "AI-native research", body: "VEXY understands your domain. Every paper, hypothesis, and dataset — intelligently connected." },
                { title: "Decentralised verification", body: "Scientific claims attested on Solana. Immutable, transparent, community-validated." },
                { title: "Reputation that matters", body: "Your contributions earn provable on-chain credit. Not vanity metrics — real scientific standing." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="shrink-0 mt-1"
                    style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-primary)", marginTop: 6 }}
                  />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 2, fontFamily: "var(--font-display)" }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex justify-center"
          >
            <VisionDiagram />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
