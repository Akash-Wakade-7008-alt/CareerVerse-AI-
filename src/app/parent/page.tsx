"use client";
import AuthGuard from "@/components/ui/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";
import { Activity, Award, GraduationCap, TrendingUp } from "lucide-react";

const STATS = [
  { icon: GraduationCap, label: "Careers explored", value: "5" },
  { icon: Activity, label: "Sessions completed", value: "13" },
  { icon: Award, label: "Badges unlocked", value: "8" },
  { icon: TrendingUp, label: "Average alignment", value: "84%" },
];

const HISTORY = [
  { career: "Product Manager", date: "Today", score: 87, emoji: "PM" },
  { career: "UI/UX Designer", date: "Yesterday", score: 74, emoji: "UX" },
  { career: "Software Engineer", date: "2 days ago", score: 91, emoji: "SE" },
];

function ParentContent() {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "Student";

  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker">Parent Dashboard</div>
            <h1 className="section-title">{firstName}&apos;s Career Journey</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>Class 11, CBSE, joined January 2025</p>
          </div>
          <div className="glass rounded-2xl px-4 py-3 text-xs" style={{ color: "var(--cv-text-secondary)" }}>Last sync: today at 7:45 PM</div>
        </motion.header>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.article key={stat.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.35 }}
              className="glass surface-ring rounded-2xl p-5">
              <motion.div animate={{ y: [0, -4, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}>
                <stat.icon size={18} style={{ color: "var(--cv-brand-a)" }} />
              </motion.div>
              <div className="mt-2 font-display text-3xl font-semibold" style={{ color: "var(--cv-text)" }}>{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em]" style={{ color: "var(--cv-muted)" }}>{stat.label}</div>
            </motion.article>
          ))}
        </section>
        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="glass surface-ring rounded-3xl p-6">
            <h2 className="mb-4 font-display text-xl font-semibold" style={{ color: "var(--cv-text)" }}>Recent simulations</h2>
            <div className="space-y-2.5">
              {HISTORY.map((e) => (
                <div key={`${e.career}-${e.date}`} className="flex items-center gap-3 rounded-2xl p-3" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)" }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-grad-purple text-xs font-semibold text-white">{e.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold" style={{ color: "var(--cv-text)" }}>{e.career}</div>
                    <div className="text-xs" style={{ color: "var(--cv-muted)" }}>{e.date}</div>
                  </div>
                  <div className={`font-semibold ${e.score >= 85 ? "text-emerald-500" : ""}`} style={e.score < 85 ? { color: "var(--cv-brand-a)" } : {}}>{e.score}%</div>
                </div>
              ))}
            </div>
          </article>
          <article className="glass-strong surface-ring rounded-3xl p-6 md:p-7">
            <div className="section-kicker">AI Recommendation</div>
            <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl" style={{ color: "var(--cv-text)" }}>{firstName} currently fits strategic, systems-thinking roles.</h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>Based on 13 simulations, top alignment sits in Software Engineering (91%) and Product Management (87%). Suggested next step: explore blended CS + business tracks.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["IIT Computer Science", "BITS Pilani", "ISB Young Leaders", "Ashoka CS + Business"].map((item) => (
                <span key={item} className="rounded-full px-3 py-1.5 text-xs" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>{item}</span>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default function ParentDashboard() {
  return <AuthGuard><ParentContent /></AuthGuard>;
}
