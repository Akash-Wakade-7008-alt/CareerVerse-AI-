"use client";
import Navbar from "@/components/Navbar";
import CareerCard from "@/components/CareerCard";
import { CAREERS } from "@/data/careers";
import { motion } from "framer-motion";

export default function CareersPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-violet-400 text-sm font-semibold mb-3">CHOOSE YOUR ADVENTURE</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold">
            Which career do you want to{" "}
            <span className="text-gradient">live today?</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Each simulation is ~10 minutes. Real decisions. Real consequences. Zero pressure.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAREERS.map((c, i) => (
            <CareerCard key={c.id} career={c} idx={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
