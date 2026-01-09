export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/auth/requireUser";
import { isPacketPaid } from "@/lib/payments/status";
import { stripe } from "@/lib/stripe/stripe";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!appUrl || !priceId) {
    return NextResponse.json({ error: "Missing Stripe configuration (APP_URL or STRIPE_PRICE_ID)" }, { status: 500 });
  }

  const { supabase, userId } = await requireUser();
  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData?.user?.email ?? null;

  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("id,status")
    .eq("id", packetId)
    .eq("user_id", userId)
    .maybeSingle();

  if (packetError || !packet) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  const alreadyPaid = await isPacketPaid({ supabase, packetId, userId, userEmail });
  if (alreadyPaid) {
    return NextResponse.json({ error: "Packet already paid" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/packets/${packetId}/preview?paid=1`,
    cancel_url: `${appUrl}/packets/${packetId}/preview?canceled=1`,
    metadata: { packet_id: packetId, user_id: userId },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Unable to start checkout" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
