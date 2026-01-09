export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { generateAndStorePacketPdf } from "@/lib/pdf/generateAndStore";
import { stripe } from "@/lib/stripe/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";
import { NextResponse } from "next/server";

const BUCKET_UPLOADS = "claim_uploads";
const BUCKET_PACKETS = "claim_packets";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook configuration" }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown webhook error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ok: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const packetId = session.metadata?.packet_id;
  const userId = session.metadata?.user_id;

  if (!packetId || !userId) {
    return NextResponse.json({ error: "Missing metadata on checkout session" }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: packetData, error: packetError } = await admin
    .from("packets")
    .select("*")
    .eq("id", packetId)
    .maybeSingle();

  if (packetError || !packetData) {
    const status = packetError?.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError?.message ?? "Packet not found" }, { status });
  }

  const ownerId = (packetData as { user_id?: string }).user_id ?? userId;

  try {
    await generateAndStorePacketPdf({
      supabase: admin,
      packetId,
      userId: ownerId,
      isAdmin: true,
      bucketUploads: BUCKET_UPLOADS,
      bucketPackets: BUCKET_PACKETS,
    });
  } catch (err) {
    console.error("Webhook PDF generation failed", err);
  }

  const paidAt = session.created ? new Date(session.created * 1000).toISOString() : new Date().toISOString();
  const amount = session.amount_total ?? session.amount_subtotal ?? null;
  const currency = session.currency ?? "usd";
  const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : null;

  const { error: paymentError } = await admin.from("payments").upsert(
    {
      packet_id: packetId,
      user_id: ownerId,
      status: "paid",
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntentId,
      amount,
      currency,
      paid_at: paidAt,
    },
    { onConflict: "stripe_checkout_session_id" },
  );

  if (paymentError) {
    console.error("Webhook payment upsert failed", paymentError.message);
  }

  const { error: packetUpdateError } = await admin
    .from("packets")
    .update({ status: "paid" })
    .eq("id", packetId);

  if (packetUpdateError) {
    console.error("Webhook packet status update failed", packetUpdateError.message);
  }

  return NextResponse.json({ ok: true });
}
