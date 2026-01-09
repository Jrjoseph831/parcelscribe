import { NextRequest, NextResponse } from "next/server";
import { templates } from "@/content/templates";

export const runtime = "edge";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = templates.find((t) => t.slug === slug);
  return NextResponse.json({
    requested: slug,
    found: Boolean(template),
    title: template?.title ?? null,
    metaTitle: template?.metaTitle ?? null,
    howToUseCount: template?.howToUse.length ?? 0,
  });
}
