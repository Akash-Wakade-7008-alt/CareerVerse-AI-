"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const LINKS = [
  { href: "/careers", label: "Careers" },
  { href: "/parent", label: "Parents" },
  { href: "/about", label: "About" },
  { href: "/stack", label: "Stack" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed left-1/2 top-4 z-50 w-[96%] max-w-6xl -translate-x-1/2"
    >
      <div className="glass-strong surface-ring rounded-2xl px-3.5 py-3 md:px-5">
        <div className="flex items-center justify-between gap-2 md:gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <div className="btn-glow flex h-9 w-9 items-center justify-center rounded-xl bg-grad-purple text-white">
              <Sparkles size={15} />
            </div>
            <div className="min-w-0">
              <div className="truncate font-display text-[15px] font-semibold tracking-tight text-white md:text-base">
                CareerVerse AI
              </div>
              <div className="hidden text-[10px] uppercase tracking-[0.22em] text-sky-300/75 md:block">
                Simulation Platform
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.8)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200/85">
              Live Beta
            </span>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl px-3.5 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/careers"
            className="btn-glow inline-flex items-center gap-1.5 rounded-xl bg-grad-purple px-4 py-2 text-sm font-semibold text-white"
          >
            Start
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-2 flex items-center gap-1 overflow-x-auto pb-1 md:hidden">
          {LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] uppercase tracking-[0.13em] text-white/70"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
