import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

type CookieToSet = { name: string; value: string; options?: Partial<ResponseCookie> };

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // where to go after login
  const next = url.searchParams.get("next") || "/builder";

  // Always create the redirect response first so we can attach cookies to it
  const redirectUrl = new URL(next, url.origin);
  const response = NextResponse.redirect(redirectUrl);

  if (!code) {
    // No code -> go to login
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      async setAll(cookiesToSet: CookieToSet[]) {
        await Promise.all(
          cookiesToSet.map(({ name, value, options }) => response.cookies.set(name, value, options)),
        );
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    // If exchange fails, send them back to login
    console.error("Supabase auth exchange failed", error.message);
    return NextResponse.redirect(new URL("/login?reason=exchange_failed", url.origin));
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.error("Supabase getSession after exchange failed", sessionError.message);
  }
  if (!sessionData?.session?.user) {
    console.error("Supabase session missing after exchange");
    return NextResponse.redirect(new URL("/login?reason=no_session", url.origin));
  }

  return response;
}
