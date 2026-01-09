import type { MetadataRoute } from "next";

const siteUrl = "https://parcelscribe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["/", "/pricing", "/how-it-works", "/guides", "/templates", "/checklists"];

  return staticPages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: now }));
}
