import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpengraphImage() {
  const accent = "#B38B59";
  const primary = "#0F3D2E";
  const sand = "#F2F0E9";

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: sand,
          color: primary,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "Poppins, Inter, sans-serif"
        }}
      >
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "9999px",
              background: primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: sand,
              fontSize: 56,
              fontWeight: 600
            }}
          >
            S
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 34, letterSpacing: 4, textTransform: "uppercase", color: accent }}>Sommerhus</span>
            <span style={{ fontSize: 60, fontWeight: 600 }}>{siteConfig.shortName}</span>
            <span style={{ fontSize: 28 }}>Midtjyllands bedste base for lystfiskere</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: primary
          }}
        >
          <div style={{ maxWidth: 520, lineHeight: 1.4, fontSize: 30 }}>
            Bo tæt på Bølling Sø, Karup Å og Silkeborgsøerne – med komfort, grejplads og ro til hele familien.
          </div>
          <div style={{ textAlign: "right", fontSize: 28, lineHeight: 1.4 }}>
            {siteConfig.address.streetAddress}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
            <br />
            {siteConfig.contact.email}
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
