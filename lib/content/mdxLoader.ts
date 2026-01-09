import path from "path";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";

export type MdxDocType = "guides" | "templates";

export type MdxLoadResult = {
  content: ReactElement;
  data: Record<string, any>;
};

export async function loadMdxDocument({ type, slug }: { type: MdxDocType; slug: string }): Promise<MdxLoadResult | null> {
  const filePath = path.join(process.cwd(), "content", type, `${slug}.mdx`);
  try {
    const raw = await readFile(filePath, "utf8");
    const { content, frontmatter } = await compileMDX({
      source: raw,
      options: { parseFrontmatter: true },
    });
    return { content, data: frontmatter ?? {} };
  } catch (error) {
    console.error(`[mdxLoader] missing or unreadable file: ${filePath}`, error);
    return null;
  }
}
