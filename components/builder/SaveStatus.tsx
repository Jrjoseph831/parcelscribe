"use client";

export type SaveState = "idle" | "saving" | "saved" | "error";

export function SaveStatus({ state }: { state: SaveState }) {
  const text =
    state === "saving"
      ? "Saving..."
      : state === "saved"
        ? "Saved"
        : state === "error"
          ? "Error saving"
          : "Idle";

  const color =
    state === "saving"
      ? "text-blue-600"
      : state === "saved"
        ? "text-green-600"
        : state === "error"
          ? "text-red-600"
          : "text-gray-500";

  return <span className={`text-sm font-medium ${color}`}>{text}</span>;
}
