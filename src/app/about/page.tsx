"use client";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Brain, Building2, Rocket, Users2, Sparkles } from "lucide-react";

const PILLARS = [
  { icon: Brain, title: "Decision Intelligence", detail: "Students do not just consume content. They make real tradeoff decisions and learn from consequences." },
  { icon: Users2, title: "Family Clarity", detail: "Parents and students can discuss future choices using shared evidence, not assumptions." },
  { icon: Building2, title: "Startup Realism", detail: "Simulations are modeled like fast startup workdays: urgency, team communication, and ambiguous information." },
  { icon: Rocket, title: "Actionable Outcomes", detail: "Every session ends with strengths, growth areas, and a clear next experiment for the student." },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-center">
          <div className="section-kicker">About CareerVerse AI</div>
          <h1 className="section-title">Built like a product studio<span className="text-gradient"> for career confidence.</span></h1>
          <p className="section-copy mx-auto">CareerVerse AI helps students test-drive futures before committing years to them. We combine immersive AI simulation, skill analytics, and parent-ready dashboards in one decision platform.</p>
        </motion.header>
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.36 }} whileHover={{ y: -4 }}
              className="glass surface-ring gradient-border rounded-3xl p-6 transition-all duration-300">
              <motion.div className="mb-4 inline-flex rounded-2xl bg-grad-purple p-3 text-white"
                animate={{ rotate: [0, 8, -8, 0], y: [0, -3, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
                <p.icon size={18} className="animate-wiggle" style={{ animationDelay: `${i * 0.2}s` }} />
              </motion.div>
              <h2 className="font-display text-xl font-semibold" style={{ color: "var(--cv-text)" }}>{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>{p.detail}</p>
            </motion.article>
          ))}
        </section>
        <section className="mt-5 glass-strong surface-ring rounded-3xl p-7">
          <div className="flex items-center gap-2">
            <div className="section-kicker">Product Vision</div>
            <motion.div animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }}>
              <Sparkles size={12} style={{ color: "var(--cv-brand-a)" }} />
            </motion.div>
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl" style={{ color: "var(--cv-text)" }}>A funded-startup feel, with education outcomes at the center.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>Our north star is simple: help every student run more informed experiments before major career choices. We design the UI to feel premium, but the core mission is practical confidence and better life decisions.</p>
        </section>
      </div>
    </main>
  );
}
