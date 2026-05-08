"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    price: "₹0",
    desc: "Try the magic",
    features: ["3 simulations", "Basic report", "1 career"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Premium",
    price: "₹299/mo",
    desc: "Most popular",
    features: ["Unlimited simulations", "Advanced reports", "AI mentor 24/7", "All careers"],
    cta: "Go Premium",
    highlight: true,
  },
  {
    name: "Schools",
    price: "Custom",
    desc: "For institutions",
    features: ["Bulk seats", "Counselor dashboard", "Analytics", "Priority support"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center font-display text-4xl md:text-6xl font-bold mb-4">
          Pricing for <span className="text-gradient">every dreamer.</span>
        </h2>
        <p className="text-center text-white/60 mb-16">
          Free for students. Premium for power users. B2B for schools.
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-6 ${
                p.highlight ? "glass-strong border-violet-400/50 btn-glow" : "glass"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-grad-purple px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}
              <div className="text-violet-300 text-sm">{p.desc}</div>
              <div className="font-display text-3xl font-bold mt-1">{p.name}</div>
              <div className="text-4xl font-bold mt-3">{p.price}</div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full py-3 rounded-2xl font-semibold transition ${
                  p.highlight ? "bg-grad-purple btn-glow" : "glass hover:bg-white/10"
                }`}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
