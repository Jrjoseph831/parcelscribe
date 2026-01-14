import type { MetadataRoute } from "next";

const siteUrl = "https://www.parcelscribe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "/",
    "/pricing",
    "/how-it-works",
    "/guides",
    "/templates",
    "/checklists",
    "/ups-claim",
    "/fedex-claim",
    "/ups-refund",
    "/fedex-refund",
  ];

  return staticPages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: now }));
}
