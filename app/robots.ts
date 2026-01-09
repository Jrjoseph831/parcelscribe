import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/how-it-works", "/guides", "/templates", "/guides/", "/templates/", "/checklist/"],
        disallow: ["/builder", "/packets", "/api", "/login", "/auth", "/account"],
      },
    ],
    sitemap: "https://parcelscribe.com/sitemap.xml",
    host: "parcelscribe.com",
  };
}
