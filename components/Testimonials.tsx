"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Ananya, Class 11",
    text: "I thought I had to become a doctor. One PM simulation changed that in 20 minutes.",
    emoji: "A",
  },
  {
    name: "Rohan, Class 10",
    text: "This feels like a game, but it tells me who I become under pressure. That was eye-opening.",
    emoji: "R",
  },
  {
    name: "Mrs. Mehta, Parent",
    text: "For the first time, we discussed careers using actual behavior data, not guesswork.",
    emoji: "M",
  },
];

export default function Testimonials() {
  return (
    <section className="section-shell">
      <div className="section-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Student And Parent Signal</div>
          <h2 className="section-title">
            Trusted by ambitious families.
            <span className="text-gradient"> Built for decision confidence.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.08, duration: 0.42 }}
              className="glass surface-ring rounded-3xl p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/35 bg-sky-400/10 font-display text-sm font-semibold text-sky-200">
                {testimonial.emoji}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-white/86">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-[0.16em] text-white/55">
                {testimonial.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
