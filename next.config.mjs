/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add domains if using external image URLs
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
