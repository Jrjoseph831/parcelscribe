import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0b1026, #0ea5e9)",
          color: "#e0f2fe",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 6, textTransform: "uppercase", color: "#bae6fd" }}>
          Parcelscribe
        </div>
        <div style={{ fontSize: 52, fontWeight: 700, marginTop: 12, lineHeight: 1.1 }}>
          Claim packets for UPS & FedEx
        </div>
        <div style={{ fontSize: 22, marginTop: 18, maxWidth: "72%", color: "#dbeafe" }}>
          Cover letter, timeline, and evidence checklist in one PDF for damage or lost package claims.
        </div>
        <div style={{ marginTop: 30, display: "inline-flex", alignItems: "center", gap: 12, fontSize: 18 }}>
          <span style={{ background: "#e0f2fe", color: "#0ea5e9", padding: "10px 16px", borderRadius: 999 }}>Photos</span>
          <span style={{ background: "#e0f2fe", color: "#0ea5e9", padding: "10px 16px", borderRadius: 999 }}>Proof of value</span>
          <span style={{ background: "#e0f2fe", color: "#0ea5e9", padding: "10px 16px", borderRadius: 999 }}>Timeline</span>
        </div>
      </div>
    ),
    size,
  );
}
