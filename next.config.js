/** @type {import('next').NextConfig} */

const path = require("path");
const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  compiler: {
    removeConsole: true,
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "next-devtools": path.resolve(__dirname, "empty-module.js"),
    };

    return config;
  },

  experimental: {
    ppr: false,
    turbo: {
      rules: {},
    },
  },

  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
};

module.exports = withContentlayer(nextConfig);