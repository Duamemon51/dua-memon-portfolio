"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

// ── SVG Icons ──
function IconPin({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconMail({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}
function IconBriefcase({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}
function IconGraduation({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function IconLayers({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
function IconMonitor({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
function IconServerSvg({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill={color} />
      <circle cx="6" cy="18" r="1" fill={color} />
    </svg>
  );
}
function IconRocket({ color }: { color: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l-.5-3-2.5.5z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <circle cx="16" cy="8" r="2" />
    </svg>
  );
}

// ── Icon type ──
type IconComponent = ({ color }: { color: string }) => React.ReactElement;

// ── Data ──
const infoRows: { Icon: IconComponent; label: string; value: string; color: string }[] = [
  { Icon: IconPin,        label: "Location",  value: portfolioData.location,     color: "#22d3ee" },
  { Icon: IconMail,       label: "Email",     value: portfolioData.email,        color: "#a78bfa" },
  { Icon: IconBriefcase,  label: "Status",    value: portfolioData.availability, color: "#4ade80" },
  { Icon: IconGraduation, label: "Education", value: portfolioData.education,    color: "#fb923c" },
];

const services: { Icon: IconComponent; title: string; desc: string; color: string; grad: string }[] = [
  { Icon: IconLayers,    title: "Full Stack Dev", desc: "React, Next.js & Laravel — end to end", color: "#a78bfa", grad: "rgba(167,139,250,0.12)" },
  { Icon: IconMonitor,   title: "UI / Frontend",  desc: "Pixel-perfect, animated interfaces",    color: "#22d3ee", grad: "rgba(34,211,238,0.12)"  },
  { Icon: IconServerSvg, title: "APIs & Backend", desc: "Node.js, Laravel, REST & databases",    color: "#f472b6", grad: "rgba(244,114,182,0.12)" },
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeService, setActiveService] = useState(0);

  // Store active service data in variables to avoid dynamic JSX property access
  const activeColor = services[activeService].color;
  const activeGrad  = services[activeService].grad;
  const activeTitle = services[activeService].title;
  const activeDesc  = services[activeService].desc;
  const ActiveIcon  = services[activeService].Icon;

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: "120px 48px",
        background: "var(--surface)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* BG accents */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px",
        background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(34,211,238,0.3),transparent)" }}
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ position:"absolute", top:"-15%", right:"-8%", width:"500px", height:"500px",
          borderRadius:"50%", opacity:0.07,
          background:"conic-gradient(from 0deg,#7c3aed,#22d3ee,#f472b6,#7c3aed)",
          filter:"blur(60px)", pointerEvents:"none" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position:"absolute", bottom:"-10%", left:"-5%", width:"400px", height:"400px",
          borderRadius:"50%", background:"radial-gradient(circle,rgba(34,211,238,0.15) 0%,transparent 70%)",
          filter:"blur(30px)", pointerEvents:"none" }}
      />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "80px" }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"18px" }}>
            <motion.div
              animate={{ width: isInView ? "56px" : "0px" }}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{ height:"2px", background:"linear-gradient(90deg,#7c3aed,#22d3ee)",
                borderRadius:"2px", flexShrink:0 }}
            />
            <span style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
              color:"var(--violet2)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
              About Me
            </span>
          </div>
          <h2 style={{ fontFamily:"Syne, sans-serif", fontSize:"clamp(38px,5.5vw,62px)",
            fontWeight:800, color:"var(--text)", lineHeight:1.0,
            letterSpacing:"-0.025em", maxWidth:"600px" }}>
            The Person{" "}
            <span style={{
              background:"linear-gradient(90deg,#a78bfa 0%,#22d3ee 50%,#f472b6 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
            }}>
              Behind the Code
            </span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:"56px", alignItems:"start" }}>

          {/* LEFT */}
          <div style={{ display:"flex", flexDirection:"column", gap:"36px" }}>

            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ padding:"32px", borderRadius:"24px", background:"var(--bg)",
                border:"1px solid var(--border)", position:"relative", overflow:"hidden" }}
            >
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px",
                background:"linear-gradient(90deg,#7c3aed,#a78bfa,#22d3ee)" }} />
              <div style={{ fontFamily:"Syne, sans-serif", fontSize:"72px", lineHeight:0.8,
                color:"rgba(124,58,237,0.12)", fontWeight:800, marginBottom:"16px", userSelect:"none" }}>
                &quot;
              </div>
              <p style={{ color:"var(--text-muted)", lineHeight:1.9, fontSize:"16px", marginBottom:"16px" }}>
                I&apos;m a passionate{" "}
                <span style={{ color:"var(--text)", fontWeight:600 }}>Full Stack Developer</span>{" "}
                based in <span style={{ color:"var(--cyan)", fontWeight:500 }}>{portfolioData.location}</span>,
                specializing in{" "}
                <span style={{ color:"var(--violet2)", fontWeight:500 }}>React</span>,{" "}
                <span style={{ color:"var(--violet2)", fontWeight:500 }}>Next.js</span>,{" "}
                <span style={{ color:"#f472b6", fontWeight:500 }}>Laravel</span> &amp;{" "}
                <span style={{ color:"#86efac", fontWeight:500 }}>Node.js</span>.
              </p>
              <p style={{ color:"var(--text-muted)", lineHeight:1.9, fontSize:"16px", marginBottom:"16px" }}>
                I love transforming complex problems into elegant, user-friendly solutions —
                whether it&apos;s crafting pixel-perfect frontends or architecting robust backend systems.
              </p>
              <p style={{ color:"var(--text-muted)", lineHeight:1.9, fontSize:"16px" }}>
                Currently{" "}
                <span style={{ color:"var(--violet2)", fontFamily:"JetBrains Mono, monospace",
                  fontSize:"13px", background:"rgba(124,58,237,0.1)", padding:"2px 10px",
                  borderRadius:"6px", border:"1px solid rgba(124,58,237,0.25)" }}>
                  open to opportunities
                </span>{" "}
                — feel free to reach out!
              </p>
            </motion.div>

            {/* Tabbed services */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Tab buttons */}
              <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
                {services.map((s, i) => {
                  const TabIcon = s.Icon;
                  const isActive = activeService === i;
                  return (
                    <button
                      key={s.title}
                      onClick={() => setActiveService(i)}
                      style={{
                        flex:1, padding:"10px 8px", borderRadius:"10px", border:"1px solid",
                        borderColor: isActive ? `${s.color}50` : "var(--border)",
                        background:  isActive ? `${s.color}12` : "transparent",
                        color:       isActive ? s.color : "var(--text-muted)",
                        fontFamily:"JetBrains Mono, monospace", fontSize:"10px",
                        letterSpacing:"0.04em", cursor:"pointer", transition:"all 0.25s",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:"6px",
                      }}
                    >
                      <TabIcon color={isActive ? s.color : "var(--text-muted)"} />
                      <span style={{ whiteSpace:"nowrap" }}>{s.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active service card */}
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding:"24px 28px", borderRadius:"18px",
                  background:`linear-gradient(135deg,${activeGrad},var(--bg))`,
                  border:`1px solid ${activeColor}30`,
                  display:"flex", alignItems:"center", gap:"20px",
                }}
              >
                <div style={{
                  width:"52px", height:"52px", borderRadius:"16px",
                  background:`${activeColor}15`, border:`1px solid ${activeColor}30`,
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                }}>
                  <ActiveIcon color={activeColor} />
                </div>
                <div>
                  <div style={{ fontFamily:"Syne, sans-serif", fontSize:"18px", fontWeight:700,
                    color:"var(--text)", marginBottom:"6px" }}>
                    {activeTitle}
                  </div>
                  <div style={{ fontSize:"14px", color:"var(--text-muted)", lineHeight:1.6 }}>
                    {activeDesc}
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </div>

          {/* RIGHT */}
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>

            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="gradient-border"
              style={{ background:"var(--bg)", borderRadius:"28px", padding:"32px",
                position:"relative", overflow:"hidden", transition:"background 0.4s" }}
            >
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ position:"absolute", top:"-30%", right:"-20%",
                  width:"200px", height:"200px", borderRadius:"50%", opacity:0.08,
                  background:"conic-gradient(from 0deg,#7c3aed,#22d3ee,transparent)",
                  pointerEvents:"none" }}
              />

              {/* Avatar */}
              <div style={{ display:"flex", alignItems:"center", gap:"14px",
                marginBottom:"24px", paddingBottom:"20px", borderBottom:"1px solid var(--border)" }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  style={{ width:"58px", height:"58px", borderRadius:"16px",
                    background:"linear-gradient(135deg,#7c3aed,#22d3ee)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:"Syne, sans-serif", fontSize:"20px", fontWeight:800,
                    color:"#fff", boxShadow:"0 8px 20px rgba(124,58,237,0.45)",
                    flexShrink:0, cursor:"default" }}
                >
                  {portfolioData.name.split(" ").map((n: string) => n[0]).join("")}
                </motion.div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"Syne, sans-serif", fontSize:"17px", fontWeight:700,
                    color:"var(--text)", marginBottom:"2px" }}>{portfolioData.name}</div>
                  <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                    color:"var(--violet2)", letterSpacing:"0.04em" }}>Full Stack Developer</div>
                </div>
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(74,222,128,0.4)","0 0 0 6px rgba(74,222,128,0)"] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ display:"flex", alignItems:"center", gap:"5px",
                    background:"rgba(74,222,128,0.08)", border:"1px solid rgba(74,222,128,0.3)",
                    borderRadius:"100px", padding:"4px 10px", flexShrink:0 }}
                >
                  <span style={{ width:"6px", height:"6px", borderRadius:"50%",
                    background:"#4ade80", display:"block", boxShadow:"0 0 6px rgba(74,222,128,0.9)" }} />
                  <span style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"9px",
                    color:"#4ade80", letterSpacing:"0.05em" }}>Active</span>
                </motion.div>
              </div>

              {/* Info rows */}
              <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                {infoRows.map((row, i) => {
                  const RowIcon = row.Icon;
                  return (
                    <motion.div
                      key={row.label}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.25 + i * 0.07 }}
                      whileHover={{ x: 4 }}
                      style={{ display:"flex", alignItems:"center", gap:"12px",
                        padding:"10px 14px", borderRadius:"12px",
                        background:"var(--surface2)", border:"1px solid var(--border)",
                        transition:"all 0.2s", cursor:"default" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${row.color}40`;
                        (e.currentTarget as HTMLElement).style.background = `${row.color}07`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLElement).style.background = "var(--surface2)";
                      }}
                    >
                      <div style={{ width:"32px", height:"32px", borderRadius:"10px",
                        background:`${row.color}12`, border:`1px solid ${row.color}25`,
                        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <RowIcon color={row.color} />
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"9px",
                          color:"var(--text-dim)", letterSpacing:"0.1em", textTransform:"uppercase",
                          marginBottom:"1px" }}>{row.label}</div>
                        <div style={{ fontSize:"13px", color:"var(--text)", fontWeight:500,
                          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          {row.value}
                        </div>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                        style={{ width:"6px", height:"6px", borderRadius:"50%",
                          background:row.color, boxShadow:`0 0 8px ${row.color}`, flexShrink:0 }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              style={{ padding:"28px", borderRadius:"22px",
                background:"linear-gradient(135deg,rgba(124,58,237,0.12),rgba(34,211,238,0.06))",
                border:"1px solid rgba(124,58,237,0.2)",
                textAlign:"center", position:"relative", overflow:"hidden" }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ position:"absolute", inset:"-40%", borderRadius:"50%", opacity:0.06,
                  background:"conic-gradient(from 0deg,#7c3aed 0%,transparent 40%,#22d3ee 60%,transparent 100%)",
                  pointerEvents:"none" }}
              />
              <div style={{ display:"flex", justifyContent:"center", marginBottom:"12px" }}>
                <div style={{ width:"52px", height:"52px", borderRadius:"16px",
                  background:"rgba(124,58,237,0.12)", border:"1px solid rgba(124,58,237,0.2)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <IconRocket color="#a78bfa" />
                </div>
              </div>
              <div style={{ fontFamily:"Syne, sans-serif", fontSize:"16px", fontWeight:700,
                color:"var(--text)", marginBottom:"6px" }}>Ready to collaborate?</div>
              <div style={{ fontFamily:"Inter, sans-serif", fontSize:"13px",
                color:"var(--text-muted)", marginBottom:"20px", lineHeight:1.6 }}>
                Let&apos;s build something amazing together
              </div>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{ display:"inline-flex", alignItems:"center", gap:"8px",
                  padding:"11px 28px", borderRadius:"100px",
                  background:"linear-gradient(135deg,#7c3aed,#5b21b6)",
                  color:"#fff", textDecoration:"none",
                  fontFamily:"Syne, sans-serif", fontSize:"14px", fontWeight:700,
                  boxShadow:"0 6px 20px rgba(124,58,237,0.4)",
                  border:"1px solid rgba(167,139,250,0.3)",
                  position:"relative", overflow:"hidden" }}
              >
                <motion.span
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5 }}
                  style={{ position:"absolute", inset:0,
                    background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                    pointerEvents:"none" }}
                />
                Get In Touch
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
                  →
                </motion.span>
              </motion.a>
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}