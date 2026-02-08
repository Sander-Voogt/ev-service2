const checkEnvVariables = require("./check-env-variables")
const loadRedirects = require('./scripts/redirect.ts');

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return loadRedirects();
  },
  async rewrites() {
    return [
      {
        source: '/nl/content/images/:path*',
        destination: 'https://f001.backblazeb2.com/file/website-files/evoud/images/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "f001.backblazeb2.com",
      },
       {
        protocol: "https",
        hostname: "form.evservice.eu",
      },

      {
        // Note: needed to serve images from /public folder
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith("https")
          ? "https"
          : "http",
        hostname: process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, ""),
      },
      {
        // Note: only needed when using local-file for product media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(
          "https://",
          ""
        ),
      },
      {
        // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "content.evservice.eu",
      },
      
      {
        // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT
        ? [
            {
              // Note: needed when using MinIO bucket storage for media
              protocol: "https",
              hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
            },
          ]
        : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },

  async headers() {
    return [] 
  },
}

module.exports = nextConfig
