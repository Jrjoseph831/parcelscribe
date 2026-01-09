import { requireUser } from "@/lib/auth/requireUser";
import { buildDefaultNarrative } from "@/lib/packets/narrative";
import type { PacketDraft } from "@/lib/packets/types";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

const ALLOWED_FIELDS: (keyof PacketDraft)[] = [
  "carrier",
  "issue_type",
  "filer_role",
  "claim_stage",
  "tracking_number",
  "ship_date",
  "delivery_date",
  "origin_text",
  "destination_text",
  "service_level",
  "declared_value",
  "item_description",
  "item_qty",
  "item_value_total",
  "shipping_cost",
  "tax",
  "requested_amount",
  "is_insured",
  "user_notes",
  "narrative",
  "status",
];

export async function GET(_: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();
  const { data, error } = await supabase
    .from("packets")
    .select("*")
    .eq("id", packetId)
    .eq("user_id", userId)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json({ packet: data });
}

export async function PATCH(request: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();

  const { data: existing, error: fetchError } = await supabase
    .from("packets")
    .select("*")
    .eq("id", packetId)
    .eq("user_id", userId)
    .single();

  if (fetchError) {
    const status = fetchError.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: fetchError.message }, { status });
  }

  if (!existing) {
    return NextResponse.json({ error: "Packet not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updates: Partial<PacketDraft> = {};
  ALLOWED_FIELDS.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      const value = (body as Partial<PacketDraft>)[field];
      if (value !== undefined) {
        (updates as Record<string, unknown>)[field] = value as unknown;
      }
    }
  });

  if (updates.status === "generated" && (updates.narrative === undefined || updates.narrative === null)) {
    const narrativeSource = { ...existing, ...updates } as PacketDraft;
    updates.narrative = buildDefaultNarrative(narrativeSource);
  }

  const { data, error } = await supabase
    .from("packets")
    .update(updates)
    .eq("id", packetId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json({ packet: data });
}
