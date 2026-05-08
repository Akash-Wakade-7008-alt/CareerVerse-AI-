import { PM_FALLBACK_SCENARIOS, SE_FALLBACK_SCENARIOS } from "@/data/scenarios";
import { SkillScores } from "@/types";

function getScenarios(careerId: string) {
  if (careerId === "software-engineer") return SE_FALLBACK_SCENARIOS;
  return PM_FALLBACK_SCENARIOS;
}

export function getFallbackTurn(step: number, lastChoice: string | null, careerId: string = "product-manager") {
  const scenarios = getScenarios(careerId);
  const idx = Math.min(step, scenarios.length - 1);
  const sc = scenarios[idx];
  return {
    narrative: lastChoice
      ? `You chose: "${lastChoice}". The team noticed your decisiveness — Slack lights up.`
      : "Welcome to Nimbus. It's your first day. The office is buzzing with energy.",
    slack: [
      { sender: "Aarav (Eng Lead)", message: "Ok — what's the call? 🚀" },
      { sender: "Priya (Design)", message: "Standing by, ping me anytime ✨" },
    ],
    metric: { label: "DAU", value: "42,103", trend: "up" as const },
    scene: sc.scene,
    options: sc.options,
    scoreDelta: { leadership: 4, creativity: 3, communication: 4, analytical: 3, decisionMaking: 5 },
    badge: step === 2 ? "Strategic Thinker" : null,
    isFinal: step >= 4,
  };
}

export function applyDelta(prev: SkillScores, delta: Partial<SkillScores>): SkillScores {
  const clamp = (n: number) => Math.min(Math.max(n, 0), 100);
  return {
    leadership: clamp((prev.leadership || 0) + (delta.leadership || 0)),
    creativity: clamp((prev.creativity || 0) + (delta.creativity || 0)),
    communication: clamp((prev.communication || 0) + (delta.communication || 0)),
    analytical: clamp((prev.analytical || 0) + (delta.analytical || 0)),
    decisionMaking: clamp((prev.decisionMaking || 0) + (delta.decisionMaking || 0)),
  };
}
