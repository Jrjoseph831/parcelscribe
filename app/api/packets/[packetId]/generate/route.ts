export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/auth/requireUser";
import { buildPacketPdf } from "@/lib/pdf/buildPacketPdf";
import { buildDefaultNarrative } from "@/lib/packets/narrative";
import type { PacketDraft, PacketFile } from "@/lib/packets/types";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BUCKET_PACKETS = "claim_packets";

function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

export async function POST(_: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();

  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("*")
    .eq("id", packetId)
    .eq("user_id", userId)
    .single();

  if (packetError || !packet) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  const packetData = packet as PacketDraft;
  const narrative = packetData.narrative ?? buildDefaultNarrative(packetData);
  const { data: files, error: filesError } = await supabase
    .from("packet_files")
    .select("*")
    .eq("packet_id", packetId)
    .eq("user_id", userId);

  if (filesError) {
    return NextResponse.json({ error: filesError.message }, { status: 500 });
  }

  const pdfBuffer = await buildPacketPdf({ packet: { ...packetData, narrative }, files: (files ?? []) as PacketFile[] });
  const storagePath = `${userId}/${packetId}/packet.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_PACKETS)
    .upload(storagePath, pdfBuffer, { contentType: "application/pdf", upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: existingPdf, error: selectPdfError } = await supabase
    .from("packet_files")
    .select("id")
    .eq("packet_id", packetId)
    .eq("user_id", userId)
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
        size_bytes: pdfBuffer.length,
      })
      .eq("id", existingPdf.id)
      .eq("user_id", userId);

    if (updatePdfError) {
      return NextResponse.json({ error: updatePdfError.message }, { status: 500 });
    }
  } else {
    const { error: insertPdfError } = await supabase
      .from("packet_files")
      .insert({
        packet_id: packetId,
        user_id: userId,
        kind: "packet_pdf",
        storage_path: storagePath,
        original_name: "packet.pdf",
        mime_type: "application/pdf",
        size_bytes: pdfBuffer.length,
      });

    if (insertPdfError) {
      return NextResponse.json({ error: insertPdfError.message }, { status: 500 });
    }
  }

  const { error: updatePacketError } = await supabase
    .from("packets")
    .update({ status: "generated", narrative })
    .eq("id", packetId)
    .eq("user_id", userId);

  if (updatePacketError) {
    return NextResponse.json({ error: updatePacketError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, packetId });
}
