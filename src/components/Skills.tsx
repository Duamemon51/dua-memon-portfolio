"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

// SVG Icons
function IconMonitor({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
function IconServer({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6"  r="1" fill={color} />
      <circle cx="6" cy="18" r="1" fill={color} />
    </svg>
  );
}
function IconDatabase({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  );
}
function IconCode({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

const categories = [
  { key: "frontend", label: "Frontend", Icon: IconMonitor, color: "#a78bfa", desc: "UI & Interactions" },
  { key: "backend",  label: "Backend",  Icon: IconServer,  color: "#22d3ee", desc: "Server & APIs"    },
  { key: "database", label: "Database", Icon: IconDatabase, color: "#f472b6", desc: "Data & Storage"  },
  { key: "devops",   label: "DevOps",   Icon: IconCode,    color: "#fb923c", desc: "Deploy & Scale"   },
];

// Skill proficiency levels (customize as needed)
const proficiency: Record<string, number> = {
  // Frontend
  "React": 92, "Next.js": 88, "TypeScript": 82, "JavaScript": 95,
  "HTML": 98, "CSS": 90, "Tailwind": 88, "Bootstrap": 85,
  // Backend
  "Node.js": 85, "Laravel": 88, "PHP": 82, "Express": 80,
  // Database
  "MySQL": 85, "MongoDB": 78, "PostgreSQL": 72, "Redis": 65,
  // DevOps
  "Git": 90, "Linux": 72, "AWS": 65, "Docker": 70,
};

export default function Skills() {
  const sectionRef   = useRef(null);
  const isInView     = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const active = categories[activeTab];
  const items  = (portfolioData.skills[active.key as keyof typeof portfolioData.skills] || []) as string[];

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: "120px 48px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* ── Ambient BG ── */}
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"1px",
        background:"linear-gradient(90deg,transparent,rgba(34,211,238,0.4),rgba(124,58,237,0.3),transparent)" }} />

      <motion.div
        animate={{ scale:[1,1.2,1], opacity:[0.04,0.1,0.04] }}
        transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute",bottom:"-15%",right:"-8%",width:"500px",height:"500px",
          borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,0.15) 0%,transparent 65%)",
          filter:"blur(40px)",pointerEvents:"none" }}
      />
      <motion.div
        animate={{ scale:[1,1.15,1], opacity:[0.03,0.08,0.03] }}
        transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:3 }}
        style={{ position:"absolute",top:"-10%",left:"-5%",width:"400px",height:"400px",
          borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,0.15) 0%,transparent 65%)",
          filter:"blur(30px)",pointerEvents:"none" }}
      />

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          style={{ marginBottom:"64px" }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"18px" }}>
            <motion.div
              animate={{ width: isInView ? "56px" : "0px" }}
              transition={{ duration:0.9, delay:0.3 }}
              style={{ height:"2px", background:"linear-gradient(90deg,#7c3aed,#22d3ee)", borderRadius:"2px", flexShrink:0 }}
            />
            <span style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
              color:"var(--violet2)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
              Expertise
            </span>
          </div>
          <h2 style={{ fontFamily:"Syne, sans-serif", fontSize:"clamp(38px,5.5vw,62px)",
            fontWeight:800, color:"var(--text)", lineHeight:1.0, letterSpacing:"-0.025em" }}>
            My Tech{" "}
            <span style={{ background:"linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Arsenal
            </span>
          </h2>
        </motion.div>

        {/* ── Main layout ── */}
        <div className="skills-layout" style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:"32px", alignItems:"start" }}>

          {/* ════ LEFT: Category tabs ════ */}
          <motion.div
            initial={{ opacity:0, x:-30 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.1 }}
            style={{ display:"flex", flexDirection:"column", gap:"8px" }}
          >
            {categories.map((cat, i) => (
              <motion.button
                key={cat.key}
                onClick={() => setActiveTab(i)}
                whileHover={{ x: activeTab === i ? 0 : 4 }}
                whileTap={{ scale:0.97 }}
                style={{
                  display:"flex", alignItems:"center", gap:"14px",
                  padding:"16px 20px", borderRadius:"16px",
                  border:"1px solid",
                  borderColor: activeTab === i ? `${cat.color}45` : "var(--border)",
                  background:  activeTab === i
                    ? `linear-gradient(135deg,${cat.color}12,${cat.color}05)`
                    : "transparent",
                  cursor:"pointer", textAlign:"left",
                  transition:"all 0.25s",
                  position:"relative", overflow:"hidden",
                }}
              >
                {/* Active left bar */}
                {activeTab === i && (
                  <motion.div
                    layoutId="activeBar"
                    style={{
                      position:"absolute", left:0, top:"12px", bottom:"12px",
                      width:"3px", borderRadius:"2px",
                      background:`linear-gradient(to bottom,${cat.color},${cat.color}60)`,
                    }}
                    transition={{ type:"spring", stiffness:300, damping:28 }}
                  />
                )}

                <div style={{
                  width:"42px", height:"42px", borderRadius:"12px",
                  background: activeTab === i ? `${cat.color}20` : `${cat.color}10`,
                  border:`1px solid ${cat.color}${activeTab === i ? "40" : "20"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"20px", flexShrink:0, transition:"all 0.25s",
                }}>
                  <cat.Icon color={activeTab === i ? cat.color : "var(--text-muted)"} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{
                    fontFamily:"Syne, sans-serif", fontSize:"15px", fontWeight:700,
                    color: activeTab === i ? cat.color : "var(--text)",
                    transition:"color 0.25s", marginBottom:"2px",
                  }}>{cat.label}</div>
                  <div style={{
                    fontFamily:"JetBrains Mono, monospace", fontSize:"10px",
                    color:"var(--text-muted)", letterSpacing:"0.04em",
                  }}>{cat.desc}</div>
                </div>
                {/* Count badge */}
                <div style={{
                  fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                  color: activeTab === i ? cat.color : "var(--text-dim)",
                  background: activeTab === i ? `${cat.color}15` : "var(--surface2)",
                  border:`1px solid ${activeTab === i ? cat.color + "30" : "var(--border)"}`,
                  borderRadius:"100px", padding:"2px 8px", flexShrink:0,
                  transition:"all 0.25s",
                }}>
                  {((portfolioData.skills[cat.key as keyof typeof portfolioData.skills] || []) as string[]).length}
                </div>
              </motion.button>
            ))}

            {/* Total skills card */}
            <motion.div
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true }}
              transition={{ delay:0.5 }}
              style={{
                marginTop:"8px", padding:"20px",
                borderRadius:"16px",
                background:"linear-gradient(135deg,rgba(124,58,237,0.1),rgba(34,211,238,0.05))",
                border:"1px solid rgba(124,58,237,0.2)",
                textAlign:"center",
              }}
            >
              <div style={{ fontFamily:"Syne, sans-serif", fontSize:"32px", fontWeight:800,
                background:"linear-gradient(90deg,#a78bfa,#22d3ee)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                lineHeight:1, marginBottom:"4px" }}>
                {Object.values(portfolioData.skills).flat().length}+
              </div>
              <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"10px",
                color:"var(--text-muted)", letterSpacing:"0.08em", textTransform:"uppercase" }}>
                Total Skills
              </div>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT: Skills display ════ */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity:0, x:20 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:-20 }}
              transition={{ duration:0.35, ease:[0.22,1,0.36,1] }}
              style={{
                padding:"32px", borderRadius:"24px",
                background:"var(--surface)",
                border:`1px solid ${active.color}20`,
                position:"relative", overflow:"hidden",
                transition:"border-color 0.3s",
              }}
            >
              {/* Corner glow */}
              <div style={{
                position:"absolute", top:0, right:0,
                width:"200px", height:"200px", borderRadius:"50%",
                background:`radial-gradient(circle,${active.color}10 0%,transparent 70%)`,
                pointerEvents:"none",
              }} />
              <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",
                background:`linear-gradient(90deg,${active.color},${active.color}40,transparent)` }} />

              {/* Card header */}
              <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"28px" }}>
                <motion.div
                  animate={{ rotate:[0,8,0,-8,0] }}
                  transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                  style={{
                    width:"52px", height:"52px", borderRadius:"16px",
                    background:`${active.color}15`, border:`1px solid ${active.color}30`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}
                >
                  <active.Icon color={active.color} />
                </motion.div>
                <div>
                  <h3 style={{ fontFamily:"Syne, sans-serif", fontSize:"22px", fontWeight:800,
                    color:"var(--text)", marginBottom:"2px" }}>{active.label}</h3>
                  <p style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                    color:active.color, letterSpacing:"0.06em" }}>{active.desc}</p>
                </div>
                <motion.div
                  animate={{ opacity:[0.5,1,0.5] }}
                  transition={{ duration:2, repeat:Infinity }}
                  style={{ marginLeft:"auto", fontFamily:"Syne, sans-serif", fontSize:"28px",
                    fontWeight:800, color:active.color, lineHeight:1 }}
                >
                  {items.length}
                </motion.div>
              </div>

              {/* Skill bars */}
              <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                {items.map((skill, i) => {
                  const pct = proficiency[skill] ?? 75;
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity:0, y:10 }}
                      animate={{ opacity:1, y:0 }}
                      transition={{ delay:i * 0.05 }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ cursor:"default" }}
                    >
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"6px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                          <motion.div
                            animate={{ scale: hoveredSkill === skill ? [1,1.3,1] : 1 }}
                            transition={{ duration:0.4 }}
                            style={{ width:"7px", height:"7px", borderRadius:"50%",
                              background:active.color, boxShadow:`0 0 6px ${active.color}` }}
                          />
                          <span style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"13px",
                            color: hoveredSkill === skill ? active.color : "var(--text)",
                            transition:"color 0.2s", fontWeight: hoveredSkill === skill ? 600 : 400 }}>
                            {skill}
                          </span>
                        </div>
                        <motion.span
                          initial={{ opacity:0 }}
                          animate={{ opacity: hoveredSkill === skill ? 1 : 0.4 }}
                          style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                            color:active.color, letterSpacing:"0.04em" }}
                        >
                          {pct}%
                        </motion.span>
                      </div>

                      {/* Progress bar track */}
                      <div style={{
                        height:"4px", borderRadius:"4px",
                        background:"var(--surface2)",
                        overflow:"hidden", position:"relative",
                      }}>
                        <motion.div
                          initial={{ width:"0%" }}
                          animate={{ width: isInView ? `${pct}%` : "0%" }}
                          transition={{ duration:1, delay:0.3 + i*0.06, ease:[0.22,1,0.36,1] }}
                          style={{
                            height:"100%", borderRadius:"4px",
                            background:`linear-gradient(90deg,${active.color}80,${active.color})`,
                            position:"relative",
                          }}
                        >
                          {/* Shimmer on bar */}
                          <motion.div
                            animate={{ x:["-100%","200%"] }}
                            transition={{ duration:2, repeat:Infinity, repeatDelay:1, ease:"easeInOut", delay:0.5+i*0.1 }}
                            style={{
                              position:"absolute", inset:0,
                              background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .skills-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}