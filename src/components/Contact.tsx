"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

type FormState = "idle" | "sending" | "sent" | "error";

// ── SVG Icons ──
function IconGithub({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function IconLinkedin({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconMail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}
function IconSend({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
function IconCheck({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function IconLocation({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconResponse({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const socialLinks = [
  { Icon: IconGithub,   href: portfolioData.github,              label: "GitHub",   value: "github.com/yourusername",   color: "#a78bfa" },
  { Icon: IconLinkedin, href: portfolioData.linkedin,            label: "LinkedIn", value: "linkedin.com/in/yourusername", color: "#22d3ee" },
  { Icon: IconMail,     href: `mailto:${portfolioData.email}`,   label: "Email",    value: portfolioData.email,          color: "#f472b6" },
];

const infoCards = [
  { Icon: IconLocation, label: "Based in", value: portfolioData.location, color: "#22d3ee" },
  { Icon: IconResponse, label: "Response", value: "Within 24 hours",      color: "#4ade80" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form,   setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [state,  setState]  = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setState("sending");
    await new Promise(r => setTimeout(r, 1500));
    setState("sent");
  };

  const inputBase = (field: string): React.CSSProperties => ({
    width: "100%",
    background: focused === field ? "var(--surface2)" : "var(--input-bg)",
    border: `1px solid ${
      errors[field]  ? "rgba(248,113,113,0.6)"  :
      focused === field ? "rgba(124,58,237,0.55)" : "var(--border)"
    }`,
    borderRadius: "12px",
    padding: "12px 16px",
    color: "var(--text)",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(124,58,237,0.1)" : "none",
    resize: "none" as const,
  });

  const label = (text: string) => (
    <label style={{
      display:"block", fontFamily:"JetBrains Mono, monospace", fontSize:"10px",
      color:"var(--violet2)", letterSpacing:"0.12em", textTransform:"uppercase" as const,
      marginBottom:"8px",
    }}>{text}</label>
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "120px 48px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      {/* BG */}
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"1px",
        background:"linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(34,211,238,0.3),transparent)" }} />
      <motion.div
        animate={{ scale:[1,1.2,1], opacity:[0.05,0.12,0.05] }}
        transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",
          width:"700px",height:"350px",borderRadius:"50%",
          background:"radial-gradient(ellipse,rgba(124,58,237,0.12) 0%,transparent 65%)",
          filter:"blur(40px)",pointerEvents:"none" }}
      />
      <motion.div
        animate={{ scale:[1,1.15,1], opacity:[0.03,0.08,0.03] }}
        transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:3 }}
        style={{ position:"absolute",bottom:"-10%",right:"-5%",width:"400px",height:"400px",
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
          style={{ marginBottom:"72px", textAlign:"center" }}
        >
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"14px", marginBottom:"18px" }}>
            <motion.div
              animate={{ width: isInView ? "56px" : "0px" }}
              transition={{ duration:0.9, delay:0.3 }}
              style={{ height:"2px", background:"linear-gradient(90deg,#7c3aed,#22d3ee)", borderRadius:"2px" }}
            />
            <span style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
              color:"var(--violet2)", letterSpacing:"0.22em", textTransform:"uppercase" }}>
              Get In Touch
            </span>
            <motion.div
              animate={{ width: isInView ? "56px" : "0px" }}
              transition={{ duration:0.9, delay:0.3 }}
              style={{ height:"2px", background:"linear-gradient(90deg,#22d3ee,#7c3aed)", borderRadius:"2px" }}
            />
          </div>

          <h2 style={{ fontFamily:"Syne, sans-serif", fontSize:"clamp(38px,5.5vw,64px)",
            fontWeight:800, color:"var(--text)", lineHeight:1.0, letterSpacing:"-0.025em", marginBottom:"16px" }}>
            Let&apos;s Build Something{" "}
            <span style={{ background:"linear-gradient(90deg,#a78bfa,#22d3ee,#f472b6)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Great
            </span>
          </h2>
          <p style={{ color:"var(--text-muted)", fontSize:"16px", maxWidth:"500px", margin:"0 auto", lineHeight:1.8 }}>
            Open to full-time roles, freelance, and collaborations. My inbox is always open.
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"40px", alignItems:"start" }}>

          {/* ════ LEFT ════ */}
          <motion.div
            initial={{ opacity:0, x:-30 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.1 }}
            style={{ display:"flex", flexDirection:"column", gap:"16px" }}
          >
            {/* Info cards row */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"4px" }}>
              {infoCards.map((card, i) => {
                const CardIcon = card.Icon;
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity:0, y:16 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.15 + i*0.1 }}
                    style={{
                      padding:"18px", borderRadius:"18px",
                      background:"var(--surface)",
                      border:"1px solid var(--border)",
                      position:"relative", overflow:"hidden",
                    }}
                  >
                    <div style={{ position:"absolute",top:0,left:0,right:0,height:"2px",
                      background:`linear-gradient(90deg,${card.color},transparent)` }} />
                    <div style={{ width:"36px",height:"36px",borderRadius:"10px",
                      background:`${card.color}15`, border:`1px solid ${card.color}25`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:card.color, marginBottom:"10px" }}>
                      <CardIcon size={16} />
                    </div>
                    <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"9px",
                      color:"var(--text-dim)", letterSpacing:"0.1em", textTransform:"uppercase",
                      marginBottom:"3px" }}>{card.label}</div>
                    <div style={{ fontSize:"13px", color:"var(--text)", fontWeight:600 }}>{card.value}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social links */}
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {socialLinks.map((s, i) => {
                const SocialIcon = s.Icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    initial={{ opacity:0, x:-16 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:0.2 + i*0.08 }}
                    whileHover={{ x:6 }}
                    style={{
                      display:"flex", alignItems:"center", gap:"16px",
                      padding:"16px 20px", borderRadius:"16px",
                      border:"1px solid var(--border)",
                      background:"var(--surface)",
                      textDecoration:"none", color:"var(--text)",
                      transition:"border-color 0.25s, background 0.25s",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${s.color}40`;
                      el.style.background = `${s.color}06`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border)";
                      el.style.background = "var(--surface)";
                    }}
                  >
                    <div style={{
                      width:"42px", height:"42px", borderRadius:"12px",
                      background:`${s.color}14`, border:`1px solid ${s.color}25`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:s.color, flexShrink:0,
                    }}>
                      <SocialIcon size={18} />
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"9px",
                        color:"var(--text-dim)", letterSpacing:"0.1em", textTransform:"uppercase",
                        marginBottom:"2px" }}>{s.label}</div>
                      <div style={{ fontSize:"14px", fontWeight:500, color:"var(--text)",
                        overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.value}</div>
                    </div>
                    <motion.div
                      animate={{ x:[0,4,0] }}
                      transition={{ duration:1.5, repeat:Infinity, ease:"easeInOut", delay:i*0.3 }}
                      style={{ color:"var(--text-muted)", fontSize:"18px", flexShrink:0 }}
                    >→</motion.div>
                  </motion.a>
                );
              })}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity:0, y:12 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:0.5 }}
              style={{
                padding:"16px 20px", borderRadius:"16px",
                background:"linear-gradient(135deg,rgba(74,222,128,0.08),rgba(34,211,238,0.04))",
                border:"1px solid rgba(74,222,128,0.2)",
                display:"flex", alignItems:"center", gap:"12px",
              }}
            >
              <motion.span
                animate={{ opacity:[1,0.2,1], scale:[1,0.7,1] }}
                transition={{ duration:1.6, repeat:Infinity }}
                style={{ width:"10px",height:"10px",borderRadius:"50%",
                  background:"#4ade80", boxShadow:"0 0 12px rgba(74,222,128,0.9)",
                  display:"block", flexShrink:0 }}
              />
              <div>
                <div style={{ fontFamily:"Syne, sans-serif", fontSize:"14px", fontWeight:700,
                  color:"var(--text)", marginBottom:"2px" }}>Currently Available</div>
                <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                  color:"var(--text-muted)" }}>Open to new opportunities</div>
              </div>
            </motion.div>
          </motion.div>

          {/* ════ RIGHT: Form ════ */}
          <motion.div
            initial={{ opacity:0, x:30 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.2 }}
            className="gradient-border"
            style={{
              background:"var(--surface)",
              borderRadius:"24px", padding:"36px",
              position:"relative", overflow:"hidden",
              transition:"background 0.4s",
            }}
          >
            {/* Inner mesh */}
            <motion.div
              animate={{ rotate:[0,-360] }}
              transition={{ duration:25, repeat:Infinity, ease:"linear" }}
              style={{ position:"absolute",top:"-30%",right:"-20%",
                width:"220px",height:"220px",borderRadius:"50%",opacity:0.06,
                background:"conic-gradient(from 0deg,#7c3aed,#22d3ee,transparent)",
                pointerEvents:"none" }}
            />

            <AnimatePresence mode="wait">
              {state === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity:0, scale:0.85 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0 }}
                  transition={{ type:"spring", stiffness:200, damping:20 }}
                  style={{ textAlign:"center", padding:"48px 0" }}
                >
                  <motion.div
                    initial={{ scale:0 }}
                    animate={{ scale:1 }}
                    transition={{ type:"spring", stiffness:200, delay:0.1 }}
                    style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}
                  >
                    <div style={{ width:"72px",height:"72px",borderRadius:"50%",
                      background:"rgba(34,211,238,0.12)", border:"1px solid rgba(34,211,238,0.3)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:"var(--cyan)",
                      boxShadow:"0 0 30px rgba(34,211,238,0.2)" }}>
                      <IconCheck size={36} />
                    </div>
                  </motion.div>
                  <h3 style={{ fontFamily:"Syne, sans-serif", fontSize:"24px", fontWeight:800,
                    color:"var(--text)", marginBottom:"10px" }}>Message Sent!</h3>
                  <p style={{ color:"var(--text-muted)", fontSize:"15px", lineHeight:1.7 }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => { setState("idle"); setForm({ name:"",email:"",subject:"",message:"" }); }}
                    whileHover={{ scale:1.04 }}
                    whileTap={{ scale:0.96 }}
                    style={{ marginTop:"24px", padding:"10px 24px", borderRadius:"100px",
                      border:"1px solid var(--border)", background:"transparent",
                      color:"var(--text-muted)", fontFamily:"JetBrains Mono, monospace",
                      fontSize:"12px", cursor:"pointer", transition:"all 0.2s" }}
                  >
                    Send another →
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                  <div style={{ marginBottom:"28px" }}>
                    <h3 style={{ fontFamily:"Syne, sans-serif", fontSize:"22px", fontWeight:800,
                      color:"var(--text)", marginBottom:"4px" }}>Send a Message</h3>
                    <p style={{ fontFamily:"JetBrains Mono, monospace", fontSize:"11px",
                      color:"var(--text-muted)", letterSpacing:"0.04em" }}>
                      I&apos;ll respond within 24 hours
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"16px" }}>
                    <div>
                      {label("Name *")}
                      <input type="text" value={form.name} placeholder="Your name"
                        style={inputBase("name")}
                        onChange={e => setForm({...form, name:e.target.value})}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                      {errors.name && <p style={{ color:"#f87171",fontSize:"11px",marginTop:"4px" }}>{errors.name}</p>}
                    </div>
                    <div>
                      {label("Email *")}
                      <input type="email" value={form.email} placeholder="your@email.com"
                        style={inputBase("email")}
                        onChange={e => setForm({...form, email:e.target.value})}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                      {errors.email && <p style={{ color:"#f87171",fontSize:"11px",marginTop:"4px" }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div style={{ marginBottom:"16px" }}>
                    {label("Subject")}
                    <input type="text" value={form.subject} placeholder="Project idea, collaboration..."
                      style={inputBase("subject")}
                      onChange={e => setForm({...form, subject:e.target.value})}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom:"24px" }}>
                    {label("Message *")}
                    <textarea rows={5} value={form.message} placeholder="Tell me about your project..."
                      style={inputBase("message")}
                      onChange={e => setForm({...form, message:e.target.value})}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                    {errors.message && <p style={{ color:"#f87171",fontSize:"11px",marginTop:"4px" }}>{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={state === "sending"}
                    whileHover={state !== "sending" ? { scale:1.02, y:-1 } : {}}
                    whileTap={state !== "sending" ? { scale:0.97 } : {}}
                    style={{
                      width:"100%",
                      background: state === "sending"
                        ? "rgba(124,58,237,0.5)"
                        : "linear-gradient(135deg,#7c3aed,#5b21b6)",
                      color:"#fff", border:"none",
                      padding:"15px", borderRadius:"14px",
                      fontSize:"15px", fontWeight:700,
                      cursor: state === "sending" ? "not-allowed" : "pointer",
                      fontFamily:"Syne, sans-serif",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:"10px",
                      position:"relative", overflow:"hidden",
                      boxShadow: state === "sending" ? "none" : "0 6px 20px rgba(124,58,237,0.4)",
                      transition:"all 0.2s",
                    }}
                  >
                    {state !== "sending" && (
                      <motion.span
                        animate={{ x:["-120%","220%"] }}
                        transition={{ duration:2.5, repeat:Infinity, repeatDelay:1.5 }}
                        style={{ position:"absolute",inset:0,
                          background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                          pointerEvents:"none" }}
                      />
                    )}
                    {state === "sending" ? (
                      <>
                        <motion.span
                          animate={{ rotate:360 }}
                          transition={{ duration:1, repeat:Infinity, ease:"linear" }}
                          style={{ display:"block", width:"16px",height:"16px",borderRadius:"50%",
                            border:"2px solid rgba(255,255,255,0.3)",
                            borderTopColor:"#fff" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <IconSend size={16} />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}