export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { Buffer } from "buffer";
import { requireUser } from "@/lib/auth/requireUser";
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

  const { supabase } = await requireUser();
  const { data: userData } = await supabase.auth.getUser();
  const allowlist = process.env.ADMIN_EMAILS?.split(",").map((v) => v.trim().toLowerCase()).filter(Boolean) ?? [];
  const isAdmin = userData?.user?.email ? allowlist.includes(userData.user.email.toLowerCase()) : false;

  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("id,status,user_id")
    .eq("id", packetId)
    .maybeSingle();

  if (packetError || !packet) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  if (packet.status !== "paid" && !isAdmin) {
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

  if (!pdfFile?.storage_path) {
    return NextResponse.json({ error: "PDF not found" }, { status: 404 });
  }

  const { data: download, error: downloadError } = await supabase.storage.from(BUCKET_PACKETS).download(pdfFile.storage_path);

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
