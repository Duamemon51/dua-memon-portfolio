"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

const roles = [
  "Full Stack Developer",
  "React.js Developer",
  "Next.js Developer",
  "Laravel Developer",
  "Node.js Developer",
  "Express.js Developer",
  "Open Source Contributor",
];

const roleColors = ["#22d3ee", "#61dafb", "#a78bfa", "#f472b6", "#86efac", "#fb923c", "#facc15"];

function useTypewriter(words: string[], speed = 78, pause = 2000) {
  const [text,      setText]      = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting,  setDeleting]  = useState(false);
  const textRef     = useRef("");
  const wordIdxRef  = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => { textRef.current     = text;      }, [text]);
  useEffect(() => { wordIdxRef.current  = wordIndex; }, [wordIndex]);
  useEffect(() => { deletingRef.current = deleting;  }, [deleting]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const t   = textRef.current;
      const wi  = wordIdxRef.current;
      const del = deletingRef.current;
      const current = words[wi % words.length];

      if (!del) {
        const next = current.slice(0, t.length + 1);
        setText(next);
        if (next === current) {
          timer = setTimeout(() => { setDeleting(true); }, pause);
        } else {
          timer = setTimeout(tick, speed);
        }
      } else {
        if (t.length === 0) {
          setDeleting(false);
          setWordIndex(i => i + 1);
        } else {
          setText(current.slice(0, t.length - 1));
          timer = setTimeout(tick, speed / 2);
        }
      }
    };
    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIndex, deleting]);

  return { text, wordIndex };
}

function downloadCV() {
  const content = `${portfolioData.name} — Full Stack Developer\n${portfolioData.email}\n${portfolioData.github}\n${portfolioData.linkedin}\n${portfolioData.location}\n\n${portfolioData.bio}`;
  const blob = new Blob([content], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = `${portfolioData.name.replace(" ","_")}_CV.txt`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function TechPill({ label, color, delay, x, y }: { label: string; color: string; delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale:   { delay, duration: 0.5 },
        y:       { delay: delay + 0.5, duration: 2.5 + Math.random(), repeat: Infinity, ease: "easeInOut" },
      }}
      style={{
        position: "absolute", left: x, top: y,
        background: `${color}14`,
        border: `1px solid ${color}35`,
        borderRadius: "100px",
        padding: "5px 12px",
        fontSize: "11px",
        fontFamily: "JetBrains Mono, monospace",
        color: color,
        backdropFilter: "blur(8px)",
        whiteSpace: "nowrap",
        zIndex: 2,
        boxShadow: `0 4px 16px ${color}20`,
        pointerEvents: "none",
      }}
    >
      {label}
    </motion.div>
  );
}

