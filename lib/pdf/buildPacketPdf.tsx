import { buildDefaultNarrative } from "@/lib/packets/narrative";
import type { PacketDraft, PacketFile } from "@/lib/packets/types";
import { pdf } from "@react-pdf/renderer";
import { PacketPdf } from "./template/PacketPdf";

export async function buildPacketPdf(payload: {
  packet: PacketDraft;
  files: PacketFile[];
}): Promise<Buffer> {
  const narrative = payload.packet.narrative ?? buildDefaultNarrative(payload.packet);
  const instance = pdf(<PacketPdf packet={payload.packet} files={payload.files} narrative={narrative} />);
  const buffer = await instance.toBuffer();
  return buffer;
}
