"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, FlaskConical, Network, Award, Rss, ChevronRight, Check } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

/* ── NAV ─────────────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#5ccb5f,#2e8b57)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <FlaskConical size={16} color="#fff" />
          </div>
          <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, letterSpacing:"-0.02em", color:"var(--ink)" }}>LABVEX</span>
        </Link>
        <nav style={{ display:"flex", alignItems:"center", gap:32 }} className="hidden md:flex">
          {["Platform","About","VEXY AI","Docs"].map(l => (
            <Link key={l} href={l==="Platform"?"/feed":l==="VEXY AI"?"/vexy":"/about"} className="t-sm" style={{ color:"var(--muted)", fontSize:14, fontWeight:500, transition:"color 0.15s" }}
              onMouseEnter={e=>(e.currentTarget.style.color="var(--ink)")}
              onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}>{l}</Link>
          ))}
        </nav>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <Link href="/feed" className="btn btn-outline" style={{ fontSize:14, padding:"0.5rem 1.1rem" }}>Sign in</Link>
          <Link href="/onboarding" className="btn btn-dark" style={{ fontSize:14, padding:"0.5rem 1.25rem" }}>Get started <ArrowRight size={14}/></Link>
        </div>
      </div>
    </header>
  );
}

/* ── HERO ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ paddingTop:160, paddingBottom:96, position:"relative", overflow:"hidden" }}>
      {/* bg blobs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 80% 50% at 50% -10%, rgba(92,203,95,0.08) 0%, transparent 60%)" }}/>
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", border:"1px solid rgba(92,203,95,0.07)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}/>

      <div className="wrap-xs" style={{ textAlign:"center" }}>
        <motion.div {...fade(0)}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(92,203,95,0.08)", border:"1px solid rgba(92,203,95,0.18)", borderRadius:99, padding:"6px 14px 6px 8px", marginBottom:32 }}>
            <span style={{ background:"var(--green)", borderRadius:99, padding:"2px 10px", fontSize:11, fontWeight:600, color:"#fff", letterSpacing:"0.04em", textTransform:"uppercase" }}>New</span>
            <span style={{ fontSize:13, color:"var(--green-3)", fontWeight:500 }}>VEXY AI Research Co-pilot is live</span>
            <ChevronRight size={13} style={{ color:"var(--green-3)" }}/>
          </div>
        </motion.div>

        <motion.h1 className="t-hero text-balance" style={{ marginBottom:24 }} {...fade(0.05)}>
          The operating system<br/>for <span className="t-green">decentralised science</span>
        </motion.h1>

        <motion.p className="t-lead text-balance" style={{ maxWidth:480, margin:"0 auto 40px" }} {...fade(0.1)}>
          AI-native infrastructure for scientific collaboration, research verification, and biotech innovation — built on Solana.
        </motion.p>

        <motion.div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }} {...fade(0.15)}>
          <Link href="/onboarding" className="btn btn-dark" style={{ fontSize:15, padding:"0.8rem 1.75rem" }}>Start for free <ArrowRight size={15}/></Link>
          <Link href="/vexy" className="btn btn-outline" style={{ fontSize:15, padding:"0.8rem 1.75rem" }}><Sparkles size={15} style={{ color:"var(--green)" }}/> Try VEXY AI</Link>
        </motion.div>

        {/* Social proof */}
        <motion.div style={{ marginTop:56, display:"flex", alignItems:"center", justifyContent:"center", gap:32, flexWrap:"wrap" }} {...fade(0.2)}>
          {[["2,400+","Researchers"],["18K+","Publications"],["Solana","Blockchain"],["GPT-4o","AI Engine"]].map(([v,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:20, letterSpacing:"-0.02em", color:"var(--ink)" }}>{v}</div>
              <div style={{ fontSize:12, color:"var(--subtle)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Platform UI mockup */}
      <motion.div className="wrap" style={{ marginTop:72 }} {...fade(0.25)}>
        <div style={{ background:"var(--surface)", border:"1px solid var(--border-2)", borderRadius:16, boxShadow:"0 24px 64px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)", overflow:"hidden" }}>
          {/* Window chrome */}
          <div style={{ height:44, borderBottom:"1px solid var(--border)", background:"var(--surface-2)", display:"flex", alignItems:"center", padding:"0 16px", gap:8 }}>
            {["#ef4444","#f59e0b","#22c55e"].map(c=><div key={c} style={{ width:12, height:12, borderRadius:"50%", background:c, opacity:0.8 }}/>)}
            <div style={{ flex:1, height:24, background:"var(--surface-3)", borderRadius:6, margin:"0 12px", border:"1px solid var(--border)" }}/>
          </div>
          {/* Content preview */}
          <div style={{ display:"grid", gridTemplateColumns:"200px 1fr", minHeight:320 }}>
            {/* Sidebar */}
            <div style={{ borderRight:"1px solid var(--border)", padding:"16px 12px", background:"var(--surface)" }}>
              {[["🔬","Scientific Feed",true],["🧠","VEXY AI",false],["🎯","Missions",false],["⭐","Reputation",false]].map(([icon,label,active])=>(
                <div key={label as string} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px", borderRadius:8, marginBottom:2, background:active?"var(--surface-3)":"transparent", cursor:"pointer" }}>
                  <span style={{ fontSize:14 }}>{icon as string}</span>
                  <span style={{ fontSize:13, fontWeight:active?600:400, color:active?"var(--ink)":"var(--muted)" }}>{label as string}</span>
                </div>
              ))}
            </div>
            {/* Feed preview */}
            <div style={{ padding:20, display:"flex", flexDirection:"column", gap:12 }}>
              {[
                { author:"Dr. Elena Vasquez", field:"Longevity · Stanford", title:"Epigenetic reprogramming extends healthspan in aged murine models", tag:"Longevity", upvotes:142 },
                { author:"Prof. Marcus Chen", field:"Neuroscience · MIT", title:"CRISPR base editing corrects APOE4 variant in post-mitotic neurons", tag:"Genetics", upvotes:89 },
              ].map((p,i)=>(
                <div key={i} style={{ border:"1px solid var(--border)", borderRadius:12, padding:"14px 16px", background:"var(--surface)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:`linear-gradient(135deg,${i===0?"#5ccb5f,#2e8b57":"#78d96b,#5ccb5f"})`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ color:"#fff", fontSize:11, fontWeight:700 }}>{p.author[4]}</span>
                    </div>
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:"var(--ink)" }}>{p.author}</div>
                      <div style={{ fontSize:11, color:"var(--subtle)" }}>{p.field}</div>
                    </div>
                    <div style={{ marginLeft:"auto" }} className="badge badge-green">{p.tag}</div>
                  </div>
                  <p style={{ fontSize:13, fontWeight:500, color:"var(--ink)", lineHeight:1.4 }}>{p.title}</p>
                  <div style={{ display:"flex", gap:16, marginTop:10, paddingTop:8, borderTop:"1px solid var(--border)" }}>
                    <span style={{ fontSize:11, color:"var(--subtle)" }}>↑ {p.upvotes}</span>
                    <span style={{ fontSize:11, color:"var(--green-3)", fontWeight:500, cursor:"pointer" }}>AI Summary</span>
                    <span style={{ fontSize:11, color:"var(--subtle)", cursor:"pointer" }}>Cite</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── LOGOS / TRUST BAR ───────────────────────────────────────── */
function TrustBar() {
  const items = ["Solana Foundation","OpenAI","Supabase","Helius RPC","Vercel Edge"];
  return (
    <div style={{ borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", background:"var(--surface-2)", padding:"20px 0" }}>
      <div className="wrap">
        <div style={{ display:"flex", alignItems:"center", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <span style={{ fontSize:12, color:"var(--subtle)", marginRight:8, fontWeight:500 }}>Built with</span>
          {items.map(s=>(
            <div key={s} style={{ padding:"6px 16px", borderRadius:99, border:"1px solid var(--border-2)", background:"var(--surface)", fontSize:12.5, fontWeight:500, color:"var(--muted)" }}>{s}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FEATURES ────────────────────────────────────────────────── */
function Features() {
  const cards = [
    { icon:Rss, color:"#5ccb5f", title:"Scientific Feed", tag:"Discovery", desc:"AI-curated research stream with domain filtering, peer validation, and VEXY summaries. Signal without noise." },
    { icon:Sparkles, color:"#8b5cf6", title:"VEXY AI", tag:"Intelligence", desc:"Purpose-built scientific AI. Hypothesis generation, paper summarisation, methodology critique — in seconds." },
    { icon:Award, color:"#f59e0b", title:"Reputation Layer", tag:"Identity", desc:"Earn verifiable on-chain reputation through peer-reviewed contributions. Soulbound. Permanent. Yours." },
    { icon:Network, color:"#3b82f6", title:"Research Network", tag:"Collaboration", desc:"Decentralised researcher graph. Connect across institutions, disciplines, and borders without gatekeepers." },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <motion.div style={{ textAlign:"center", marginBottom:64 }} {...fade()}>
          <div className="badge badge-green" style={{ marginBottom:20 }}>Core Infrastructure</div>
          <h2 className="t-h2 text-balance" style={{ marginBottom:16 }}>
            Four primitives.<br/><span className="t-green">One scientific OS.</span>
          </h2>
          <p className="t-lead text-balance" style={{ maxWidth:460, margin:"0 auto" }}>
            Every layer of LABVEX is purpose-built for science — from social discovery to on-chain verification.
          </p>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
          {cards.map((c,i)=>{
            const Icon = c.icon;
            return (
              <motion.div key={c.title} className="card" style={{ padding:28 }} {...fade(i*0.07)}>
                <div style={{ width:44, height:44, borderRadius:12, background:`${c.color}14`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
                  <Icon size={20} style={{ color:c.color }}/>
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                  <h3 className="t-h3" style={{ fontSize:17 }}>{c.title}</h3>
                  <span className="badge badge-gray" style={{ fontSize:11 }}>{c.tag}</span>
                </div>
                <p className="t-body" style={{ fontSize:14, lineHeight:1.65 }}>{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── VEXY SECTION ────────────────────────────────────────────── */
function VexySection() {
  const msgs = [
    { role:"user", text:"What are the key findings on partial epigenetic reprogramming for longevity?" },
    { role:"ai", text:"Recent studies (Ocampo 2016 → Fahy 2024) show cyclic OSK expression restores youthful methylation patterns in aged cells. Key findings include:\n• 30–50% reversal of epigenetic age in vitro\n• Preserved cell identity — no dedifferentiation observed\n• In vivo extension of healthspan in murine models by ~25%", partial:true },
  ];
  return (
    <section className="section section-alt">
      <div className="wrap">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} className="lg:grid-cols-2">
          {/* Chat UI */}
          <motion.div {...fade()}>
            <div className="card" style={{ overflow:"hidden", boxShadow:"var(--shadow-lg)" }}>
              <div style={{ background:"var(--surface-2)", borderBottom:"1px solid var(--border)", padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#5ccb5f,#2e8b57)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Sparkles size={15} color="#fff"/>
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>VEXY</div>
                  <div style={{ fontSize:11, color:"var(--subtle)" }}>Scientific AI Co-pilot · GPT-4o</div>
                </div>
                <div style={{ marginLeft:"auto", display:"flex", gap:4 }}>
                  {["#ef4444","#f59e0b","#22c55e"].map(c=><div key={c} style={{ width:10,height:10,borderRadius:"50%",background:c,opacity:0.7 }}/>)}
                </div>
              </div>
              <div style={{ padding:"20px 16px", background:"var(--surface)", minHeight:260, display:"flex", flexDirection:"column", gap:12 }}>
                {msgs.map((m,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
                    <div style={{ maxWidth:"88%", padding:"10px 14px", borderRadius:m.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background:m.role==="user"?"var(--ink)":"var(--surface-2)", color:m.role==="user"?"#fff":"var(--ink)", fontSize:13, lineHeight:1.6, border:m.role==="ai"?"1px solid var(--border)":"none", whiteSpace:"pre-line" }}>
                      {m.text}{m.partial&&<span className="cursor-blink"/>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop:"1px solid var(--border)", padding:"10px 12px", background:"var(--surface-2)", display:"flex", gap:8 }}>
                <div style={{ flex:1, background:"var(--surface)", border:"1px solid var(--border-2)", borderRadius:24, padding:"8px 14px", fontSize:13, color:"var(--subtle)" }}>Ask VEXY about your research…</div>
                <button className="btn btn-green" style={{ borderRadius:"50%", width:36, height:36, padding:0, justifyContent:"center", flexShrink:0 }}><ArrowRight size={14}/></button>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div {...fade(0.1)}>
            <div className="badge badge-green" style={{ marginBottom:20 }}><Sparkles size={11}/>VEXY AI</div>
            <h2 className="t-h2 text-balance" style={{ marginBottom:20 }}>Your research,<br/><span className="t-green">amplified.</span></h2>
            <p className="t-lead" style={{ maxWidth:420, marginBottom:32 }}>
              VEXY is built exclusively for science. It understands domain terminology, evaluates methodology, and connects findings across disciplines.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:36 }}>
              {["Paper summarisation in under 5 seconds","Hypothesis generation from raw datasets","Cross-domain research connection mapping","Peer review methodology critique"].map(f=>(
                <div key={f} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:20, height:20, borderRadius:6, background:"rgba(92,203,95,0.1)", border:"1px solid rgba(92,203,95,0.2)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Check size={11} style={{ color:"var(--green-3)" }}/>
                  </div>
                  <span style={{ fontSize:14.5, color:"var(--ink-2)" }}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/vexy" className="btn btn-dark" style={{ fontSize:15 }}>Try VEXY free <ArrowRight size={15}/></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ───────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="section" style={{ textAlign:"center", background:"linear-gradient(160deg,#f0fdf0 0%,#ffffff 60%)" }}>
      <motion.div className="wrap-xs" {...fade()}>
        <div className="badge badge-green" style={{ marginBottom:24 }}>
          <span style={{ width:6,height:6,borderRadius:"50%",background:"var(--green)",display:"inline-block" }}/>
          Now in early access
        </div>
        <h2 className="t-h2 text-balance" style={{ marginBottom:20, fontSize:"clamp(2.2rem,4vw,3.2rem)" }}>
          Build the future of science.<br/><span className="t-green">Start today.</span>
        </h2>
        <p className="t-lead text-balance" style={{ maxWidth:440, margin:"0 auto 40px" }}>
          Join thousands of researchers on the open scientific stack. No paywalls. No gatekeepers. Just science.
        </p>
        <Link href="/onboarding" className="btn btn-dark" style={{ fontSize:16, padding:"0.9rem 2.25rem" }}>
          Enter the Ecosystem <ArrowRight size={16}/>
        </Link>
      </motion.div>
    </section>
  );
}

/* ── FOOTER ──────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--border)", background:"var(--surface)", padding:"40px 0" }}>
      <div className="wrap" style={{ display:"flex", flexDirection:"column", gap:24 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#5ccb5f,#2e8b57)",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <FlaskConical size={14} color="#fff"/>
            </div>
            <span style={{ fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16,letterSpacing:"-0.02em",color:"var(--ink)" }}>LABVEX</span>
          </Link>
          <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
            {[["Feed","/feed"],["VEXY AI","/vexy"],["Missions","/missions"],["Reputation","/reputation"],["About","/about"]].map(([l,h])=>(
              <Link key={l} href={h} style={{ fontSize:13.5,color:"var(--muted)",transition:"color 0.15s" }}
                onMouseEnter={e=>(e.currentTarget.style.color="var(--ink)")}
                onMouseLeave={e=>(e.currentTarget.style.color="var(--muted)")}>{l}</Link>
            ))}
          </div>
        </div>
        <div className="hr"/>
        <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <p style={{ fontSize:12.5, color:"var(--subtle)" }}>© {new Date().getFullYear()} LABVEX. Building the open scientific stack.</p>
          <div style={{ display:"flex", gap:20 }}>
            {["Privacy","Terms"].map(t=><Link key={t} href="#" style={{ fontSize:12.5,color:"var(--subtle)" }}>{t}</Link>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav/>
      <main>
        <Hero/>
        <TrustBar/>
        <Features/>
        <VexySection/>
        <CTA/>
      </main>
      <Footer/>
    </>
  );
}
