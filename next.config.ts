import type { NextConfig } from "next";

// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io;
//   connect-src 'self' https://*.api.sanity.io https://*.sanity.io;
//   img-src 'self' data: https://cdn.sanity.io;
//   style-src 'self' 'unsafe-inline';
//   font-src 'self';
//   frame-ancestors 'none';
// `;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  productionBrowserSourceMaps: false,
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**"
      }
    ]
  },
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
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          // {
          //   key: "Content-Security-Policy",
          //   value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
