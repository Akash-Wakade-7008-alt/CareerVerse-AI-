"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Brain, Building2, Rocket, Users2 } from "lucide-react";

const PILLARS = [
  {
    icon: Brain,
    title: "Decision Intelligence",
    detail:
      "Students do not just consume content. They make real tradeoff decisions and learn from consequences.",
  },
  {
    icon: Users2,
    title: "Family Clarity",
    detail:
      "Parents and students can discuss future choices using shared evidence, not assumptions.",
  },
  {
    icon: Building2,
    title: "Startup Realism",
    detail:
      "Simulations are modeled like fast startup workdays: urgency, team communication, and ambiguous information.",
  },
  {
    icon: Rocket,
    title: "Actionable Outcomes",
    detail:
      "Every session ends with strengths, growth areas, and a clear next experiment for the student.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="section-kicker">About CareerVerse AI</div>
          <h1 className="section-title">
            Built like a product studio
            <span className="text-gradient"> for career confidence.</span>
          </h1>
          <p className="section-copy mx-auto">
            CareerVerse AI helps students test-drive futures before committing years to them. We combine immersive
            AI simulation, skill analytics, and parent-ready dashboards in one decision platform.
          </p>
        </motion.header>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.36 }}
              className="glass surface-ring rounded-3xl p-6"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-indigo-500/90 to-sky-500/80 p-3 text-white">
                <pillar.icon size={18} />
              </div>
              <h2 className="font-display text-xl font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{pillar.detail}</p>
            </motion.article>
          ))}
        </section>

        <section className="mt-5 glass-strong surface-ring rounded-3xl p-7">
          <div className="section-kicker">Product Vision</div>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
            A funded-startup feel, with education outcomes at the center.
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/72">
            Our north star is simple: help every student run more informed experiments before major career choices.
            We design the UI to feel premium, but the core mission is practical confidence and better life decisions.
          </p>
        </section>
      </div>
    </main>
  );
}
