export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/auth/requireUser";
import { buildPacketPdfServer, type EvidenceImage } from "@/lib/pdf/buildPacketPdfServer";
import { buildDefaultNarrative } from "@/lib/packets/narrative";
import type { PacketDraft, PacketFile } from "@/lib/packets/types";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BUCKET_UPLOADS = "claim_uploads";
const BUCKET_PACKETS = "claim_packets";

function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

function isAdminEmail(email: string | null | undefined) {
  const allowlist = process.env.ADMIN_EMAILS?.split(",").map((v) => v.trim().toLowerCase()).filter(Boolean) ?? [];
  return email ? allowlist.includes(email.toLowerCase()) : false;
}

export async function POST(_: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();
  const { data: userData } = await supabase.auth.getUser();
  const isAdmin = isAdminEmail(userData?.user?.email);

  const { data: packet, error: packetError } = await supabase.from("packets").select("*").eq("id", packetId).maybeSingle();

  if (!packet || packetError) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  if (packet.status !== "paid" && !isAdmin) {
    return NextResponse.json({ error: "Packet is not paid" }, { status: 403 });
  }

  const packetData = packet as PacketDraft;
  const narrative = packetData.narrative ?? buildDefaultNarrative(packetData);

  const { data: files, error: filesError } = await supabase
    .from("packet_files")
    .select("*")
    .eq("packet_id", packetId)
    .order("created_at", { ascending: true });

  if (filesError) {
    return NextResponse.json({ error: filesError.message }, { status: 500 });
  }

  const evidenceImages: EvidenceImage[] = [];
  const imageFiles = (files ?? []).filter((f) => (f.mime_type ?? "").startsWith("image/") && f.kind !== "packet_pdf");

  for (const file of imageFiles) {
    const { data, error } = await supabase.storage.from(BUCKET_UPLOADS).download(file.storage_path);
    if (error || !data) {
      console.error("Failed to download evidence", file.id, error?.message);
      continue;
    }
    const arrayBuffer = await data.arrayBuffer();
    evidenceImages.push({ file: file as PacketFile, bytes: new Uint8Array(arrayBuffer), mimeType: file.mime_type });
  }

  const pdfBytes = await buildPacketPdfServer({ packet: { ...packetData, narrative }, files: (files ?? []) as PacketFile[], images: evidenceImages });
  const ownerId = packetData.user_id ?? userId;
  const storagePath = `${ownerId}/${packetId}/packet.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_PACKETS)
    .upload(storagePath, pdfBytes, { contentType: "application/pdf", upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: existingPdf, error: selectPdfError } = await supabase
    .from("packet_files")
    .select("id")
    .eq("packet_id", packetId)
    .eq("kind", "packet_pdf")
    .maybeSingle();

  if (selectPdfError && selectPdfError.code !== "PGRST116") {
    return NextResponse.json({ error: selectPdfError.message }, { status: 500 });
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
      return NextResponse.json({ error: updatePdfError.message }, { status: 500 });
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
      return NextResponse.json({ error: insertPdfError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true, packetId });
}
