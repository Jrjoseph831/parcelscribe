import { requireUser } from "@/lib/auth/requireUser";
import { NextResponse } from "next/server";

export async function GET() {
  const { supabase, userId } = await requireUser();

  const { data, error } = await supabase
    .from("packets")
    .select("id,status,carrier,tracking_number,updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ packets: data ?? [] });
}

export async function POST() {
  const { supabase, userId } = await requireUser();
  const today = new Date().toISOString().slice(0, 10);

  const insertPayload = {
    user_id: userId,
    carrier: "ups",
    issue_type: "damaged",
    filer_role: "recipient",
    claim_stage: "new_claim",
    tracking_number: "TBD",
    ship_date: today,
    delivery_date: null,
    origin_text: "Origin TBD",
    destination_text: "Destination TBD",
    service_level: null,
    declared_value: null,
    item_description: "Item description",
    item_qty: 1,
    item_value_total: 100,
    shipping_cost: null,
    tax: null,
    requested_amount: 100,
    is_insured: null,
    user_notes: null,
    narrative: null,
    status: "draft",
  };

  const { data, error } = await supabase
    .from("packets")
    .insert(insertPayload)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ packet: data });
}
