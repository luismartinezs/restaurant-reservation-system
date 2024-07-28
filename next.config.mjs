/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'raw.githubusercontent.com',
  //     },
  //   ],
  // },
};

export default nextConfig;
