"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Award, GraduationCap, TrendingUp } from "lucide-react";

const ACTIVITY = [
  { day: "Mon", sessions: 1 },
  { day: "Tue", sessions: 2 },
  { day: "Wed", sessions: 0 },
  { day: "Thu", sessions: 3 },
  { day: "Fri", sessions: 1 },
  { day: "Sat", sessions: 4 },
  { day: "Sun", sessions: 2 },
];

const HISTORY = [
  { career: "Product Manager", date: "Today", score: 87, emoji: "PM" },
  { career: "UI/UX Designer", date: "Yesterday", score: 74, emoji: "UX" },
  { career: "Software Engineer", date: "2 days ago", score: 91, emoji: "SE" },
];

const STATS = [
  { icon: GraduationCap, label: "Careers explored", value: "5", tone: "text-indigo-200" },
  { icon: Activity, label: "Sessions completed", value: "13", tone: "text-cyan-200" },
  { icon: Award, label: "Badges unlocked", value: "8", tone: "text-emerald-200" },
  { icon: TrendingUp, label: "Average alignment", value: "84%", tone: "text-amber-200" },
];

export default function ParentDashboard() {
  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="section-kicker">Parent Dashboard</div>
            <h1 className="section-title">Aarav&apos;s Career Journey</h1>
            <p className="mt-2 text-sm text-white/60">Class 11, CBSE, joined January 2025</p>
          </div>

          <div className="glass rounded-2xl px-4 py-3 text-xs text-white/70">
            Last sync: today at 7:45 PM
          </div>
        </motion.header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="glass surface-ring rounded-2xl p-5"
            >
              <stat.icon size={18} className={stat.tone} />
              <div className="mt-2 font-display text-3xl font-semibold">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/55">{stat.label}</div>
            </motion.article>
          ))}
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="glass surface-ring rounded-3xl p-6">
            <h2 className="mb-4 font-display text-xl font-semibold">Weekly activity</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ACTIVITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,.5)" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "rgba(99,102,241,0.12)" }}
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(56,189,248,0.28)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="sessions" fill="url(#barGrad)" radius={8} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#0ea5e9" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </article>

          <article className="glass surface-ring rounded-3xl p-6">
            <h2 className="mb-4 font-display text-xl font-semibold">Recent simulations</h2>
            <div className="space-y-2.5">
              {HISTORY.map((entry) => (
                <div key={`${entry.career}-${entry.date}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-xs font-semibold text-indigo-100">
                    {entry.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white/92">{entry.career}</div>
                    <div className="text-xs text-white/50">{entry.date}</div>
                  </div>
                  <div className={entry.score >= 85 ? "font-semibold text-emerald-300" : "font-semibold text-amber-300"}>
                    {entry.score}%
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-5 glass-strong surface-ring rounded-3xl p-6 md:p-7">
          <div className="section-kicker">AI Recommendation</div>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
            Aarav currently fits strategic, systems-thinking roles.
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/70">
            Based on 13 simulations, top alignment sits in Software Engineering (91%) and Product Management
            (87%). Suggested next step: explore blended CS + business tracks where technical depth and decision
            leadership compound together.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "IIT Computer Science",
              "BITS Pilani",
              "ISB Young Leaders",
              "Ashoka CS + Business",
            ].map((item) => (
              <span key={item} className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-50">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
