import type { ReactNode } from "react";
import { requireUser } from "@/lib/auth/requireUser";

export default async function BuilderLayout({ children }: { children: ReactNode }) {
  await requireUser();

  return <>{children}</>;
}
