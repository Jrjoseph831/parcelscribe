import type {
  Carrier,
  ClaimStage,
  FilerRole,
  IssueType,
  PacketStatus,
} from "@/lib/packets/types";

export const carrierLabels: Record<Carrier, string> = {
  ups: "UPS",
  fedex: "FedEx",
};

export const issueTypeLabels: Record<IssueType, string> = {
  damaged: "Damaged",
  lost: "Lost",
  missing_contents: "Missing contents",
};

export const filerRoleLabels: Record<FilerRole, string> = {
  shipper: "Shipper",
  recipient: "Recipient",
  third_party: "Third party",
};

export const claimStageLabels: Record<ClaimStage, string> = {
  new_claim: "New claim",
  denied_need_appeal: "Denied, need appeal",
};

export const packetStatusLabels: Record<PacketStatus, string> = {
  draft: "Draft",
  generated: "Generated",
  paid: "Paid",
};

export const carrierOptions = (Object.keys(carrierLabels) as Carrier[]).map((value) => ({
  value,
  label: carrierLabels[value],
}));

export const issueTypeOptions = (Object.keys(issueTypeLabels) as IssueType[]).map((value) => ({
  value,
  label: issueTypeLabels[value],
}));

export const filerRoleOptions = (Object.keys(filerRoleLabels) as FilerRole[]).map((value) => ({
  value,
  label: filerRoleLabels[value],
}));

export const claimStageOptions = (Object.keys(claimStageLabels) as ClaimStage[]).map((value) => ({
  value,
  label: claimStageLabels[value],
}));
