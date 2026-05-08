"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs md:text-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI-Powered Career Simulations · Built for Gen-Z
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          Don&apos;t choose a career <br />
          <span className="text-gradient">blindly.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
        >
          Experience real careers through immersive AI simulations. Make decisions, get evaluated, discover your perfect path.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/careers"
            className="group px-8 py-4 rounded-2xl bg-grad-purple font-semibold flex items-center justify-center gap-2 btn-glow"
          >
            Start Exploring
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </Link>
          <button className="px-8 py-4 rounded-2xl glass font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition">
            <Play size={16} /> Watch Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center"
        >
          {[
            { n: "12K+", l: "Students" },
            { n: "5", l: "Careers" },
            { n: "98%", l: "Loved It" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-gradient">{s.n}</div>
              <div className="text-xs text-white/60 mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
