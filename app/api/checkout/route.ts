export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/auth/requireUser";
import { stripe } from "@/lib/stripe/stripe";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PRICE_CENTS = 999;

function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { packetId?: string } | null;
  const packetId = body?.packetId ?? "";

  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const appUrl = process.env.APP_URL;
  if (!appUrl) {
    return NextResponse.json({ error: "Missing APP_URL env" }, { status: 500 });
  }

  const { supabase, userId } = await requireUser();

  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("id,status")
    .eq("id", packetId)
    .eq("user_id", userId)
    .single();

  if (packetError || !packet) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  if (packet.status === "paid") {
    return NextResponse.json({ error: "Packet already paid" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: PRICE_CENTS,
          product_data: { name: "PARCELSCRIBE Claim Packet PDF" },
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/success/${packetId}`,
    cancel_url: `${appUrl}/packets/${packetId}/preview`,
    metadata: { packetId, userId },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }

  const { error: paymentError } = await supabase
    .from("payments")
    .upsert(
      {
        packet_id: packetId,
        user_id: userId,
        stripe_checkout_session_id: session.id,
        amount: 9.99,
        currency: "usd",
        status: "initiated",
      },
      { onConflict: "stripe_checkout_session_id" },
    );

  if (paymentError) {
    return NextResponse.json({ error: paymentError.message }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
