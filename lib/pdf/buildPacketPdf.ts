import { buildDefaultNarrative } from "@/lib/packets/narrative";
import type { PacketDraft, PacketFile } from "@/lib/packets/types";
import { pdf } from "@react-pdf/renderer";
import { createElement, type ReactElement } from "react";
import type { DocumentProps } from "@react-pdf/renderer";
import { PacketPdf } from "./template/PacketPdf";

export async function buildPacketPdf(payload: {
  packet: PacketDraft;
  files: PacketFile[];
}): Promise<Buffer> {
  const narrative = payload.packet.narrative ?? buildDefaultNarrative(payload.packet);
  const document = createElement(PacketPdf, {
    packet: payload.packet,
    files: payload.files,
    narrative,
  }) as ReactElement<DocumentProps>;

  const instance = pdf(document);
  const buffer = (await instance.toBuffer()) as unknown as Buffer;
  return buffer;
}
