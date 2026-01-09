import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const CANONICAL_HOST = "parcelscribe.com";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = url.hostname.toLowerCase();

  // Only force redirect from preview domains to canonical; avoid www/apex flips to prevent loops with platform settings.
  if (host.endsWith("vercel.app") && host !== CANONICAL_HOST && host !== `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return updateSession(request);
}

export const config = {
  // Exclude Next internals and static assets without using capturing groups
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)"],
};
