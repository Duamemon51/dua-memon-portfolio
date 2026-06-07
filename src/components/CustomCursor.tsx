"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos       = useRef({ x: -300, y: -300 });
  const prev      = useRef({ x: -300, y: -300 });
  const smooth    = useRef({ x: -300, y: -300 });
  const raf       = useRef(0);
  const tick      = useRef(0);
  const hovRef    = useRef(false);
  const clkRef    = useRef(false);
  const clickPulseRef = useRef(0);

  const [hidden, setHidden] = useState(true);

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

    // ── Arrow ghost trail ──
    const TRAIL = 20;
    const trail = Array.from({ length: TRAIL }, () => ({
      x: -300, y: -300, tilt: 0, hov: false,
    }));

    // ── Orbital sparkles (hover only) ──
    const SPARKS = 4;
    const sparks = Array.from({ length: SPARKS }, (_, i) => ({
      angle: (i / SPARKS) * Math.PI * 2,
      speed: 0.04 + i * 0.012,
      color: ["#a78bfa", "#f472b6", "#22d3ee", "#fbbf24"][i],
    }));

    const onMove = (e: MouseEvent) => {
      prev.current = { ...pos.current };
      pos.current  = { x: e.clientX, y: e.clientY };
      setHidden(false);
      const t = e.target as HTMLElement;
      hovRef.current = !!t.closest("a,button,[role='button'],input,textarea,select");
    };
    const onDown  = () => { clkRef.current = true;  clickPulseRef.current = 1; };
    const onUp    = () => { clkRef.current = false; };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // ── Draw the arrow cursor shape ──
    function drawArrow(
      cx: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number,
      tilt: number,
      hov: boolean,
      clk: boolean,
      T: number,
      alpha: number = 1,
    ) {
      cx.save();
      cx.globalAlpha = alpha;
      cx.translate(x, y);
      cx.rotate(tilt);
      const s = clk ? 0.80 : hov ? 1.1 : 1;
      cx.scale(scale * s, scale * s);

      // Arrow path — classic OS cursor shape
      cx.beginPath();
      cx.moveTo(0,   0);
      cx.lineTo(0,   20);
      cx.lineTo(4.5, 15.5);
      cx.lineTo(8,   22);
      cx.lineTo(10,  21);
      cx.lineTo(6.5, 14.5);
      cx.lineTo(12,  14);
      cx.closePath();

      if (hov) {
        // Animated gradient fill on hover
        const grd = cx.createLinearGradient(0, 0, 12, 22);
        grd.addColorStop(0, "#a78bfa");
        grd.addColorStop(0.45, "#f472b6");
        grd.addColorStop(1, "#22d3ee");
        cx.fillStyle = grd;

        // Pulsing outer glow
        cx.shadowColor = `rgba(167,139,250,${0.8 + Math.sin(T * 0.09) * 0.2})`;
        cx.shadowBlur  = 14 + Math.sin(T * 0.08) * 5;
        cx.fill();
        cx.shadowBlur = 0;

        // Bright inner stroke
        cx.strokeStyle = `rgba(255,255,255,${0.55 + Math.sin(T * 0.12) * 0.2})`;
        cx.lineWidth   = 0.9;
        cx.stroke();
      } else {
        // Normal: white fill + dark stroke + subtle shadow
        cx.shadowColor    = "rgba(0,0,0,0.4)";
        cx.shadowBlur     = 7;
        cx.shadowOffsetX  = 2;
        cx.shadowOffsetY  = 2;
        cx.fillStyle      = "#ffffff";
        cx.fill();
        cx.shadowBlur = 0; cx.shadowOffsetX = 0; cx.shadowOffsetY = 0;
        cx.strokeStyle = "rgba(60,60,60,0.75)";
        cx.lineWidth   = 1;
        cx.stroke();
      }

      cx.restore();
    }

    const render = () => {
      tick.current++;
      const T   = tick.current;
      const hov = hovRef.current;
      const clk = clkRef.current;

      // Smooth follower (for orbiters)
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.12;
      const sx = smooth.current.x;
      const sy = smooth.current.y;
      const px = pos.current.x;
      const py = pos.current.y;

      // Velocity / tilt
      const dvx = px - prev.current.x;
      const dvy = py - prev.current.y;
      const spd = Math.hypot(dvx, dvy);
      const tilt = Math.atan2(dvy, dvx) * 0.09 * Math.min(spd / 8, 1);

      // Decay click pulse
      if (clickPulseRef.current > 0) clickPulseRef.current *= 0.83;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Arrow ghost trail ──
      trail[0] = { x: px, y: py, tilt, hov };
      for (let i = TRAIL - 1; i > 0; i--) {
        trail[i].x    += (trail[i - 1].x - trail[i].x) * 0.38;
        trail[i].y    += (trail[i - 1].y - trail[i].y) * 0.38;
        trail[i].tilt  = trail[i - 1].tilt;
        trail[i].hov   = trail[i - 1].hov;
      }

      for (let i = TRAIL - 1; i >= 2; i--) {
        const t     = 1 - i / TRAIL;
        const alpha = t * t * 0.5;
        if (alpha < 0.02) continue;
        const sc = 0.28 + t * 0.55;
        drawArrow(ctx, trail[i].x, trail[i].y, sc, trail[i].tilt, trail[i].hov, false, T, alpha);
      }

      // ── Click ripple ──
      if (clickPulseRef.current > 0.04) {
        const cp = clickPulseRef.current;
        const pr = (1 - cp) * 44;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, pr);
        grd.addColorStop(0,   `rgba(167,139,250,${cp * 0.45})`);
        grd.addColorStop(0.5, `rgba(244,114,182,${cp * 0.2})`);
        grd.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // ── Hover sparkles orbiting cursor tip ──
      if (hov) {
        sparks.forEach((sp) => {
          sp.angle += sp.speed;
          const orbR = 22 + Math.sin(T * 0.05) * 4;
          // Orbit around the cursor tip point
          const ox = px + Math.cos(sp.angle) * orbR;
          const oy = py + Math.sin(sp.angle) * orbR;

          // Glow halo
          const [rr, gg, bb] = hexToRgb(sp.color);
          const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 7);
          g.addColorStop(0, `rgba(${rr},${gg},${bb},0.7)`);
          g.addColorStop(1, `rgba(${rr},${gg},${bb},0)`);
          ctx.beginPath();
          ctx.arc(ox, oy, 7, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(ox, oy, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = sp.color;
          ctx.fill();

          // Faint line to tip
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(ox, oy);
          ctx.strokeStyle = `rgba(${rr},${gg},${bb},0.15)`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        });
      }

      // ── Main arrow cursor ──
      drawArrow(ctx, px, py, 1.4, tilt, hov, clk, T, 1);

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
      <canvas
        ref={canvasRef}
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          pointerEvents: "none",
          zIndex:        99999,
          opacity:       hidden ? 0 : 1,
          transition:    "opacity 0.4s",
        }}
      />
      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}

// ── Utility: hex → [r,g,b] ──
function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}