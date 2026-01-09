import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
          color: "#e0e7ff",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 6, textTransform: "uppercase", color: "#a5b4fc" }}>
          Parcelscribe
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 10, lineHeight: 1.1 }}>
          UPS / FedEx Claim Packet Builder
        </div>
        <div style={{ fontSize: 24, marginTop: 20, maxWidth: "70%", color: "#c7d2fe" }}>
          Generate a carrier-ready PDF with cover letter, timeline, and evidence checklist for damage or lost packages.
        </div>
        <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 12, fontSize: 20 }}>
          <span style={{ background: "#e0f2fe", color: "#0ea5e9", padding: "10px 16px", borderRadius: 999 }}>UPS & FedEx</span>
          <span style={{ background: "#dbeafe", color: "#1d4ed8", padding: "10px 16px", borderRadius: 999 }}>Damage • Loss</span>
        </div>
      </div>
    ),
    size,
  );
}
