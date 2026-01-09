import path from "path";
import { readFile, readdir } from "fs/promises";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { unstable_noStore as noStore } from "next/cache";
import type { ReactElement } from "react";

type Collection = "guides" | "templates" | "checklists";

type Frontmatter = {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  howToUseCount?: number;
};

type ListEntry = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
};

type DetailEntry = ListEntry & {
  content: ReactElement;
};

const contentRoot = path.join(process.cwd(), "content");

function collectionDir(kind: Collection) {
  return path.join(contentRoot, kind);
}

function buildSlug(fileName: string) {
  return fileName.replace(/\.mdx$/, "");
}

async function loadFrontmatter(kind: Collection, fileName: string): Promise<Frontmatter> {
  const filePath = path.join(collectionDir(kind), fileName);
  const raw = await readFile(filePath, "utf8");
  const parsed = matter(raw);
  return parsed.data as Frontmatter;
}

async function listCollection(kind: Collection): Promise<ListEntry[]> {
  noStore();
  const files = await readdir(collectionDir(kind));
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

  const entries = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = buildSlug(file);
      const frontmatter = await loadFrontmatter(kind, file);
      const title = frontmatter.title ?? slug;
      return {
        slug,
        title,
        metaTitle: frontmatter.metaTitle ?? title,
        metaDescription: frontmatter.metaDescription ?? "",
      } satisfies ListEntry;
    }),
  );

  return entries.sort((a, b) => a.title.localeCompare(b.title));
}

async function readMdx(kind: Collection, slug: string): Promise<DetailEntry | null> {
  noStore();
  const filePath = path.join(collectionDir(kind), `${slug}.mdx`);
  try {
    const raw = await readFile(filePath, "utf8");
    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source: raw,
      options: { parseFrontmatter: true },
    });

    const title = frontmatter?.title ?? slug;
    return {
      slug,
      title,
      metaTitle: frontmatter?.metaTitle ?? title,
      metaDescription: frontmatter?.metaDescription ?? "",
      content,
    } satisfies DetailEntry;
  } catch (err) {
    return null;
  }
}

export async function listGuides() {
  return listCollection("guides");
}

export async function getGuide(slug: string) {
  return readMdx("guides", slug);
}

export async function listTemplates() {
  return listCollection("templates");
}

export async function getTemplate(slug: string) {
  return readMdx("templates", slug);
}

export async function listChecklists() {
  return listCollection("checklists");
}

export async function getChecklist(slug: string) {
  return readMdx("checklists", slug);
}
