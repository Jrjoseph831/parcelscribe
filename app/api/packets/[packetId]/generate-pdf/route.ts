export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/auth/requireUser";
import { isPacketPaid, isAdminEmail } from "@/lib/payments/status";
import { generateAndStorePacketPdf } from "@/lib/pdf/generateAndStore";
import type { PacketDraft } from "@/lib/packets/types";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

export async function POST(_: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();
  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData?.user?.email ?? null;
  const isAdmin = isAdminEmail(userEmail);

  const { data: packet, error: packetError } = await supabase.from("packets").select("status,user_id").eq("id", packetId).maybeSingle();

  if (!packet || packetError) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  const paid = await isPacketPaid({ supabase, packetId, userId, userEmail });
  if (!paid) {
    return NextResponse.json({ error: "Packet is not paid" }, { status: 403 });
  }

  const ownerId = (packet as PacketDraft).user_id ?? userId;

  try {
    await generateAndStorePacketPdf({ supabase, packetId, userId: ownerId, isAdmin });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unable to generate PDF";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, packetId });
}
