# 🚀 Portfolio — Next.js 15

A stunning dark-mode developer portfolio built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion.

## ✨ Features

- **Typewriter animation** — rotating role titles in the hero
- **CV Download** — one-click formatted CV download
- **Contact Form** — validated form with success state (plug in EmailJS / Resend)
- **Cursor glow** — mouse-following radial gradient
- **Scroll animations** — smooth reveal on every section
- **Active nav link** — highlights current section while scrolling
- **Noise texture + grid bg** — subtle depth layers
- **Responsive** — mobile hamburger menu included
- **Per-tech colors** — each tech tag has its own accent color

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Tailwind + custom animations + noise
│   ├── layout.tsx         # Fonts + metadata
│   └── page.tsx           # Root page — assembles all sections
├── components/
│   ├── CursorGlow.tsx     # Mouse-tracking glow effect
│   ├── Navbar.tsx         # Sticky nav with active link indicator
│   ├── Hero.tsx           # Typewriter + CV download + stats
│   ├── About.tsx          # Bio text + profile card
│   ├── Skills.tsx         # 4-category tech stack grid
│   ├── Projects.tsx       # Project cards with tech color tags
│   ├── Contact.tsx        # Social links + validated contact form
│   └── Footer.tsx         # Logo + copyright + social icons
└── data/
    └── portfolio.ts       # ← Edit ALL your info here
```

---

## 🛠 Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ✏️ Customization

**All your personal info lives in one file:**

```
src/data/portfolio.ts
```

Edit name, bio, email, GitHub, LinkedIn, skills, and projects there.

---

## 📧 Contact Form — Plug In a Real Email Service

The form currently simulates a send (1.5s delay). To make it real:

### Option A — EmailJS (free, no backend needed)
```bash
npm install @emailjs/browser
```
Replace the `await new Promise(...)` in `Contact.tsx` with:
```ts
import emailjs from "@emailjs/browser";
await emailjs.send("SERVICE_ID", "TEMPLATE_ID", {
  from_name: form.name,
  from_email: form.email,
  subject: form.subject,
  message: form.message,
}, "YOUR_PUBLIC_KEY");
```

### Option B — Resend (recommended for production)
```bash
npm install resend
```
Create `src/app/api/contact/route.ts` and POST from the form.

---

## 📦 Tech Stack

| Package | Version | Purpose |
|---|---|---|
| Next.js | 15 | Framework |
| React | 19 | UI |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 12 | Animations |
| Lucide React | latest | Icons |

---

## 🚀 Deploy

```bash
# Vercel (recommended)
npx vercel

# Or push to GitHub and import on vercel.com
```
