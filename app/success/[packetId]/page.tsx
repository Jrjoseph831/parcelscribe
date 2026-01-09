import { Card } from "@/components/ui/Card";
import { requireUser } from "@/lib/auth/requireUser";
import { packetStatusLabels } from "@/lib/packets/mapping";
import type { PacketStatus } from "@/lib/packets/types";
import { notFound } from "next/navigation";
import { DownloadButton } from "./DownloadButton";

type PacketPreview = {
  id: string;
  status: PacketStatus;
  carrier: string;
  tracking_number: string;
};

export default async function SuccessPage({ params }: { params: { packetId: string } }) {
  const { supabase, userId } = await requireUser();

  const { data, error } = await supabase
    .from("packets")
    .select("id,status,carrier,tracking_number")
    .eq("id", params.packetId)
    .eq("user_id", userId)
    .single<PacketPreview>();

  if (error || !data) {
    notFound();
  }

  if (data.status !== "paid") {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Success</p>
            <h1 className="text-2xl font-semibold text-gray-900">Packet status</h1>
            <p className="text-gray-600">Payment confirmed. Download your packet PDF below.</p>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {packetStatusLabels[data.status] ?? data.status}
          </span>
        </div>

        <div className="mt-6 space-y-2 text-sm text-gray-800">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
            <span className="text-gray-600">Carrier</span>
            <span className="font-medium uppercase">{data.carrier}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
            <span className="text-gray-600">Tracking</span>
            <span className="font-medium">{data.tracking_number}</span>
          </div>
        </div>

        <div className="mt-6">
          <DownloadButton packetId={data.id} />
        </div>
      </Card>
    </main>
  );
}
