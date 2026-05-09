import { NextRequest, NextResponse } from "next/server";
import { generateCareerOverview } from "@/lib/groq";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { careerId, quizAnswer, userId } = await req.json();

    if (!careerId || !quizAnswer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Generate overview from Groq
    const result = await generateCareerOverview(careerId, quizAnswer);
    if (!result) {
      return NextResponse.json({ error: "Failed to generate AI overview" }, { status: 500 });
    }

    // 2. Save the assessment to Supabase
    if (userId) {
      const { error: dbError } = await supabase.from("user_assessments").insert([
        {
          user_id: userId,
          career_id: careerId,
          quiz_answer: quizAnswer,
          knowledge_level: result.knowledgeLevel,
        },
      ]);
      
      if (dbError) {
        console.error("Supabase insert error:", dbError);
        // We log the error but don't fail the request so the user can still proceed with the simulation
      }
    }

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Career overview API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
