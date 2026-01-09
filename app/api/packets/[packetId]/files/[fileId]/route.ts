export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { requireUser } from "@/lib/auth/requireUser";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BUCKET_ID = "claim_uploads";

function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

export async function DELETE(_: Request, context: { params: { packetId: string; fileId: string } | Promise<{ packetId: string; fileId: string }> }) {
  const { packetId, fileId } = await context.params;
  if (!isValidUuid(packetId) || !isValidUuid(fileId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();

  const { data: record, error } = await supabase
    .from("packet_files")
    .select("id,packet_id,user_id,storage_path")
    .eq("id", fileId)
    .single();

  if (error || !record) {
    const status = error?.code === "PGRST116" ? 404 : 404;
    return NextResponse.json({ error: error?.message ?? "Not found" }, { status });
  }

  if (record.packet_id !== packetId || record.user_id !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { error: storageError } = await supabase.storage.from(BUCKET_ID).remove([record.storage_path]);
  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 500 });
  }

  const { error: deleteError } = await supabase
    .from("packet_files")
    .delete()
    .eq("id", fileId)
    .eq("user_id", userId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
