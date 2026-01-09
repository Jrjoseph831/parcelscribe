import { carrierLabels, issueTypeLabels } from "@/lib/packets/mapping";
import type { PacketDraft } from "@/lib/packets/types";

function formatDate(date?: string | null) {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function buildDefaultNarrative(packet: PacketDraft): string {
  const carrier = carrierLabels[packet.carrier] ?? packet.carrier.toUpperCase();
  const issueLabel = issueTypeLabels[packet.issue_type] ?? packet.issue_type;
  const shipDate = formatDate(packet.ship_date) || "the ship date";
  const deliveryDate = formatDate(packet.delivery_date);
  const origin = packet.origin_text || "the origin";
  const destination = packet.destination_text || "the destination";
  const item = packet.item_description || "the item";
  const requested = packet.requested_amount ? `$${Number(packet.requested_amount).toFixed(2)}` : "the claimed amount";

  const issueLine =
    packet.issue_type === "damaged"
      ? "The shipment arrived damaged despite appropriate packaging."
      : packet.issue_type === "lost"
        ? "The shipment never arrived to the recipient."
        : "The package arrived with missing contents.";

  const deliveryLine = deliveryDate
    ? `Delivery was recorded on ${deliveryDate}, but the issue was identified at that time.`
    : "Delivery has not been confirmed yet.";

  return [
    `I am filing a claim for the shipment sent via ${carrier} (tracking ${packet.tracking_number}) on ${shipDate} from ${origin} to ${destination}.`,
    `${issueLine} ${deliveryLine}`,
    `The shipment contained ${item}. I am requesting reimbursement of ${requested} to cover the loss/damage.`,
    `Please review the attached evidence supporting this ${issueLabel.toLowerCase()} claim and advise on next steps.`,
  ].join("\n\n");
}
