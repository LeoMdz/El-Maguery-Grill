/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // Opcional: pathname: '/**',   // permite cualquier ruta
      },
    ],
  },
  compress: true,
  reactStrictMode: true,
};

module.exports = nextConfig;