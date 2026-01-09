"use client";

import { useState } from "react";
import type { PacketFile } from "@/lib/packets/types";

export type EvidenceFile = PacketFile & {
  signedUrl: string | null;
  isImage: boolean;
};

function formatSize(bytes?: number | null) {
  if (!bytes || bytes <= 0) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function EvidenceList({
  kindLabel,
  files,
  isPaid,
}: {
  kindLabel: string;
  files: EvidenceFile[];
  isPaid: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? files : files.slice(0, 4);
  const hasOverflow = files.length > 4;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900">{kindLabel}</p>
        {hasOverflow && (
          <button
            type="button"
            className="text-xs font-medium text-blue-600 hover:text-blue-700"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Collapse" : "View all"}
          </button>
        )}
      </div>
      {visible.length ? (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((file) => (
            <li key={file.id} className="rounded-md border border-gray-100 p-2">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900" title={file.original_name ?? "Untitled file"}>
                    {file.original_name ?? "Untitled file"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {[formatSize(file.size_bytes), formatDate(file.created_at)].filter(Boolean).join(" | ")}
                  </p>
                </div>
                {file.signedUrl && isPaid ? (
                  <a
                    href={file.signedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    View
                  </a>
                ) : null}
              </div>
              {file.isImage && file.signedUrl ? (
                isPaid ? (
                  <a href={file.signedUrl} target="_blank" rel="noreferrer" className="mt-2 block">
                    <img
                      src={file.signedUrl}
                      alt={file.original_name ?? "Uploaded file"}
                      className="h-32 w-full rounded-md object-cover evidence-image"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <div className="mt-2 overflow-hidden rounded-md border border-dashed border-gray-200 bg-gray-50">
                    <img
                      src={file.signedUrl}
                      alt={file.original_name ?? "Uploaded file"}
                      className="evidence-image h-20 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600">No files yet.</p>
      )}
    </div>
  );
}
