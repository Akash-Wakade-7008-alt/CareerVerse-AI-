"use client";
import { motion } from "framer-motion";
import { Check, Crown, Zap } from "lucide-react";

const PLANS = [
  { name: "Starter", price: "INR 0", desc: "For first-time explorers", features: ["3 simulations", "Core report", "1 career track"], cta: "Start Free", highlight: false },
  { name: "Pro Student", price: "INR 299/mo", desc: "Most popular", features: ["Unlimited simulations", "Advanced AI report", "All career tracks", "Priority support"], cta: "Upgrade To Pro", highlight: true },
  { name: "School OS", price: "Custom", desc: "For institutions and counselors", features: ["Bulk seats", "Admin dashboard", "Progress analytics", "Onboarding + SLA"], cta: "Talk To Sales", highlight: false },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-shell">
      <div className="section-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-kicker">Pricing</div>
          <h2 className="section-title">Flexible plans for every stage.<span className="text-gradient"> From trial to institution-scale.</span></h2>
          <p className="section-copy mx-auto">Start free, upgrade when momentum kicks in, and deploy school-wide when students need a shared career intelligence layer.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.article key={plan.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className={`surface-ring relative rounded-3xl p-6 transition-all duration-300 ${plan.highlight ? "glass-strong shimmer-border" : "glass gradient-border"}`}>
              {plan.highlight && (
                <motion.div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] flex items-center gap-1"
                  style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}
                  animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Crown size={10} className="animate-wiggle" /> Most Popular
                </motion.div>
              )}
              <div className="text-sm" style={{ color: "var(--cv-text-secondary)" }}>{plan.desc}</div>
              <div className="mt-2 font-display text-2xl font-semibold" style={{ color: "var(--cv-text)" }}>{plan.name}</div>
              <div className="mt-4 text-3xl font-semibold tracking-tight" style={{ color: "var(--cv-text)" }}>{plan.price}</div>
              <ul className="mt-6 space-y-2 text-sm" style={{ color: "var(--cv-text-secondary)" }}>
                {plan.features.map((feature, fi) => (
                  <li key={feature} className="flex items-start gap-2">
                    <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: fi * 0.3 }}>
                      <Check size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                    </motion.div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-7 w-full rounded-2xl py-3 text-sm font-semibold transition ${plan.highlight ? "btn-glow bg-grad-purple text-white" : ""}`}
                style={plan.highlight ? {} : { border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)", color: "var(--cv-badge-text)" }}>
                {plan.highlight && <Zap size={13} className="mr-1 inline animate-bounce-gentle" />}
                {plan.cta}
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
