export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { Buffer } from "buffer";
import { requireUser } from "@/lib/auth/requireUser";
import { FILE_KINDS, type FileKind, type PacketFile } from "@/lib/packets/types";
import { NextResponse } from "next/server";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const BUCKET_ID = "claim_uploads";

function isValidUuid(value: string) {
  return UUID_REGEX.test(value);
}

function sanitizeFileName(name: string) {
  if (!name) return "upload";
  const cleaned = name.replace(/[^a-zA-Z0-9._-]+/g, "_");
  return cleaned.length > 0 ? cleaned : "upload";
}

function isAllowedKind(kind: string): kind is FileKind {
  return FILE_KINDS.includes(kind as FileKind);
}

export async function GET(_: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();
  const { data, error } = await supabase
    .from("packet_files")
    .select("*")
    .eq("packet_id", packetId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ files: (data ?? []) as PacketFile[] });
}

export async function POST(request: Request, context: { params: { packetId: string } | Promise<{ packetId: string }> }) {
  const { packetId } = await context.params;
  if (!isValidUuid(packetId)) {
    return NextResponse.json({ error: "Invalid packet id" }, { status: 400 });
  }

  const { supabase, userId } = await requireUser();

  // Ensure the packet belongs to the user before accepting uploads.
  const { data: packet, error: packetError } = await supabase
    .from("packets")
    .select("id")
    .eq("id", packetId)
    .eq("user_id", userId)
    .single();

  if (packetError) {
    const status = packetError.code === "PGRST116" ? 404 : 500;
    return NextResponse.json({ error: packetError.message }, { status });
  }

  if (!packet) {
    return NextResponse.json({ error: "Packet not found" }, { status: 404 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const kindValue = formData.get("kind");
  const file = formData.get("file") as File | null;

  if (!kindValue || typeof kindValue !== "string" || !isAllowedKind(kindValue)) {
    return NextResponse.json({ error: "Invalid file kind" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large (max 15MB)" }, { status: 400 });
  }

  const fileId = crypto.randomUUID();
  const safeName = sanitizeFileName(file.name);
  const storagePath = `${userId}/${packetId}/${kindValue}/${fileId}-${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_ID)
    .upload(storagePath, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const insertPayload = {
    id: fileId,
    packet_id: packetId,
    user_id: userId,
    kind: kindValue,
    storage_path: storagePath,
    original_name: file.name || safeName,
    mime_type: file.type || null,
    size_bytes: file.size ?? null,
  } satisfies Partial<PacketFile> & { kind: FileKind };

  const { data: inserted, error: insertError } = await supabase
    .from("packet_files")
    .insert(insertPayload)
    .select()
    .single();

  if (insertError) {
    // Attempt to clean up the uploaded object if DB insert fails.
    await supabase.storage.from(BUCKET_ID).remove([storagePath]);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ file: inserted as PacketFile }, { status: 201 });
}
