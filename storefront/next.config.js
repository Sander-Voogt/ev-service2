const checkEnvVariables = require("./check-env-variables")

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
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      { // Note: needed to serve images from /public folder
        protocol: process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https') ? 'https' : 'http',
        hostname: process.env.NEXT_PUBLIC_BASE_URL?.replace(/^https?:\/\//, ''),
      },
      { // Note: only needed when using local-file for product media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace('https://', ''),
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      { // Note: can be removed after deleting demo products
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      ...(process.env.NEXT_PUBLIC_MINIO_ENDPOINT ? [{ // Note: needed when using MinIO bucket storage for media
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
      }] : []),
    ],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000
  },
 
      async headers() {
    return [
      {
        source: "/(.*)", // alle routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval'
                https://js.stripe.com
                https://*.js.stripe.com
                https://m.stripe.network
                https://maps.googleapis.com;
              style-src 'self' 'unsafe-inline' https://m.stripe.network;
                img-src 'self' data: blob: ${process.env.NEXT_PUBLIC_BASE_URL} ${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL} https://medusa-public-images.s3.eu-west-1.amazonaws.com https://medusa-server-testing.s3.amazonaws.com https://medusa-server-testing.s3.us-east-1.amazonaws.com https://*.stripe.com https://m.stripe.network;              connect-src 'self'
                https://api.stripe.com
                https://m.stripe.network
                https://checkout.stripe.com
                https://maps.googleapis.com;
              frame-src 'self'
                https://js.stripe.com
                https://*.js.stripe.com
                https://hooks.stripe.com
                https://checkout.stripe.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self' https://checkout.stripe.com;
            `.replace(/\s{2,}/g, " "),
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
