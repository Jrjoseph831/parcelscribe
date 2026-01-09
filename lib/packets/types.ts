export type Carrier = "ups" | "fedex";
export type IssueType = "damaged" | "lost" | "missing_contents";
export type FilerRole = "shipper" | "recipient" | "third_party";
export type ClaimStage = "new_claim" | "denied_need_appeal";
export type PacketStatus = "draft" | "generated" | "paid";
export type FileKind =
  | "proof_of_value"
  | "damage_photo"
  | "packaging_photo"
  | "proof_of_delivery"
  | "other_supporting"
  | "packet_pdf";
export type PaymentStatus = "initiated" | "paid" | "failed" | "refunded";

export type PacketFile = {
  id: string;
  packet_id: string;
  user_id: string;
  kind: FileKind;
  storage_path: string;
  original_name: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string | null;
};

export const FILE_KINDS: FileKind[] = [
  "proof_of_value",
  "damage_photo",
  "packaging_photo",
  "proof_of_delivery",
  "other_supporting",
];

export const FILE_KIND_LABELS: Record<FileKind, string> = {
  proof_of_value: "Proof of value",
  damage_photo: "Damage photo",
  packaging_photo: "Packaging photo",
  proof_of_delivery: "Proof of delivery",
  other_supporting: "Other supporting",
  packet_pdf: "Packet PDF",
};

export type PacketDraft = {
  id: string;
  user_id?: string;
  carrier: Carrier;
  issue_type: IssueType;
  filer_role: FilerRole;
  claim_stage: ClaimStage;
  tracking_number: string;
  ship_date: string; // ISO date
  delivery_date: string | null;
  origin_text: string;
  destination_text: string;
  service_level: string | null;
  declared_value: number | null;
  item_description: string;
  item_qty: number;
  item_value_total: number;
  shipping_cost: number | null;
  tax: number | null;
  requested_amount: number;
  is_insured: "yes" | "no" | "not_sure" | null;
  user_notes: string | null;
  narrative: string | null;
  status: PacketStatus;
  created_at?: string;
  updated_at?: string;
};

export type PacketSummary = {
  id: string;
  status: PacketStatus;
  carrier: Carrier;
  tracking_number: string;
  updated_at: string | null;
};
