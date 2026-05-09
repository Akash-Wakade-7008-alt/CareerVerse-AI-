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
        <div className="animate-pulse-glow flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-grad-purple text-sm font-semibold text-white">{level}</div>
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--cv-brand-a)" }}>Level</div>
          <div className="font-display text-sm font-semibold tracking-wide" style={{ color: "var(--cv-text)" }}>{levelName}</div>
        </div>
        <div className="ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>
          <Flame size={13} className="animate-wiggle" /><span className="font-semibold">{streak} streak</span>
        </div>
      </div>
      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--cv-muted)" }}>
          <span className="inline-flex items-center gap-1"><Zap size={11} className="animate-bounce-gentle" /> {xp} XP</span>
          <span>{pct}/100</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "var(--cv-border)" }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.55, ease: "easeOut" }} className="h-full bg-grad-cosmic" />
        </div>
        <div className="mt-2 inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--cv-muted)" }}>
          <Sparkles size={10} className="animate-sparkle" /> Next level unlocks new badge tiers
        </div>
      </div>
    </div>
  );
}
