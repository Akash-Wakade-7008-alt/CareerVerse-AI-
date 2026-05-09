"use client";

import { motion } from "framer-motion";
import { BarChart3, Brain, Gamepad2, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "Adaptive Simulation Engine",
    desc: "Gemini generates scenario pressure and consequences in real time, so each run feels custom to the student.",
  },
  {
    icon: Gamepad2,
    title: "Decision-First Journey",
    desc: "Students choose under realistic ambiguity, then immediately see team reactions, tradeoffs, and execution risk.",
  },
  {
    icon: BarChart3,
    title: "Skill Signal Layer",
    desc: "Every decision updates score vectors across leadership, communication, creativity, analysis, and decision quality.",
  },
  {
    icon: Sparkles,
    title: "Actionable Career Report",
    desc: "Post-simulation summaries translate behavior into clear strengths, growth edges, and next career experiments.",
  },
];

export default function FeatureSection() {
  return (
    <section className="section-shell">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-kicker">How The Platform Works</div>
          <h2 className="section-title">
            This is not career content.
            <span className="text-gradient"> This is career rehearsal.</span>
          </h2>
          <p className="section-copy mx-auto">
            The product is designed like a mission control loop: context, pressure, choice, consequences,
            and feedback that compounds.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.42 }}
              className="glass surface-ring group rounded-3xl p-6"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-indigo-500/85 to-sky-500/80 p-3 text-white transition group-hover:scale-105">
                <feature.icon size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
