import type { PacketDraft, PacketFile } from "@/lib/packets/types";
import { FILE_KIND_LABELS, FILE_KINDS } from "@/lib/packets/types";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111",
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 6,
  },
  subheading: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 6,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontWeight: 700,
    marginRight: 8,
  },
  value: {},
  paragraph: {
    marginBottom: 8,
    lineHeight: 1.5,
  },
  list: {
    marginTop: 4,
    marginLeft: 12,
  },
});

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function formatCurrency(value?: number | null) {
  if (value === null || value === undefined) return "-";
  return `$${Number(value).toFixed(2)}`;
}

export function PacketPdf({
  packet,
  files,
  narrative,
}: {
  packet: PacketDraft;
  files: PacketFile[];
  narrative: string;
}) {
  const grouped = FILE_KINDS.reduce<Record<string, PacketFile[]>>((acc, kind) => {
    acc[kind] = files.filter((file) => file.kind === kind);
    return acc;
  }, {});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>PARCELSCRIBE Claim Packet</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tracking:</Text>
            <Text style={styles.value}>{packet.tracking_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Carrier:</Text>
            <Text style={styles.value}>{packet.carrier.toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Issue:</Text>
            <Text style={styles.value}>{packet.issue_type.replace("_", " ")}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Claim stage:</Text>
            <Text style={styles.value}>{packet.claim_stage.replace("_", " ")}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Ship date:</Text>
            <Text style={styles.value}>{formatDate(packet.ship_date)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery date:</Text>
            <Text style={styles.value}>{formatDate(packet.delivery_date)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Origin:</Text>
            <Text style={styles.value}>{packet.origin_text}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>{packet.destination_text}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Service level:</Text>
            <Text style={styles.value}>{packet.service_level || "-"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Narrative</Text>
          {packet.claim_stage === "denied_need_appeal" ? (
            <Text style={styles.paragraph}>
              This claim is being appealed; please reconsider the enclosed evidence and explanation.
            </Text>
          ) : null}
          {narrative.split("\n").map((paragraph, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Contents & Amounts</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Item:</Text>
            <Text style={styles.value}>{packet.item_description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.value}>{String(packet.item_qty)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Item value:</Text>
            <Text style={styles.value}>{formatCurrency(packet.item_value_total)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Requested amount:</Text>
            <Text style={styles.value}>{formatCurrency(packet.requested_amount)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Evidence</Text>
          {FILE_KINDS.map((kind) => (
            <View key={kind} style={{ marginBottom: 6 }}>
              <Text style={styles.label}>{FILE_KIND_LABELS[kind]}:</Text>
              {grouped[kind]?.length ? (
                <View style={styles.list}>
                  {grouped[kind].map((file) => (
                    <Text key={file.id}>• {file.original_name ?? "Untitled file"}</Text>
                  ))}
                </View>
              ) : (
                <Text style={{ marginLeft: 12 }}>• None</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Recommended Attachments</Text>
          <View style={styles.list}>
            <Text>• Photos of damage and packaging</Text>
            <Text>• Proof of value (receipts, invoices)</Text>
            <Text>• Proof of delivery or tracking events</Text>
            <Text>• Correspondence with carrier</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
