import { requireUser } from "@/lib/auth/requireUser";
import { buildDefaultNarrative } from "@/lib/packets/narrative";
import { carrierLabels, issueTypeLabels } from "@/lib/packets/mapping";
import {
  FILE_KIND_LABELS,
  FILE_KINDS,
  type PacketDraft,
} from "@/lib/packets/types";
import { createSignedUrl } from "@/lib/storage/signedUrl";
import { isAdminEmail } from "@/lib/payments/status";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PreviewActions } from "./PreviewActions";
import { EvidenceList, type EvidenceFile } from "./EvidenceList";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function formatCurrency(value?: number | null) {
  if (value === null || value === undefined) return "-";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value));
}

type ParamsInput = { params: { packetId: string } } | { params: Promise<{ packetId: string }> };

export default async function PacketPreviewPage({ params }: ParamsInput) {
  const { packetId } = await Promise.resolve(params);
  const isValidUuid = typeof packetId === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(packetId);
  const { supabase } = await requireUser();
  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData?.user?.email ?? null;
  const isAdmin = isAdminEmail(userEmail);

  if (!isValidUuid) {
    if (process.env.NODE_ENV !== "production") {
      const { data: userData } = await supabase.auth.getUser();
      return (
        <main className="mx-auto max-w-3xl p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <p className="font-semibold">Preview debug (dev only)</p>
            <div className="mt-2 space-y-1">
              <p>packetId: {String(packetId)}</p>
              <p>currentUserId: {userData?.user?.id ?? "none"}</p>
              <p>queryError: invalid packet id format</p>
            </div>
          </div>
        </main>
      );
    }

    notFound();
  }

  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("*")
    .eq("id", packetId)
    .maybeSingle();

  if (!packet) {
    if (process.env.NODE_ENV !== "production") {
      const { data: userData } = await supabase.auth.getUser();
      return (
        <main className="mx-auto max-w-3xl p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <p className="font-semibold">Preview debug (dev only)</p>
            <div className="mt-2 space-y-1">
              <p>packetId: {packetId}</p>
              <p>currentUserId: {userData?.user?.id ?? "none"}</p>
              <p>queryError: {packetError?.message ?? "none"}</p>
            </div>
          </div>
        </main>
      );
    }

    notFound();
  }

  const packetData = packet as PacketDraft;
  const isPaid = packetData.status === "paid";
  const timeZone = process.env.APP_TIMEZONE || "America/New_York";
  let generatedAt = new Date().toLocaleString();

  try {
    generatedAt = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone }).format(new Date());
  } catch (err) {
    console.error("Failed to format generated time", err);
  }

  const { data: files } = await supabase
    .from("packet_files")
    .select("*")
    .eq("packet_id", packetId)
    .order("created_at", { ascending: false });

  const filesWithSignedUrls: EvidenceFile[] = await Promise.all(
    (files ?? []).map(async (file) => {
      const bucketId = file.kind === "packet_pdf" ? "claim_packets" : "claim_uploads";
      const isImage = (file.mime_type ?? "").startsWith("image/");
      let signedUrl: string | null = null;

      if (file.storage_path) {
        try {
          signedUrl = await createSignedUrl(bucketId, file.storage_path);
        } catch (err) {
          console.error("Failed to sign url", err);
        }
      }

      return { ...file, signedUrl, isImage } as EvidenceFile;
    })
  );

  const narrative = packetData.narrative ?? buildDefaultNarrative(packetData);
  const groupedFiles = FILE_KINDS.reduce<Record<string, EvidenceFile[]>>((acc, kind) => {
    acc[kind] = filesWithSignedUrls.filter((file) => file.kind === kind);
    return acc;
  }, {});

  const truncatedNarrative = !isPaid ? `${narrative.slice(0, 240)}…` : narrative;

  return (
    <main className="bg-white px-6 py-10 text-gray-900">
      <div className="relative mx-auto flex max-w-5xl flex-col gap-6" data-paid={isPaid ? "true" : "false"}>
        {!isPaid ? (
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-15 preview-watermark">
            <div className="rotate-12 border-2 border-red-400 px-10 py-8 text-3xl font-semibold uppercase text-red-500">
              PREVIEW — UNLOCK TO DOWNLOAD
            </div>
          </div>
        ) : null}

        <header className="flex items-start justify-between border-b border-gray-200 pb-4">
          <div>
            <Link href="/" className="text-xs font-semibold uppercase tracking-wide text-blue-600 hover:text-blue-700">
              PARCELSCRIBE
            </Link>
            <h1 className="text-2xl font-semibold">Claim Packet Preview</h1>
            <p className="text-sm text-gray-600">Generated {generatedAt}</p>
            <p className="text-sm text-gray-600">Tracking: {packet.tracking_number}</p>
          </div>
          <PreviewActions packetId={packetId} status={packetData.status} isAdmin={isAdmin} />
        </header>

        <section className="grid gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Claim summary</h2>
            <dl className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-800 md:grid-cols-2">
              <SummaryItem label="Carrier" value={carrierLabels[packetData.carrier] ?? packetData.carrier} />
              <SummaryItem label="Issue" value={issueTypeLabels[packetData.issue_type]} />
              <SummaryItem label="Ship date" value={formatDate(packetData.ship_date)} />
              <SummaryItem label="Delivery date" value={formatDate(packetData.delivery_date)} />
              <SummaryItem label="Origin" value={packetData.origin_text} />
              <SummaryItem label="Destination" value={packetData.destination_text} />
              <SummaryItem label="Service level" value={packetData.service_level ?? "-"} />
              <SummaryItem label="Tracking" value={packetData.tracking_number} />
            </dl>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900">Item & amounts</h2>
            <dl className="mt-2 grid grid-cols-1 gap-2 text-sm text-gray-800 md:grid-cols-2">
              <SummaryItem label="Item" value={packetData.item_description} />
              <SummaryItem label="Quantity" value={String(packetData.item_qty)} />
              <SummaryItem label="Item value" value={formatCurrency(packetData.item_value_total)} />
              <SummaryItem label="Requested" value={formatCurrency(packetData.requested_amount)} />
            </dl>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-gray-900">Narrative</h2>
          <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-800">
            {truncatedNarrative.split("\n").map((para: string, idx: number) => (
              <p key={idx} className={idx > 0 ? "mt-3" : undefined}>
                {para}
              </p>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Evidence checklist</h2>
              <p className="text-sm text-gray-600">Files stay private; share only when submitting the claim.</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {FILE_KINDS.map((kind) => (
              <EvidenceList key={kind} kindLabel={FILE_KIND_LABELS[kind]} files={groupedFiles[kind] ?? []} isPaid={isPaid} />
            ))}
          </div>
        </section>

        <section className="space-y-2 rounded-xl border border-gray-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-gray-900">Next steps</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
            <li>Gather receipts and photos before submitting to the carrier.</li>
            <li>Keep copies of all correspondence and tracking updates.</li>
            <li>If denied, reference this packet when filing an appeal.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-md bg-white px-3 py-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <span className="text-sm text-gray-900">{value}</span>
    </div>
  );
}
