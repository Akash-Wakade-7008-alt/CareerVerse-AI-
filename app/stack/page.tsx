"use client";

import Navbar from "@/components/Navbar";
import StackStatusPanel from "@/components/StackStatusPanel";
import { STACK_LAYERS } from "@/data/stack";
import { motion } from "framer-motion";
import { Braces, Cpu, Database, Sparkles } from "lucide-react";

const ICONS = [Sparkles, Cpu, Database, Braces] as const;

export default function StackPage() {
  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="section-kicker">Technology Stack</div>
          <h1 className="section-title">
            Engineered for reliability,
            <span className="text-gradient"> speed, and future scale.</span>
          </h1>
          <p className="section-copy mx-auto">
            This page gives a clear snapshot of how your Next.js, Tailwind, Framer Motion, Gemini, Supabase, and
            TypeScript layers are arranged.
          </p>
        </motion.header>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {STACK_LAYERS.map((layer, index) => {
            const Icon = ICONS[index % ICONS.length];

            return (
              <motion.article
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="glass surface-ring rounded-3xl p-6"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-indigo-500/90 to-sky-500/80 p-3 text-white">
                  <Icon size={18} />
                </div>
                <h2 className="font-display text-xl font-semibold">{layer.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{layer.detail}</p>
                <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-cyan-100/90">
                  {layer.tech}
                </div>
              </motion.article>
            );
          })}
        </section>

        <div className="mt-5">
          <StackStatusPanel />
        </div>
      </div>
    </main>
  );
}
