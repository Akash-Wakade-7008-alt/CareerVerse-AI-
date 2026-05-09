"use client";

import { Career } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, TrendingUp } from "lucide-react";
import Link from "next/link";
import CareerIcon from "@/components/ui/CareerIcons";

export default function CareerCard({ career, idx }: { career: Career; idx: number }) {
  return (
    <motion.article initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.42 }}
      whileHover={{ y: -6, rotateY: 2, rotateX: -2 }}
      className="glass surface-ring shimmer-border group relative overflow-hidden rounded-3xl p-6 transition-all duration-300"
      style={{ perspective: "1000px" }}>
      <div className={`pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${career.color} opacity-10 blur-3xl transition group-hover:opacity-25`} />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <motion.div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${career.color} p-2 shadow-lg`}
            animate={{ y: [0, -5, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}>
            <CareerIcon careerId={career.iconId} size={28} />
          </motion.div>
          <motion.div className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
            style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}
            animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }}>
            <TrendingUp size={12} className="animate-bounce-gentle" />High Demand
          </motion.div>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight" style={{ color: "var(--cv-text)" }}>{career.title}</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>{career.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {career.skills.map((skill, si) => (
            <motion.span key={skill} className="rounded-full px-3 py-1 text-xs"
              style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-text-secondary)" }}
              animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, delay: si * 0.2 }}>
              {skill}
            </motion.span>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--cv-muted)" }}>Average salary</div>
            <div className="mt-1 text-sm font-semibold text-emerald-500">{career.salary}</div>
          </div>
          <Link href={`/simulation/${career.id}`} className="btn-glow inline-flex items-center gap-1.5 rounded-xl bg-grad-purple px-4 py-2.5 text-sm font-semibold text-white">
            Enter Simulation<motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={14} /></motion.div>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
