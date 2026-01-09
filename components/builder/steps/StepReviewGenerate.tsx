"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { PacketDraft } from "@/lib/packets/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function StepReviewGenerate({ draft }: {
  draft: PacketDraft;
  errors: Record<string, string>;
  onChange: <K extends keyof PacketDraft>(key: K, value: PacketDraft[K]) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!draft?.id) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/packets/${draft.id}/generate`, {
        method: "POST",
      });

      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? "Unable to generate preview");
      }

      router.push(`/packets/${draft.id}/preview`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to generate preview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-dashed p-6 text-sm text-gray-700">
        <p className="font-semibold text-gray-900">Generate your packet preview.</p>
        <p className="text-gray-600">
          Generate the packet PDF on the server, then review the preview to continue to payment and download.
        </p>
      </Card>

      {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
        <div>
          <p className="font-semibold text-gray-900">Generate packet preview</p>
          <p className="text-sm text-gray-600">We will build the PDF, fill a narrative if missing, and move the packet to Generated.</p>
        </div>
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? "Working..." : "Generate packet preview"}
        </Button>
      </div>
    </div>
  );
}
