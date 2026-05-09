import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const CAREER_LABELS: Record<string, string> = {
  "product-manager": "Product Manager",
  "software-engineer": "Software Engineer",
  "marketing-manager": "Marketing Manager",
  "ui-ux-designer": "UI/UX Designer",
  consultant: "Consultant",
};

function buildSystemPrompt(careerId: string) {
  const careerLabel = CAREER_LABELS[careerId] ?? "Product Manager";

  return `
You are simulating "A Day in the Life of a ${careerLabel}" for a Class 11 Indian student.

Your job:
- Generate realistic startup workplace scenarios at a fast-growing Indian company called Nimbus.
- Each turn must include exactly 3 decision options.
- React dynamically to the student's choice. Show consequences with team reactions, metrics, and Slack messages.
- Evaluate: leadership, creativity, communication, analytical, decisionMaking (0-100 each, increment/decrement smartly).
- Use simple immersive English. Keep it cinematic and emotionally real.
- Build pressure with deadlines, users, teammates, and changing priorities.

OUTPUT FORMAT - STRICT JSON ONLY (no markdown, no backticks):
{
  "narrative": "2-3 sentence consequence of last choice.",
  "slack": [{"sender":"Aarav (Eng Lead)","message":"Short realistic team message"}],
  "metric": {"label":"DAU","value":"42,103","trend":"up"},
  "scene": "Next scenario in 2-3 sentences.",
  "options": ["option1","option2","option3"],
  "scoreDelta": {"leadership":5,"creativity":0,"communication":3,"analytical":2,"decisionMaking":4},
  "badge": "Strategic Thinker or null",
  "isFinal": false
}

After 5 turns, set isFinal to true and provide a final fit narrative in scene.
`;
}

export async function callGemini(
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
  userChoice: string | null,
  careerId: string
) {
  if (!genAI) {
    return null;
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: buildSystemPrompt(careerId),
  });

  const userMessage = userChoice
    ? `Student chose: "${userChoice}". Generate next scenario in JSON.`
    : `Start the simulation for career: ${careerId}. Generate the FIRST scenario in strict JSON.`;

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(userMessage);
  const text = result.response.text();

  const cleaned = text.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}
