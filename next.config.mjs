import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'baiggroupltd.co.uk/',
      },
    ],
    unoptimized: true,
  },
};

export default withPlaiceholder(nextConfig);
