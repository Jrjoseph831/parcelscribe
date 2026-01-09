import { NextResponse } from "next/server";
import { guides } from "@/content/guides";

const guideAliases: Record<string, string> = {
  "how-to-file-ups-damage-claim": "ups-damage-claim",
  "how-to-file-fedex-damage-claim": "fedex-damage-claim",
  "how-to-file-ups-lost-package-claim": "ups-lost-package-claim",
  "how-to-file-fedex-lost-package-claim": "fedex-lost-package-claim",
};

function resolveGuideSlug(slug: string) {
  return guideAliases[slug] ?? slug;
}

export const runtime = "edge";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const canonical = resolveGuideSlug(params.slug);
  const guide = guides.find((g) => g.slug === canonical);
  return NextResponse.json({
    requested: params.slug,
    canonical,
    found: Boolean(guide),
    guideTitle: guide?.title ?? null,
    metaTitle: guide?.metaTitle ?? null,
    stepsCount: guide?.steps.length ?? 0,
  });
}
