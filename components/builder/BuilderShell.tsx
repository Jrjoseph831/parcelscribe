"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function BuilderShell({
  title,
  subtitle,
  sidebar,
  children,
}: {
  title: string;
  subtitle?: string;
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-700">
                PARCELSCRIBE
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              {subtitle ? <p className="text-gray-600">{subtitle}</p> : null}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              {userEmail ? (
                <span className="max-w-[180px] truncate" title={userEmail}>
                  Signed in as {userEmail}
                </span>
              ) : (
                <span>Signed in</span>
              )}
              <Button size="sm" variant="secondary" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </div>
          <Card className="p-6 lg:p-8">{children}</Card>
        </div>

        <div className="w-full lg:w-80">
          <Card className="p-5 lg:sticky lg:top-10">{sidebar}</Card>
        </div>
      </div>
    </main>
  );
}
