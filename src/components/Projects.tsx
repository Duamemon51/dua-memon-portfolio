"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";

// ── Icons ──
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function ExternalIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

const techColors: Record<string, string> = {
  "Next.js": "#a78bfa", "React": "#61dafb", "Node.js": "#86efac",
  "Laravel": "#f472b6", "PostgreSQL": "#818cf8", "MongoDB": "#86efac",
  "Redis": "#fb7185", "Stripe": "#818cf8", "Docker": "#38bdf8",
  "Python": "#fde68a", "FastAPI": "#6ee7b7", "TensorFlow": "#fb923c",
  "Express": "#d4d4d8", "TypeScript": "#22d3ee", "MySQL": "#fb923c",
  "PHP": "#a78bfa", "JavaScript": "#fbbf24", "Tailwind": "#06b6d4",
  "Bootstrap": "#8b5cf6",
};

// Generate gradient per project index
const cardGradients = [
  "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(34,211,238,0.04))",
  "linear-gradient(135deg,rgba(34,211,238,0.12),rgba(244,114,182,0.04))",
  "linear-gradient(135deg,rgba(244,114,182,0.12),rgba(124,58,237,0.04))",
  "linear-gradient(135deg,rgba(251,146,60,0.1),rgba(34,211,238,0.04))",
  "linear-gradient(135deg,rgba(74,222,128,0.1),rgba(124,58,237,0.04))",
  "linear-gradient(135deg,rgba(129,140,248,0.12),rgba(244,114,182,0.04))",
];

