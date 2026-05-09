"use client";

import CareerCard from "@/components/CareerCard";
import Navbar from "@/components/Navbar";
import { CAREERS } from "@/data/careers";
import { motion } from "framer-motion";

export default function CareersPage() {
  return (
    <main className="relative min-h-screen px-4 pb-24 pt-28 md:pt-32">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="section-kicker">Choose Your Simulation</div>
          <h1 className="section-title">
            Which future should we
            <span className="text-gradient"> pressure-test today?</span>
          </h1>
          <p className="section-copy mx-auto">
            Every simulation takes around 10 minutes and captures how students make decisions under realistic work tension.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAREERS.map((career, index) => (
            <CareerCard key={career.id} career={career} idx={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
