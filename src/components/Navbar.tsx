"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = ["About", "Skills", "Projects", "Contact"];

// ── Mini particle burst on logo click ──
interface Particle { id: number; x: number; y: number; vx: number; vy: number; color: string; }

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [active,     setActive]     = useState("");
  const [particles,  setParticles]  = useState<Particle[]>([]);
  const [hoverIdx,   setHoverIdx]   = useState<number | null>(null);
  const [scrollPct,  setScrollPct]  = useState(0);
  const [sectionPcts, setSectionPcts] = useState<number[]>([0, 0, 0, 0]);

  const pillRef  = useRef<HTMLDivElement>(null);
  const listRef  = useRef<HTMLUListElement>(null);
  const particleId = useRef(0);

  // Spring scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 28 });
  const glowOp = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // ── Scroll tracking ──
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(dh > 0 ? sy / dh : 0);
      setScrolled(sy > 60);

      // Active section
      for (const s of [...links.map(l => l.toLowerCase())].reverse()) {
        const el = document.getElementById(s);
        if (el && sy >= el.offsetTop - 130) { setActive(s); break; }
      }

      // Per-section progress
      const newPcts = links.map((l) => {
        const el = document.getElementById(l.toLowerCase());
        if (!el) return 0;
        const start = el.offsetTop - window.innerHeight * 0.6;
        const end   = el.offsetTop + el.offsetHeight - window.innerHeight * 0.4;
        return Math.max(0, Math.min(1, (sy - start) / (end - start)));
      });
      setSectionPcts(newPcts);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Magnetic pill ──
  const movePill = useCallback((e: React.MouseEvent<HTMLUListElement>) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a || !listRef.current || !pillRef.current) return;
    const lr = listRef.current.getBoundingClientRect();
    const ar = a.getBoundingClientRect();
    pillRef.current.style.opacity     = "1";
    pillRef.current.style.left        = `${ar.left - lr.left}px`;
    pillRef.current.style.width       = `${ar.width}px`;
    pillRef.current.style.height      = `${ar.height}px`;
  }, []);

  const leavePill = useCallback(() => {
    if (pillRef.current) pillRef.current.style.opacity = "0";
    setHoverIdx(null);
  }, []);

  // ── Logo particle burst ──
  const burstParticles = (e: React.MouseEvent) => {
    const colors = ["#a78bfa","#22d3ee","#f472b6","#7c3aed","#38bdf8"];
    const newP: Particle[] = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const speed = 2.5 + Math.random() * 3;
      return {
        id:    ++particleId.current,
        x:     e.clientX,
        y:     e.clientY,
        vx:    Math.cos(angle) * speed,
        vy:    Math.sin(angle) * speed,
        color: colors[i % colors.length],
      };
    });
    setParticles(p => [...p, ...newP]);
    setTimeout(() => setParticles(p => p.filter(pt => !newP.find(n => n.id === pt.id))), 800);
  };

  return (
    <>
      {/* ══ Scroll progress bar ══ */}
      <motion.div style={{
        scaleX, transformOrigin: "0%",
        position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 99999,
        background: "linear-gradient(90deg,#7c3aed,#a78bfa 40%,#22d3ee 70%,#f472b6)",
      }}>
        <motion.div style={{
          position: "absolute", inset: 0,
          boxShadow: "0 0 12px 2px rgba(167,139,250,0.7)",
          opacity: glowOp,
        }} />
      </motion.div>

      {/* ══ Logo particles ══ */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
            animate={{ x: p.x + p.vx * 30, y: p.y + p.vy * 30, scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              position: "fixed", width: "5px", height: "5px",
              borderRadius: "50%", background: p.color,
              pointerEvents: "none", zIndex: 99998,
              boxShadow: `0 0 6px ${p.color}`,
              marginLeft: "-2.5px", marginTop: "-2.5px",
            }}
          />
        ))}
      </AnimatePresence>

      {/* ══ NAVBAR ══ */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <div style={{
          margin:         scrolled ? "14px 28px" : "0",
          borderRadius:   scrolled ? "24px" : "0",
          padding:        scrolled ? "8px 20px" : "16px 48px",
          background:     scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none",
          border:         scrolled ? "1px solid var(--border-md)" : "none",
          boxShadow:      scrolled
            ? "0 4px 6px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(124,58,237,0.08)"
            : "none",
          transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
          position: "relative", overflow: "hidden",
        }}>

          {/* Inner shimmer on scroll */}
          {scrolled && (
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              style={{
                position: "absolute", top: 0, left: 0,
                width: "30%", height: "100%",
                background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.025),transparent)",
                pointerEvents: "none",
              }}
            />
          )}

          <div style={{
            maxWidth: "1200px", margin: "0 auto",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "relative",
          }}>

            {/* ══ LOGO ══ */}
            <motion.a
              href="#"
              onClick={burstParticles}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              style={{
                fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "21px",
                color: "var(--text)", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "1px",
                position: "relative", zIndex: 1,
              }}
            >
              {/* Breathing glow */}
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute", inset: "-12px", borderRadius: "16px",
                  background: "radial-gradient(ellipse,rgba(124,58,237,0.18) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <motion.span
                animate={{ color: ["#a78bfa", "#22d3ee", "#a78bfa"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontSize: "23px", fontWeight: 800 }}
              >
                &lt;
              </motion.span>
              <span style={{
                background: "linear-gradient(90deg,var(--text),var(--violet2))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}>DM</span>
              <motion.span
                animate={{ color: ["#a78bfa", "#22d3ee", "#a78bfa"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ fontSize: "23px", fontWeight: 800 }}
              >
                /&gt;
              </motion.span>
            </motion.a>

            {/* ══ DESKTOP NAV ══ */}
            <ul
              ref={listRef}
              className="hidden md:flex"
              style={{ alignItems: "center", gap: "2px", listStyle: "none", margin: 0, padding: 0, position: "relative" }}
              onMouseMove={movePill}
              onMouseLeave={leavePill}
            >
              {/* Magnetic hover bg */}
              <div ref={pillRef} style={{
                position: "absolute", top: 0, borderRadius: "11px",
                background: "var(--surface3)",
                border: "1px solid var(--border-md)",
                opacity: 0, pointerEvents: "none",
                transition: "left 0.2s cubic-bezier(0.22,1,0.36,1), width 0.2s cubic-bezier(0.22,1,0.36,1), opacity 0.15s",
                zIndex: 0,
              }} />

              {links.map((link, idx) => {
                const isActive = active === link.toLowerCase();
                const pct      = sectionPcts[idx];
                return (
                  <li key={link} style={{ position: "relative", zIndex: 1 }}
                    onMouseEnter={() => setHoverIdx(idx)}
                    onMouseLeave={() => setHoverIdx(null)}
                  >
                    <a
                      href={`#${link.toLowerCase()}`}
                      style={{
                        fontFamily: "JetBrains Mono, monospace", fontSize: "12px",
                        letterSpacing: "0.04em",
                        color: isActive ? "var(--text)" : "var(--text-muted)",
                        textDecoration: "none", position: "relative",
                        display: "flex", alignItems: "center", gap: "6px",
                        padding: "8px 14px", borderRadius: "11px",
                        background: isActive ? "rgba(124,58,237,0.1)" : "transparent",
                        border: isActive ? "1px solid rgba(124,58,237,0.22)" : "1px solid transparent",
                        transition: "color 0.2s",
                      }}
                    >
                      {/* Section progress pill inside link */}
                      {pct > 0 && pct < 1 && (
                        <motion.span
                          initial={{ scaleX: 0 }} animate={{ scaleX: pct }}
                          style={{
                            position: "absolute", bottom: "3px", left: "10px", right: "10px",
                            height: "1px", borderRadius: "1px", transformOrigin: "0%",
                            background: "linear-gradient(90deg,var(--violet2),var(--cyan))",
                            opacity: 0.5,
                          }}
                        />
                      )}

                      {link}

                      {/* Active underline */}
                      {isActive && (
                        <motion.span layoutId="navLine"
                          style={{
                            position: "absolute", bottom: "4px", left: "14px", right: "14px",
                            height: "1.5px", borderRadius: "2px",
                            background: "linear-gradient(90deg,var(--violet2),var(--cyan))",
                            boxShadow: "0 0 8px rgba(124,58,237,0.6)",
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}

                      {/* Live dot */}
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          style={{
                            position: "absolute", top: "5px", right: "6px",
                            width: "4px", height: "4px", borderRadius: "50%",
                            background: "var(--cyan)", boxShadow: "0 0 6px var(--cyan)",
                          }}
                        >
                          <motion.span
                            animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                              position: "absolute", inset: 0, borderRadius: "50%",
                              background: "var(--cyan)",
                            }}
                          />
                        </motion.span>
                      )}
                    </a>
                  </li>
                );
              })}

              {/* Divider */}
              <li style={{ zIndex: 1 }}>
                <div style={{ width: "1px", height: "18px", background: "var(--border-md)", margin: "0 4px" }} />
              </li>

              {/* ══ CTA ══ */}
              <li style={{ zIndex: 1 }}>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    position: "relative", overflow: "hidden",
                    fontFamily: "JetBrains Mono, monospace", fontSize: "12px",
                    padding: "8px 20px", borderRadius: "100px",
                    background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                    color: "#fff", textDecoration: "none",
                    letterSpacing: "0.05em", fontWeight: 600,
                    display: "flex", alignItems: "center", gap: "7px",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.4),inset 0 1px 0 rgba(255,255,255,0.18)",
                    border: "1px solid rgba(167,139,250,0.35)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 6px 28px rgba(124,58,237,0.6),inset 0 1px 0 rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 16px rgba(124,58,237,0.4),inset 0 1px 0 rgba(255,255,255,0.18)";
                  }}
                >
                  {/* shimmer */}
                  <motion.span
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    style={{
                      position: "absolute", top: 0, left: 0, width: "45%", height: "100%",
                      background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)",
                      pointerEvents: "none",
                    }}
                  />
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ display: "inline-block", fontSize: "10px" }}
                  >✦</motion.span>
                  Hire Me
                  {/* Arrow */}
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ fontSize: "12px", opacity: 0.8 }}
                  >→</motion.span>
                </motion.a>
              </li>

              <li style={{ zIndex: 1 }}>
                <ThemeToggle />
              </li>
            </ul>

            {/* ══ MOBILE RIGHT ══ */}
            <div className="flex md:hidden" style={{ alignItems: "center", gap: "8px" }}>
              <ThemeToggle />
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.88 }}
                style={{
                  background: "var(--surface2)", border: "1px solid var(--border-md)",
                  borderRadius: "11px", color: "var(--text-muted)",
                  width: "36px", height: "36px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", position: "relative", overflow: "hidden",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={String(menuOpen)}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                    exit={{    opacity: 0, rotate:  90, scale: 0.5 }}
                    transition={{ duration: 0.18 }}
                    style={{ fontSize: "15px", lineHeight: 1 }}
                  >
                    {menuOpen ? "✕" : "☰"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ══ MOBILE MENU ══ */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{    opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                margin: "8px 18px", borderRadius: "24px",
                background: "var(--nav-bg)", backdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid var(--border-md)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.2),inset 0 1px 0 rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              {/* Rainbow top accent */}
              <div style={{
                height: "2px",
                background: "linear-gradient(90deg,transparent,#7c3aed 20%,#a78bfa 40%,#22d3ee 60%,#f472b6 80%,transparent)",
              }} />

              {/* Section progress bar row */}
              <div style={{
                display: "flex", gap: "6px", padding: "10px 16px 0",
              }}>
                {links.map((l, i) => (
                  <div key={l} style={{ flex: 1, height: "2px", borderRadius: "2px", background: "var(--border)", overflow: "hidden" }}>
                    <motion.div
                      animate={{ scaleX: sectionPcts[i] }}
                      style={{
                        height: "100%", transformOrigin: "0%", borderRadius: "2px",
                        background: "linear-gradient(90deg,var(--violet2),var(--cyan))",
                      }}
                    />
                  </div>
                ))}
              </div>

              <ul style={{ display: "flex", flexDirection: "column", padding: "10px", gap: "2px", listStyle: "none", margin: 0 }}>
                {links.map((link, idx) => {
                  const isAct = active === link.toLowerCase();
                  return (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.055, type: "spring", stiffness: 280, damping: 22 }}
                    >
                      <a
                        href={`#${link.toLowerCase()}`}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "13px 16px", borderRadius: "16px",
                          fontFamily: "Syne, sans-serif", fontSize: "16px", fontWeight: 600,
                          color: isAct ? "var(--violet2)" : "var(--text)",
                          textDecoration: "none",
                          background: isAct ? "rgba(124,58,237,0.1)" : "transparent",
                          border: isAct ? "1px solid rgba(124,58,237,0.22)" : "1px solid transparent",
                          transition: "all 0.18s",
                          position: "relative", overflow: "hidden",
                        }}
                      >
                        {link}
                        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                          {/* Mini progress */}
                          <span style={{
                            width: "28px", height: "2px", borderRadius: "2px",
                            background: "var(--border)", overflow: "hidden", display: "block",
                          }}>
                            <motion.span
                              animate={{ scaleX: sectionPcts[idx] }}
                              style={{
                                display: "block", height: "100%", transformOrigin: "0%",
                                background: "linear-gradient(90deg,var(--violet2),var(--cyan))",
                                borderRadius: "2px",
                              }}
                            />
                          </span>
                          {isAct && (
                            <motion.span
                              initial={{ scale: 0 }} animate={{ scale: 1 }}
                              style={{
                                width: "6px", height: "6px", borderRadius: "50%",
                                background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)",
                                display: "block",
                              }}
                            />
                          )}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}

                <motion.li
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.055 + 0.04, type: "spring", stiffness: 280, damping: 22 }}
                  style={{ marginTop: "8px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}
                >
                  <a href="#contact" onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      padding: "14px", borderRadius: "16px",
                      background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
                      color: "#fff", fontFamily: "Syne, sans-serif",
                      fontSize: "15px", fontWeight: 700, textDecoration: "none",
                      boxShadow: "0 4px 18px rgba(124,58,237,0.45)",
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    <motion.span
                      animate={{ x: ["-120%", "220%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                      style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)",
                        pointerEvents: "none",
                      }}
                    />
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      style={{ display: "inline-block", fontSize: "12px" }}
                    >✦</motion.span>
                    Hire Me
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >→</motion.span>
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}