import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase environment variables are missing. Auth will not work.");
    // Return a dummy client or handle as needed
  }
  return createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
};
