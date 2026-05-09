"use client";

import { SkillScores } from "@/types";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export default function SkillRadar({ scores }: { scores: SkillScores }) {
  const data = [
    { skill: "Leadership", value: scores.leadership },
    { skill: "Creativity", value: scores.creativity },
    { skill: "Communication", value: scores.communication },
    { skill: "Analytical", value: scores.analytical },
    { skill: "Decisions", value: scores.decisionMaking },
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} outerRadius="78%">
        <defs>
          <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.28} />
          </linearGradient>
        </defs>
        <PolarGrid stroke="rgba(255,255,255,0.16)" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(240,249,255,0.82)", fontSize: 12 }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar dataKey="value" stroke="#38bdf8" strokeWidth={2.2} fill="url(#radarFill)" fillOpacity={0.9} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
