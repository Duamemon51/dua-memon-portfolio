"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4.5" stroke="#fbbf24" strokeWidth="1.8" fill="rgba(251,191,36,0.15)" />
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ originX: "12px", originY: "12px", transformOrigin: "12px 12px" }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1="12"
            y1="3"
            x2="12"
            y2="5.5"
            stroke="#fbbf24"
            strokeWidth="1.8"
            strokeLinecap="round"
            transform={`rotate(${angle} 12 12)`}
          />
        ))}
      </motion.g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="#a78bfa"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(167,139,250,0.15)"
      />
      <circle cx="17" cy="6" r="1" fill="#a78bfa" opacity="0.6" />
      <circle cx="19.5" cy="9.5" r="0.6" fill="#a78bfa" opacity="0.4" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle theme"
      style={{
        position: "relative",
        width: "56px",
        height: "28px",
        borderRadius: "100px",
        border: `1px solid ${isDark ? "rgba(167,139,250,0.3)" : "rgba(124,58,237,0.25)"}`,
        background: isDark
          ? "linear-gradient(135deg, rgba(15,10,35,0.9), rgba(30,20,60,0.9))"
          : "linear-gradient(135deg, rgba(240,236,255,0.9), rgba(220,210,255,0.9))",
        cursor: "pointer",
        flexShrink: 0,
        overflow: "hidden",
        boxShadow: isDark
          ? "0 0 12px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 0 12px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
        transition: "all 0.4s ease",
      }}
    >
      {/* Stars (dark mode bg) */}
      <AnimatePresence>
        {isDark && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            {[
              { top: "25%", left: "18%", size: 1.5 },
              { top: "55%", left: "28%", size: 1 },
              { top: "30%", left: "38%", size: 1 },
            ].map((star, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                style={{
                  position: "absolute",
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  borderRadius: "50%",
                  background: "#fff",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding pill */}
      <motion.div
        layout
        animate={{ x: isDark ? 30 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{
          position: "absolute",
          top: "2px",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: isDark
            ? "linear-gradient(135deg, #1e1040, #2d1b69)"
            : "linear-gradient(135deg, #fef3c7, #fde68a)",
          boxShadow: isDark
            ? "0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(167,139,250,0.3)"
            : "0 2px 8px rgba(251,191,36,0.4), 0 0 0 1px rgba(251,191,36,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}