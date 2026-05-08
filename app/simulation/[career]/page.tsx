"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SimulationChat from "@/components/SimulationChat";
import XPTracker from "@/components/XPTracker";
import { useSimulation } from "@/hooks/useSimulation";
import { CAREERS } from "@/data/careers";
import { ArrowRight, Trophy, Zap } from "lucide-react";

export default function SimulationPage() {
  const params = useParams();
  const router = useRouter();
  const careerId = params.career as string;
  const career = CAREERS.find((c) => c.id === careerId) || CAREERS[0];

  const { state, loading, done, turn } = useSimulation(careerId);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started && state.messages.length === 0) {
      turn(null);
    }
  }, [started]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (done) {
      sessionStorage.setItem(
        "cv_report",
        JSON.stringify({
          scores: state.scores,
          career: careerId,
          xp: state.xp,
          badges: state.badges,
        })
      );
    }
  }, [done, state.scores, state.xp, state.badges, careerId]);

  if (!started) {
    return (
      <main className="relative min-h-screen flex items-center justify-center px-4">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-3xl p-10 max-w-lg w-full text-center"
        >
          <div
            className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${career.color} mx-auto flex items-center justify-center text-4xl mb-6 btn-glow`}
          >
            {career.emoji}
          </div>
          <div className="text-violet-300 text-sm font-semibold">DAY IN THE LIFE OF A</div>
          <h1 className="font-display text-4xl font-bold mt-2">{career.title}</h1>
          <p className="text-white/60 mt-4 text-sm leading-relaxed">
            You&apos;ll face 5 real workplace dilemmas. Your choices shape the story — and reveal who you truly are.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { icon: "⚡", label: "~10 min" },
              { icon: "🎯", label: "5 Scenarios" },
              { icon: "🏆", label: "XP & Badges" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3">
                <div className="text-xl">{s.icon}</div>
                <div className="text-xs text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStarted(true)}
            className="mt-8 w-full py-4 rounded-2xl bg-grad-purple font-semibold flex items-center justify-center gap-2 btn-glow"
          >
            Start Day 1 <ArrowRight size={16} />
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col pt-20">
      <Navbar />

      {/* Sticky progress header */}
      <div className="px-4 max-w-3xl mx-auto w-full pb-3 sticky top-20 z-30 bg-background/80 backdrop-blur-sm">
        <XPTracker xp={state.xp} level={state.level} streak={state.streak} />
        <div className="mt-2 flex items-center justify-between text-xs text-white/50">
          <span className="flex items-center gap-1">
            <Zap size={10} className="text-violet-400" />
            Mission {state.step}/{state.maxSteps}
          </span>
          <div className="flex-1 mx-3 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(state.step / state.maxSteps) * 100}%` }}
              className="h-full bg-grad-cosmic transition-all duration-500"
            />
          </div>
          <span>{Math.round((state.step / state.maxSteps) * 100)}%</span>
        </div>

        {/* Badges earned */}
        {state.badges.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {state.badges.map((b) => (
              <motion.span
                key={b}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs px-2 py-1 rounded-full bg-violet-500/20 border border-violet-400/30"
              >
                🏆 {b}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full flex flex-col">
        <SimulationChat messages={state.messages} onChoose={turn} loading={loading} />

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4"
          >
            <div className="glass-strong rounded-3xl p-6 text-center btn-glow">
              <Trophy size={40} className="mx-auto text-yellow-400" />
              <div className="font-display text-2xl font-bold mt-3">Simulation Complete!</div>
              <p className="text-white/60 text-sm mt-2">
                You earned {state.xp} XP & {state.badges.length} badge{state.badges.length !== 1 ? "s" : ""}.
              </p>
              <button
                onClick={() => router.push("/report")}
                className="mt-5 w-full py-3 rounded-2xl bg-grad-purple font-semibold btn-glow"
              >
                See My Career Report →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
