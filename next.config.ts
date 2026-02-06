import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Hide framework fingerprint
  poweredByHeader: false,

  // Optimise images served through next/image
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // ── Security & caching headers ────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent click-jacking
          { key: "X-Frame-Options", value: "DENY" },
          // Stop MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer information
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Enable DNS prefetch
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Force HTTPS for 2 years + preload list
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Disable unnecessary browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Basic Content-Security-Policy (report-only first is safer, then switch to enforce)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
      // Long cache for static assets (Vercel hashes filenames automatically)
      {
        source: "/xpress-health-logo.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Redirect discontinued app routes → landing page (301) ─────────────
  async redirects() {
    const oldRoutes = [
      "/dashboard",
      "/activity",
      "/appointments",
      "/billing",
      "/checkout",
      "/documents",
      "/invite-patients",
      "/lab-test-request",
      "/medical-history",
      "/medical-records",
      "/message-provider",
      "/my-information",
      "/my-visits",
      "/notifications",
      "/patients",
      "/pharmacies",
      "/practice-metrics",
      "/prescription-request",
      "/prescriptions",
      "/profile",
      "/request-care",
      "/requests",
      "/schedule",
      "/video-call",
    ];

    return oldRoutes.map((route) => ({
      source: route,
      destination: "/",
      permanent: true, // 301
    }));
  },
};

export default nextConfig;
