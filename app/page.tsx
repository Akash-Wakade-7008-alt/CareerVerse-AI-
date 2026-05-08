import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import { CAREERS } from "@/data/careers";
import CareerCard from "@/components/CareerCard";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />

      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center font-display text-4xl md:text-6xl font-bold mb-4">
            Pick a career. <span className="text-gradient">Live a day.</span>
          </h2>
          <p className="text-center text-white/60 mb-12">
            5 careers ready. More dropping every week.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAREERS.map((c, i) => (
              <CareerCard key={c.id} career={c} idx={i} />
            ))}
          </div>
        </div>
      </section>

      <FeatureSection />
      <Testimonials />
      <PricingSection />

      <footer className="py-12 text-center text-white/40 text-sm border-t border-white/5">
        <div className="text-gradient font-display font-bold text-lg">CareerVerse AI</div>
        <p className="mt-2">Built with 💜 for the next generation. © 2025</p>
      </footer>
    </main>
  );
}
