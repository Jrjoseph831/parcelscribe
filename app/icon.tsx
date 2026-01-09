import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#e0f2fe",
          fontSize: 26,
          fontWeight: 700,
          borderRadius: 14,
          letterSpacing: 1,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        PS
      </div>
    ),
    size,
  );
}
