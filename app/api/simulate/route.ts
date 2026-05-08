import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { getFallbackTurn } from "@/services/simulationService";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { history = [], choice = null, step = 0, careerId = "product-manager" } = await req.json();

  try {
    const data = await callGemini(history, choice, careerId);
    if (data) return NextResponse.json({ ok: true, data, source: "gemini" });
  } catch (e) {
    console.error("Gemini error:", e);
  }

  const data = getFallbackTurn(step, choice, careerId);
  return NextResponse.json({ ok: true, data, source: "fallback" });
}
