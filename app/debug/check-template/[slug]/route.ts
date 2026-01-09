import { NextResponse } from "next/server";
import { templates } from "@/content/templates";

export const runtime = "edge";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const template = templates.find((t) => t.slug === params.slug);
  return NextResponse.json({
    requested: params.slug,
    found: Boolean(template),
    title: template?.title ?? null,
    metaTitle: template?.metaTitle ?? null,
    howToUseCount: template?.howToUse.length ?? 0,
  });
}
