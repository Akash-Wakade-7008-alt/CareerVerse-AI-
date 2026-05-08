"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { SkillScores } from "@/types";

export default function SkillRadar({ scores }: { scores: SkillScores }) {
  const data = [
    { skill: "Leadership", v: scores.leadership },
    { skill: "Creativity", v: scores.creativity },
    { skill: "Communication", v: scores.communication },
    { skill: "Analytical", v: scores.analytical },
    { skill: "Decisions", v: scores.decisionMaking },
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.15)" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: "#fff", fontSize: 12 }} />
        <PolarRadiusAxis domain={[0, 100]} stroke="rgba(255,255,255,0.2)" tick={false} />
        <Radar dataKey="v" stroke="#8B5CF6" fill="url(#radarGrad)" fillOpacity={0.6} strokeWidth={2} />
        <defs>
          <linearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </RadarChart>
    </ResponsiveContainer>
  );
}
