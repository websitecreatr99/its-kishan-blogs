/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer2");

const nextConfig = {
  compiler: {
    removeConsole: true,
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  devIndicators: false,
};

module.exports = withContentlayer(nextConfig);
