import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #34d399, #059669)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6
        }}
      >
        <svg width={20} height={20} viewBox="0 0 16 16" fill="none">
          <path
            d="M2 13L8 2L14 13M5 9H11"
            stroke="#020617"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
