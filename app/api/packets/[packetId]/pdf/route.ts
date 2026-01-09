export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/auth/requireUser";
import { isPacketPaid, isAdminEmail } from "@/lib/payments/status";
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
    .single();

  if (packetError || !packet) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  if (!isAdmin && packet.user_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const paid = await isPacketPaid({ supabase, packetId, userId, userEmail });
  if (!paid && !isAdmin) {
    return NextResponse.json({ error: "Packet is not paid" }, { status: 403 });
  }

  const { data: pdfFile, error: fileError } = await supabase
    .from("packet_files")
    .select("storage_path")
    .eq("packet_id", packetId)
    .eq("user_id", userId)
    .eq("kind", "packet_pdf")
    .maybeSingle();

  if (fileError && fileError.code !== "PGRST116") {
    return NextResponse.json({ error: fileError.message }, { status: 500 });
  }

  if (!pdfFile?.storage_path) {
    return NextResponse.json({ error: "PDF not found" }, { status: 404 });
  }

  const { data: signed, error: signedError } = await supabase.storage
    .from(BUCKET_PACKETS)
    .createSignedUrl(pdfFile.storage_path, 600);

  if (signedError || !signed?.signedUrl) {
    return NextResponse.json({ error: signedError?.message ?? "Unable to sign URL" }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
