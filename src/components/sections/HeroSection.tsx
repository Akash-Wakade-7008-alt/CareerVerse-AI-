"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle, Sparkles, Zap, Flame, Star, Rocket, Brain } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import CareerIcon from "@/components/ui/CareerIcons";

const STATS = [
  { n: "12K+", l: "Students", target: 12000 },
  { n: "43K", l: "Choices Simulated", target: 43000 },
  { n: "98%", l: "Would Recommend", target: 98 },
];

const FLOATING_ICONS = ["product-manager", "software-engineer", "marketing-manager", "ui-ux-designer", "consultant"];
const SPARKLE_ICONS = [Zap, Flame, Star, Rocket, Brain, Sparkles];

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setStarted(true), delay); return () => clearTimeout(timer); }, [delay]);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => { if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; } else clearInterval(interval); }, 35);
    return () => clearInterval(interval);
  }, [text, started]);
  return <span>{displayed}{displayed.length < text.length && started && <span className="animate-pulse" style={{ color: "var(--cv-brand-a)" }}>|</span>}</span>;
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const duration = 2000; const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime; const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);
  const formatted = target >= 1000 ? `${Math.floor(count / 1000)}K${count >= target ? "+" : ""}` : `${count}${suffix}`;
  return <div ref={ref}>{formatted}</div>;
}

export default function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative flex min-h-screen items-center px-4 pt-24 pb-20">
      {/* Orbit decoration with more animated elements */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-15">
        <div className="h-[700px] w-[700px] animate-rotate-slow rounded-full border border-[var(--cv-border)]" />
        <div className="absolute h-[500px] w-[500px] animate-rotate-slow rounded-full border border-[var(--cv-border)]" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
        <div className="absolute h-[300px] w-[300px] animate-rotate-slow rounded-full border border-[var(--cv-border)]" style={{ animationDuration: "15s" }} />
        <div className="absolute h-3 w-3 rounded-full shadow-[0_0_20px_var(--cv-glow-strong)] animate-orbit" style={{ background: "var(--cv-brand-a)" }} />
        <div className="absolute h-2 w-2 rounded-full shadow-[0_0_16px_var(--cv-glow-strong)] animate-orbit" style={{ background: "var(--cv-brand-b)", animationDelay: "-7s" }} />
        <div className="absolute h-2 w-2 rounded-full shadow-[0_0_16px_var(--cv-glow)] animate-orbit" style={{ background: "var(--cv-brand-c)", animationDelay: "-14s", animationDuration: "25s" }} />
      </div>

      {/* Floating sparkle icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {SPARKLE_ICONS.map((Icon, i) => (
          <motion.div key={i} className="absolute" style={{ left: `${10 + i * 15}%`, top: `${15 + (i % 3) * 25}%`, color: "var(--cv-brand-a)", opacity: 0.15 }}
            animate={{ y: [0, -20, 0], x: [0, Math.sin(i) * 15, 0], rotate: [0, 360], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}>
            <Icon size={16 + i * 2} />
          </motion.div>
        ))}
      </div>

      {/* Floating career icon constellation */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {FLOATING_ICONS.map((id, i) => (
          <motion.div key={id} className="absolute"
            animate={{ x: [0, Math.cos(i * 1.25) * 180, 0], y: [0, Math.sin(i * 1.25) * 140, 0], opacity: [0.15, 0.4, 0.15], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            style={{ left: `${30 + i * 10}%`, top: `${20 + (i % 3) * 20}%` }}>
            <CareerIcon careerId={id} size={32} />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}
            className="glass surface-ring mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 animate-border-glow">
            <motion.div animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }}>
              <Sparkles size={13} style={{ color: "var(--cv-brand-a)" }} />
            </motion.div>
            <span className="text-xs tracking-wide md:text-sm" style={{ color: "var(--cv-text-secondary)" }}>Career Intelligence Layer for Students and Families</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.52 }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl" style={{ color: "var(--cv-text)" }}>
            <TypewriterText text="Future decisions should feel" delay={300} />
            <br />
            <span className="text-gradient animate-text-glow">
              <TypewriterText text=" data-backed, not random." delay={1500} />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24, duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "var(--cv-text-secondary)" }}>
            Run cinematic AI workday simulations, make tough calls, and get a transparent skill map before committing years to a career path.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={isAuthenticated ? "/careers" : "/signup"}
              className="btn-glow group inline-flex items-center justify-center gap-2 rounded-2xl bg-grad-purple px-8 py-4 font-semibold text-white animate-pulse-glow">
              {isAuthenticated ? "Start a Simulation" : "Get Started Free"}
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={17} />
              </motion.div>
            </Link>
            <button className="glass inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-semibold" style={{ color: "var(--cv-text)" }}>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <PlayCircle size={17} />
              </motion.div>
              Product Walkthrough
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <motion.div key={stat.l} whileHover={{ y: -4, scale: 1.02 }}
                className="glass surface-ring rounded-2xl px-5 py-4 group animate-border-glow" style={{ animationDelay: `${i * 0.5}s` }}>
                <div className="text-2xl font-semibold text-gradient md:text-3xl">
                  <AnimatedCounter target={stat.target} suffix={stat.l === "Would Recommend" ? "%" : ""} />
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em]" style={{ color: "var(--cv-muted)" }}>{stat.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
