"use client";

import { Button } from "@/components/ui/Button";
import type { PacketStatus } from "@/lib/packets/types";
import { useState } from "react";

export function PreviewActions({ packetId, status, isAdmin = false }: { packetId: string; status: PacketStatus; isAdmin?: boolean }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"pay" | "download" | null>(null);

  const startCheckout = async () => {
    setError(null);
    setLoading("pay");
    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packetId }),
      });

      const json = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!res.ok || !json?.url) {
        throw new Error(json?.error ?? "Unable to start checkout");
      }

      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to start checkout");
    } finally {
      setLoading(null);
    }
  };

  const downloadPdf = async () => {
    setError(null);
    setLoading("download");
    try {
      window.location.href = `/api/packets/${packetId}/download`;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to download");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

      {status === "paid" || isAdmin ? (
        <Button onClick={downloadPdf} disabled={loading === "download"}>
          {loading === "download" ? "Preparing PDF..." : isAdmin && status !== "paid" ? "Admin download" : "Download PDF"}
        </Button>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Unlock PDF</p>
              <p className="text-sm text-gray-600">$9.99 one-time. Instant download.</p>
            </div>
            <Button onClick={startCheckout} disabled={loading === "pay"}>
              {loading === "pay" ? "Redirecting..." : "Unlock & download"}
            </Button>
          </div>
        </div>
      )}
      {status !== "paid" ? (
        <p className="text-xs text-gray-600">Includes narrative + embedded evidence photos.</p>
      ) : null}
    </div>
  );
}
