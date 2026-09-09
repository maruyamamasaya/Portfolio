const imageAssets = require('./data/image-assets.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/studio-design-asset-files/**',
      },
    ],
  },
  async rewrites() {
    return Object.entries(imageAssets).map(([source, asset]) => ({
      source,
      destination: asset.replacementUrl || asset.temporary,
    }));
  },
};

module.exports = nextConfig;
