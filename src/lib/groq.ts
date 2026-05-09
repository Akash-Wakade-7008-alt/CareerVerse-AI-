import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_SECRET_KEY;

export const groqClient = apiKey ? new Groq({ apiKey }) : null;

const CAREER_LABELS: Record<string, string> = {
  "product-manager": "Product Manager",
  "software-engineer": "Software Engineer",
  "marketing-manager": "Marketing Manager",
  "ui-ux-designer": "UI/UX Designer",
  consultant: "Consultant",
};

function buildSystemPrompt(careerId: string) {
  const careerLabel = CAREER_LABELS[careerId] ?? "Product Manager";

  return `You are an advanced AI career simulation engine with deep thinking capabilities.

ROLE: Simulate "A Day in the Life of a ${careerLabel}" for a student.

THINKING PROCESS (do this internally before responding):
1. Analyze the student's previous choices to understand their personality tendencies
2. Identify patterns: Are they risk-averse or bold? Do they prioritize people or data? Short-term or long-term thinkers?
3. Design the next scenario to CHALLENGE their identified tendencies — if they always play safe, present a scenario where safety has hidden costs
4. Make each decision option reveal different personality traits
5. Ensure the scenario feels emotionally real and consequence-heavy

YOUR RESPONSIBILITIES:
- Generate realistic startup workplace scenarios at a fast-growing company called Nimbus
- Each turn must include EXACTLY 3 decision options that are meaningfully different
- React dynamically to the student's choice with real consequences
- Show team reactions, metrics changes, and communication messages
- Evaluate: leadership, creativity, communication, analytical, decisionMaking (0-100 each)
- Use immersive, cinematic English — make the student feel like they are IN the office
- Build escalating pressure through deadlines, user expectations, team dynamics

PERSONALIZATION RULES:
- NEVER repeat similar scenario structures
- If the student chose diplomatically before, test them with a scenario requiring decisive authority
- If they chose data-driven approaches, present an emotional/ethical dilemma
- Track their decision pattern and deliberately create tension against it
- Each scenario should feel like a natural continuation of their story

OUTPUT FORMAT - STRICT JSON ONLY (no markdown, no backticks):
{
  "narrative": "2-3 sentence consequence of last choice that feels personal.",
  "slack": [{"sender":"Aarav (Eng Lead)","message":"Short realistic team message reflecting the student's impact"}],
  "metric": {"label":"DAU","value":"42,103","trend":"up"},
  "scene": "Next scenario in 2-3 sentences with mounting pressure.",
  "options": ["option1 — reveals trait A","option2 — reveals trait B","option3 — reveals trait C"],
  "scoreDelta": {"leadership":5,"creativity":0,"communication":3,"analytical":2,"decisionMaking":4},
  "badge": "Strategic Thinker or null",
  "isFinal": false
}

After 5 turns, set isFinal to true and provide a deeply personalized fit narrative based on ALL their choices.`;
}

export async function callGroq(
  history: Array<{ role: string; content: string }>,
  userChoice: string | null,
  careerId: string
) {
  if (!groqClient) {
    return null;
  }

  const systemPrompt = buildSystemPrompt(careerId);

  const userMessage = userChoice
    ? `Student chose: "${userChoice}". Think deeply about what this choice reveals about their personality, then generate the next scenario that challenges their tendencies. Respond in strict JSON.`
    : `Start the simulation for career: ${careerId}. Think about what kind of opening scenario would best reveal the student's natural decision-making style. Generate the FIRST scenario in strict JSON.`;

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: systemPrompt },
    ...history.map((h) => ({
      role: h.role as "user" | "assistant",
      content: h.content,
    })),
    { role: "user", content: userMessage },
  ];

  try {
    const completion = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.85,
      max_tokens: 1024,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) return null;

    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Groq API error:", err);
    return null;
  }
}

export async function callGroqReport(
  scores: Record<string, number>,
  career: string
) {
  if (!groqClient) return null;

  const careerLabel = CAREER_LABELS[career] ?? career;

  const prompt = `You're a career coach for students. Given these skill scores (out of 100):
${JSON.stringify(scores)} for the career "${careerLabel}".

Think deeply about what these scores reveal about the student's strengths and growth areas.

Return STRICT JSON only (no markdown, no backticks):
{
  "alignment": 0-100,
  "summary": "2-3 sentence personalized summary in simple English",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "personality": "one-liner personality archetype like The Visionary Strategist"
}`;

  try {
    const completion = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 512,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) return null;

    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (err) {
    console.error("Groq report error:", err);
    return null;
  }
}

export async function generateCareerOverview(
  careerId: string,
  quizAnswer: string
) {
  if (!groqClient) return null;

  const careerLabel = CAREER_LABELS[careerId] ?? careerId;

  const prompt = `You are an expert career coach. The student is about to start a simulation for the "${careerLabel}" track.
To assess their knowledge, they were asked: "In your own words, what does a ${careerLabel} do on a daily basis?"

Their answer: "${quizAnswer}"

First, assess their knowledge level based on their answer (Beginner, Intermediate, Advanced, Expert).
Then, write a highly personalized, 3-paragraph overview of the ${careerLabel} role that bridges the gap between what they think they know, and the reality of the role.
If they are a beginner, explain the basics clearly. If they are advanced, focus on the high-level strategy and challenges.

Return STRICT JSON only (no markdown, no backticks):
{
  "knowledgeLevel": "Beginner", // or Intermediate, Advanced, Expert
  "overview": "Your personalized 3-paragraph overview..."
}`;

  try {
    const completion = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 600,
      response_format: { type: "json_object" },
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) return null;

    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch (err) {
    console.error("Groq overview error:", err);
    return null;
  }
}