export default function Hero() {
  const { text: typed, wordIndex: roleIdx } = useTypewriter(roles);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 18 });
  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top  - rect.height / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ padding: "130px 48px 80px" }}
    >
      {/* ══ BACKGROUND ══ */}

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "-20%", left: "-15%",
            width: "70%", height: "70%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute", bottom: "-10%", right: "-10%",
            width: "55%", height: "55%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          style={{
            position: "absolute", top: "40%", left: "35%",
            width: "30%", height: "30%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 65%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: "var(--grid-op)",
        backgroundImage: "linear-gradient(var(--border-md) 1px,transparent 1px),linear-gradient(90deg,var(--border-md) 1px,transparent 1px)",
        backgroundSize: "72px 72px",
        zIndex: 0,
      }} />

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.018,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        zIndex: 0,
      }} />

      {/* ══ CONTENT ══ */}
      <div className="max-w-6xl mx-auto w-full relative" style={{ zIndex: 1 }}>
        <div className="hero-layout">

          {/* ══ LEFT ══ */}
          <div style={{ position: "relative" }}>

            {/* Status chip */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1,  y: 0   }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
                borderRadius: "100px", padding: "6px 14px",
                marginBottom: "28px",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.7, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px rgba(74,222,128,0.9)", display: "block" }}
              />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "#4ade80", letterSpacing: "0.06em" }}>
                Open to work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1,  y: 0  }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(46px, 6.5vw, 94px)",
                fontWeight: 800, lineHeight: 0.95,
                letterSpacing: "-0.03em",
                marginBottom: "20px", color: "var(--text)",
              }}
            >
              {portfolioData.name.split(" ")[0]}
              <br />
              <span className="shimmer-text">{portfolioData.name.split(" ")[1] ?? ""}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                marginBottom: "24px", height: "32px",
              }}
            >
              <motion.div
                animate={{ background: [`linear-gradient(90deg,#7c3aed,${roleColors[roleIdx % roleColors.length]})`] }}
                style={{
                  width: "32px", height: "2px", borderRadius: "2px",
                  background: `linear-gradient(90deg,#7c3aed,${roleColors[roleIdx % roleColors.length]})`,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${roleColors[roleIdx % roleColors.length]}60`,
                  transition: "background 0.5s, box-shadow 0.5s",
                }}
              />
              <motion.span
                key={roleIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "17px",
                  color: roleColors[roleIdx % roleColors.length],
                  letterSpacing: "0.02em",
                  textShadow: `0 0 20px ${roleColors[roleIdx % roleColors.length]}60`,
                  transition: "color 0.4s, text-shadow 0.4s",
                }}
              >
                {typed}
              </motion.span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "17px",
                  color: roleColors[roleIdx % roleColors.length],
                  marginLeft: "2px",
                }}
              >|</motion.span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{
                color: "var(--text-muted)", fontSize: "16px",
                maxWidth: "480px", lineHeight: 1.85,
                marginBottom: "44px",
              }}
            >
              {portfolioData.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.68 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "56px" }}
            >
              {/* Primary */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "14px 28px", borderRadius: "100px",
                  background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                  color: "#fff", textDecoration: "none",
                  fontSize: "15px", fontWeight: 600,
                  boxShadow: "0 6px 24px rgba(124,58,237,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  position: "relative", overflow: "hidden",
                }}
              >
                <motion.span
                  animate={{ x: ["-120%", "220%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                    pointerEvents: "none",
                  }}
                />
                View Work
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </motion.a>

              {/* Secondary */}
              <motion.button
                onClick={downloadCV}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "14px 28px", borderRadius: "100px",
                  background: "rgba(34,211,238,0.07)",
                  border: "1px solid rgba(34,211,238,0.3)",
                  color: "var(--cyan)", fontSize: "15px", fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(34,211,238,0.1)",
                }}
              >
                <span style={{ fontSize: "14px" }}>⬇</span> Download CV
              </motion.button>

              {/* Ghost */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "14px 28px", borderRadius: "100px",
                  border: "1px solid var(--border-md)",
                  color: "var(--text-muted)", fontSize: "15px", fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              style={{ display: "flex", gap: "0", borderTop: "1px solid var(--border)", paddingTop: "32px" }}
            >
              {portfolioData.stats.map((s, i) => (
                <div key={i} style={{
                  flex: 1,
                  borderRight: i < portfolioData.stats.length - 1 ? "1px solid var(--border)" : "none",
                  paddingRight: "28px", paddingLeft: i > 0 ? "28px" : "0",
                }}>
                  <div style={{
                    fontFamily: "Syne, sans-serif", fontSize: "32px", fontWeight: 800,
                    background: "linear-gradient(90deg,#a78bfa,#22d3ee)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", lineHeight: 1, marginBottom: "4px",
                  }}>{s.num}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT: Photo ══ */}
          <motion.div
            className="hero-image-col"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1,  x: 0  }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, width: "420px", height: "440px" }}
          >
            {/* Floating tech pills */}
            <TechPill label="React"      color="#61dafb" delay={1.2} x="0px"   y="50px"  />
            <TechPill label="Next.js"    color="#a78bfa" delay={1.4} x="0px"   y="200px" />
            <TechPill label="Laravel"    color="#f472b6" delay={1.6} x="0px"   y="330px" />
            <TechPill label="Node.js"    color="#86efac" delay={1.8} x="270px" y="20px"  />
            <TechPill label="Express.js" color="#facc15" delay={2.0} x="255px" y="175px" />
            <TechPill label="TypeScript" color="#22d3ee" delay={2.2} x="255px" y="320px" />

            {/* 3D tilt wrapper */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
            >
              {/* Rotating gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", inset: "-5px",
                  borderRadius: "44% 56% 50% 50% / 50% 44% 56% 50%",
                  background: "conic-gradient(from 0deg, #7c3aed, #22d3ee, #f472b6, #a78bfa, #7c3aed)",
                  zIndex: 0, padding: "3px",
                }}
              >
                <div style={{ width: "100%", height: "100%", borderRadius: "inherit", background: "var(--bg)" }} />
              </motion.div>

              {/* Slow counter-ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute", inset: "-18px",
                  borderRadius: "56% 44% 40% 60% / 60% 56% 44% 40%",
                  background: "conic-gradient(from 180deg, rgba(124,58,237,0.2), rgba(34,211,238,0.15), transparent, rgba(244,114,182,0.1), transparent)",
                  filter: "blur(6px)", zIndex: 0,
                }}
              />

              {/* Breathing glow */}
              <motion.div
                animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: "-35px", borderRadius: "50%",
                  background: "radial-gradient(circle,rgba(124,58,237,0.28) 0%,rgba(34,211,238,0.12) 45%,transparent 70%)",
                  filter: "blur(20px)", zIndex: 0,
                }}
              />

              {/* Photo */}
              <div style={{
                position: "relative", width: "300px", height: "370px",
                borderRadius: "44% 56% 50% 50% / 50% 44% 56% 50%",
                overflow: "hidden", zIndex: 1,
                background: "var(--surface2)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)",
              }}>
                <Image
                  src="/profile.png"
                  alt={portfolioData.name}
                  fill priority
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
                {/* Duotone overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(160deg,rgba(124,58,237,0.12) 0%,transparent 45%,rgba(34,211,238,0.08) 100%)",
                  pointerEvents: "none", zIndex: 1,
                }} />
              </div>
            </motion.div>

            {/* Badge: Available */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 10 }}
              animate={{ opacity: 1,  x: 0,   y: 0  }}
              transition={{ delay: 1.3, type: "spring", stiffness: 180 }}
              style={{
                position: "absolute", bottom: "28px", left: "-36px",
                background: "var(--surface)",
                border: "1px solid var(--border-md)",
                borderRadius: "100px", padding: "9px 18px",
                display: "flex", alignItems: "center", gap: "9px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 10px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)",
                zIndex: 4, whiteSpace: "nowrap",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.2, 1], scale: [1, 0.75, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px rgba(74,222,128,0.9)", display: "block" }}
              />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.04em" }}>
                Available for work
              </span>
            </motion.div>

            {/* Badge: Exp */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: -10 }}
              animate={{ opacity: 1,  x: 0,   y: 0   }}
              transition={{ delay: 1.5, type: "spring", stiffness: 180 }}
              style={{
                position: "absolute", top: "14px", right: "-36px",
                background: "var(--surface)",
                border: "1px solid var(--border-md)",
                borderRadius: "18px", padding: "14px 20px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 10px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)",
                zIndex: 4, textAlign: "center", minWidth: "82px",
              }}
            >
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: "26px", fontWeight: 800, background: "linear-gradient(90deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>2+</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: "4px", textTransform: "uppercase" }}>Years Exp</div>
            </motion.div>

            {/* Badge: Projects */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: 10 }}
              animate={{ opacity: 1,  x: 0,   y: 0  }}
              transition={{ delay: 1.7, type: "spring", stiffness: 180 }}
              style={{
                position: "absolute", bottom: "100px", right: "-32px",
                background: "linear-gradient(135deg,rgba(124,58,237,0.14),rgba(34,211,238,0.07))",
                border: "1px solid rgba(124,58,237,0.28)",
                borderRadius: "18px", padding: "12px 18px",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                zIndex: 4, textAlign: "center", minWidth: "72px",
              }}
            >
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: 800, color: "var(--violet2)", lineHeight: 1 }}>20+</div>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em", marginTop: "4px", textTransform: "uppercase" }}>Projects</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "9px", color: "var(--text-dim)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ width: "1px", height: "44px", background: "linear-gradient(to bottom,rgba(167,139,250,0.7),transparent)" }}
        />
      </motion.div>

      <style>{`
        .hero-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 80px;
          align-items: center;
        }
        .hero-image-col { display: flex; }
        @media (max-width: 960px) {
          .hero-layout { grid-template-columns: 1fr !important; gap: 48px; }
          .hero-image-col { display: none !important; }
        }
      `}</style>
    </section>
  );
}