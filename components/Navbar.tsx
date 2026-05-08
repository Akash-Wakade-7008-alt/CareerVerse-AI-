"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
    >
      <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-grad-purple flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <span className="text-gradient">CareerVerse AI</span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm text-white/70">
          <Link href="/careers" className="hover:text-white transition">Careers</Link>
          <Link href="/parent" className="hover:text-white transition">For Parents</Link>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
        </div>
        <Link
          href="/careers"
          className="px-4 py-2 rounded-xl bg-grad-purple text-sm font-semibold btn-glow"
        >
          Start
        </Link>
      </div>
    </motion.nav>
  );
}
