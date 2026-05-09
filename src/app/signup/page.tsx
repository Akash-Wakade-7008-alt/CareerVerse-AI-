"use client";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Eye, EyeOff, Rocket, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function getStrength(pw: string) {
  let s = 0; if (pw.length >= 6) s++; if (pw.length >= 10) s++;
  if (/[A-Z]/.test(pw)) s++; if (/[0-9]/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function SignupPage() {
  const { signup } = useAuth(); const router = useRouter();
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false); const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); const [success, setSuccess] = useState(false);
  const strength = getStrength(password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong", "Excellent"][strength];
  const strengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-400", "bg-emerald-500"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError("");
    if (password !== confirm) { setError("Passwords don't match"); setLoading(false); return; }
    const result = await signup(name, email, password);
    if (result.ok) { setSuccess(true); setTimeout(() => router.push("/careers"), 1500); }
    else { setError(result.error || "Signup failed"); }
    setLoading(false);
  };

  if (success) return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-strong surface-ring rounded-3xl p-10 text-center">
        <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <CheckCircle size={48} className="mx-auto text-emerald-500" />
        </motion.div>
        <h2 className="mt-4 font-display text-2xl font-semibold" style={{ color: "var(--cv-text)" }}>Welcome aboard!</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>Redirecting to your career simulations...</p>
      </motion.div>
    </main>
  );

  const inputStyle = { background: "var(--cv-input-bg)", border: "1px solid var(--cv-input-border)", color: "var(--cv-text)" };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
        <div className="h-[500px] w-[500px] animate-rotate-slow rounded-full" style={{ border: "1px solid var(--cv-border)" }} />
        <div className="absolute h-[350px] w-[350px] animate-rotate-slow rounded-full" style={{ border: "1px solid var(--cv-border-strong)", animationDirection: "reverse", animationDuration: "25s" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="glass-strong surface-ring w-full max-w-md rounded-3xl p-8">
        <div className="mb-6 text-center">
          <motion.div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-grad-purple text-white animate-pulse-glow"
            whileHover={{ rotate: 15 }}>
            <Rocket size={22} className="animate-float-subtle" />
          </motion.div>
          <h1 className="font-display text-2xl font-semibold" style={{ color: "var(--cv-text)" }}>Create your account</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--cv-text-secondary)" }}>Start exploring career simulations today</p>
        </div>
        {error && <div className="mb-4 rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-text-secondary)" }}>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2" placeholder="Your Name" style={inputStyle} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-text-secondary)" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2" placeholder="you@example.com" style={inputStyle} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-text-secondary)" }}>Password</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className="w-full rounded-xl px-4 py-3 pr-11 text-sm outline-none transition focus:ring-2" placeholder="Min 6 characters" style={inputStyle} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--cv-muted)" }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => (<div key={n} className={`h-1 flex-1 rounded-full transition ${n <= strength ? strengthColor : ""}`} style={n > strength ? { background: "var(--cv-border)" } : {}} />))}</div>
                <div className="mt-1 text-[11px]" style={{ color: "var(--cv-muted)" }}>{strengthLabel}</div>
              </div>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-text-secondary)" }}>Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-2" placeholder="••••••••" style={inputStyle} />
          </div>
          <button type="submit" disabled={loading} className="btn-glow w-full rounded-2xl bg-grad-purple py-3.5 text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <><UserPlus size={15} className="animate-bounce-gentle" />Create Account</>}
          </button>
        </form>
        <p className="mt-6 text-center text-sm" style={{ color: "var(--cv-text-secondary)" }}>
          Already have an account? <Link href="/login" className="font-semibold" style={{ color: "var(--cv-brand-a)" }}>Sign in<ArrowRight size={12} className="ml-0.5 inline" /></Link>
        </p>
      </motion.div>
    </main>
  );
}
