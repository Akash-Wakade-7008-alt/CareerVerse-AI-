import CareerCard from "@/components/CareerCard";
import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import { CAREERS } from "@/data/careers";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />

      <section className="section-shell pt-8 md:pt-10">
        <div className="section-wrap">
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-kicker">Simulation Library</div>
            <h2 className="section-title">
              Pick a career track.
              <span className="text-gradient"> Live one high-stakes day.</span>
            </h2>
            <p className="section-copy mx-auto">
              Start with any role, make five core decisions, and walk away with signal you can actually act on.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREERS.map((career, index) => (
              <CareerCard key={career.id} career={career} idx={index} />
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <Testimonials />
      <PricingSection />

      <footer className="mt-8 border-t border-white/10 px-4 py-12 text-sm text-white/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
          <div>
            <div className="font-display text-lg font-semibold text-gradient">CareerVerse AI</div>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/42">
              Career intelligence for the next generation
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <Link href="/about" className="transition hover:text-white">About</Link>
              <Link href="/stack" className="transition hover:text-white">Stack</Link>
              <Link href="/#pricing" className="transition hover:text-white">Pricing</Link>
            </div>
            <p>Built for student confidence and parent clarity. 2026 CareerVerse.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
