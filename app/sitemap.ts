import type { MetadataRoute } from "next";
import { guides } from "@/content/guides";
import { templates } from "@/content/templates";
import { checklists } from "@/content/checklists";

const siteUrl = "https://parcelscribe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["/", "/pricing", "/how-it-works", "/guides", "/templates"];

  const guidePages = guides.map((guide) => ({ url: `${siteUrl}/guides/${guide.slug}`, lastModified: now }));
  const templatePages = templates.map((template) => ({ url: `${siteUrl}/templates/${template.slug}`, lastModified: now }));
  const checklistPages = checklists.map((item) => ({ url: `${siteUrl}/checklist/${item.slug}`, lastModified: now }));

  return [
    ...staticPages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: now })),
    ...guidePages,
    ...templatePages,
    ...checklistPages,
  ];
}
