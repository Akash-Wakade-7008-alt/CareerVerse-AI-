"use client";

import AuthGuard from "@/components/ui/AuthGuard";
import Navbar from "@/components/layout/Navbar";
import CareerCard from "@/components/simulation/CareerCard";
import { CAREERS } from "@/data/careers";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function CareersContent() {
  return (
    <main className="relative min-h-screen px-4 pb-20 pt-28">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="section-kicker">Choose Your Track</div>
            <motion.div animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }}>
              <Sparkles size={12} style={{ color: "var(--cv-brand-a)" }} />
            </motion.div>
          </div>
          <h1 className="section-title">Explore career simulations<span className="text-gradient"> tailored to your curiosity.</span></h1>
          <p className="section-copy mx-auto">Each simulation drops you into one high-stakes workday. Make decisions, earn badges, and discover your fit.</p>
        </motion.header>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAREERS.map((career, index) => (
            <CareerCard key={career.id} career={career} idx={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CareersPage() {
  return <AuthGuard><CareersContent /></AuthGuard>;
}
