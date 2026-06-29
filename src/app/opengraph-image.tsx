import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 95% at 50% 30%, #cf8048 0%, #bd6536 28%, #97461f 58%, #6a2c14 82%, #4a1d0d 100%)",
          color: "#f7efe4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 38, fontWeight: 600 }}>
          <div style={{ display: "flex", flexWrap: "wrap", width: 34, height: 34, gap: 4 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 15, height: 15, background: "#f7efe4", borderRadius: 3 }} />
            ))}
          </div>
          Denta
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.03em" }}>
            Modern Care for
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              fontSize: 92,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            <span style={{ color: "#e2b794" }}>a</span>
            <span style={{ color: "#fff" }}>Perfect</span>
            <span style={{ color: "#e2b794" }}>Smile</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#e2b794" }}>
          <span>Boutique dental studio</span>
          <span>Barcelona, Spain</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
