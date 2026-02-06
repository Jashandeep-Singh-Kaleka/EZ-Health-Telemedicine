import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for catching potential issues
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Production security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirect old app routes to the landing page
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
      permanent: true,
    }));
  },
};

export default nextConfig;
