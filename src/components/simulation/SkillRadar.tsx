"use client";
import { motion } from "framer-motion";
import { SkillScores } from "@/types";

export default function SkillRadar({ scores }: { scores: SkillScores }) {
  const entries = Object.entries(scores);
  return (
    <div className="space-y-3">
      {entries.map(([key, value], i) => (
        <div key={key}>
          <div className="mb-1 flex justify-between text-xs">
            <span className="capitalize" style={{ color: "var(--cv-text-secondary)" }}>{key.replace(/([A-Z])/g, " $1").trim()}</span>
            <span className="font-semibold" style={{ color: "var(--cv-text)" }}>{value}</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: "var(--cv-border)" }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${(value / 100) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }} className="h-full rounded-full bg-grad-cosmic" />
          </div>
        </div>
      ))}
    </div>
  );
}
