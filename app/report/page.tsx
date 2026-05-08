"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SkillRadar from "@/components/SkillRadar";
import { AnimatedCounter } from "@/components/ResultCard";
import { CAREERS } from "@/data/careers";
import { Sparkles, Target, Share2, TrendingUp, RefreshCw } from "lucide-react";
import Link from "next/link";

interface ReportData {
  alignment: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  personality: string;
}

export default function ReportPage() {
  const [data, setData] = useState<{
    scores: Record<string, number>;
    career: string;
    xp: number;
    badges: string[];
  } | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loadingReport, setLoadingReport] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("cv_report");
    if (!stored) {
      setLoadingReport(false);
      return;
    }
    const d = JSON.parse(stored);
    setData(d);

    fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scores: d.scores, career: d.career }),
    })
      .then((r) => r.json())
      .then((j) => {
        setReport(j.data);
        setLoadingReport(false);
      })
      .catch(() => setLoadingReport(false));
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <Navbar />
        <div className="glass-strong rounded-3xl p-10 text-center max-w-md">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="font-display text-2xl font-bold">No simulation data yet</h2>
          <p className="text-white/60 mt-2 text-sm">Complete a simulation to see your career report.</p>
          <Link
            href="/careers"
            className="mt-6 inline-block px-6 py-3 rounded-2xl bg-grad-purple font-semibold btn-glow"
          >
            Start a Simulation →
          </Link>
        </div>
      </main>
    );
  }

  const career = CAREERS.find((c) => c.id === data.career);
  const alignment = report?.alignment ?? 87;

  const skillScores = {
    leadership: data.scores.leadership ?? 50,
    creativity: data.scores.creativity ?? 50,
    communication: data.scores.communication ?? 50,
    analytical: data.scores.analytical ?? 50,
    decisionMaking: data.scores.decisionMaking ?? 50,
  };

  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4">
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="text-violet-400 text-sm font-semibold mb-2">YOUR CAREER REPORT</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold">
            You&apos;d make a great{" "}
            <span className="text-gradient">{career?.title ?? "Professional"}.</span>
          </h1>
        </motion.div>

        {/* Alignment score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-3xl p-8 mb-6 text-center btn-glow"
        >
          <div className="text-sm text-white/60">Career Alignment Score</div>
          <div className="text-7xl md:text-8xl font-display font-bold text-gradient mt-2">
            {loadingReport ? "—" : <><AnimatedCounter value={alignment} />%</>}
          </div>
          <div className="text-violet-300 mt-2 text-sm">
            {report?.personality ?? "Calculating your personality archetype…"}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-white/60">
            <span>⚡ {data.xp} XP earned</span>
            <span>·</span>
            <span>🏆 {data.badges.length} badges</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-6">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <Target size={18} className="text-violet-400" /> Skill Profile
            </h3>
            <SkillRadar scores={skillScores} />
          </motion.div>

          {/* AI Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-violet-400" /> AI Summary
            </h3>

            {loadingReport ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-4 bg-white/5 rounded animate-pulse" />
                ))}
              </div>
            ) : (
              <p className="text-white/80 leading-relaxed text-sm">{report?.summary}</p>
            )}

            <div className="mt-5">
              <div className="text-emerald-400 text-xs font-bold mb-2">STRENGTHS</div>
              <div className="flex flex-wrap gap-2">
                {(report?.strengths ?? ["Analyzing…"]).map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs"
                  >
                    ✨ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-orange-400 text-xs font-bold mb-2">GROW THESE</div>
              <div className="flex flex-wrap gap-2">
                {(report?.weaknesses ?? ["Analyzing…"]).map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs"
                  >
                    📈 {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Badges */}
        {data.badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-6 mb-6"
          >
            <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-violet-400" /> Badges Earned
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="px-4 py-2 rounded-2xl bg-grad-purple text-sm font-semibold btn-glow"
                >
                  🏆 {b}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skill breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6 mb-6"
        >
          <h3 className="font-display font-bold text-xl mb-4">Skill Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(skillScores).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize text-white/70">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="font-bold">{val}/100</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-grad-cosmic"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/careers"
            className="py-4 text-center rounded-2xl bg-grad-purple font-semibold btn-glow flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> Try Another Career
          </Link>
          <button className="py-4 rounded-2xl glass font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition">
            <Share2 size={16} /> Share Report
          </button>
        </div>
      </div>
    </main>
  );
}
