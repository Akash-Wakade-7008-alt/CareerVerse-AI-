"use client";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LogIn, Lock, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth(); const router = useRouter();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false); const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    const result = await login(email, password);
    if (result.ok) { router.push("/careers"); } else { setError(result.error || "Login failed"); }
    setLoading(false);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
        <div className="h-[500px] w-[500px] animate-rotate-slow rounded-full" style={{ border: "1px solid var(--cv-border)" }} />
        <div className="absolute h-[350px] w-[350px] animate-rotate-slow rounded-full" style={{ border: "1px solid var(--cv-border-strong)", animationDirection: "reverse", animationDuration: "25s" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative glass-strong surface-ring w-full max-w-md rounded-3xl p-8">
        <button onClick={() => router.push("/")} className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10" style={{ color: "var(--cv-text-secondary)" }}>
          <X size={20} />
        </button>
        <div className="mb-6 text-center">
          <motion.div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-purple text-white animate-pulse-glow"
            whileHover={{ rotate: 15 }}>
            <LogIn size={22} className="animate-slide-x" />
          </motion.div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "var(--cv-text)" }}>Welcome back</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--cv-text-secondary)" }}>Sign in to continue your career exploration</p>
        </div>
        {error && <div className="mb-4 rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-text-secondary)" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2" placeholder="you@example.com"
              style={{ background: "var(--cv-input-bg)", border: "1px solid var(--cv-input-border)", color: "var(--cv-text)" }} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-text-secondary)" }}>Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm outline-none transition focus:ring-2" placeholder="••••••••"
                style={{ background: "var(--cv-input-bg)", border: "1px solid var(--cv-input-border)", color: "var(--cv-text)" }} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--cv-muted)" }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-glow w-full rounded-2xl bg-grad-purple py-3.5 text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <><Lock size={15} className="animate-bounce-gentle" />Sign In</>}
          </button>
        </form>
        <p className="mt-6 text-center text-sm" style={{ color: "var(--cv-text-secondary)" }}>
          Don&apos;t have an account? <Link href="/signup" className="font-semibold" style={{ color: "var(--cv-brand-a)" }}>Sign up<ArrowRight size={12} className="ml-0.5 inline" /></Link>
        </p>
      </motion.div>
    </main>
  );
}
