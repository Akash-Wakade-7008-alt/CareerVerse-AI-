"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, LogIn, LogOut, Moon, Sparkles, Sun, User } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";

const LINKS = [
  { href: "/careers", label: "Careers" },
  { href: "/parent", label: "Parents" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.nav initial={{ y: -36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-50 w-[96%] max-w-6xl -translate-x-1/2">
      <motion.div className="glass-strong surface-ring shimmer-border animate-border-glow rounded-2xl px-3.5 py-3 md:px-5"
        whileHover={{ boxShadow: "0 0 30px var(--cv-glow-strong)" }}>
        <div className="flex items-center justify-between gap-2 md:gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <motion.div className="animate-pulse-glow flex h-9 w-9 items-center justify-center rounded-xl bg-grad-purple text-white"
              whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
              <Sparkles size={15} className="animate-wiggle" />
            </motion.div>
            <div className="min-w-0">
              <div className="truncate font-display text-[15px] font-semibold tracking-tight md:text-base" style={{ color: "var(--cv-text)" }}>CareerVerse AI</div>
              <div className="hidden text-[10px] uppercase tracking-[0.22em] md:block" style={{ color: "var(--cv-brand-a)", opacity: 0.75 }}>Simulation Platform</div>
            </div>
          </Link>

          <div className="hidden items-center gap-1.5 rounded-full px-2 py-1.5 md:flex" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)" }}>
            <motion.span className="h-2 w-2 rounded-full bg-emerald-400" animate={{ scale: [1, 1.4, 1], boxShadow: ["0 0 0 rgba(74,222,128,0)", "0 0 16px rgba(74,222,128,0.8)", "0 0 0 rgba(74,222,128,0)"] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-500 dark:text-emerald-400">Live Beta</span>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((item, i) => (
              <motion.div key={item.label} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link href={item.href} className="rounded-xl px-3.5 py-2 text-sm transition hover:bg-[var(--cv-badge-bg)]" style={{ color: "var(--cv-text-secondary)" }}>{item.label}</Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button onClick={toggleTheme} whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
              style={{ background: "var(--cv-badge-bg)", border: "1px solid var(--cv-badge-border)" }}
              aria-label="Toggle theme">
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }}>
                    <Sun size={16} className="text-amber-400 animate-rotate-slow" style={{ animationDuration: "8s" }} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }}>
                    <Moon size={16} className="animate-bounce-gentle" style={{ color: "var(--cv-brand-b)" }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-2 rounded-full px-3 py-1.5 md:flex" style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)" }}>
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <User size={13} style={{ color: "var(--cv-brand-a)" }} />
                  </motion.div>
                  <span className="text-xs font-medium" style={{ color: "var(--cv-badge-text)" }}>{user?.name?.split(" ")[0] || "User"}</span>
                </div>
                <motion.button onClick={logout} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>
                  <LogOut size={14} className="animate-slide-x" /><span className="hidden md:inline">Logout</span>
                </motion.button>
              </>
            ) : (
              <>
                <Link href="/login" className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>
                  <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}><LogIn size={14} /></motion.div>
                  <span className="hidden md:inline">Login</span>
                </Link>
                <Link href="/signup" className="btn-glow inline-flex items-center gap-1.5 rounded-xl bg-grad-purple px-4 py-2 text-sm font-semibold text-white">
                  Sign Up<motion.div animate={{ x: [0, 3, 0], y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowUpRight size={14} /></motion.div>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-1 md:hidden">
          {LINKS.map((item) => (
            <Link key={item.label} href={item.href} className="whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] uppercase tracking-[0.13em]"
              style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-text-secondary)" }}>{item.label}</Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
