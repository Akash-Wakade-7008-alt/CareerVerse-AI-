export type Career = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  salary: string;
  skills: string[];
  color: string;
};

export type SkillScores = {
  leadership: number;
  creativity: number;
  communication: number;
  analytical: number;
  decisionMaking: number;
};

export type SimMessage = {
  id: string;
  role: "ai" | "user" | "system" | "slack";
  content: string;
  options?: string[];
  meta?: {
    company?: string;
    metric?: { label: string; value: string; trend: "up" | "down" };
    sender?: string;
  };
  timestamp: number;
};

export type SimulationState = {
  career: string;
  step: number;
  maxSteps: number;
  xp: number;
  level: number;
  streak: number;
  scores: SkillScores;
  messages: SimMessage[];
  badges: string[];
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
};
