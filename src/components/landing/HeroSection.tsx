"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Wallet } from "lucide-react";

function LabFlask() {
  return (
    <svg viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ maxHeight: 480 }}>
      {/* Soft background glow */}
      <defs>
        <radialGradient id="glowGrad" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#5ccb5f" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#5ccb5f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="liquidGrad" cx="50%" cy="30%" r="60%" gradientTransform="rotate(-10 0.5 0.5)">
          <stop offset="0%" stopColor="#78d96b" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#5ccb5f" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#2e8b57" stopOpacity="1" />
        </radialGradient>
        <radialGradient id="glassGrad" cx="35%" cy="25%" r="65%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(243,245,242,0.55)" />
        </radialGradient>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <clipPath id="flaskClip">
          <path d="M160 60 L160 240 L60 400 Q40 440 60 470 Q80 495 130 495 L290 495 Q340 495 360 470 Q380 440 360 400 L260 240 L260 60 Z" />
        </clipPath>
      </defs>

      {/* Ambient glow behind flask */}
      <ellipse cx="210" cy="360" rx="130" ry="100" fill="url(#glowGrad)" />

      {/* Flask body — glass */}
      <path
        d="M160 60 L160 240 L60 400 Q40 440 60 470 Q80 495 130 495 L290 495 Q340 495 360 470 Q380 440 360 400 L260 240 L260 60 Z"
        fill="url(#glassGrad)"
        stroke="rgba(15,23,32,0.07)"
        strokeWidth="1.5"
      />

      {/* Liquid fill */}
      <path
        d="M85 400 Q75 435 80 460 Q90 485 130 490 L290 490 Q330 485 340 460 Q345 435 335 400 L260 270 L160 270 Z"
        fill="url(#liquidGrad)"
        clipPath="url(#flaskClip)"
      />

      {/* Liquid surface highlight */}
      <ellipse cx="210" cy="268" rx="55" ry="8" fill="rgba(255,255,255,0.35)" />

      {/* Bubbles in liquid */}
      {[
        { cx: 155, cy: 380, r: 6 },
        { cx: 230, cy: 410, r: 9 },
        { cx: 175, cy: 450, r: 5 },
        { cx: 265, cy: 370, r: 7 },
        { cx: 200, cy: 460, r: 4 },
      ].map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="rgba(255,255,255,0.28)" stroke="rgba(255,255,255,0.45)" strokeWidth="0.8" />
      ))}

      {/* DNA helix strands in upper glass */}
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 90 + i * 28;
        const phase = i * 0.8;
        const x1 = 180 + Math.sin(phase) * 18;
        const x2 = 240 - Math.sin(phase) * 18;
        return (
          <g key={i}>
            <circle cx={x1} cy={y} r={3.5} fill="#5ccb5f" opacity={0.65} />
            <circle cx={x2} cy={y} r={3.5} fill="#2e8b57" opacity={0.55} />
            {i < 4 && (
              <>
                <line
                  x1={x1} y1={y} x2={180 + Math.sin(phase + 0.8) * 18} y2={y + 28}
                  stroke="#5ccb5f" strokeWidth="1" opacity={0.3}
                />
                <line
                  x1={x2} y1={y} x2={240 - Math.sin(phase + 0.8) * 18} y2={y + 28}
                  stroke="#2e8b57" strokeWidth="1" opacity={0.3}
                />
              </>
            )}
            {/* Cross rung */}
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="rgba(92,203,95,0.4)" strokeWidth="0.8" strokeDasharray="2 2" />
          </g>
        );
      })}

      {/* Glass reflection highlights */}
      <path d="M175 80 Q170 180 168 240" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" opacity={0.8} />
      <path d="M185 85 Q182 140 181 170" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Flask neck */}
      <rect x="155" y="48" width="110" height="18" rx="4"
        fill="rgba(243,245,242,0.8)" stroke="rgba(15,23,32,0.07)" strokeWidth="1.5" />
      {/* Stopper */}
      <rect x="165" y="38" width="90" height="14" rx="6"
        fill="#0f1720" opacity={0.75} />

      {/* Floating molecular dots */}
      {[
        { x: 60, y: 200, r: 4 }, { x: 370, y: 280, r: 3 }, { x: 40, y: 330, r: 3 },
        { x: 385, y: 180, r: 4 }, { x: 80, y: 150, r: 2.5 }, { x: 360, y: 380, r: 2.5 },
      ].map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="#5ccb5f" opacity={0.25} />
      ))}
      {/* Connecting lines between floating dots */}
      <line x1="60" y1="200" x2="40" y2="330" stroke="#5ccb5f" strokeWidth="0.6" opacity={0.15} />
      <line x1="370" y1="280" x2="385" y2="180" stroke="#5ccb5f" strokeWidth="0.6" opacity={0.15} />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        background: "linear-gradient(160deg, #ffffff 0%, #f7f8f6 50%, #f0f4f1 100%)",
      }}
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 65% 50%, rgba(92,203,95,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(92,203,95,0.08)",
          top: "50%",
          right: "-8%",
          transform: "translateY(-50%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 900,
          height: 900,
          borderRadius: "50%",
          border: "1px solid rgba(92,203,95,0.04)",
          top: "50%",
          right: "-20%",
          transform: "translateY(-50%)",
        }}
      />

      <div className="container px-6" style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              <div className="pill pill-green mb-8" style={{ display: "inline-flex" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-primary)", display: "inline-block" }} />
                AI-native DeSci infrastructure
              </div>
            </motion.div>

            <motion.h1
              className="display-xl text-balance mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              The Unified{" "}
              <span className="gradient-text">DeSci</span>{" "}
              Operating System
            </motion.h1>

            <motion.p
              className="body-lg mb-10"
              style={{ maxWidth: 480 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              AI-native infrastructure for decentralized scientific collaboration,
              research verification, and biotech innovation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              <Link href="/onboarding" className="btn-primary" style={{ fontSize: 15, padding: "0.875rem 2rem" }}>
                Enter Ecosystem <ArrowRight size={16} />
              </Link>
              <Link href="/onboarding" className="btn-secondary" style={{ fontSize: 15, padding: "0.875rem 2rem" }}>
                <Wallet size={16} /> Connect Wallet
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="mt-12 pt-8 flex items-center gap-8"
              style={{ borderTop: "1px solid var(--border)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { value: "2,400+", label: "Scientists" },
                { value: "18K+", label: "Research posts" },
                { value: "Solana", label: "Blockchain layer" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Flask */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
              style={{ width: "100%", maxWidth: 400 }}
            >
              <LabFlask />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
