"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FILE_KINDS, FILE_KIND_LABELS, type FileKind, type PacketDraft, type PacketFile } from "@/lib/packets/types";
import { useEffect, useMemo, useRef, useState } from "react";

const KIND_HELPERS: Record<FileKind, string> = {
  proof_of_value: "Receipts, invoices, or payment confirmations for the item value.",
  damage_photo: "Clear photos of damaged contents, close-up and wide shots.",
  packaging_photo: "Box, labels, and packing materials showing condition on arrival.",
  proof_of_delivery: "Tracking screenshots or delivery confirmations.",
  other_supporting: "Any extra documentation that helps the claim.",
  packet_pdf: "",
};

function formatBytes(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "-";
  const units = ["B", "KB", "MB", "GB"] as const;
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(size >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

function formatTime(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

export function StepEvidenceUploads({ draft }: {
  draft: PacketDraft;
  errors: Record<string, string>;
  onChange: <K extends keyof PacketDraft>(key: K, value: PacketDraft[K]) => void;
}) {
  const fileInputsRef = useRef<Record<FileKind, HTMLInputElement | null>>({
    proof_of_value: null,
    damage_photo: null,
    packaging_photo: null,
    proof_of_delivery: null,
    other_supporting: null,
    packet_pdf: null,
  });
  const [files, setFiles] = useState<PacketFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKind, setUploadingKind] = useState<FileKind | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!draft?.id) return;
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/packets/${draft.id}/files`, { cache: "no-store" });
        if (!res.ok) throw new Error("Unable to load files");
        const json = (await res.json()) as { files: PacketFile[] };
        setFiles(json.files ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load files");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [draft?.id]);

  const grouped = useMemo(() => {
    const map: Record<FileKind, PacketFile[]> = {
      proof_of_value: [],
      damage_photo: [],
      packaging_photo: [],
      proof_of_delivery: [],
      other_supporting: [],
      packet_pdf: [],
    };
    files.forEach((file) => {
      if (map[file.kind]) map[file.kind].push(file);
    });
    return map;
  }, [files]);

  const handleUpload = async (kind: FileKind, fileList: FileList | null) => {
    if (!fileList?.length) return;
    setError(null);
    for (const file of Array.from(fileList)) {
      if (file.size > 15 * 1024 * 1024) {
        setError("File too large (max 15MB)");
        continue;
      }

      setUploadingKind(kind);
      const form = new FormData();
      form.append("kind", kind);
      form.append("file", file);

      try {
        const res = await fetch(`/api/packets/${draft.id}/files`, {
          method: "POST",
          body: form,
        });

        const json = (await res.json()) as { file?: PacketFile; error?: string };
        if (!res.ok || !json.file) {
          setError(json.error ?? "Upload failed");
          continue;
        }
        setFiles((prev) => [json.file!, ...prev]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploadingKind(null);
      }
    }
  };

  const handleDelete = async (file: PacketFile) => {
    setError(null);
    setDeletingId(file.id);
    try {
      const res = await fetch(`/api/packets/${draft.id}/files/${file.id}`, { method: "DELETE" });
      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(json?.error ?? "Delete failed");
      }
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {error ? <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
      {loading ? (
        <Card className="p-4 text-sm text-gray-700">Loading uploads...</Card>
      ) : null}

      {FILE_KINDS.map((kind) => (
        <Card key={kind} className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">{FILE_KIND_LABELS[kind]}</p>
              <p className="text-sm text-gray-600">{KIND_HELPERS[kind]}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={(el) => {
                  fileInputsRef.current[kind] = el;
                }}
                type="file"
                className="hidden"
                multiple
                onChange={(e) => {
                  void handleUpload(kind, e.target.files);
                  e.target.value = "";
                }}
              />
              <Button
                variant="secondary"
                disabled={uploadingKind === kind}
                onClick={() => fileInputsRef.current[kind]?.click()}
              >
                {uploadingKind === kind ? "Uploading..." : "Upload files"}
              </Button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {grouped[kind]?.length ? (
              grouped[kind].map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm"
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-gray-900">{file.original_name ?? "Untitled"}</div>
                    <div className="text-xs text-gray-600">
                      {formatBytes(file.size_bytes ?? 0)} • {formatTime(file.created_at) || "Uploaded"}
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                    onClick={() => void handleDelete(file)}
                    disabled={deletingId === file.id}
                  >
                    {deletingId === file.id ? "Removing..." : "Delete"}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No files uploaded yet.</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
