"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

type HealthResponse = { ok: boolean; timestamp: string; services: Record<string, string>; };

function StatusChip({ status }: { status: string }) {
  const isGood = status === "ready" || status === "configured";
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] ${isGood ? "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : ""}`}
      style={isGood ? {} : { border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>
      {status.replace("_", " ")}
    </span>
  );
}

export default function StackStatusPanel() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  useEffect(() => {
    let cancelled = false;
    void fetch("/api/health").then((r) => r.json()).then((json: HealthResponse) => { if (!cancelled) setHealth(json); }).catch(() => { if (!cancelled) setHealth(null); });
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-strong surface-ring rounded-3xl p-6">
      <div className="flex items-center gap-2">
        <div className="section-kicker">Live Stack Health</div>
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          <Activity size={12} style={{ color: "var(--cv-brand-a)" }} />
        </motion.div>
      </div>
      <h2 className="mt-2 font-display text-2xl font-semibold" style={{ color: "var(--cv-text)" }}>Runtime service status</h2>
      <p className="mt-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>This panel checks your current app runtime, including API route availability and service configuration.</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {Object.entries(health?.services ?? {}).map(([service, status]) => (
          <div key={service} className="rounded-2xl px-4 py-3" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)" }}>
            <div className="text-xs uppercase tracking-[0.16em]" style={{ color: "var(--cv-muted)" }}>{service}</div>
            <div className="mt-2"><StatusChip status={status} /></div>
          </div>
        ))}
        {!health && <div className="sm:col-span-2 rounded-2xl px-4 py-4 text-sm" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-text-secondary)" }}>Loading service health...</div>}
      </div>
      {health?.timestamp && <p className="mt-4 text-xs" style={{ color: "var(--cv-muted)" }}>Last check: {new Date(health.timestamp).toLocaleString()}</p>}
    </motion.section>
  );
}
