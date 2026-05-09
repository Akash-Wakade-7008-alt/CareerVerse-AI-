"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Quote } from "lucide-react";

const TESTIMONIALS = [
  { name: "Ananya, Class 11", text: "I thought I had to become a doctor. One PM simulation changed that in 20 minutes.", initial: "A" },
  { name: "Rohan, Class 10", text: "This feels like a game, but it tells me who I become under pressure. That was eye-opening.", initial: "R" },
  { name: "Mrs. Mehta, Parent", text: "For the first time, we discussed careers using actual behavior data, not guesswork.", initial: "M" },
  { name: "Priya, Class 12", text: "The consultant simulation helped me understand consulting isn't just about spreadsheets — it's people leadership.", initial: "P" },
  { name: "Dr. Shah, Counselor", text: "We use this platform across 200 students — the reports are remarkably accurate.", initial: "D" },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => setScrollPos((prev) => prev + 1), 50);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="section-shell overflow-hidden" ref={containerRef}>
      <div className="section-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Student And Parent Signal</div>
          <h2 className="section-title">Trusted by ambitious families.<span className="text-gradient"> Built for decision confidence.</span></h2>
        </div>
        <div className="mt-12 relative">
          <div className="flex gap-4 overflow-hidden">
            <motion.div className="flex gap-4 shrink-0" animate={{ x: -(scrollPos % (TESTIMONIALS.length * 340)) }} transition={{ duration: 0, ease: "linear" }}>
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <motion.figure key={`${t.name}-${i}`} whileHover={{ y: -4 }}
                  className="glass surface-ring gradient-border w-[320px] shrink-0 rounded-3xl p-6 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <motion.div className="flex h-10 w-10 items-center justify-center rounded-xl bg-grad-purple font-display text-sm font-semibold text-white"
                      animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}>
                      {t.initial}
                    </motion.div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "var(--cv-text)" }}>{t.name}</div>
                    </div>
                    <motion.div className="ml-auto" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}>
                      <MessageCircle size={16} style={{ color: "var(--cv-brand-a)" }} />
                    </motion.div>
                  </div>
                  <div className="relative mt-4">
                    <motion.div className="absolute -top-2 -left-1" animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                      transition={{ duration: 4, repeat: Infinity }}>
                      <Quote size={14} style={{ color: "var(--cv-brand-b)" }} />
                    </motion.div>
                    <blockquote className="pl-4 text-sm leading-relaxed" style={{ color: "var(--cv-text-secondary)" }}>&ldquo;{t.text}&rdquo;</blockquote>
                  </div>
                </motion.figure>
              ))}
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--cv-bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--cv-bg)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
