export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { stripe } from "@/lib/stripe/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type Stripe from "stripe";
import { NextResponse } from "next/server";

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const packetId = session.metadata?.packetId;
    const userId = session.metadata?.userId;

    if (!packetId || !userId) {
      return NextResponse.json({ error: "Missing metadata on checkout session" }, { status: 400 });
    }

    const admin = createAdminClient();
    const paidAt = new Date().toISOString();
    const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : null;

    const { error: updatePaymentError, count } = await admin
      .from("payments")
      .update({ status: "paid", paid_at: paidAt, stripe_payment_intent_id: paymentIntent })
      .eq("stripe_checkout_session_id", session.id);

    if (updatePaymentError) {
      return NextResponse.json({ error: updatePaymentError.message }, { status: 500 });
    }

    if (!count || count === 0) {
      const { error: insertPaymentError } = await admin.from("payments").insert({
        packet_id: packetId,
        user_id: userId,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: paymentIntent,
        amount: 9.99,
        currency: "usd",
        status: "paid",
        paid_at: paidAt,
      });

      if (insertPaymentError) {
        return NextResponse.json({ error: insertPaymentError.message }, { status: 500 });
      }
    }

    const { error: packetUpdateError } = await admin
      .from("packets")
      .update({ status: "paid" })
      .eq("id", packetId)
      .eq("user_id", userId);

    if (packetUpdateError) {
      return NextResponse.json({ error: packetUpdateError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
