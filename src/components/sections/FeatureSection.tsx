"use client";
import { motion } from "framer-motion";
import { BarChart3, Brain, Gamepad2, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Brain, title: "Adaptive Simulation Engine", desc: "Groq-powered AI generates scenario pressure and consequences in real time, so each run feels custom to the student." },
  { icon: Gamepad2, title: "Decision-First Journey", desc: "Students choose under realistic ambiguity, then immediately see team reactions, tradeoffs, and execution risk." },
  { icon: BarChart3, title: "Skill Signal Layer", desc: "Every decision updates score vectors across leadership, communication, creativity, analysis, and decision quality." },
  { icon: Sparkles, title: "Actionable Career Report", desc: "Post-simulation summaries translate behavior into clear strengths, growth edges, and next career experiments." },
];

export default function FeatureSection() {
  return (
    <section className="section-shell">
      <div className="section-wrap">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">How The Platform Works</div>
          <h2 className="section-title">This is not career content.<span className="text-gradient"> This is career rehearsal.</span></h2>
          <p className="section-copy mx-auto">The product is designed like a mission control loop: context, pressure, choice, consequences, and feedback that compounds.</p>
        </motion.div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1, duration: 0.42 }}
              whileHover={{ y: -6, rotateY: 2, rotateX: -2 }}
              className="glass surface-ring gradient-border group rounded-3xl p-6 transition-all duration-300" style={{ perspective: "1000px" }}>
              <motion.div className="mb-4 inline-flex rounded-2xl bg-grad-purple p-3 text-white"
                animate={{ rotate: [0, 8, -8, 0], y: [0, -4, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
                <feature.icon size={20} className="animate-wiggle" style={{ animationDelay: `${i * 0.3}s` }} />
              </motion.div>
              <h3 className="font-display text-lg font-semibold" style={{ color: "var(--cv-text)" }}>{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>{feature.desc}</p>
              {/* Animated decorative dots */}
              <div className="mt-4 flex gap-1.5">
                {[0, 1, 2].map((d) => (
                  <motion.div key={d} className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--cv-brand-a)" }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: d * 0.3 + i * 0.2 }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
