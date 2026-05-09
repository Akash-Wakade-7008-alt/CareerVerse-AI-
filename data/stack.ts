export type StackLayer = {
  title: string;
  detail: string;
  tech: string;
};

export const STACK_LAYERS: StackLayer[] = [
  {
    title: "Frontend Experience",
    detail:
      "Responsive App Router pages with reusable glass surfaces, motion choreography, and mobile-safe spacing tokens.",
    tech: "Next.js 16 + Tailwind + Framer Motion",
  },
  {
    title: "Simulation Intelligence",
    detail:
      "Structured decision loops, score deltas, and branch-safe turn processing with fallback scenarios when LLM output fails.",
    tech: "TypeScript + Gemini + local fallback service",
  },
  {
    title: "API & Data Layer",
    detail:
      "Server routes for simulation/report generation with strict JSON handling and environment-safe runtime configuration.",
    tech: "Next.js Route Handlers + Supabase client",
  },
  {
    title: "Reliability & Delivery",
    detail:
      "Lint-clean build path, type checks, and consistent route architecture for static and dynamic pages.",
    tech: "ESLint + TypeScript + Next build",
  },
];
