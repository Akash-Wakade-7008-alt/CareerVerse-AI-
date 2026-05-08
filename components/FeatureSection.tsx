"use client";
import { motion } from "framer-motion";
import { Brain, Gamepad2, BarChart3, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: Brain, title: "AI-Generated Scenarios", desc: "Every simulation is unique. Powered by Gemini 2.0 Flash." },
  { icon: Gamepad2, title: "Make Real Decisions", desc: "Face workplace dilemmas — see real consequences unfold." },
  { icon: BarChart3, title: "Skill Analytics", desc: "Get a personality radar across 5 critical skills." },
  { icon: Sparkles, title: "Career Fit Report", desc: "AI-generated alignment score for every career path." },
];

export default function FeatureSection() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-violet-400 text-sm font-semibold mb-3">HOW IT WORKS</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Not another <span className="text-gradient">chatbot.</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            CareerVerse is an immersive simulation engine — you don&apos;t read about jobs, you live them.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-6 hover:border-violet-400/40 transition group"
            >
              <div className="w-12 h-12 rounded-2xl bg-grad-purple flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <f.icon size={20} />
              </div>
              <h3 className="font-display font-bold text-lg">{f.title}</h3>
              <p className="text-white/60 text-sm mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
