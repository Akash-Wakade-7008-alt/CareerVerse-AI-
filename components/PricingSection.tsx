"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "INR 0",
    desc: "For first-time explorers",
    features: ["3 simulations", "Core report", "1 career track"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro Student",
    price: "INR 299/mo",
    desc: "Most popular",
    features: ["Unlimited simulations", "Advanced AI report", "All career tracks", "Priority support"],
    cta: "Upgrade To Pro",
    highlight: true,
  },
  {
    name: "School OS",
    price: "Custom",
    desc: "For institutions and counselors",
    features: ["Bulk seats", "Admin dashboard", "Progress analytics", "Onboarding + SLA"],
    cta: "Talk To Sales",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-shell">
      <div className="section-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Pricing</div>
          <h2 className="section-title">
            Flexible plans for every stage.
            <span className="text-gradient"> From trial to institution-scale.</span>
          </h2>
          <p className="section-copy mx-auto">
            Start free, upgrade when momentum kicks in, and deploy school-wide when students need a shared career intelligence layer.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`surface-ring relative rounded-3xl p-6 ${
                plan.highlight ? "glass-strong" : "glass"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-sky-300/35 bg-sky-500/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-sky-100">
                  Most Popular
                </div>
              )}

              <div className="text-sm text-white/70">{plan.desc}</div>
              <div className="mt-2 font-display text-2xl font-semibold">{plan.name}</div>
              <div className="mt-4 text-3xl font-semibold tracking-tight">{plan.price}</div>

              <ul className="mt-6 space-y-2 text-sm text-white/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-emerald-300" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-7 w-full rounded-2xl py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? "btn-glow bg-grad-purple text-white"
                    : "border border-white/20 bg-slate-900/50 text-white hover:bg-white/12"
                }`}
              >
                {plan.cta}
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
