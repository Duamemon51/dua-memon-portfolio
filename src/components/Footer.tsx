"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

// ── Icons ──
function IconGithub({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function IconLinkedin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconMail({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}
function IconArrowUp({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}
function IconHeart({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
function IconStar({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Skills",   href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

const socialLinks = [
  { Icon: IconGithub,   href: portfolioData.github,            label: "GitHub",   color: "#a78bfa" },
  { Icon: IconLinkedin, href: portfolioData.linkedin,          label: "LinkedIn", color: "#22d3ee" },
  { Icon: IconMail,     href: `mailto:${portfolioData.email}`, label: "Email",    color: "#f472b6" },
];

export default function Footer() {
  const ref     = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} style={{ position:"relative", overflow:"hidden", background:"var(--surface)", transition:"background 0.4s" }}>

      {/* ══ CTA BAND ══ */}
      <div style={{ position:"relative", overflow:"hidden", padding:"80px 48px" }}>

        {/* Mesh gradient bg */}
        <motion.div
          animate={{ rotate:[0,360] }}
          transition={{ duration:25, repeat:Infinity, ease:"linear" }}
          style={{ position:"absolute", top:"-40%", left:"50%", transform:"translateX(-50%)",
            width:"700px", height:"700px", borderRadius:"50%", opacity:0.07,
            background:"conic-gradient(from 0deg,#7c3aed,#22d3ee,#f472b6,#a78bfa,#7c3aed)",
            filter:"blur(60px)", pointerEvents:"none" }}
        />
        <motion.div
          animate={{ scale:[1,1.2,1], opacity:[0.06,0.14,0.06] }}
          transition={{ duration:7, repeat:Infinity, ease:"easeInOut" }}
          style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
            width:"500px", height:"250px", borderRadius:"50%",
            background:"radial-gradient(ellipse,rgba(124,58,237,0.2) 0%,transparent 70%)",
            filter:"blur(30px)", pointerEvents:"none" }}
        />

        {/* Floating star particles */}
        {[
          { top:"15%", left:"8%",  delay:0,   size:10 },
          { top:"70%", left:"12%", delay:0.8, size:8  },
          { top:"20%", right:"10%",delay:0.4, size:10 },
          { top:"65%", right:"8%", delay:1.2, size:8  },
          { top:"40%", left:"22%", delay:0.6, size:7  },
          { top:"50%", right:"20%",delay:1.0, size:7  },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{ opacity:[0.15,0.6,0.15], scale:[0.8,1.2,0.8], y:[0,-8,0] }}
            transition={{ duration:3+i*0.4, repeat:Infinity, ease:"easeInOut", delay:p.delay }}
            style={{ position:"absolute", ...p, color:"rgba(167,139,250,0.5)", pointerEvents:"none" }}
          >
            <IconStar size={p.size} />
          </motion.div>
        ))}

        {/* CTA Content */}
        <div className="max-w-6xl mx-auto" style={{ textAlign:"center", position:"relative" }}>
          <motion.div
            initial={{ opacity:0, y:24 }}
            animate={isInView ? { opacity:1, y:0 } : {}}
            transition={{ duration:0.7 }}
          >
            {/* Badge */}
            <motion.div
              animate={{ boxShadow:["0 0 0 0 rgba(124,58,237,0.3)","0 0 0 8px rgba(124,58,237,0)"] }}
              transition={{ duration:2, repeat:Infinity }}
              style={{ display:"inline-flex", alignItems:"center", gap:"8px",
                background:"rgba(124,58,237,0.1)", border:"1px solid rgba(124,58,237,0.3)",
                borderRadius:"100px", padding:"6px 16px", marginBottom:"28px" }}
            >
              <motion.span
                animate={{ opacity:[1,0.3,1] }}
                transition={{ duration:1.5, repeat:Infinity }}
                style={{ width:"7px",height:"7px",borderRadius:"50%",
                  background:"#4ade80", boxShadow:"0 0 8px rgba(74,222,128,0.9)", display:"block" }}
              />
              <span style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                color:"var(--violet2)", letterSpacing:"0.08em" }}>Available for work</span>
            </motion.div>

            {/* Headline */}
            <h2 style={{ fontFamily:"Syne, sans-serif",
              fontSize:"clamp(36px,5.5vw,68px)", fontWeight:800,
              lineHeight:1.0, letterSpacing:"-0.025em", marginBottom:"20px",
              color:"var(--text)" }}>
              Have a project{" "}
              <span style={{ background:"linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                in mind?
              </span>
            </h2>

            <p style={{ fontFamily:"Inter, sans-serif", fontSize:"16px",
              color:"var(--text-muted)", maxWidth:"480px", margin:"0 auto 36px",
              lineHeight:1.8 }}>
              Let&apos;s turn your vision into reality. I&apos;m always excited to work on
              interesting projects and meet new people.
            </p>

            {/* CTA buttons */}
            <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
              <motion.a
                href="#contact"
                whileHover={{ scale:1.05, y:-2 }}
                whileTap={{ scale:0.95 }}
                style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                  padding:"14px 32px", borderRadius:"100px",
                  background:"linear-gradient(135deg,#7c3aed,#5b21b6)",
                  color:"#fff", textDecoration:"none",
                  fontFamily:"Syne, sans-serif", fontSize:"15px", fontWeight:700,
                  boxShadow:"0 8px 28px rgba(124,58,237,0.45)",
                  border:"1px solid rgba(167,139,250,0.3)",
                  position:"relative", overflow:"hidden" }}
              >
                <motion.span
                  animate={{ x:["-120%","220%"] }}
                  transition={{ duration:2.5, repeat:Infinity, repeatDelay:2 }}
                  style={{ position:"absolute",inset:0,
                    background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                    pointerEvents:"none" }}
                />
                <motion.span animate={{ rotate:[0,15,0,-15,0] }} transition={{ duration:2, repeat:Infinity }}>
                  &#10022;
                </motion.span>
                Start a Project
              </motion.a>

              <motion.a
                href={portfolioData.github}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.05, y:-2 }}
                whileTap={{ scale:0.95 }}
                style={{ display:"inline-flex", alignItems:"center", gap:"10px",
                  padding:"14px 28px", borderRadius:"100px",
                  border:"1px solid var(--border-md)",
                  background:"var(--surface2)",
                  color:"var(--text-muted)", textDecoration:"none",
                  fontFamily:"JetBrains Mono, monospace", fontSize:"13px",
                  transition:"all 0.25s" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(167,139,250,0.4)";
                  el.style.color = "var(--violet2)";
                  el.style.background = "rgba(124,58,237,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-md)";
                  el.style.color = "var(--text-muted)";
                  el.style.background = "var(--surface2)";
                }}
              >
                <IconGithub size={16} /> View GitHub
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══ MAIN FOOTER ══ */}
      <div style={{ borderTop:"1px solid var(--border)", background:"var(--bg)", transition:"background 0.4s" }}>

        {/* Top gradient line */}
        <div style={{ height:"1px",
          background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.6),rgba(34,211,238,0.4),transparent)" }} />

        <div className="max-w-6xl mx-auto" style={{ padding:"48px 48px 0" }}>
          <div className="footer-cols" style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:"48px", marginBottom:"48px" }}>

            {/* Col 1: Brand */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={isInView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.1 }}
            >
              <a href="#" style={{ textDecoration:"none", display:"inline-block", marginBottom:"16px" }}>
                <div style={{ fontFamily:"Syne, sans-serif", fontWeight:800,
                  fontSize:"24px", color:"var(--text)", display:"flex", alignItems:"center" }}>
                  <motion.span
                    animate={{ color:["#a78bfa","#22d3ee","#a78bfa"] }}
                    transition={{ duration:4, repeat:Infinity }}
                    style={{ fontSize:"26px" }}
                  >&lt;</motion.span>
                  <span style={{ background:"linear-gradient(90deg,var(--text),var(--violet2))",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                    DM
                  </span>
                  <motion.span
                    animate={{ color:["#a78bfa","#22d3ee","#a78bfa"] }}
                    transition={{ duration:4, repeat:Infinity, delay:0.5 }}
                    style={{ fontSize:"26px" }}
                  >/&gt;</motion.span>
                </div>
              </a>

              <p style={{ fontFamily:"Inter, sans-serif", fontSize:"13px",
                color:"var(--text-muted)", lineHeight:1.8, marginBottom:"24px", maxWidth:"240px" }}>
                Full Stack Developer crafting modern, performant web experiences with React, Next.js &amp; Laravel.
              </p>

              {/* Social icons */}
              <div style={{ display:"flex", gap:"8px" }}>
                {socialLinks.map((s, i) => {
                  const SIcon = s.Icon;
                  return (
                    <motion.a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      initial={{ opacity:0, scale:0.7 }}
                      animate={isInView ? { opacity:1, scale:1 } : {}}
                      transition={{ delay:0.2 + i*0.08, type:"spring", stiffness:200 }}
                      whileHover={{ y:-3, scale:1.1 }}
                      whileTap={{ scale:0.9 }}
                      style={{ width:"40px",height:"40px",borderRadius:"12px",
                        border:"1px solid var(--border)", background:"var(--surface2)",
                        display:"flex",alignItems:"center",justifyContent:"center",
                        color:"var(--text-muted)", textDecoration:"none",
                        transition:"all 0.2s" }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = `${s.color}50`;
                        el.style.color = s.color;
                        el.style.background = `${s.color}12`;
                        el.style.boxShadow = `0 4px 12px ${s.color}25`;
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--border)";
                        el.style.color = "var(--text-muted)";
                        el.style.background = "var(--surface2)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <SIcon size={17} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Col 2: Navigation */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={isInView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.2 }}
            >
              <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"10px",
                color:"var(--text-dim)", letterSpacing:"0.18em", textTransform:"uppercase",
                marginBottom:"20px" }}>Navigation</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity:0, x:-10 }}
                    animate={isInView ? { opacity:1, x:0 } : {}}
                    transition={{ delay:0.25 + i*0.07 }}
                    whileHover={{ x:6 }}
                    style={{ display:"flex",alignItems:"center",gap:"8px",
                      fontFamily:"Inter, sans-serif", fontSize:"14px", fontWeight:500,
                      color:"var(--text-muted)", textDecoration:"none", transition:"color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--text)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
                  >
                    <span style={{ width:"4px",height:"4px",borderRadius:"50%",
                      background:"var(--violet2)", display:"block", flexShrink:0 }} />
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Col 3: Contact info + back to top */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={isInView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.3 }}
            >
              <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"10px",
                color:"var(--text-dim)", letterSpacing:"0.18em", textTransform:"uppercase",
                marginBottom:"20px" }}>Contact</div>

              <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"28px" }}>
                <a href={`mailto:${portfolioData.email}`}
                  style={{ display:"flex",alignItems:"center",gap:"8px",
                    fontSize:"13px", color:"var(--text-muted)", textDecoration:"none",
                    fontFamily:"Inter, sans-serif", transition:"color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--cyan)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
                >
                  <span style={{ color:"var(--cyan)" }}><IconMail size={14} /></span>
                  {portfolioData.email}
                </a>
                <div style={{ display:"flex",alignItems:"center",gap:"8px",
                  fontSize:"13px", color:"var(--text-muted)", fontFamily:"Inter, sans-serif" }}>
                  <span style={{ width:"6px",height:"6px",borderRadius:"50%",
                    background:"#4ade80", boxShadow:"0 0 6px rgba(74,222,128,0.8)", display:"block" }} />
                  {portfolioData.location}
                </div>
              </div>

              {/* Back to top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale:1.04, y:-2 }}
                whileTap={{ scale:0.95 }}
                style={{ display:"inline-flex",alignItems:"center",gap:"8px",
                  padding:"9px 18px", borderRadius:"100px",
                  border:"1px solid var(--border-md)", background:"var(--surface2)",
                  color:"var(--text-muted)", fontFamily:"JetBrains Mono, monospace",
                  fontSize:"11px", cursor:"pointer", transition:"all 0.2s", letterSpacing:"0.04em" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(124,58,237,0.4)";
                  el.style.color = "var(--violet2)";
                  el.style.background = "rgba(124,58,237,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--border-md)";
                  el.style.color = "var(--text-muted)";
                  el.style.background = "var(--surface2)";
                }}
              >
                <motion.span animate={{ y:[0,-3,0] }} transition={{ duration:1.4, repeat:Infinity }}>
                  <IconArrowUp size={13} />
                </motion.span>
                Back to top
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop:"1px solid var(--border)", padding:"20px 48px" }}>
          <div className="max-w-6xl mx-auto" style={{ display:"flex",
            alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>

            <p style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
              color:"var(--text-dim)", letterSpacing:"0.04em", display:"flex", alignItems:"center", gap:"6px" }}>
              Designed &amp; built with{" "}
              <motion.span
                animate={{ scale:[1,1.3,1], color:["#f472b6","#f87171","#f472b6"] }}
                transition={{ duration:1.2, repeat:Infinity }}
                style={{ display:"inline-flex" }}
              >
                <IconHeart size={11} />
              </motion.span>
              {" "}by{" "}
              <span style={{ color:"var(--violet2)", fontWeight:600 }}>{portfolioData.name}</span>
            </p>

            <p style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
              color:"var(--text-dim)", letterSpacing:"0.04em" }}>
              © {new Date().getFullYear()} · All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}