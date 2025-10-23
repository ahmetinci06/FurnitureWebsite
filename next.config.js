/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true, // Allow unoptimized images for development
  },
}

module.exports = nextConfig
