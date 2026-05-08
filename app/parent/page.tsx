"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { GraduationCap, Activity, Award, TrendingUp } from "lucide-react";

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
  { career: "Product Manager", date: "Today", score: 87, emoji: "🚀" },
  { career: "UI/UX Designer", date: "Yesterday", score: 74, emoji: "🎨" },
  { career: "Software Engineer", date: "2d ago", score: 91, emoji: "💻" },
];

export default function ParentDashboard() {
  return (
    <main className="relative min-h-screen pt-28 pb-20 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-violet-400 text-sm font-semibold">PARENT DASHBOARD</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-1">
            Aarav&apos;s Career Journey
          </h1>
          <p className="text-white/60 mt-2">Class 11 · CBSE · Member since Jan 2025</p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: GraduationCap, label: "Careers Explored", v: "5", c: "text-violet-400" },
            { icon: Activity, label: "Total Sessions", v: "13", c: "text-blue-400" },
            { icon: Award, label: "Badges Earned", v: "8", c: "text-emerald-400" },
            { icon: TrendingUp, label: "Avg. Alignment", v: "84%", c: "text-pink-400" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <s.icon size={20} className={s.c} />
              <div className="text-3xl font-bold mt-2">{s.v}</div>
              <div className="text-xs text-white/50 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-6">
          {/* Activity chart */}
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display font-bold text-lg mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ACTIVITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,.5)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,.5)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(20,10,40,.9)",
                    border: "1px solid rgba(139,92,246,.3)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="sessions" fill="url(#barGrad)" radius={8} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent simulations */}
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display font-bold text-lg mb-4">Recent Simulations</h3>
            <div className="space-y-3">
              {HISTORY.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5"
                >
                  <div className="text-2xl">{h.emoji}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{h.career}</div>
                    <div className="text-xs text-white/50">{h.date}</div>
                  </div>
                  <div
                    className={`font-bold ${
                      h.score >= 85 ? "text-emerald-400" : "text-yellow-400"
                    }`}
                  >
                    {h.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="glass-strong rounded-3xl p-6 btn-glow">
          <div className="text-violet-300 text-xs font-bold">AI RECOMMENDATIONS</div>
          <h3 className="font-display font-bold text-2xl mt-1">
            Aarav shows strong fit for strategic, leadership-driven roles.
          </h3>
          <p className="text-white/70 text-sm mt-3">
            Based on 13 simulations, his top alignment is{" "}
            <b className="text-white">Software Engineering (91%)</b> followed by Product
            Management (87%). We recommend exploring{" "}
            <b className="text-white">CS + Business</b> tracks (BBA + B.Tech dual degrees,
            IITs with management minors).
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["IIT (CS)", "BITS Pilani", "ISB Young Leaders", "Ashoka — CS+Business"].map((p) => (
              <span
                key={p}
                className="text-xs px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
