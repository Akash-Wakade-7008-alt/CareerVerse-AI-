"use client";
import AuthGuard from "@/components/ui/AuthGuard";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/layout/Navbar";
import SimulationChat from "@/components/simulation/SimulationChat";
import XPTracker from "@/components/simulation/XPTracker";
import CareerIcon from "@/components/ui/CareerIcons";
import { CAREERS } from "@/data/careers";
import { useSimulation } from "@/hooks/useSimulation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Trophy, Zap, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function SimulationExperience({ careerId }: { careerId: string }) {
  const router = useRouter();
  const career = CAREERS.find((e) => e.id === careerId) ?? CAREERS[0];
  const { state, loading, done, turn, error } = useSimulation(careerId);
  const { user } = useAuth();
  
  type OnboardingStep = "quiz" | "loading_overview" | "overview" | "simulation";
  const [step, setStep] = useState<OnboardingStep>("quiz");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [overviewData, setOverviewData] = useState<{ knowledgeLevel: string; overview: string } | null>(null);
  const [apiError, setApiError] = useState("");

  useEffect(() => { if (step !== "simulation" || state.messages.length > 0 || loading) return; void turn(null); }, [step, state.messages.length, loading, turn]);
  useEffect(() => {
    if (!done) return;
    sessionStorage.setItem("cv_report", JSON.stringify({ scores: state.scores, career: careerId, xp: state.xp, badges: state.badges }));
  }, [done, state.scores, state.xp, state.badges, careerId]);

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizAnswer.trim()) return;
    setStep("loading_overview");
    setApiError("");

    try {
      const res = await fetch("/api/career-overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ careerId, quizAnswer, userId: user?.userId }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setOverviewData(json.data);
        setStep("overview");
      } else {
        setApiError(json.error || "Failed to generate overview");
        setStep("quiz");
      }
    } catch (err) {
      setApiError("Network error. Please try again.");
      setStep("quiz");
    }
  };

  if (step === "quiz") {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4">
        <Navbar />
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="relative glass-strong surface-ring w-full max-w-xl rounded-3xl p-8 text-center md:p-10">
          <button onClick={() => router.push("/careers")} className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10" style={{ color: "var(--cv-text-secondary)" }}>
            <X size={20} />
          </button>
          <motion.div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${career.color} p-3`}
            animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <CareerIcon careerId={career.iconId} size={40} />
          </motion.div>
          <div className="section-kicker">Knowledge Assessment</div>
          <h1 className="mt-2 font-display text-2xl font-semibold md:text-3xl" style={{ color: "var(--cv-text)" }}>What does a {career.title} do?</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>Before we start the simulation, tell us in your own words what you think this role entails on a daily basis.</p>
          
          {apiError && <div className="mt-4 rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 px-4 py-2 text-xs text-red-600 dark:text-red-400">{apiError}</div>}
          
          <form onSubmit={handleQuizSubmit} className="mt-6">
            <textarea
              value={quizAnswer}
              onChange={(e) => setQuizAnswer(e.target.value)}
              placeholder="I think they..."
              required
              rows={4}
              className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2"
              style={{ background: "var(--cv-input-bg)", border: "1px solid var(--cv-input-border)", color: "var(--cv-text)" }}
            />
            <button type="submit" className="btn-glow mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grad-purple py-3.5 text-sm font-semibold text-white animate-pulse-glow">
              Analyze My Knowledge<motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={16} /></motion.div>
            </button>
          </form>
        </motion.section>
      </main>
    );
  }

  if (step === "loading_overview") {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4">
        <Navbar />
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative glass-strong surface-ring w-full max-w-md rounded-3xl p-8 text-center">
          <button onClick={() => router.push("/careers")} className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10" style={{ color: "var(--cv-text-secondary)" }}>
            <X size={20} />
          </button>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-grad-purple text-white">
            <Zap size={24} className="animate-bounce-gentle" />
          </div>
          <h2 className="mt-6 font-display text-xl font-semibold" style={{ color: "var(--cv-text)" }}>Groq is analyzing your answer...</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>Generating a personalized role overview based on your current knowledge.</p>
          <div className="mt-6 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="h-2 w-2 rounded-full bg-indigo-500"
                animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
            ))}
          </div>
        </motion.section>
      </main>
    );
  }

  if (step === "overview" && overviewData) {
    return (
      <main className="relative flex min-h-screen items-center justify-center px-4 py-20">
        <Navbar />
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
          className="relative glass-strong surface-ring w-full max-w-2xl rounded-3xl p-8 md:p-10">
          <button onClick={() => router.push("/careers")} className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10" style={{ color: "var(--cv-text-secondary)" }}>
            <X size={20} />
          </button>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-brand-a)" }}>
              <ShieldCheck size={14} /> Knowledge Level: {overviewData.knowledgeLevel}
            </div>
            <h1 className="mt-4 font-display text-2xl font-semibold md:text-3xl" style={{ color: "var(--cv-text)" }}>AI Personalized Overview</h1>
          </div>
          <div className="mt-8 space-y-4 text-sm leading-relaxed md:text-[15px]" style={{ color: "var(--cv-text-secondary)" }}>
            {overviewData.overview.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <button onClick={() => setStep("simulation")} type="button"
            className="btn-glow mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grad-purple py-3.5 text-sm font-semibold text-white animate-pulse-glow">
            Start Simulation<motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={16} /></motion.div>
          </button>
        </motion.section>
      </main>
    );
  }

  // Simulation step (started)

  const progress = Math.min((state.step / state.maxSteps) * 100, 100);
  return (
    <main className="relative flex min-h-screen flex-col px-4 pt-20 pb-6 md:px-6">
      <Navbar />
      <div className="mx-auto w-full max-w-3xl">
        <div className="sticky top-20 z-30 rounded-2xl px-2 pb-3 pt-2 backdrop-blur-lg md:px-3" style={{ background: "color-mix(in srgb, var(--cv-bg) 70%, transparent)" }}>
          <XPTracker xp={state.xp} level={state.level} streak={state.streak} />
          <div className="mt-2.5 flex items-center gap-2 text-xs" style={{ color: "var(--cv-text-secondary)" }}>
            <span className="inline-flex min-w-max items-center gap-1 rounded-full px-2.5 py-1" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)" }}>
              <ShieldCheck size={12} style={{ color: "var(--cv-brand-a)" }} className="animate-bounce-gentle" /> Mission {Math.min(state.step + 1, state.maxSteps)} of {state.maxSteps}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "var(--cv-border)" }}>
              <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.35, ease: "easeOut" }} className="h-full bg-grad-cosmic" />
            </div>
            <span>{Math.round(progress)}%</span>
          </div>
          {state.badges.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {state.badges.map((badge) => (
                <motion.span key={badge} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="rounded-full px-2.5 py-1 text-[11px]" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>
                  <Trophy size={11} className="mr-1 inline animate-wiggle" />{badge}
                </motion.span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2 flex min-h-[60vh] flex-col">
          <SimulationChat messages={state.messages} onChoose={turn} loading={loading} />
          {error && <div className="pt-2"><div className="rounded-2xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</div></div>}
          {done && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-3">
              <div className="glass-strong surface-ring rounded-3xl p-6 text-center">
                <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Trophy size={36} style={{ color: "var(--cv-brand-a)" }} />
                </motion.div>
                <h2 className="mt-3 font-display text-2xl font-semibold" style={{ color: "var(--cv-text)" }}>Simulation complete</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>You earned {state.xp} XP, {state.badges.length} badge{state.badges.length === 1 ? "" : "s"}, and a full behavior report.</p>
                <button onClick={() => router.push("/report")} type="button"
                  className="btn-glow mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-grad-purple py-3 font-semibold text-white">
                  <Zap size={15} className="animate-bounce-gentle" />Open My Career Report
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
  return <AuthGuard><SimulationExperience key={careerId} careerId={careerId} /></AuthGuard>;
}
