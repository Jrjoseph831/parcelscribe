import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "lib/content/mdxLoader.ts": ["./content/**/*"],
    "app/guides/page.tsx": ["./content/guides/**/*"],
    "app/guides/[slug]/page.tsx": ["./content/guides/**/*"],
    "app/templates/page.tsx": ["./content/templates/**/*"],
    "app/templates/[slug]/page.tsx": ["./content/templates/**/*"],
    "app/checklists/page.tsx": ["./content/checklists/**/*"],
    "app/checklists/[slug]/page.tsx": ["./content/checklists/**/*"],
    "app/sitemap.ts": ["./content/**/*"],
  },
};

export default nextConfig;
