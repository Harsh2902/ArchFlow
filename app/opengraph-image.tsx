import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ArchFlow — Custom workflow platforms for Indian industry";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Serif stack approximates Instrument Serif without an edge-runtime
// font fetch (which is fragile and can fail the build).
const SERIF = "Georgia, 'Times New Roman', serif";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#020617",
          // Soft emerald glow in the top-left corner
          backgroundImage:
            "radial-gradient(900px circle at 12% 8%, rgba(16,185,129,0.28) 0px, transparent 55%), radial-gradient(700px circle at 92% 96%, rgba(16,185,129,0.10) 0px, transparent 55%)",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px"
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 13,
              background: "linear-gradient(135deg, #34d399, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 40px rgba(16,185,129,0.5)"
            }}
          >
            <svg width={26} height={26} viewBox="0 0 16 16" fill="none">
              <path
                d="M2 13L8 2L14 13M5 9H11"
                stroke="#020617"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: 13,
              color: "#10b981",
              textTransform: "uppercase",
              letterSpacing: 3,
              fontWeight: 600
            }}
          >
            Custom Workflow Platforms
          </span>
        </div>

        {/* Wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontFamily: SERIF,
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: -3,
              color: "#f8fafc"
            }}
          >
            ArchFlow
          </span>
          <span
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              color: "#cbd5e1",
              maxWidth: 920,
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
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 26
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#10b981"
              }}
            />
            <span style={{ fontSize: 20, color: "#94a3b8" }}>
              Live at Pranav Doors &amp; Windows · Chandigarh
            </span>
          </div>
          <span style={{ fontSize: 20, color: "#94a3b8" }}>archflow.co.in</span>
        </div>
      </div>
    ),
    size
  );
}
