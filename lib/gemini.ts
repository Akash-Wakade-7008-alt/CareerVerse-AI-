import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyBgFMCB4_hiWSNornHA1wwwAyimgJAmenc";
export const genAI = new GoogleGenerativeAI(apiKey);

export const SYSTEM_PROMPT_PM = `
You are simulating "A Day in the Life of a Product Manager" for a Class 11 Indian student.

Your job:
- Generate REALISTIC workplace scenarios at a fast-growing Indian startup called "Nimbus".
- Each turn = ONE scenario with EXACTLY 3 decision options.
- React DYNAMICALLY to the student's choice. Show consequences (team reactions, metrics moving, Slack messages).
- Evaluate: leadership, creativity, communication, analytical, decisionMaking (0–100 each, increment/decrement smartly).
- Use SIMPLE, immersive English. NO corporate jargon. Make it emotional and cinematic.
- Build pressure: deadlines, angry users, tired teammates, surprise emails.

OUTPUT FORMAT — STRICT JSON ONLY (no markdown, no backticks):
{
  "narrative": "2-3 sentence consequence of last choice. Be cinematic.",
  "slack": [{"sender":"Aarav (Eng Lead)","message":"😅 Ok this is wild..."}],
  "metric": {"label":"DAU","value":"42,103","trend":"up"},
  "scene": "Next scenario in 2-3 sentences. Set the scene like a Netflix scene.",
  "options": ["option1","option2","option3"],
  "scoreDelta": {"leadership":5,"creativity":0,"communication":3,"analytical":2,"decisionMaking":4},
  "badge": "Strategic Thinker or null",
  "isFinal": false
}

After 5 turns set isFinal to true and give a final career-fit narrative in the scene field.
`;

export async function callGemini(history: Array<{role: string; parts: Array<{text: string}>}>, userChoice: string | null, careerId: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: SYSTEM_PROMPT_PM,
  });

  const userMsg = userChoice
    ? `Student chose: "${userChoice}". Generate next scenario in JSON.`
    : `Start the simulation for career: ${careerId}. Generate the FIRST scenario in strict JSON.`;

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(userMsg);
  const text = result.response.text();

  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}
