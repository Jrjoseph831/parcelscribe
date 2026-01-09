import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = url.hostname.toLowerCase();

  if (host.startsWith("www.")) {
    url.hostname = host.slice(4);
    return NextResponse.redirect(url, 308);
  }

  if (host.endsWith("vercel.app") && host !== "parcelscribe.com") {
    url.hostname = "parcelscribe.com";
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  return updateSession(request);
}

export const config = {
  // Exclude Next internals and static assets without using capturing groups
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)"],
};
