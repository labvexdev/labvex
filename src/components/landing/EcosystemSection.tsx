"use client";

import { motion } from "framer-motion";
import { Users, FileText, Star, Target, TrendingUp, Dna } from "lucide-react";

const ecosystemNodes = [
  { label: "Scientific Feed", icon: FileText, color: "#5ccb5f", x: 50, y: 15 },
  { label: "VEXY AI", icon: TrendingUp, color: "#60a5fa", x: 82, y: 40 },
  { label: "Reputation", icon: Star, color: "#a78bfa", x: 68, y: 78 },
  { label: "Missions", icon: Target, color: "#f59e0b", x: 32, y: 78 },
  { label: "Community", icon: Users, color: "#f87171", x: 18, y: 40 },
  { label: "DeSci DNA", icon: Dna, color: "#34d399", x: 50, y: 50 },
];

export function EcosystemSection() {
  return (
    <section className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="badge badge-green mx-auto mb-4">Ecosystem Architecture</div>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One Living{" "}
            <span className="gradient-text">Scientific Network</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">
            Every piece of LABVEX is interconnected — AI, reputation, community,
            and research form a self-reinforcing scientific ecosystem.
          </p>
        </motion.div>

        {/* Ecosystem visualization */}
        <div className="relative mx-auto max-w-2xl aspect-square max-h-[500px]">
          {/* Center glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(92,203,95,0.08) 0%, transparent 70%)",
            }}
          />

          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {ecosystemNodes.slice(0, 5).map((node) => (
              <line
                key={node.label}
                x1="50"
                y1="50"
                x2={node.x}
                y2={node.y}
                stroke="rgba(92,203,95,0.15)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}
            {/* Orbit circle */}
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="rgba(92,203,95,0.06)"
              strokeWidth="0.5"
            />
          </svg>

          {/* Nodes */}
          {ecosystemNodes.map((node, i) => {
            const Icon = node.icon;
            const isCenter = node.label === "DeSci DNA";
            return (
              <motion.div
                key={node.label}
                className="absolute"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                animate={isCenter ? { scale: [1, 1.05, 1] } : undefined}
              >
                <div
                  className={`${isCenter ? "w-16 h-16" : "w-12 h-12"} rounded-2xl flex flex-col items-center justify-center glass border cursor-pointer hover:scale-110 transition-transform`}
                  style={{
                    borderColor: `${node.color}30`,
                    background: `${node.color}10`,
                    boxShadow: `0 0 20px ${node.color}20`,
                  }}
                >
                  <Icon size={isCenter ? 22 : 18} style={{ color: node.color }} />
                </div>
                <p
                  className="text-center text-[10px] mt-1.5 text-[var(--text-muted)] whitespace-nowrap font-medium"
                >
                  {node.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
