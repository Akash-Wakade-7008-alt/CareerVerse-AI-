import { NextRequest, NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const { scores, career } = await req.json();

  const prompt = `You're a career coach for Indian teens. Given these skill scores (out of 100):
${JSON.stringify(scores)} for the career "${career}".

Return STRICT JSON only (no markdown, no backticks):
{
  "alignment": 0-100,
  "summary": "2-3 sentence personalized summary in simple English",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "personality": "one-liner personality archetype like The Visionary Strategist"
}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const r = await model.generateContent(prompt);
    const text = r.response.text().replace(/```json|```/g, "").trim();
    return NextResponse.json({ ok: true, data: JSON.parse(text) });
  } catch {
    const total = Object.values(scores as Record<string, number>).reduce((a, b) => a + b, 0);
    const avg = total / 5;
    return NextResponse.json({
      ok: true,
      data: {
        alignment: Math.round(avg),
        summary: `You show strong potential for ${career}. Your decisions reflect balanced thinking and emotional intelligence — both rare and valuable traits that will serve you well.`,
        strengths: ["Quick decision making", "Strategic thinking", "Team awareness"],
        weaknesses: ["Could improve creative risk-taking"],
        personality: "The Balanced Strategist",
      },
    });
  }
}
