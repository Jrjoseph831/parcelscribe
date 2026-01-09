'use client';

import { useState } from "react";
import { buttonClasses } from "@/components/ui/Button";

type Props = { text: string };

export function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy", error);
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={buttonClasses("secondary")}>
      {copied ? "Copied" : "Copy to clipboard"}
    </button>
  );
}
