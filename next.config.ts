import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Configure trailing slash for better static hosting
  trailingSlash: true,

  // Optimize for production
  // experimental: {
  //   optimizeCss: true,
  // },

  // Configure asset prefix for CDN if needed
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/reactbits' : '',

  // Ensure proper base path for GitHub Pages if needed
  // basePath: process.env.NODE_ENV === 'production' ? '/reactbits' : '',

  // Compress output
  compress: true,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Disable ESLint during build for production
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during build for production
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
