import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // tw-animate-css only exposes a "style" export condition, which Turbopack
  // doesn't request when resolving `@import "tw-animate-css"` — point it at
  // the file directly so the build resolves.
  turbopack: {
    resolveAlias: {
      "tw-animate-css": "./node_modules/tw-animate-css/dist/tw-animate.css",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      
      },
    ],
  },

};

export default nextConfig;
