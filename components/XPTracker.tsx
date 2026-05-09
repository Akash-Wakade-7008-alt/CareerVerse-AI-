"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Zap } from "lucide-react";

export default function XPTracker({ xp, level, streak }: { xp: number; level: number; streak: number }) {
  const pct = xp % 100;
  const levelNames = ["Rookie", "Explorer", "Strategist", "Leader", "Visionary"];
  const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)];

  return (
    <div className="glass-strong surface-ring rounded-2xl p-4 md:p-5">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="btn-glow flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grad-purple text-sm font-semibold text-white">
          {level}
        </div>

        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.16em] text-sky-200/75">Level</div>
          <div className="font-display text-sm font-semibold tracking-wide text-white">{levelName}</div>
        </div>

        <div className="ml-auto inline-flex items-center gap-1 rounded-full border border-orange-300/30 bg-orange-500/10 px-2.5 py-1 text-xs text-orange-200">
          <Flame size={13} />
          <span className="font-semibold">{streak} streak</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-white/60">
          <span className="inline-flex items-center gap-1">
            <Zap size={11} /> {xp} XP
          </span>
          <span>{pct}/100</span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="h-full bg-grad-cosmic"
          />
        </div>

        <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-white/55">
          <Sparkles size={10} /> Next level unlocks new badge tiers
        </div>
      </div>
    </div>
  );
}
