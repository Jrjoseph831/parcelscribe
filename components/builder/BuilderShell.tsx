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
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-700">
                PARCELSCRIBE
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">{title}</h1>
              {subtitle ? <p className="text-sm text-gray-600 sm:text-base">{subtitle}</p> : null}
            </div>
            <div className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 sm:w-auto sm:min-w-[220px]">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Signed in</p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                {userEmail ? (
                  <span className="max-w-full truncate font-medium text-gray-900 sm:max-w-[220px]" title={userEmail}>
                    {userEmail}
                  </span>
                ) : (
                  <span className="font-medium text-gray-900">Active session</span>
                )}
                <Button className="w-full sm:w-auto" variant="secondary" onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            </div>
          </div>
          <Card className="p-4 sm:p-6 lg:p-8">{children}</Card>
        </div>

        <div className="w-full lg:w-80">
          <Card className="p-4 sm:p-5 lg:sticky lg:top-10">{sidebar}</Card>
        </div>
      </div>
    </main>
  );
}
