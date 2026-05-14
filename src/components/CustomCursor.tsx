"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const dotRef       = useRef<HTMLDivElement>(null);

  const pos    = useRef({ x: -300, y: -300 });
  const prev   = useRef({ x: -300, y: -300 });
  const smooth = useRef({ x: -300, y: -300 });
  const raf    = useRef(0);
  const tick   = useRef(0);
  const hovRef = useRef(false);
  const clkRef = useRef(false);

  const [hidden,   setHidden]   = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.style.cursor = "none";

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Orbital particles ──
    const ORBITERS = 5;
    const orbiters = Array.from({ length: ORBITERS }, (_, i) => ({
      angle:   (i / ORBITERS) * Math.PI * 2,
      speed:   (0.028 + i * 0.008) * (i % 2 === 0 ? 1 : -1),
      size:    1.2 + i * 0.3,
      opacity: 0.55 - i * 0.06,
      // store as rgb components to easily build rgba strings
      r: i % 2 === 0 ? 167 : 34,
      g: i % 2 === 0 ? 139 : 211,
      b: i % 2 === 0 ? 250 : 238,
    }));

    // ── Elastic trail ──
    const TRAIL = 22;
    const trail = Array.from({ length: TRAIL }, () => ({ x: -300, y: -300, r: 0 }));

    const onMove = (e: MouseEvent) => {
      prev.current = { ...pos.current };
      pos.current  = { x: e.clientX, y: e.clientY };
      setHidden(false);
      const t = e.target as HTMLElement;
      hovRef.current = !!t.closest("a,button,[role='button'],input,textarea,select");
    };
    const onDown  = () => { clkRef.current = true;  };
    const onUp    = () => { clkRef.current = false; };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const render = () => {
      tick.current++;
      const T   = tick.current;
      const hov = hovRef.current;
      const clk = clkRef.current;

      // Smooth follower
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;
      const sx = smooth.current.x;
      const sy = smooth.current.y;
      const px = pos.current.x;
      const py = pos.current.y;

      // Velocity
      const dvx = px - prev.current.x;
      const dvy = py - prev.current.y;
      const spd = Math.hypot(dvx, dvy);
      const ang = Math.atan2(dvy, dvx);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Trail ──
      trail[0] = { x: px, y: py, r: Math.min(spd * 0.35 + 4, 10) };
      for (let i = TRAIL - 1; i > 0; i--) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.42;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.42;
        trail[i].r  = trail[i - 1].r * (1 - i / TRAIL);
      }

      for (let i = TRAIL - 1; i >= 0; i--) {
        const t  = 1 - i / TRAIL;
        const pt = trail[i];
        const r  = Math.max(pt.r, 0.5);
        const sx2 = i < 3 ? 1 + spd * 0.03  : 1;
        const sy2 = i < 3 ? Math.max(1 - spd * 0.015, 0.5) : 1;

        const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r * 3.5);
        grd.addColorStop(0,   hov ? `rgba(167,139,250,${t * 0.8})` : `rgba(139,92,246,${t * 0.7})`);
        grd.addColorStop(0.5, hov ? `rgba(34,211,238,${t * 0.35})` : `rgba(124,58,237,${t * 0.3})`);
        grd.addColorStop(1,   "rgba(0,0,0,0)");

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(i < 5 ? ang : 0);
        ctx.scale(sx2, sy2);
        ctx.translate(-pt.x, -pt.y);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.restore();
      }

      // ── Orbiters ──
      const orbR = hov ? 26 : clk ? 14 : 20;
      orbiters.forEach((o) => {
        o.angle += o.speed * (hov ? 1.8 : 1);
        const ox = sx + Math.cos(o.angle) * orbR;
        const oy = sy + Math.sin(o.angle) * orbR;

        // Glow halo
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.size * 5);
        g.addColorStop(0, `rgba(${o.r},${o.g},${o.b},${o.opacity})`);
        g.addColorStop(1, `rgba(${o.r},${o.g},${o.b},0)`);
        ctx.beginPath();
        ctx.arc(ox, oy, o.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(ox, oy, o.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${o.r},${o.g},${o.b},1)`;
        ctx.fill();

        // Line to center
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ox, oy);
        ctx.strokeStyle = `rgba(${o.r},${o.g},${o.b},${o.opacity * 0.2})`;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      });

      // ── Center dot — direct DOM, no React state for perf ──
      const el = dotRef.current;
      if (el) {
        // Use transform only — fastest path, no layout thrash
        el.style.transform = `translate(${px - 5}px, ${py - 5}px) rotate(${hov ? T * 1.5 : 0}deg) scale(${clk ? 0.55 : hov ? 1.4 : 1}) scaleX(${1 + spd * 0.025}) scaleY(${Math.max(1 - spd * 0.012, 0.6)})`;

        const sz = clk ? 8 : hov ? 14 : 10;
        el.style.width  = `${sz}px`;
        el.style.height = `${sz}px`;
        // recenter offset when size changes
        el.style.transform = `translate(${px - sz / 2}px, ${py - sz / 2}px) rotate(${hov ? T * 1.5 : 0}deg) scaleX(${clk ? 0.7 : 1 + spd * 0.02}) scaleY(${clk ? 0.7 : Math.max(1 - spd * 0.01, 0.65)})`;

        el.style.background = hov
          ? `conic-gradient(from ${T * 3}deg, #a78bfa, #22d3ee, #f472b6, #a78bfa)`
          : "#ffffff";
        el.style.boxShadow = hov
          ? `0 0 ${12 + Math.sin(T * 0.1) * 4}px rgba(167,139,250,0.9), 0 0 ${24 + Math.sin(T * 0.08) * 6}px rgba(124,58,237,0.5)`
          : "0 0 6px rgba(255,255,255,0.85)";
      }

      raf.current = requestAnimationFrame(render);
    };

    raf.current = requestAnimationFrame(render);

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Canvas: trail + orbiters */}
      <canvas
        ref={canvasRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        99996,
          opacity:       hidden ? 0 : 1,
          transition:    "opacity 0.4s",
        }}
      />

      {/* Center dot — positioned via transform in rAF for zero-lag */}
      <div
        ref={dotRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        99999,
          borderRadius:  "50%",
          width:         "10px",
          height:        "10px",
          background:    "#fff",
          opacity:       hidden ? 0 : 1,
          transition:    "opacity 0.3s, width 0.2s, height 0.2s, background 0.3s, box-shadow 0.3s",
          willChange:    "transform",
        }}
      />

      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}