/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: experimental.optimizeCss (critters) is a no-op for the app
  // router in Next 14 — its post-processing pipeline only runs for the
  // pages router. Critical-CSS inlining needs Next 15's inlineCss.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" }
    ]
  }
};

export default nextConfig;
