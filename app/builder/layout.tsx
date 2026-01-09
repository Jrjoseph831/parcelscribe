import type { Metadata } from "next";
import type { ReactNode } from "react";
import { requireUser } from "@/lib/auth/requireUser";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function BuilderLayout({ children }: { children: ReactNode }) {
  await requireUser();

  return <>{children}</>;
}
