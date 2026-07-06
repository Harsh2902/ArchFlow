import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ArchFlow — Custom workflow platforms for Indian industry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#05060a",
          backgroundImage:
            "radial-gradient(900px circle at 15% 10%, rgba(88,101,242,0.30) 0px, transparent 55%), radial-gradient(700px circle at 90% 95%, rgba(67,83,240,0.18) 0px, transparent 55%)",
          color: "#f5f7fa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px"
        }}
      >
        {/* Brand row — the Λ mark drawn as vectors */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width={54} height={54} viewBox="0 0 100 100" fill="none">
            <path
              d="M50 12 L88 74 L68 68 L50 34 L32 68 L12 74 Z"
              fill="#eef1f6"
            />
            <path
              d="M6 78 C 30 62, 55 62, 78 70 C 86 73, 92 70, 96 64 C 88 84, 60 88, 38 84 C 24 81, 12 82, 6 78 Z"
              fill="#4353f0"
            />
          </svg>
          <span
            style={{
              fontSize: 13,
              color: "#8a96ff",
              textTransform: "uppercase",
              letterSpacing: 3.5,
              fontWeight: 700
            }}
          >
            Custom Workflow Platforms
          </span>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: -4,
              fontWeight: 800
            }}
          >
            <span style={{ color: "#f5f7fa" }}>Arch</span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #aab4ff 0%, #6d7dff 45%, #4353f0 100%)",
                backgroundClip: "text",
                color: "transparent"
              }}
            >
              Flow
            </span>
          </div>
          <span
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: "#c3c9d6",
              maxWidth: 900,
              fontWeight: 400
            }}
          >
            Custom workflow platforms for Indian industry.
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            paddingTop: 26
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#5865f2"
              }}
            />
            <span style={{ fontSize: 20, color: "#9aa4b8" }}>
              Live at Pranav Doors &amp; Windows · Chandigarh
            </span>
          </div>
          <span style={{ fontSize: 20, color: "#9aa4b8" }}>archflow.co.in</span>
        </div>
      </div>
    ),
    size
  );
}
