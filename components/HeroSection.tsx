"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";

const STATS = [
  { n: "12K+", l: "Students" },
  { n: "43K", l: "Choices Simulated" },
  { n: "98%", l: "Would Recommend" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center px-4 pt-24 pb-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            className="glass surface-ring mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <Sparkles size={13} className="text-sky-300" />
            <span className="text-xs tracking-wide text-white/80 md:text-sm">
              Career Intelligence Layer for Students and Families
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.52 }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl"
          >
            Future decisions should feel
            <span className="text-gradient"> data-backed, not random.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
          >
            Run cinematic AI workday simulations, make tough calls, and get a transparent skill map
            before committing years to a career path.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/careers"
              className="btn-glow group inline-flex items-center justify-center gap-2 rounded-2xl bg-grad-purple px-8 py-4 font-semibold text-white"
            >
              Start a Simulation
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </Link>

            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-slate-950/40 px-8 py-4 font-semibold text-white/90 transition hover:bg-white/10">
              <PlayCircle size={17} />
              Product Walkthrough
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {STATS.map((stat) => (
              <div key={stat.l} className="glass surface-ring rounded-2xl px-5 py-4">
                <div className="text-2xl font-semibold text-gradient md:text-3xl">{stat.n}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
