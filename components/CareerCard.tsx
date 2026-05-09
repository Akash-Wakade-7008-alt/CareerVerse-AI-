"use client";

import { Career } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function CareerCard({ career, idx }: { career: Career; idx: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.42 }}
      whileHover={{ y: -6 }}
      className="glass surface-ring group relative overflow-hidden rounded-3xl p-6"
    >
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${career.color} opacity-20 blur-3xl transition group-hover:opacity-35`}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${career.color} text-3xl shadow-lg`}
          >
            {career.emoji}
          </div>
          <div className="inline-flex items-center gap-1 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100/90">
            <BarChart3 size={12} />
            High Demand
          </div>
        </div>

        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{career.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{career.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {career.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/45">Average salary</div>
            <div className="mt-1 text-sm font-semibold text-emerald-300">{career.salary}</div>
          </div>

          <Link
            href={`/simulation/${career.id}`}
            className="btn-glow inline-flex items-center gap-1.5 rounded-xl bg-grad-purple px-4 py-2.5 text-sm font-semibold text-white"
          >
            Enter Simulation
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
