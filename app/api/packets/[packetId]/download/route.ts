export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { Buffer } from "buffer";
import { requireUser } from "@/lib/auth/requireUser";
import { isPacketPaid, isAdminEmail } from "@/lib/payments/status";
import { generateAndStorePacketPdf } from "@/lib/pdf/generateAndStore";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BUCKET_PACKETS = "claim_packets";

function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

export async function GET(_: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();
  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData?.user?.email ?? null;
  const isAdmin = isAdminEmail(userEmail);

  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("id,status,user_id")
    .eq("id", packetId)
    .maybeSingle();

  if (packetError || !packet) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  if (!isAdmin && packet.user_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ownerId = packet.user_id ?? userId;
  const paid = await isPacketPaid({ supabase, packetId, userId: ownerId, userEmail });
  if (!paid && !isAdmin) {
    return NextResponse.json({ error: "Packet is not paid" }, { status: 403 });
  }

  const { data: pdfFile, error: fileError } = await supabase
    .from("packet_files")
    .select("storage_path")
    .eq("packet_id", packetId)
    .eq("kind", "packet_pdf")
    .maybeSingle();

  if (fileError && fileError.code !== "PGRST116") {
    return NextResponse.json({ error: fileError.message }, { status: 500 });
  }

  let storagePath = pdfFile?.storage_path ?? null;

  if (!storagePath) {
    try {
      const result = await generateAndStorePacketPdf({ supabase, packetId, userId: ownerId, isAdmin });
      storagePath = result.storagePath;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to generate PDF";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  const { data: download, error: downloadError } = await supabase.storage.from(BUCKET_PACKETS).download(storagePath);

  if (downloadError || !download) {
    return NextResponse.json({ error: downloadError?.message ?? "Unable to fetch PDF" }, { status: 500 });
  }

  const buffer = Buffer.from(await download.arrayBuffer());

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=packet.pdf",
      "Content-Length": buffer.length.toString(),
    },
  });
}
