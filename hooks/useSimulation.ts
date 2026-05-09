"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { applyDelta } from "@/services/simulationService";
import { SimMessage, SimulationState, SkillScores } from "@/types";

const INITIAL_SCORES: SkillScores = {
  leadership: 50,
  creativity: 50,
  communication: 50,
  analytical: 50,
  decisionMaking: 50,
};

const MAX_STEPS = 5;

type GeminiHistoryEntry = {
  role: string;
  parts: Array<{ text: string }>;
};

export function useSimulation(career: string) {
  const [state, setState] = useState<SimulationState>({
    career,
    step: 0,
    maxSteps: MAX_STEPS,
    xp: 0,
    level: 1,
    streak: 1,
    scores: { ...INITIAL_SCORES },
    messages: [],
    badges: [],
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geminiHistory, setGeminiHistory] = useState<GeminiHistoryEntry[]>([]);

  const loadingRef = useRef(false);
  const doneRef = useRef(false);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    doneRef.current = done;
  }, [done]);

  const turn = useCallback(
    async (choice: string | null) => {
      if (loadingRef.current || doneRef.current) {
        return;
      }

      loadingRef.current = true;
      setLoading(true);
      setError(null);

      if (choice) {
        setState((current) => ({
          ...current,
          messages: [
            ...current.messages,
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
        const response = await fetch("/api/simulate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            choice,
            step: currentStep,
            careerId: career,
            history: geminiHistory,
          }),
        });

        if (!response.ok) {
          throw new Error(`Simulation request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const data = payload?.data;
        const source = payload?.source;

        if (!data) {
          throw new Error("Simulation payload missing data");
        }

        if (source === "gemini") {
          const userMessage = choice
            ? `Student chose: "${choice}". Generate next scenario in JSON.`
            : `Start the simulation for career: ${career}. Generate the FIRST scenario in strict JSON.`;

          setGeminiHistory((history) => [
            ...history,
            { role: "user", parts: [{ text: userMessage }] },
            { role: "model", parts: [{ text: JSON.stringify(data) }] },
          ]);
        }

        const nextMessages: SimMessage[] = [];

        if (data.narrative) {
          nextMessages.push({
            id: crypto.randomUUID(),
            role: "system",
            content: data.narrative,
            timestamp: Date.now(),
          });
        }

        (data.slack || []).forEach((slackMessage: { sender: string; message: string }) => {
          nextMessages.push({
            id: crypto.randomUUID(),
            role: "slack",
            content: slackMessage.message,
            meta: { sender: slackMessage.sender },
            timestamp: Date.now(),
          });
        });

        nextMessages.push({
          id: crypto.randomUUID(),
          role: "ai",
          content: data.scene,
          options: data.isFinal ? undefined : data.options,
          meta: { metric: data.metric },
          timestamp: Date.now(),
        });

        setState((current) => {
          const nextXp = current.xp + 25;
          return {
            ...current,
            messages: [...current.messages, ...nextMessages],
            scores: applyDelta(current.scores, data.scoreDelta || {}),
            xp: nextXp,
            level: Math.floor(nextXp / 100) + 1,
            step: current.step + 1,
            badges:
              data.badge && !current.badges.includes(data.badge)
                ? [...current.badges, data.badge]
                : current.badges,
          };
        });

        if (data.isFinal || currentStep + 1 >= MAX_STEPS) {
          doneRef.current = true;
          setDone(true);
        }
      } catch (requestError) {
        console.error("Simulation error:", requestError);
        setError("Could not generate the next scenario. Please try again.");
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [career, geminiHistory, state.step]
  );

  return { state, loading, done, turn, error };
}
