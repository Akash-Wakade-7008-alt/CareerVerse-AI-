"use client";
import AuthGuard from "@/components/ui/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import { AnimatedCounter } from "@/components/ui/ResultCard";
import SkillRadar from "@/components/simulation/SkillRadar";
import { CAREERS } from "@/data/careers";
import { motion } from "framer-motion";
import { RefreshCw, Share2, Sparkles, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ReportData { alignment: number; summary: string; strengths: string[]; weaknesses: string[]; personality: string; }

function ReportContent() {
  const [data, setData] = useState<{ scores: Record<string, number>; career: string; xp: number; badges: string[] } | null>(null);
  const [report, setReport] = useState<ReportData | null>(null);
  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(async () => {
      const stored = sessionStorage.getItem("cv_report");
      if (!stored || cancelled) return;
      const parsed = JSON.parse(stored);
      if (cancelled) return; setData(parsed);
      try {
        const response = await fetch("/api/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scores: parsed.scores, career: parsed.career }) });
        const json = await response.json();
        if (!cancelled) setReport(json.data);
      } catch { if (!cancelled) setReport(null); }
    });
    return () => { cancelled = true; };
  }, []);

  if (!data) return (
    <main className="min-h-screen px-4"><Navbar />
      <div className="mx-auto flex min-h-screen max-w-md items-center justify-center">
        <section className="glass-strong surface-ring rounded-3xl p-8 text-center">
          <h2 className="font-display text-2xl font-semibold" style={{ color: "var(--cv-text)" }}>No simulation data found</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>Complete one simulation and your report will appear here.</p>
          <Link href="/careers" className="btn-glow mt-6 inline-flex items-center justify-center rounded-xl bg-grad-purple px-5 py-3 text-sm font-semibold text-white">Start Simulation</Link>
        </section>
      </div>
    </main>
  );

  const career = CAREERS.find((e) => e.id === data.career);
  const alignment = report?.alignment ?? 87;
  const loadingReport = Boolean(data) && report === null;
  const skillScores = { leadership: data.scores.leadership ?? 50, creativity: data.scores.creativity ?? 50, communication: data.scores.communication ?? 50, analytical: data.scores.analytical ?? 50, decisionMaking: data.scores.decisionMaking ?? 50 };

  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-8 max-w-4xl text-center">
          <div className="section-kicker">Career Intelligence Report</div>
          <h1 className="section-title">You are strongly aligned for<span className="text-gradient"> {career?.title ?? "this track"}.</span></h1>
        </motion.header>
        <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong surface-ring rounded-3xl p-6 text-center md:p-8">
          <div className="text-xs uppercase tracking-[0.18em]" style={{ color: "var(--cv-muted)" }}>Alignment score</div>
          <div className="mt-3 font-display text-6xl font-semibold text-gradient md:text-7xl">{loadingReport ? "--" : <><AnimatedCounter value={alignment} />%</>}</div>
          <div className="mt-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>{report?.personality ?? "Building your behavioral archetype..."}</div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="rounded-full px-2.5 py-1" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>{data.xp} XP earned</span>
            <span className="rounded-full px-2.5 py-1" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>{data.badges.length} badges</span>
          </div>
        </motion.section>
        <section className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="glass surface-ring rounded-3xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold" style={{ color: "var(--cv-text)" }}>
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}><Target size={18} style={{ color: "var(--cv-brand-a)" }} /></motion.div>
              Skill Radar</h2>
            <SkillRadar scores={skillScores} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="glass surface-ring rounded-3xl p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold" style={{ color: "var(--cv-text)" }}>
              <Sparkles size={18} style={{ color: "var(--cv-brand-a)" }} className="animate-sparkle" />AI Summary</h2>
            {loadingReport ? <div className="space-y-3">{[1, 2, 3].map((i) => (<div key={i} className="h-4 animate-pulse rounded" style={{ background: "var(--cv-badge-bg)" }} />))}</div> : <p className="text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>{report?.summary}</p>}
            <div className="mt-5">
              <div className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-500">Strengths</div>
              <div className="mt-2 flex flex-wrap gap-2">{(report?.strengths ?? ["Analyzing"]).map((s) => (<span key={s} className="rounded-full border border-emerald-200 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20 px-3 py-1 text-xs text-emerald-700 dark:text-emerald-400">{s}</span>))}</div>
            </div>
            <div className="mt-4">
              <div className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-brand-a)" }}>Growth opportunities</div>
              <div className="mt-2 flex flex-wrap gap-2">{(report?.weaknesses ?? ["Analyzing"]).map((w) => (<span key={w} className="rounded-full px-3 py-1 text-xs" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>{w}</span>))}</div>
            </div>
          </motion.div>
        </section>
        <section className="mt-5 glass surface-ring rounded-3xl p-6">
          <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "var(--cv-text)" }}>Skill Breakdown</h2>
          <div className="space-y-3">
            {Object.entries(skillScores).map(([key, value]) => (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between text-sm"><span style={{ color: "var(--cv-text-secondary)" }}>{key.replace(/([A-Z])/g, " $1").trim()}</span><span className="font-semibold" style={{ color: "var(--cv-text)" }}>{value}/100</span></div>
                <div className="h-2 overflow-hidden rounded-full" style={{ background: "var(--cv-border)" }}><motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full bg-grad-cosmic" /></div>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link href="/careers" className="btn-glow inline-flex items-center justify-center gap-2 rounded-2xl bg-grad-purple py-3.5 text-sm font-semibold text-white"><RefreshCw size={15} className="animate-rotate-slow" style={{ animationDuration: "4s" }} />Run Another Simulation</Link>
          <button type="button" className="glass inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold" style={{ color: "var(--cv-text)" }}><Share2 size={15} className="animate-bounce-gentle" />Share Report</button>
        </div>
      </div>
    </main>
  );
}

export default function ReportPage() {
  return <AuthGuard><ReportContent /></AuthGuard>;
}
