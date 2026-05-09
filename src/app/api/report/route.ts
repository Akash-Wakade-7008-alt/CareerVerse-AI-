import { NextRequest, NextResponse } from "next/server";
import { callGroqReport } from "@/lib/groq";
import { genAI } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  const { scores, career } = (await req.json()) as {
    scores: Record<string, number>;
    career: string;
  };

  const careerLabels: Record<string, string> = {
    "product-manager": "Product Manager",
    "software-engineer": "Software Engineer",
    "marketing-manager": "Marketing Manager",
    "ui-ux-designer": "UI/UX Designer",
    consultant: "Consultant",
  };

  const careerLabel = careerLabels[career] ?? career;

  // Try Groq first
  try {
    const data = await callGroqReport(scores, career);
    if (data) return NextResponse.json({ ok: true, data, source: "groq" });
  } catch (e) {
    console.error("Groq report error:", e);
  }

  // Fallback to Gemini
  const prompt = `You're a career coach for Indian teens. Given these skill scores (out of 100):
${JSON.stringify(scores)} for the career "${careerLabel}".

Return STRICT JSON only (no markdown, no backticks):
{
  "alignment": 0-100,
  "summary": "2-3 sentence personalized summary in simple English",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "personality": "one-liner personality archetype like The Visionary Strategist"
}`;

  try {
    if (!genAI) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const r = await model.generateContent(prompt);
    const text = r.response.text().replace(/```json|```/g, "").trim();
    return NextResponse.json({ ok: true, data: JSON.parse(text), source: "gemini" });
  } catch {
    const total = Object.values(scores as Record<string, number>).reduce((a, b) => a + b, 0);
    const avg = total / 5;
    return NextResponse.json({
      ok: true,
      data: {
        alignment: Math.round(avg),
        summary: `You show strong potential for ${careerLabel}. Your decisions reflect balanced thinking and emotional intelligence, both rare and valuable traits that will serve you well.`,
        strengths: ["Quick decision making", "Strategic thinking", "Team awareness"],
        weaknesses: ["Could improve creative risk-taking"],
        personality: "The Balanced Strategist",
      },
      source: "fallback",
    });
  }
}
