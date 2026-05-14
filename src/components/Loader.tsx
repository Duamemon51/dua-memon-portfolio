"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Loader() {
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");
  const [progress, setProgress] = useState(0);

  const name  = portfolioData.name;
  const first = name.split(" ")[0] ?? "";
  const last  = name.split(" ")[1] ?? "";

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 8 + 2;
      });
    }, 100);

    // Start exit after ~1.8s
    const exitTimer = setTimeout(() => setPhase("exit"), 3200);
    // Remove from DOM after exit animation
    const doneTimer = setTimeout(() => setPhase("done"), 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg)",
            overflow: "hidden",
          }}
        >
          {/* ── Ambient orbs ── */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", top: "20%", left: "15%",
              width: "400px", height: "400px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 65%)",
              filter: "blur(40px)", pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.14, 0.06] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute", bottom: "20%", right: "15%",
              width: "350px", height: "350px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 65%)",
              filter: "blur(40px)", pointerEvents: "none",
            }}
          />

          {/* ── Grid overlay ── */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            opacity: 0.03,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          {/* ── Main content ── */}
          <div style={{ position: "relative", textAlign: "center" }}>

            {/* Tagline above */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "11px",
                color: "var(--violet2)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Portfolio
            </motion.p>

            {/* First name — letters stagger in */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2px", marginBottom: "4px" }}>
              {first.split("").map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "clamp(52px, 10vw, 96px)",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    display: "inline-block",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Last name — shimmer gradient */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2px", marginBottom: "32px" }}>
              {last.split("").map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  initial={{ opacity: 0, y: 40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.3 + (first.length + i) * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "clamp(52px, 10vw, 96px)",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Role tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "13px",
                color: "var(--text-muted)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "40px",
              }}
            >
              Full Stack Developer
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ width: "240px", margin: "0 auto" }}
            >
              {/* Track */}
              <div style={{
                width: "100%", height: "2px", borderRadius: "2px",
                background: "var(--border)", overflow: "hidden", position: "relative",
              }}>
                {/* Fill */}
                <motion.div
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    height: "100%", borderRadius: "2px",
                    background: "linear-gradient(90deg,#7c3aed,#a78bfa,#22d3ee)",
                    position: "relative",
                  }}
                >
                  {/* Shimmer on bar */}
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Percentage */}
              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: "10px",
                  color: "var(--text-dim)",
                  letterSpacing: "0.1em",
                  marginTop: "10px",
                  textAlign: "right",
                }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.p>
            </motion.div>
          </div>

          {/* ── Exit curtain ── */}
          {phase === "exit" && (
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, var(--violet) 0%, var(--bg) 100%)",
                transformOrigin: "top",
                zIndex: 2,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}