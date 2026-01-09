"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function DownloadButton({ packetId }: { packetId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/packets/${packetId}/download`);
      const json = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!res.ok || !json?.url) {
        throw new Error(json?.error ?? "Unable to fetch PDF");
      }
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to download");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
      <Button onClick={handleDownload} disabled={loading}>
        {loading ? "Preparing PDF..." : "Download PDF"}
      </Button>
    </div>
  );
}
