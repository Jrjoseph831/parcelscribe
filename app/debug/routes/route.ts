import { NextResponse } from "next/server";
import { guides } from "@/content/guides";
import { templates } from "@/content/templates";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({
    guides: guides.map((g) => g.slug),
    templates: templates.map((t) => t.slug),
  });
}
