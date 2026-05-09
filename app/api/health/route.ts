import { NextResponse } from "next/server";

const PLACEHOLDER_SUPABASE_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_SUPABASE_KEY = "placeholder-key";

export async function GET() {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);

  const hasSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== PLACEHOLDER_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== PLACEHOLDER_SUPABASE_KEY;

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    services: {
      next: "ready",
      tailwind: "ready",
      framerMotion: "ready",
      typescript: "ready",
      gemini: hasGemini ? "configured" : "missing_key",
      supabase: hasSupabase ? "configured" : "missing_config",
    },
  });
}
