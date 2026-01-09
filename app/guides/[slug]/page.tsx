import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const guideAliases: Record<string, string> = {
  "how-to-file-ups-damage-claim": "ups-damage-claim",
  "how-to-file-fedex-damage-claim": "fedex-damage-claim",
  "how-to-file-ups-lost-package-claim": "ups-lost-package-claim",
  "how-to-file-fedex-lost-package-claim": "fedex-lost-package-claim",
};

function resolveGuideSlug(slug: string) {
  return guideAliases[slug] ?? slug;
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const canonicalSlug = resolveGuideSlug(params.slug);
  redirect(`/guides#${canonicalSlug}`);
}
