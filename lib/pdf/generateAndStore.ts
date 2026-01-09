import { buildDefaultNarrative } from "@/lib/packets/narrative";
import type { PacketDraft, PacketFile } from "@/lib/packets/types";
import { buildPacketPdfServer, type EvidenceImage } from "./buildPacketPdfServer";
import type { SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_BUCKET_UPLOADS = "claim_uploads";
const DEFAULT_BUCKET_PACKETS = "claim_packets";

export type GeneratePacketPdfResult = {
  storagePath: string;
  buffer: Uint8Array;
};

export async function generateAndStorePacketPdf(options: {
  supabase: SupabaseClient;
  packetId: string;
  userId?: string;
  isAdmin?: boolean;
  bucketUploads?: string;
  bucketPackets?: string;
}): Promise<GeneratePacketPdfResult> {
  const {
    supabase,
    packetId,
    userId,
    isAdmin = false,
    bucketUploads = DEFAULT_BUCKET_UPLOADS,
    bucketPackets = DEFAULT_BUCKET_PACKETS,
  } = options;

  const { data: packetData, error: packetError } = await supabase
    .from("packets")
    .select("*")
    .eq("id", packetId)
    .maybeSingle();

  if (packetError || !packetData) {
    throw new Error(packetError?.message ?? "Packet not found");
  }

  const packet = packetData as PacketDraft & { user_id?: string; status?: string; narrative?: string };
  const ownerId = packet.user_id ?? userId ?? "unknown";

  if (!isAdmin && userId && packet.user_id && packet.user_id !== userId) {
    throw new Error("Forbidden: packet does not belong to user");
  }

  if (!isAdmin && packet.status !== "paid") {
    throw new Error("Packet is not paid");
  }

  const { data: files, error: filesError } = await supabase
    .from("packet_files")
    .select("*")
    .eq("packet_id", packetId)
    .order("created_at", { ascending: true });

  if (filesError) {
    throw new Error(filesError.message);
  }

  const evidenceImages: EvidenceImage[] = [];
  const imageFiles = (files ?? []).filter((file) => (file.mime_type ?? "").startsWith("image/") && file.kind !== "packet_pdf");

  for (const file of imageFiles) {
    if (!file.storage_path) continue;
    const { data, error } = await supabase.storage.from(bucketUploads).download(file.storage_path);
    if (error || !data) {
      console.error("Failed to download evidence", file.id, error?.message);
      continue;
    }
    const arrayBuffer = await data.arrayBuffer();
    evidenceImages.push({ file: file as PacketFile, bytes: new Uint8Array(arrayBuffer), mimeType: file.mime_type });
  }

  const narrative = packet.narrative ?? buildDefaultNarrative(packet);
  const pdfBytes = await buildPacketPdfServer({ packet: { ...packet, narrative }, files: (files ?? []) as PacketFile[], images: evidenceImages });
  const storagePath = `${ownerId}/${packetId}/packet.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(bucketPackets)
    .upload(storagePath, pdfBytes, { contentType: "application/pdf", upsert: true });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: existingPdf, error: selectPdfError } = await supabase
    .from("packet_files")
    .select("id")
    .eq("packet_id", packetId)
    .eq("kind", "packet_pdf")
    .maybeSingle();

  if (selectPdfError && selectPdfError.code !== "PGRST116") {
    throw new Error(selectPdfError.message);
  }

  if (existingPdf?.id) {
    const { error: updatePdfError } = await supabase
      .from("packet_files")
      .update({
        storage_path: storagePath,
        original_name: "packet.pdf",
        mime_type: "application/pdf",
        size_bytes: pdfBytes.length,
      })
      .eq("id", existingPdf.id);

    if (updatePdfError) {
      throw new Error(updatePdfError.message);
    }
  } else {
    const { error: insertPdfError } = await supabase.from("packet_files").insert({
      packet_id: packetId,
      user_id: ownerId,
      kind: "packet_pdf",
      storage_path: storagePath,
      original_name: "packet.pdf",
      mime_type: "application/pdf",
      size_bytes: pdfBytes.length,
    });

    if (insertPdfError) {
      throw new Error(insertPdfError.message);
    }
  }

  return { storagePath, buffer: pdfBytes };
}
