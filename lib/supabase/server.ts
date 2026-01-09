import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function createClient(): Promise<SupabaseClient> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase environment variables (URL or ANON key)");
  }

  // Next.js 16 returns a promise from cookies(); unwrap before using.
  const cookieStore = await cookies();

  const getAll =
    typeof (cookieStore as any).getAll === "function"
      ? () => (cookieStore as any).getAll()
      : () => [] as { name: string; value: string }[];

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll,
      setAll() {
        // no-op on server components to avoid mutating cookies in this context
      },
    },
  });
}
