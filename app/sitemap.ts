import type { MetadataRoute } from "next";
import { listChecklists, listGuides, listTemplates } from "@/lib/content/content";

const siteUrl = "https://parcelscribe.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPages = ["/", "/pricing", "/how-it-works", "/guides", "/templates", "/checklists"];

  const [guides, templates, checklists] = await Promise.all([listGuides(), listTemplates(), listChecklists()]);

  const guidePages = guides.map((guide) => ({ url: `${siteUrl}/guides/${guide.slug}`, lastModified: now }));
  const templatePages = templates.map((template) => ({ url: `${siteUrl}/templates/${template.slug}`, lastModified: now }));
  const checklistPages = checklists.map((item) => ({ url: `${siteUrl}/checklists/${item.slug}`, lastModified: now }));

  return [
    ...staticPages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: now })),
    ...guidePages,
    ...templatePages,
    ...checklistPages,
  ];
}
