/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "github-readme-stats.vercel.app",
      "ghchart.rshah.org",
    ],
  },
};

module.exports = nextConfig;
