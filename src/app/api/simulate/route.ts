import { NextRequest, NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";
import { callGemini } from "@/lib/gemini";
import { getFallbackTurn } from "@/services/simulationService";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { history = [], choice = null, step = 0, careerId = "product-manager" } = await req.json();

  // Try Groq first (primary AI with thinking capacity)
  try {
    const groqHistory = history.map((h: { role: string; parts?: Array<{ text: string }>; content?: string }) => ({
      role: h.role === "model" ? "assistant" : h.role,
      content: h.parts?.[0]?.text ?? h.content ?? "",
    }));

    const data = await callGroq(groqHistory, choice, careerId);
    if (data) return NextResponse.json({ ok: true, data, source: "groq" });
  } catch (e) {
    console.error("Groq error:", e);
  }

  // Fallback to Gemini
  try {
    const data = await callGemini(history, choice, careerId);
    if (data) return NextResponse.json({ ok: true, data, source: "gemini" });
  } catch (e) {
    console.error("Gemini error:", e);
  }

  // Last resort: static fallback
  const data = getFallbackTurn(step, choice, careerId);
  return NextResponse.json({ ok: true, data, source: "fallback" });
}
