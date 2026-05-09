"use client";

import Navbar from "@/components/Navbar";
import SimulationChat from "@/components/SimulationChat";
import XPTracker from "@/components/XPTracker";
import { CAREERS } from "@/data/careers";
import { useSimulation } from "@/hooks/useSimulation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function SimulationExperience({ careerId }: { careerId: string }) {
  const router = useRouter();
  const career = CAREERS.find((entry) => entry.id === careerId) ?? CAREERS[0];

  const { state, loading, done, turn, error } = useSimulation(careerId);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || state.messages.length > 0 || loading) {
      return;
    }

    void turn(null);
  }, [started, state.messages.length, loading, turn]);

  useEffect(() => {
    if (!done) {
      return;
    }

    sessionStorage.setItem(
      "cv_report",
      JSON.stringify({
        scores: state.scores,
        career: careerId,
        xp: state.xp,
        badges: state.badges,
      })
    );
  }, [done, state.scores, state.xp, state.badges, careerId]);

  if (!started) {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4">
        <Navbar />
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-strong surface-ring w-full max-w-xl rounded-3xl p-8 text-center md:p-10"
        >
          <div
            className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br text-4xl ${career.color}`}
          >
            {career.emoji}
          </div>

          <div className="section-kicker">Simulation Briefing</div>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {career.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
            You are entering a five-mission scenario loop. Your choices impact team trust, product outcomes,
            and your skill profile.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {[
              { icon: "10m", label: "Session length" },
              { icon: "5", label: "Critical decisions" },
              { icon: "XP", label: "Badges and score" },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-3">
                <div className="font-display text-lg font-semibold text-gradient">{item.icon}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-white/50">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStarted(true)}
            type="button"
            className="btn-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grad-purple py-3.5 text-sm font-semibold text-white"
          >
            Launch Mission
            <ArrowRight size={16} />
          </button>
        </motion.section>
      </main>
    );
  }

  const progress = Math.min((state.step / state.maxSteps) * 100, 100);

  return (
    <main className="relative flex min-h-screen flex-col px-4 pt-20 pb-6 md:px-6">
      <Navbar />

      <div className="mx-auto w-full max-w-3xl">
        <div className="sticky top-20 z-30 rounded-2xl bg-slate-950/70 px-2 pb-3 pt-2 backdrop-blur-lg md:px-3">
          <XPTracker xp={state.xp} level={state.level} streak={state.streak} />

          <div className="mt-2.5 flex items-center gap-2 text-xs text-white/60">
            <span className="inline-flex min-w-max items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
              <ShieldCheck size={12} className="text-cyan-300" /> Mission {Math.min(state.step + 1, state.maxSteps)}
              of {state.maxSteps}
            </span>

            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full bg-grad-cosmic"
              />
            </div>

            <span>{Math.round(progress)}%</span>
          </div>

          {state.badges.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {state.badges.map((badge) => (
                <motion.span
                  key={badge}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-100"
                >
                  <Trophy size={11} className="mr-1 inline" />
                  {badge}
                </motion.span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-2 flex min-h-[60vh] flex-col">
          <SimulationChat messages={state.messages} onChoose={turn} loading={loading} />

          {error && (
            <div className="pt-2">
              <div className="rounded-2xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            </div>
          )}

          {done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-3">
              <div className="glass-strong surface-ring rounded-3xl p-6 text-center">
                <Trophy size={36} className="mx-auto text-yellow-300" />
                <h2 className="mt-3 font-display text-2xl font-semibold">Simulation complete</h2>
                <p className="mt-2 text-sm text-white/70">
                  You earned {state.xp} XP, {state.badges.length} badge
                  {state.badges.length === 1 ? "" : "s"}, and a full behavior report.
                </p>

                <button
                  onClick={() => router.push("/report")}
                  type="button"
                  className="btn-glow mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grad-purple py-3 font-semibold"
                >
                  <Zap size={15} />
                  Open My Career Report
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function SimulationPage() {
  const params = useParams();
  const careerId = params.career as string;

  return <SimulationExperience key={careerId} careerId={careerId} />;
}
