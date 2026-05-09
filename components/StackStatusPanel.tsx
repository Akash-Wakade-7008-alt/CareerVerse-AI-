"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type HealthResponse = {
  ok: boolean;
  timestamp: string;
  services: Record<string, string>;
};

function StatusChip({ status }: { status: string }) {
  const style = useMemo(() => {
    if (status === "ready" || status === "configured") {
      return "border-emerald-300/35 bg-emerald-500/12 text-emerald-100";
    }

    return "border-amber-300/35 bg-amber-500/12 text-amber-100";
  }, [status]);

  return (
    <span className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] ${style}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default function StackStatusPanel() {
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    void fetch("/api/health")
      .then((response) => response.json())
      .then((json: HealthResponse) => {
        if (!cancelled) {
          setHealth(json);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHealth(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong surface-ring rounded-3xl p-6"
    >
      <div className="section-kicker">Live Stack Health</div>
      <h2 className="mt-2 font-display text-2xl font-semibold">Runtime service status</h2>
      <p className="mt-2 text-sm text-white/70">
        This panel checks your current app runtime, including API route availability and service configuration.
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {Object.entries(health?.services ?? {}).map(([service, status]) => (
          <div key={service} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-xs uppercase tracking-[0.16em] text-white/55">{service}</div>
            <div className="mt-2">
              <StatusChip status={status} />
            </div>
          </div>
        ))}

        {!health && (
          <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/65">
            Loading service health...
          </div>
        )}
      </div>

      {health?.timestamp && (
        <p className="mt-4 text-xs text-white/45">Last check: {new Date(health.timestamp).toLocaleString()}</p>
      )}
    </motion.section>
  );
}
