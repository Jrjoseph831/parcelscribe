import type { SupabaseClient } from "@supabase/supabase-js";

export function isAdminEmail(email: string | null | undefined): boolean {
  const allowlist = process.env.ADMIN_EMAILS?.split(",").map((value) => value.trim().toLowerCase()).filter(Boolean) ?? [];
  return email ? allowlist.includes(email.toLowerCase()) : false;
}

export async function isPacketPaid(params: {
  supabase: SupabaseClient;
  packetId: string;
  userId: string;
  userEmail?: string | null;
}): Promise<boolean> {
  const { supabase, packetId, userId } = params;

  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("status")
    .eq("id", packetId)
    .eq("user_id", userId)
    .maybeSingle();

  if (packetError) {
    console.error("isPacketPaid packet check failed", packetError.message);
  }

  if (packet?.status === "paid") {
    return true;
  }

  const { data: payment, error: paymentError } = await supabase
    .from("payments")
    .select("status")
    .eq("packet_id", packetId)
    .eq("user_id", userId)
    .eq("status", "paid")
    .maybeSingle();

  if (paymentError) {
    console.error("isPacketPaid payments check failed", paymentError.message);
  }

  return Boolean(payment);
}
