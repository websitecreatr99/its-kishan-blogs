/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const path = require("path");

const nextConfig = {
  // Remove swcMinify: false — it was causing chunk hash instability.
  // Next.js 13 uses SWC minifier by default; disabling it changes output format.

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "next-devtools": path.resolve(__dirname, "empty-module.js"),
    };
    return config;
  },

  // Add cache-control headers so browsers always fetch fresh chunks after deploy
  async headers() {
    return [
      {
        // Static JS/CSS chunks — version-stamped by Next.js, safe to cache long-term
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HTML pages — always revalidate so new chunk URLs are picked up
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  experimental: {
    ppr: false,
    devTools: false,
    reactCompiler: false,
    turbo: { rules: {} },
  },

  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

module.exports = withMDX(nextConfig);