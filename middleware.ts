import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const CANONICAL_HOST = "parcelscribe.com";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = url.hostname.toLowerCase();

  // Allow preview and custom domains to serve without redirects; production canonicalization handled at the platform level.
  return updateSession(request);
}

export const config = {
  // Exclude Next internals and static assets without using capturing groups
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)"],
};
