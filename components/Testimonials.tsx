"use client";
import { motion } from "framer-motion";

const T = [
  { name: "Ananya, Class 11", text: "I was sure I wanted to be a doctor. Then I tried PM simulation. Mind = blown.", emoji: "🤯" },
  { name: "Rohan, Class 10", text: "Felt like Netflix but for my future. Got 92% match for Software Engineer.", emoji: "🚀" },
  { name: "Mrs. Mehta, Parent", text: "First time my son willingly explored careers. The report was incredibly detailed.", emoji: "💜" },
];

export default function Testimonials() {
  return (
    <section className="py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-display text-4xl md:text-6xl font-bold mb-16">
          Loved by <span className="text-gradient">12K+ students.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          {T.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl p-6"
            >
              <div className="text-3xl mb-3">{t.emoji}</div>
              <p className="text-white/85">&ldquo;{t.text}&rdquo;</p>
              <div className="text-violet-300 text-xs font-semibold mt-4">— {t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
