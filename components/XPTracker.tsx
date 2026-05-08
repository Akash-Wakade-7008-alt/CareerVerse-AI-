"use client";
import { motion } from "framer-motion";
import { Flame, Zap } from "lucide-react";

export default function XPTracker({ xp, level, streak }: { xp: number; level: number; streak: number }) {
  const pct = xp % 100;
  const levelNames = ["Rookie", "Explorer", "Strategist", "Leader", "Visionary"];
  const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)];

  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-grad-purple flex items-center justify-center font-bold text-sm btn-glow shrink-0">
          {level}
        </div>
        <div className="text-xs">
          <div className="text-white/50">Level</div>
          <div className="font-bold">{levelName}</div>
        </div>
      </div>

      <div className="flex-1 min-w-[80px]">
        <div className="flex items-center justify-between text-[10px] text-white/50 mb-1">
          <span className="flex items-center gap-1"><Zap size={10} /> {xp} XP</span>
          <span>{pct}/100</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            className="h-full bg-grad-cosmic"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 text-orange-400">
        <Flame size={16} />
        <span className="font-bold">{streak}</span>
      </div>
    </div>
  );
}