const accentColors = ["#a78bfa","#22d3ee","#f472b6","#fb923c","#4ade80","#818cf8"];

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const [filter, setFilter]         = useState<"all"|"featured">("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const allProjects = portfolioData.projects;
  const filtered    = filter === "featured"
    ? allProjects.filter(p => p.featured)
    : allProjects;

  const featuredCount = allProjects.filter(p => p.featured).length;

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "120px 48px",
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* BG */}
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"1px",
        background:"linear-gradient(90deg,transparent,rgba(34,211,238,0.4),rgba(124,58,237,0.3),transparent)" }} />
      <motion.div
        animate={{ scale:[1,1.2,1], opacity:[0.04,0.09,0.04] }}
        transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute",top:"-10%",right:"-5%",width:"500px",height:"500px",
          borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,0.12) 0%,transparent 65%)",
          filter:"blur(40px)",pointerEvents:"none" }}
      />
      <motion.div
        animate={{ scale:[1,1.15,1], opacity:[0.03,0.07,0.03] }}
        transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:4 }}
        style={{ position:"absolute",bottom:"-10%",left:"-5%",width:"400px",height:"400px",
          borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,0.1) 0%,transparent 65%)",
          filter:"blur(30px)",pointerEvents:"none" }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          style={{ marginBottom:"56px" }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"18px" }}>
            <motion.div
              animate={{ width: isInView ? "56px" : "0px" }}
              transition={{ duration:0.9, delay:0.3 }}
              style={{ height:"2px", background:"linear-gradient(90deg,#7c3aed,#22d3ee)", borderRadius:"2px", flexShrink:0 }}
            />
            <span style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
              color:"var(--violet2)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
              My Work
            </span>
          </div>

          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"24px" }}>
            <h2 style={{ fontFamily:"Syne, sans-serif", fontSize:"clamp(38px,5.5vw,62px)",
              fontWeight:800, color:"var(--text)", lineHeight:1.0, letterSpacing:"-0.025em" }}>
              Selected{" "}
              <span style={{ background:"linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Projects
              </span>
            </h2>

            {/* Filter tabs */}
            <div style={{ display:"flex", gap:"8px" }}>
              {[
                { key:"all",      label:`All (${allProjects.length})` },
                { key:"featured", label:`Featured (${featuredCount})` },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as "all"|"featured")}
                  style={{
                    padding:"8px 18px", borderRadius:"100px",
                    fontFamily:"JetBrains Mono, monospace", fontSize:"12px",
                    cursor:"pointer", transition:"all 0.25s",
                    border:"1px solid",
                    borderColor: filter === tab.key ? "rgba(124,58,237,0.45)" : "var(--border)",
                    background:  filter === tab.key ? "rgba(124,58,237,0.12)" : "transparent",
                    color:       filter === tab.key ? "var(--violet2)" : "var(--text-muted)",
                    letterSpacing:"0.04em",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          layout
          style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:"20px" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const accent  = accentColors[i % accentColors.length];
              const bgGrad  = cardGradients[i % cardGradients.length];
              const isHover = hoveredIdx === i;

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity:0, y:32 }}
                  animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, scale:0.95 }}
                  transition={{ delay: i * 0.08, duration:0.5, ease:[0.22,1,0.36,1] }}
                  whileHover={{ y:-6 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    borderRadius:"22px",
                    border:"1px solid",
                    borderColor: isHover ? `${accent}40` : "var(--border)",
                    background: isHover ? bgGrad : "var(--bg)",
                    display:"flex", flexDirection:"column",
                    position:"relative", overflow:"hidden",
                    transition:"border-color 0.3s, background 0.35s",
                    cursor:"default",
                  }}
                >
                  {/* Animated top accent line */}
                  <motion.div
                    animate={{ opacity: isHover ? 1 : 0 }}
                    transition={{ duration:0.25 }}
                    style={{
                      position:"absolute", top:0, left:0, right:0, height:"2px",
                      background:`linear-gradient(90deg,${accent},${accent}60,transparent)`,
                    }}
                  />

                  {/* Corner glow */}
                  <motion.div
                    animate={{ opacity: isHover ? 1 : 0 }}
                    transition={{ duration:0.3 }}
                    style={{
                      position:"absolute", top:0, right:0,
                      width:"120px", height:"120px", borderRadius:"50%",
                      background:`radial-gradient(circle,${accent}14 0%,transparent 70%)`,
                      pointerEvents:"none",
                    }}
                  />

                  {/* Card body */}
                  <div style={{ padding:"28px", display:"flex", flexDirection:"column", flex:1, gap:"0" }}>

                    {/* Top row: index + featured badge */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px" }}>
                      <div style={{
                        width:"36px", height:"36px", borderRadius:"10px",
                        background:`${accent}15`, border:`1px solid ${accent}25`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontFamily:"JetBrains Mono, monospace", fontSize:"12px",
                        color:accent, fontWeight:700,
                      }}>
                        {String(i + 1).padStart(2,"0")}
                      </div>
                      {project.featured && (
                        <motion.span
                          animate={{ boxShadow: isHover
                            ? ["0 0 0 0 rgba(167,139,250,0.3)","0 0 0 4px rgba(167,139,250,0)"]
                            : "none" }}
                          transition={{ duration:1.5, repeat:Infinity }}
                          style={{
                            display:"flex", alignItems:"center", gap:"4px",
                            fontFamily:"JetBrains Mono, monospace", fontSize:"9px",
                            padding:"4px 10px", borderRadius:"100px",
                            color:"var(--violet2)",
                            background:"rgba(124,58,237,0.12)",
                            border:"1px solid rgba(124,58,237,0.28)",
                            letterSpacing:"0.08em", textTransform:"uppercase",
                          }}
                        >
                          <StarIcon /> Featured
                        </motion.span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily:"Syne, sans-serif", fontSize:"20px", fontWeight:800,
                      color:"var(--text)", marginBottom:"10px", lineHeight:1.2,
                      transition:"color 0.2s",
                    }}>
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize:"13px", color:"var(--text-muted)", lineHeight:1.8,
                      marginBottom:"20px", flex:1,
                    }}>
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"24px" }}>
                      {project.tech.map(t => (
                        <span key={t} style={{
                          padding:"3px 10px", borderRadius:"100px",
                          fontFamily:"JetBrains Mono, monospace", fontSize:"10px",
                          color: techColors[t] ?? "var(--cyan)",
                          background: `${techColors[t] ?? "#22d3ee"}10`,
                          border: `1px solid ${techColors[t] ?? "#22d3ee"}20`,
                          letterSpacing:"0.03em",
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Footer: links */}
                    <div style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      paddingTop:"16px", borderTop:"1px solid var(--border)",
                    }}>
                      <div style={{ display:"flex", gap:"12px" }}>
                        <a
                          href={project.github}
                          target="_blank" rel="noopener noreferrer"
                          title="GitHub"
                          style={{
                            display:"flex", alignItems:"center", gap:"6px",
                            padding:"7px 14px", borderRadius:"10px",
                            border:"1px solid var(--border)",
                            background:"var(--surface2)",
                            color:"var(--text-muted)", textDecoration:"none",
                            fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                            transition:"all 0.2s",
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = `${accent}40`;
                            el.style.color = accent;
                            el.style.background = `${accent}10`;
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.borderColor = "var(--border)";
                            el.style.color = "var(--text-muted)";
                            el.style.background = "var(--surface2)";
                          }}
                        >
                          <GithubIcon size={14} /> Code
                        </a>
                        <a
                          href={project.live}
                          target="_blank" rel="noopener noreferrer"
                          title="Live Demo"
                          style={{
                            display:"flex", alignItems:"center", gap:"6px",
                            padding:"7px 14px", borderRadius:"10px",
                            background: `linear-gradient(135deg,${accent},${accent}aa)`,
                            color:"#fff", textDecoration:"none",
                            fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                            transition:"all 0.2s",
                            boxShadow:`0 4px 12px ${accent}30`,
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${accent}50`;
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 12px ${accent}30`;
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                          }}
                        >
                          <ExternalIcon size={13} /> Live
                        </a>
                      </div>

                      {/* Animated arrow on hover */}
                      <motion.div
                        animate={{ x: isHover ? 0 : -4, opacity: isHover ? 1 : 0 }}
                        transition={{ duration:0.2 }}
                        style={{ color:accent, fontSize:"18px" }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6, delay:0.3 }}
          style={{ textAlign:"center", marginTop:"56px" }}
        >
          <motion.a
            href={portfolioData.github}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.04, y:-2 }}
            whileTap={{ scale:0.96 }}
            style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"13px 32px", borderRadius:"100px",
              border:"1px solid var(--border-md)",
              background:"var(--surface2)",
              color:"var(--text-muted)", textDecoration:"none",
              fontFamily:"JetBrains Mono, monospace", fontSize:"13px",
              transition:"all 0.25s",
            }}
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
            <GithubIcon size={16} />
            View all on GitHub
            <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>→</motion.span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}