import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/pricing",
          "/how-it-works",
          "/guides",
          "/templates",
          "/guides/",
          "/templates/",
          "/checklists/",
          "/ups-claim",
          "/fedex-claim",
          "/ups-refund",
          "/fedex-refund",
        ],
        disallow: ["/builder", "/packets", "/api", "/login", "/auth", "/account"],
      },
    ],
    sitemap: "https://www.parcelscribe.com/sitemap.xml",
    host: "www.parcelscribe.com",
  };
}
