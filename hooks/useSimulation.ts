"use client";
import { useCallback, useState } from "react";
import { SimMessage, SimulationState, SkillScores } from "@/types";
import { applyDelta } from "@/services/simulationService";

const INITIAL_SCORES: SkillScores = {
  leadership: 50,
  creativity: 50,
  communication: 50,
  analytical: 50,
  decisionMaking: 50,
};

export function useSimulation(career: string) {
  const [state, setState] = useState<SimulationState>({
    career,
    step: 0,
    maxSteps: 5,
    xp: 0,
    level: 1,
    streak: 1,
    scores: INITIAL_SCORES,
    messages: [],
    badges: [],
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [geminiHistory, setGeminiHistory] = useState<Array<{role: string; parts: Array<{text: string}>}>>([]);

  const turn = useCallback(async (choice: string | null) => {
    setLoading(true);

    if (choice) {
      setState((s) => ({
        ...s,
        messages: [
          ...s.messages,
          {
            id: crypto.randomUUID(),
            role: "user",
            content: choice,
            timestamp: Date.now(),
          },
        ],
      }));
    }

    try {
      const currentStep = state.step;
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          choice,
          step: currentStep,
          careerId: career,
          history: geminiHistory,
        }),
      });
      const { data, source } = await res.json();

      // Update gemini history for context
      if (source === "gemini") {
        const userMsg = choice
          ? `Student chose: "${choice}". Generate next scenario in JSON.`
          : `Start the simulation for career: ${career}. Generate the FIRST scenario in strict JSON.`;
        setGeminiHistory((h) => [
          ...h,
          { role: "user", parts: [{ text: userMsg }] },
          { role: "model", parts: [{ text: JSON.stringify(data) }] },
        ]);
      }

      const newMsgs: SimMessage[] = [];

      if (data.narrative) {
        newMsgs.push({
          id: crypto.randomUUID(),
          role: "system",
          content: data.narrative,
          timestamp: Date.now(),
        });
      }

      (data.slack || []).forEach((s: { sender: string; message: string }) => {
        newMsgs.push({
          id: crypto.randomUUID(),
          role: "slack",
          content: s.message,
          meta: { sender: s.sender },
          timestamp: Date.now(),
        });
      });

      newMsgs.push({
        id: crypto.randomUUID(),
        role: "ai",
        content: data.scene,
        options: data.isFinal ? undefined : data.options,
        meta: { metric: data.metric },
        timestamp: Date.now(),
      });

      setState((s) => ({
        ...s,
        messages: [...s.messages, ...newMsgs],
        scores: applyDelta(s.scores, data.scoreDelta || {}),
        xp: s.xp + 25,
        level: Math.floor((s.xp + 25) / 100) + 1,
        step: s.step + 1,
        badges:
          data.badge && !s.badges.includes(data.badge)
            ? [...s.badges, data.badge]
            : s.badges,
      }));

      if (data.isFinal || currentStep + 1 >= state.maxSteps) {
        setDone(true);
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  }, [state.step, state.maxSteps, career, geminiHistory]);

  return { state, loading, done, turn };
}
