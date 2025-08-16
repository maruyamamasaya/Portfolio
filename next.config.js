/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/studio-design-asset-files/**',
      },
    ],
  },
  experimental: {
    modern: true,
  },
};

module.exports = nextConfig;
