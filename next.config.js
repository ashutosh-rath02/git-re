/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "localhost",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "github-readme-stats.vercel.app",
      "ghchart.rshah.org",
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/resume/:username",
  //       destination: "https://ghchart.rshah.org/:username",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
