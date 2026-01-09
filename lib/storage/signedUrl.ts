"use server";

import { createClient } from "@/lib/supabase/server";

export async function createSignedUrl(bucketId: string, path: string, expiresInSeconds = 600): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucketId).createSignedUrl(path, expiresInSeconds);

  if (error) {
    throw new Error(error.message);
  }

  return data?.signedUrl ?? null;
}
