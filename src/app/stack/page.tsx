"use client";
import Navbar from "@/components/layout/Navbar";
import { STACK_LAYERS } from "@/data/stack";
import { motion } from "framer-motion";
import { Braces, Cpu, Database, Sparkles } from "lucide-react";

const ICONS = [Sparkles, Cpu, Database, Braces] as const;

export default function StackPage() {
  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-center">
          <div className="section-kicker">Technology Stack</div>
          <h1 className="section-title">Engineered for reliability,<span className="text-gradient"> speed, and future scale.</span></h1>
          <p className="section-copy mx-auto">This page gives a clear snapshot of how your Next.js, Tailwind, Framer Motion, Groq, Gemini, Supabase, and TypeScript layers are arranged.</p>
        </motion.header>
        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {STACK_LAYERS.map((layer, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.article key={layer.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.35 }} whileHover={{ y: -4 }}
                className="glass surface-ring gradient-border rounded-3xl p-6 transition-all duration-300">
                <motion.div className="mb-4 inline-flex rounded-2xl bg-grad-purple p-3 text-white"
                  animate={{ rotate: [0, 8, -8, 0], y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
                  <Icon size={18} className="animate-wiggle" />
                </motion.div>
                <h2 className="font-display text-xl font-semibold" style={{ color: "var(--cv-text)" }}>{layer.title}</h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>{layer.detail}</p>
              </motion.article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
