/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const path = require("path");

const nextConfig = {
  compiler: {
    removeConsole: true,
  },

  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      // Force next-devtools to a dummy empty module
      "next-devtools": path.resolve(__dirname, "empty-module.js"),
    };
    return config;
  },

  experimental: {
    // Disable all devtools / segment explorer
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
