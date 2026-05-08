"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Career } from "@/types";
import { ArrowRight } from "lucide-react";

export default function CareerCard({ career, idx }: { career: Career; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative glass rounded-3xl p-6 overflow-hidden hover:border-violet-400/40 transition-all"
    >
      <div className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br ${career.color} opacity-20 blur-3xl group-hover:opacity-40 transition`} />

      <div className="relative">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${career.color} flex items-center justify-center text-3xl mb-5 shadow-lg`}>
          {career.emoji}
        </div>

        <h3 className="text-2xl font-display font-bold">{career.title}</h3>
        <p className="text-white/60 text-sm mt-2 leading-relaxed">{career.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {career.skills.map((s) => (
            <span key={s} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/40">Avg Salary</div>
            <div className="text-sm font-semibold text-emerald-400">{career.salary}</div>
          </div>

          <Link
            href={`/simulation/${career.id}`}
            className="px-4 py-2 rounded-xl bg-grad-purple text-sm font-semibold flex items-center gap-1.5 btn-glow"
          >
            Try Simulation <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
