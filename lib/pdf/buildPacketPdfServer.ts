import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { PacketDraft, PacketFile } from "@/lib/packets/types";

export type EvidenceImage = {
  file: PacketFile;
  bytes: Uint8Array;
  mimeType: string | null;
};

const MARGIN = 50;
const MAX_TEXT_WIDTH = 500;

function wrapText(text: string, maxChars = 90): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const tentative = current ? `${current} ${word}` : word;
    if (tentative.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = tentative;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawSectionHeader(page: any, text: string, y: number, font: any) {
  page.drawText(text, {
    x: MARGIN,
    y,
    size: 14,
    font,
    color: rgb(0.1, 0.1, 0.1),
  });
}

export async function buildPacketPdfServer(payload: {
  packet: PacketDraft & { narrative: string };
  files: PacketFile[];
  images: EvidenceImage[];
}): Promise<Uint8Array> {
  const { packet, files, images } = payload;
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Summary page
  let page = pdfDoc.addPage();
  let y = page.getHeight() - MARGIN;
  page.drawText("Claim Packet", { x: MARGIN, y, size: 22, font, color: rgb(0.05, 0.05, 0.1) });
  y -= 30;
  page.drawText(`Tracking: ${packet.tracking_number}`, { x: MARGIN, y, size: 12, font });
  y -= 20;
  page.drawText(`Carrier: ${packet.carrier}`, { x: MARGIN, y, size: 12, font });
  y -= 18;
  page.drawText(`Issue: ${packet.issue_type}`, { x: MARGIN, y, size: 12, font });
  y -= 18;
  page.drawText(`Requested: $${Number(packet.requested_amount).toFixed(2)}`, { x: MARGIN, y, size: 12, font });
  y -= 30;

  drawSectionHeader(page, "Narrative", y, font);
  y -= 20;
  const narrativeLines = wrapText(packet.narrative ?? "", 100);
  for (const line of narrativeLines) {
    page.drawText(line, { x: MARGIN, y, size: 11, font });
    y -= 14;
    if (y < MARGIN) {
      page = pdfDoc.addPage();
      y = page.getHeight() - MARGIN;
    }
  }

  // Evidence index page
  const indexPage = pdfDoc.addPage();
  let iy = indexPage.getHeight() - MARGIN;
  indexPage.drawText("Evidence Index", { x: MARGIN, y: iy, size: 18, font, color: rgb(0.05, 0.05, 0.1) });
  iy -= 24;
  const evidenceLines = files.map((file) => `${file.kind}: ${file.original_name ?? "Untitled file"}`);
  if (!evidenceLines.length) {
    indexPage.drawText("No evidence files uploaded.", { x: MARGIN, y: iy, size: 12, font });
  } else {
    evidenceLines.forEach((line) => {
      const wrapped = wrapText(line, 90);
      wrapped.forEach((l) => {
        indexPage.drawText(l, { x: MARGIN, y: iy, size: 11, font });
        iy -= 14;
      });
      iy -= 4;
      if (iy < MARGIN) {
        iy = indexPage.getHeight() - MARGIN;
      }
    });
  }

  // Evidence image pages
  for (const image of images) {
    const evidencePage = pdfDoc.addPage();
    const pageWidth = evidencePage.getWidth();
    let py = evidencePage.getHeight() - MARGIN;

    evidencePage.drawText(image.file.original_name ?? "Evidence image", {
      x: MARGIN,
      y: py,
      size: 14,
      font,
      color: rgb(0.05, 0.05, 0.1),
    });

    const isPng = (image.mimeType ?? "").toLowerCase().includes("png");
    const embedded = isPng
      ? await pdfDoc.embedPng(image.bytes)
      : await pdfDoc.embedJpg(image.bytes);

    const { width, height } = embedded.scale(1);
    const maxWidth = pageWidth - MARGIN * 2;
    const scale = Math.min(1, maxWidth / width, (evidencePage.getHeight() - MARGIN * 2) / height);
    const scaled = embedded.scale(scale);

    const x = MARGIN + (maxWidth - scaled.width) / 2;
    const yPos = py - 30 - scaled.height;

    evidencePage.drawImage(embedded, {
      x,
      y: yPos,
      width: scaled.width,
      height: scaled.height,
    });
  }

  return pdfDoc.save();
}
