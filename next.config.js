/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;